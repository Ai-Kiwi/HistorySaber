<script lang="ts">    
  import { Chart } from 'chart.js';
  import type { PageProps } from './$types';
  import { formatDate } from '$lib/utils';
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
    import DateSelect from '$lib/dateSelect.svelte';
    import Pagination from '$lib/pagination.svelte';
    import type { Score } from '$lib/types';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
  let { data }: PageProps = $props();
 
  const chartRender = (node: any, options: any) => {

    new Chart (node, options)
  }

  const ppDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastPp[i] }));
  const rankDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastRank[i] }));
  const countryDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastCountryRank[i] }));
  const pastTotalScoreDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastTotalScore[i] }));
  const pastTotalRankedScoreDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastTotalRankedScore[i] }));
  const pastAverageRankedAccuracyDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastAverageRankedAccuracy[i] }));
  const pastTotalPlayCountDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastTotalPlayCount[i] }));
  const pastRankedPlayCountDataset = data.pastDates.map((date, i) => ({ x: new Date(date), y: data.pastRankedPlayCount[i] }));

  const user_data = data.playerData;
  let selected_date: string = "";

  //const dataset2 = dates.map((date, i) => ({ x: date, y: values2[i] }));
  var formatedDates: string[] = []
  data.pastDates.forEach((date) => {formatedDates.push(formatDate(date))})


  const chart_data = {
      labels: formatedDates,
      datasets: [
        {
          label: 'Performance Points',
          data: ppDataset,
          borderColor: 'rgba(255, 165, 0, 1)', // Orange
          tension: 0.1
        },
        {
          label: 'World Wide Rank',
          data: rankDataset,
          borderColor: 'rgba(30, 144, 255, 1)', // Dodger Blue
          tension: 0.1
        },
        {
          label: 'Country Rank',
          data: countryDataset,
          borderColor: 'rgba(34, 139, 34, 1)', // Forest Green
          tension: 0.1
        },
        {
          label: 'Total Score',
          data: pastTotalScoreDataset,
          borderColor: 'rgba(128, 0, 128, 1)', // Purple
          tension: 0.1,
          hidden: true
        },
        {
          label: 'Total Ranked Score',
          data: pastTotalRankedScoreDataset,
          borderColor: 'rgba(220, 20, 60, 1)', // Crimson
          tension: 0.1,
          hidden: true
        },
        {
          label: 'Total Play Count',
          data: pastTotalPlayCountDataset,
          borderColor: 'rgba(255, 99, 71, 1)', // Tomato
          tension: 0.1,
          hidden: true
        },
        {
          label: 'Ranked Play Count',
          data: pastRankedPlayCountDataset,
          borderColor: 'rgba(100, 149, 237, 1)', // Cornflower Blue
          tension: 0.1,
          hidden: true
        },
        {
          label: 'Average Ranked Accuracy',
          data: pastAverageRankedAccuracyDataset,
          borderColor: 'rgba(255, 215, 0, 1)', // Gold
          tension: 0.1,
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
        }
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
        y: {
          beginAtZero: false, // automatically scales based on data
          reverse: true,
          position: 'right',
        }
      }
    }
  };

//<main class="text-center" style={`${
//  user_data.player_id == 76561198392945548
//    ? `background-image: url(''); background-size: cover;`
//    : 'background-color: black;'
//}`}>


  const validEntries = formatedDates
    .map((date, i) => ({ date: new Date(ppDataset[i].x), value: ppDataset[i].y }))
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
  let player_scores: Score[]  = $state([])
  let player_scores_sort: string  = $state("top")

  async function fetch_scores() {
    if (loading_scores == true) {
      loading_outdated = true
      return
    }
    loading_scores = true;

    try{
      const params = new URLSearchParams({ page: score_page_selected.toString(), date : formatDate(selected_score_date), player : data.playerData.player_id, sort : player_scores_sort });
      const res = await fetch(`/api/player_scores?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch player score data:', res.statusText);
        loading_scores = false;
        return;
      }

      const score_data = await res.json();
      player_scores = score_data

    }catch(e){
      console.log(`failed fetching data ${e}`)
    }


    loading_scores = false
    if (loading_outdated == true) {
      loading_outdated = false
      setTimeout(fetch_scores, 100);
    }
  }

  function update_score_date(offset: number) {
    selected_score_date.setTime(score_tracking_started.getTime() + (offset * 24 * 60 * 60 * 1000 ))
    selected_score_date = new Date(selected_score_date);
    fetch_scores()
  }

  fetch_scores()

  function changeScoreSort(sort : string) {
    player_scores_sort = sort
    fetch_scores()
  }

</script>
  
<main>
  <div class="basic-info-row">
    <img src="https://cdn.scoresaber.com/avatars/{data.playerData.player_id}.jpg" alt="Profile picture of {data.playerData.name}" class="profile-picture" aria-hidden="true">

    <div class="username">{user_data.name}</div>
  </div>

  <div class="graph">
    <canvas  use:chartRender={config}></canvas>
  </div>



  <h1>Past Scores</h1>
  <h2 class="date_text">{selected_score_date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
  <DateSelect startDate={score_tracking_started} valueUpdate={update_score_date}></DateSelect>

  <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetch_scores()}}></Pagination>

  <div class="sort-select-section">
    <button class="{player_scores_sort == "top" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("top")}>Performance Points</button>
    <button class="{player_scores_sort == "hardest" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("hardest")}>Stars</button>
    <button class="{player_scores_sort == "accuracy-all" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("accuracy-all")}>Accuracy</button>
    <button class="{player_scores_sort == "accuracy-ranked" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("accuracy-ranked")}>Ranked Accuracy</button>
    <button class="{player_scores_sort == "recent-all" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("recent-all")}>Recent</button>
    <button class="{player_scores_sort == "recent-ranked" ? "sort-select-selected" : "sort-select"}" on:click={()=>changeScoreSort("recent-ranked")}>Recent Ranked</button>
  </div>
  

  <div class="{loading_scores ? 'shimmer' : ''}">
    {#if player_scores.length > 0}
    <div class="score-list">
      {#each player_scores as score}
        {#key score.score_id}
          <ScoreDisplay data={score}></ScoreDisplay>
        {/key}
      {/each}
    </div>
  {:else}
  <h2>
    No scores to display on this page
  </h2>
  {/if}
  </div>

  <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetch_scores()}}></Pagination>


</main>

<style>
  .sort-select {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgb(50, 50, 50);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .sort-select-selected {
    padding: 7.5px 10px;
    font-family: sans-serif;
    background-color: rgb(100, 100, 100);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-width: 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .sort-select-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 25px;
    gap: 5px;
    flex-wrap: wrap;
  }

  .profile-picture{
    height: 128px;
    border-radius: 9999px;
    margin-left: 5px;
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
    height: 128px;
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

  }

  .graph {
    height: 500px;
    margin-bottom: 15px;
  }

  .username {
    margin: auto 15px;
    font-size: 50px;
    font-weight: bolder;
    align-self: center;
  }

  .date_text {
    font-size: 20px;
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
			rgba(50, 50, 50, 0) 0%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(50, 50, 50, 0) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.8s infinite linear;
		pointer-events: none;
		border-radius: inherit;
	}

  a {
      text-decoration: none;
  }
</style>


