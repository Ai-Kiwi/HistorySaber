<script lang="ts">    
  import pkg from 'chart.js';
  const {Chart} = pkg
  import type { PageProps } from './$types';
  import { formatDate } from '$lib/utils';
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
  import DateSelect from '$lib/dateSelect.svelte';
  import Pagination from '$lib/pagination.svelte';
  import type { Score } from '$lib/types';
  import ScoreDisplay from '$lib/scoreDisplay.svelte';
  import { flip } from 'svelte/animate';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import DataMissing from '$lib/oldScoresMissingWarning.svelte';
  import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
  import DataMissingWarning from '$lib/dataMissingWarning.svelte';
    import Seo from '$lib/seo.svelte';
  let { data }: PageProps = $props();
  let hasLoaded = false

  //compact mode settings
  const compact_mode = page.url.searchParams.get('compact') === 'true';
  const compact_display_scores = page.url.searchParams.get('scores') === 'true';
  const compact_display_graph = page.url.searchParams.get('graph') === 'true';
  const compact_settings = page.url.searchParams.get('settings') === 'true';
 
  const chartRender = (node: any, options: any) => {

    new Chart (node, options)
  }

  const pp_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_pp[i] }));
  const rank_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_rank[i] }));
  const country_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_country_rank[i] }));
  const past_total_score_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_total_score[i] }));
  const past_total_ranked_score_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_total_ranked_score[i] }));
  const past_average_ranked_accuracy_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_average_ranked_accuracy[i] }));
  const past_total_play_count_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_total_play_count[i] }));
  const past_ranked_play_count_dataset = data.past_dates.map((date, i) => ({ x: new Date(date), y: data.past_ranked_play_count[i] }));

  const user_data = data.player_data;
  let selected_date: string = "";

  //const dataset2 = dates.map((date, i) => ({ x: date, y: values2[i] }));
  let formated_dates: string[] = []
  data.past_dates.forEach((date) => {formated_dates.push(formatDate(date))})


  const chart_data = {
      labels: formated_dates,
      datasets: [
        {
          label: 'Performance Points',
          data: pp_dataset,
          borderColor: 'rgba(255, 165, 0, 1)', // Orange
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'ppAxis',
        },
        {
          label: 'World Wide Rank',
          data: rank_dataset,
          borderColor: 'rgba(30, 144, 255, 1)', // Dodger Blue
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'globalRankAxis',
        },
        {
          label: 'Country Rank',
          data: country_dataset,
          borderColor: 'rgba(34, 139, 34, 1)', // Forest Green
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'countryRankAxis',
          hidden: true
        },
        {
          label: 'Average Ranked Accuracy',
          data: past_average_ranked_accuracy_dataset,
          borderColor: 'rgba(255, 215, 0, 1)', // Gold
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'rankedAccuracyAxis',
          hidden: true
        },
        {
          label: 'Total Score',
          data: past_total_score_dataset,
          borderColor: 'rgba(128, 0, 128, 1)', // Purple
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'totalScoreAxis',
          hidden: true
        },
        {
          label: 'Total Ranked Score',
          data: past_total_ranked_score_dataset,
          borderColor: 'rgba(220, 20, 60, 1)', // Crimson
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'totalRankedAxis',
          hidden: true
        },
        {
          label: 'Total Play Count',
          data: past_total_play_count_dataset,
          borderColor: 'rgba(255, 99, 71, 1)', // Tomato
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'totalPlayCountAxis',
          hidden: true
        },
        {
          label: 'Ranked Play Count',
          data: past_ranked_play_count_dataset,
          borderColor: 'rgba(100, 149, 237, 1)', // Cornflower Blue
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'rankedPlayCountAxis',
          hidden: true
        }
      ]
  };

  const config = {
    type: 'line',
    data: chart_data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
      },
      interaction: {
        mode: 'nearest',
        intersect: false
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MMM dd, yyyy'
          },
        },
        yAxes:[{
          id: 'ppAxis',
          type: 'linear',
          title: { display: true, text: 'Performance Points' },
          grid: { drawTicks: false, drawOnChartArea: false },
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chartData = this.chart;
              if (chartData.isDatasetVisible(0)) {
                return value + "pp";
              }else{
                return null
              }
            }
          },
        },
        {
          id: 'globalRankAxis',
          type: 'linear',
          position: "right",
          ticks: {
            reverse: true,
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chartData = this.chart;
              if (chartData.isDatasetVisible(1)) {
                return value;
              }else{
                return null
              }
            }
          },
          grid: {
            drawTicks: false // optional: hides tick lines
          },
          
        },
        {
          id: 'countryRankAxis',
          type: 'linear',
          position: "right",
          ticks: {
            reverse: true,
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chartData = this.chart;
              if (chartData.isDatasetVisible(2)) {
                return value;
              }else{
                return null
              }
            }
          },
          title: { display: true, text: 'Country Rank' },
        },
        {
          id: 'rankedAccuracyAxis',
          type: 'linear',
          title: { display: true, text: 'Ranked Accuracy' },
          position: "right",
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chartData = this.chart;
              if (chartData.isDatasetVisible(3)) {
                return value + "%";
              }else{
                return null
              }
            }
          },
        },
        {
          id: 'totalScoreAxis',
          type: 'linear',
          title: { display: true, text: 'Total Score' },
          ticks: {
            display: false
          },
        },
        {
          id: 'totalRankedAxis',
          type: 'linear',
          title: { display: true, text: 'Total Ranked Score' },
          display: false
        },
        {
          id: 'totalPlayCountAxis',
          type: 'linear',
          title: { display: true, text: 'Total Play Count' },
          display: false
        },
        {
          id: 'rankedPlayCountAxis',
          type: 'linear',
          title: { display: false, text: 'Total Ranked Play Count' },
          display: false
        }],
      }
    }
  };

