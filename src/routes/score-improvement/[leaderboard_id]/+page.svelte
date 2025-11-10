<script lang="ts">
    import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import Seo from '$lib/seo.svelte';
    import type { Score } from '$lib/types.js';
    import pkg from 'chart.js';
    const {Chart} = pkg
    const { data } = $props()

    const chartRender = (node: any, options: any) => {
        new Chart (node, options)
    }

    let score_dates: string[] = []
    let score_accuracy: { y: number; x: Date; }[] = []
    let score_score: { y: number; x: Date; }[] = []
    let score_modified_score: { y: number; x: Date; }[] = []
    let score_stars: { y: number; x: Date; }[] = []
    let score_pp: { y: number; x: Date; }[] = []
    let score_combo: { y: number; x: Date; }[] = []
    let score_bad_cuts: { y: number; x: Date; }[] = []
    let score_missed_notes: { y: number; x: Date; }[] = []
    let score_bad_cuts_or_missed_notes: { y: number; x: Date; }[] = []

    const date_formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    data.scores.forEach((score : Score) => {
      score_dates.push(date_formatter.format(score.time))
      score_accuracy.push({y: score.accuracy, x : score.time})
      score_score.push({y: score.score, x : score.time})
      score_modified_score.push({y: score.modified_score, x : score.time})
      score_stars.push({y: score.stars, x : score.time})
      score_pp.push({y: score.pp, x : score.time})
      score_combo.push({y: score.max_combo, x : score.time})
      score_bad_cuts.push({y: score.bad_cuts, x : score.time})
      score_missed_notes.push({y: score.missed_notes, x : score.time})
      score_bad_cuts_or_missed_notes.push({y: score.missed_notes + score.bad_cuts, x : score.time})
    })
  const chart_data = {
      labels: score_dates,
      datasets: [
        {
          label: 'Acc',
          data: score_accuracy,
          borderColor: 'rgba(0, 123, 255, 1)', // Orange
          cubicInterpolationMode: 'monotone',
          yAxisID: 'AccAxis',
          tension: 0.5,
        },{
          label: 'Score',
          data: score_score,
          borderColor: 'rgba(40, 167, 69, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'ScoreAxis',
          hidden: true
        },{
          label: 'Performance Points (current)',
          data: score_pp,
          borderColor: 'rgba(220, 53, 69, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'PerformancePointsAxis',
          hidden: true
        },{
          label: 'Combo',
          data: score_combo,
          borderColor: 'rgba(255, 16, 242, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'ComboAxis',
          hidden: true
        },{
          label: 'Bad Cuts Or Missed Notes',
          data: score_bad_cuts_or_missed_notes,
          borderColor: 'rgba(108, 117, 125, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          yAxisID: 'BadCutsOrMissesAxis',
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
          display : false,
          distribution: 'linear',
          time: {
            unit: 'second',
            autoSkip : true,
            tooltipFormat: 'MMM dd, yyyy',
            displayFormats: {
              hour: 'MMM D, hh:mm:ss'
            }
          },
          title: {
            display: true,
            text: 'Date'
          }        
        },
        yAxes:[{
          id: 'AccAxis',
          type: 'linear',
          position: "left",
          title: { display: true, text: 'Accuracy' },
          grid: { drawTicks: false, drawOnChartArea: false },
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chart_data = this.chart;
              if (chart_data.isDatasetVisible(0)) {
                return value + "%";
              }else{
                return null
              }
            }
          },
        },
        {
          id: 'ScoreAxis',
          type: 'linear',
          position: "right",
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chart_data = this.chart;
              if (chart_data.isDatasetVisible(1)) {
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
          id: 'PerformancePointsAxis',
          type: 'linear',
          position: "right",
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chart_data = this.chart;
              if (chart_data.isDatasetVisible(2)) {
                return value + "pp";
              }else{
                return null
              }
            }
          },
          title: { display: true, text: 'Country Rank' },
        },
        {
          id: 'ComboAxis',
          type: 'linear',
          title: { display: false, text: 'Ranked Accuracy' },
          ticks: {
            display: false
          },
        },
        {
          id: 'BadCutsOrMissesAxis',
          type: 'linear',
          title: { display: false, text: 'Bad Cuts Or Misses' },
          ticks: {
            display: false
          },
        }],
      }
    }
  };

</script>

<Seo
  title="Top Score Progress - {data.map_data.song_name} ({data.map_data.difficulty}) mapped by {data.map_data.level_author_name} - HistorySaber"
  description="See how top scores have improved over time for {data.map_data.song_name} ({data.map_data.difficulty}) mapped by {data.map_data.level_author_name} on HistorySaber."
  url="http://historysaber.com/score-improvement/{data.map_data.leaderboard_id}"
  image="https://historysaber.com/og-image/map/{data.map_data.map_hash}"
/>

<main>
  <h1><span class="name">{data.map_data.song_name}</span> on <span class="name">{data.map_data.difficultyraw}</span> top score history</h1>
  <OldScoresMissingWarning></OldScoresMissingWarning>
  {#if data.scores.length > 1}
    <div class="graph">
      <canvas use:chartRender={config}></canvas>
    </div>

    <h1>Scores</h1>
  {/if}

    {#if data.scores.length > 0}
    <div class="score-list">
      {#each [...data.scores].reverse() as score, i}
        {#if i > 0}
          {#if data.usernames[(data.scores.length-1)-i] != data.usernames[(data.scores.length-1)-i+1]}
            <h3>{data.usernames[(data.scores.length-1)-i]}</h3>
          {/if}
        {:else}
          <h3>{data.usernames[(data.scores.length-1)-i]}</h3>
        {/if}
        
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

</main>

<style>
  .graph {
    height: 500px;
    margin-bottom: 15px;
  }

  h1, h2, h3 {
    text-align: center;
  }
  h3 {
    margin-bottom: 0px;
  }


  .name {
    color: lightblue;
  }

.score-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 480px) {
    .graph {
      height: 350px;
      
    }
    main {
      font-size: clamp(0px,3vw,1.5rem);
    }
  }
</style>