//<main class="text-center" style={`${
//  user_data.player_id == 76561198392945548
//    ? `background-image: url(''); background-size: cover;`
//    : 'background-color: black;'
//}`}>


  const validEntries = formated_dates
    .map((date, i) => ({ date: new Date(pp_dataset[i].x), value: pp_dataset[i].y }))
    .filter(entry => entry.value !== null);

  // Step 2: Find the entry with the earliest date
  const earliest = validEntries.reduce((min, curr) => (
    curr.date < min.date ? curr : min
  ), validEntries[0]);
  let score_tracking_started = new Date("2025-05-03")

  if (earliest.date.getTime() > score_tracking_started.getTime()) {
    score_tracking_started = new Date(earliest.date)
  }
  score_tracking_started.setTime(score_tracking_started.getTime() + (24 * 60 * 60 * 1000))

  let loading_scores = $state(false)
  let loading_outdated = false
  let selected_score_date = $state(new Date(score_tracking_started))
  let score_page_selected = $state(1)
  let player_scores: Score[]  = $state(data.initial_scores)
  let player_scores_sort: string  = $state(page.url.searchParams.get('scores_sort') || "top")
  let reverse_score_order = $state(false)
  let limit_score_ranked = $state(!(page.url.searchParams.get('only_ranked') === "false"))
  let safe_data_for_date = $state(true)
  let score_page_size = $state(Number(page.url.searchParams.get('score_count')) || 8)

  async function fetchScores() {
    if (loading_scores == true || hasLoaded == false) {
      loading_outdated = true
      return
    }
    loading_scores = true;

    try{
      const params = new URLSearchParams({ 
        page: score_page_selected.toString(), 
        date: formatDate(selected_score_date), 
        player: data.player_data.player_id, 
        sort: player_scores_sort, 
        reverse: reverse_score_order.toString(), 
        only_ranked: limit_score_ranked.toString(),
        page_size: score_page_size.toString(),
      });
      const res = await fetch(`/api/player_scores?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch player score data:', res.statusText);
        loading_scores = false;
        return;
      }

      const score_data = await res.json();
      player_scores = score_data

      

      if (formated_dates.includes(formatDate(selected_score_date))) {
        if (pp_dataset[formated_dates.indexOf(formatDate(selected_score_date))].y != null) {
          safe_data_for_date = true
        }else{
          safe_data_for_date = false
        }
      }else{
        safe_data_for_date = false
      }


    }catch(e){
      console.log(`failed fetching data ${e}`)
    }


    loading_scores = false
    if (loading_outdated == true) {
      loading_outdated = false
      setTimeout(fetchScores, 100);
    }
  }

  function update_score_date(offset: number) {
    selected_score_date.setTime(score_tracking_started.getTime() + (offset * 24 * 60 * 60 * 1000 ))
    selected_score_date = new Date(selected_score_date);
    fetchScores()
  }

  onMount(() => {
    hasLoaded = true
    fetchScores()
  })
  function changeScoreSort(sort : string) {
    player_scores_sort = sort
    fetchScores()
  }

</script>
  
<main>


  {#if compact_mode == false}
    <div class="basic-info-row">
      <img src="https://cdn.scoresaber.com/avatars/{data.player_data.player_id}.jpg" alt="Profile picture of {data.player_data.name}" class="profile-picture" aria-hidden="true">

      <div class="username">{user_data.name}</div>
    </div>
  {/if}

  {#if compact_mode == false || compact_display_graph == true}
    <div class="graph">
      <canvas  use:chartRender={config}></canvas>
    </div>
  {/if}

  {#if compact_mode == false}
    <h1>Past Scores</h1>
  {/if}

  {#if compact_mode == false || (compact_settings == true && compact_display_scores == true)}
    
    <h2 class="date_text">{selected_score_date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
    <DateSelect start_date={score_tracking_started} valueUpdate={update_score_date}></DateSelect>

    <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetchScores()}} pageSizeChanged={(size : number) => {score_page_size = size; fetchScores()}} current_page_size={score_page_size.toString()}></Pagination>
    <div class="sort-select-section">
      <button class="{player_scores_sort == "top" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("top")}>Performance Points</button>
      <button class="{player_scores_sort == "hardest" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("hardest")}>Stars</button>
      <button class="{player_scores_sort == "accuracy" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("accuracy")}>Accuracy</button>
      <button class="{player_scores_sort == "max_combo" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("max_combo")}>Combo</button>
      <button class="{player_scores_sort == "bad_cuts_or_misses" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("bad_cuts_or_misses")}>Bad Cuts/Misses</button>
      <button class="{player_scores_sort == "score" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("score")}>Score</button>
      <button class="{player_scores_sort == "recent-duplicated" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("recent-duplicated")}>Recent (With Duplicates)</button>
      <button class="{player_scores_sort == "recent" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("recent")}>Recent</button>
      {#if player_scores_sort != "recent-duplicated"}
        <div style="flex-basis: 100%;">
          <div style="width: 300px; background-color: rgba(25,25,25,0.5); height: 2px; border-radius: 15px; margin: auto;"></div>
        </div>
        <button class="{limit_score_ranked == false ? "sort-toggle" : "sort-toggle-selected"}" on:click={()=>{ limit_score_ranked = !limit_score_ranked; fetchScores() }}>Only Ranked</button>
        <button class="{reverse_score_order ? "sort-toggle-selected" : "sort-toggle"}" on:click={()=>{ reverse_score_order = !reverse_score_order; fetchScores() }}>Reverse Order</button>
      {:else}
      <OldScoresMissingWarning NOTICE_ID="user-scores-duplicated"></OldScoresMissingWarning>
      {/if}
    </div>
    {#if safe_data_for_date == false}
      <DataMissingWarning></DataMissingWarning>   
    {/if}
  {/if}

  {#if compact_mode == false || compact_display_scores == true}
    <div class="{loading_scores ? 'shimmer' : ''}">
      {#if player_scores.length > 0}
      <div class="score-list">
        {#each player_scores as score (score.score_id)}
          <label animate:flip={{ duration: 500 }}>
            <ScoreDisplay data={score}></ScoreDisplay>
          </label>
        {/each}
      </div>
    {:else}
    <h2>
      No scores to display on this page
    </h2>
    {/if}
    </div>
  {/if}


  {#if compact_mode == false || (compact_settings == true && compact_display_scores == true)}
    <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetchScores()}} pageSizeChanged={(size : number) => {score_page_size = size; fetchScores()}} current_page_size={score_page_size.toString()}></Pagination>
  {/if}

</main>

<Seo
  title="{data.player_data.name} - Profile & Scores - HistorySaber"
  description="View {data.player_data.name}'s historical Beat Saber scores, rankings, and stats on HistorySaber."
  url="http://historysaber.com/profile/{data.player_data.player_id}"
  image="https://historysaber.com/og-image/user/{data.player_data.player_id}"
/>

<style>
  .sort-toggle {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgba(50, 50, 50, 0.25);
    border-radius: 2.5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    backdrop-filter: saturate(130%);
  }

  .sort-toggle:hover {
    background-color: rgba(150, 150, 150, 0.25);
    transition: 0.25s ease;
  }

  .sort-toggle-selected {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 2.5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    backdrop-filter: saturate(130%);
  }

  .sort-toggle-selected:hover {
    background-color: rgba(200, 200, 200, 0.5);
    transition: 0.25s ease;
  }

  .sort-select {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgba(50, 50, 50, 0.25);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.25s ease;
    backdrop-filter: saturate(130%);
  }

  .sort-select:hover {
    background-color: rgba(150, 150, 150, 0.25);
    transition: 0.25s ease;
  }

  .sort-select-selected {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgba(100, 100, 100, 0.5);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.25s ease;
    backdrop-filter: saturate(130%);
  }

  .sort-select-selected:hover {
    background-color: rgba(200, 200, 200, 0.5);
    transition: 0.25s ease;
  }

  .sort-select-section {
    margin: 25px 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }

  .profile-picture{
    background-image: url("https://cdn.scoresaber.com/avatars/oculus.png");
    background-size: cover;
    background-position: center;
    width: 128px;
    height: 128px;
    border-radius: 9999px;
    font-size: 0px;
  }

  h2, h1 {
    text-align: center;
  }

  .score-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .basic-info-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    flex-wrap: wrap;
    padding: auto 0px auto 0px;
    gap: 16px;
    row-gap: 0px;
    justify-content: center;
  }

  .graph {
    height: 500px;
    margin-bottom: 15px;
  }

  .username {
    font-size: 3.125rem;
    font-weight: bolder;
    align-self: center;
  }

  .date_text {
    font-size: 1.25rem;
    margin: 15px;
    font-style: normal;
    font-weight: bold;
  }

  /*loading shimmer*/
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.shimmer {
		position: relative;
		overflow: hidden;
    border-radius: 15px;
	}

	.shimmer::after {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
      120deg,
    rgba(0, 150, 255, 0.1) 0%, 
    rgba(0, 0, 0, 0) 33%, 
    rgba(0, 0, 0, 0) 66%, 
    rgba(255, 50, 0, 0.1) 100%
      );
		background-size: 200% 100%;
		animation: shimmer 1.8s infinite linear;
		pointer-events: none;
		border-radius: inherit;
	}

  @media (hover: hover) and (pointer: fine) {
    .graph {
      backdrop-filter: blur(15px) saturate(130%);
      border-radius: 15px;
    }
  }

  @media (max-width: 480px) {
    .graph {
      height: 350px;
    }
    .basic-info-row {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
    }
    .profile-picture {
      width: 35vw;
      height: 35vw;
    }
    .username {
      font-size: 10vw;
    }

    .sort-select {
      font-size: clamp(0.625rem,2.9vw,0.75rem);
      padding: 5px;
    }
    .sort-select-selected {
      font-size: clamp(0.625rem,2.9vw,0.75rem);
      padding: 5px;
    }
    .sort-toggle {
      font-size: clamp(0.625rem,3.25vw,0.75rem);
      padding: 5px;
    }

    .sort-toggle-selected {
      font-size: clamp(0.625rem,3.25vw,0.75rem);
      padding: 5px;
    }

    .sort-select-section {
      margin: 0px 0px 20px 0px;
    }
  }
</style>


