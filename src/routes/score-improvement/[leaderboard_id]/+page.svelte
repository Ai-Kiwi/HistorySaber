<script lang="ts">
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import type { Score } from '$lib/types.js';
    import pkg from 'chart.js';
    const {Chart} = pkg
    const { data } = $props()

    const chartRender = (node: any, options: any) => {
        new Chart (node, options)
    }

    let scoreDates: string[] = []
    let scoreAccuracy: { y: number; x: Date; }[] = []
    let scoreScore: { y: number; x: Date; }[] = []
    let scoreModifiedScore: { y: number; x: Date; }[] = []
    let scoreStars: { y: number; x: Date; }[] = []
    let scorePP: { y: number; x: Date; }[] = []
    let scoreCombo: { y: number; x: Date; }[] = []
    let scoreBadCuts: { y: number; x: Date; }[] = []
    let scoreMissedNotes: { y: number; x: Date; }[] = []
    let scoreBadCutsOrMissedNotes: { y: number; x: Date; }[] = []

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
      scoreDates.push(date_formatter.format(score.time))
      scoreAccuracy.push({y: score.accuracy, x : score.time})
      scoreScore.push({y: score.score, x : score.time})
      scoreModifiedScore.push({y: score.modified_score, x : score.time})
      scoreStars.push({y: score.stars, x : score.time})
      scorePP.push({y: score.pp, x : score.time})
      scoreCombo.push({y: score.max_combo, x : score.time})
      scoreBadCuts.push({y: score.bad_cuts, x : score.time})
      scoreMissedNotes.push({y: score.missed_notes, x : score.time})
      scoreBadCutsOrMissedNotes.push({y: score.missed_notes + score.bad_cuts, x : score.time})
    })

  const chart_data = {
      labels: scoreDates,
      datasets: [
        {
          label: 'Acc',
          data: scoreAccuracy,
          borderColor: 'rgba(0, 123, 255, 1)', // Orange
          tension: 0.1,
        },{
          label: 'Score',
          data: scoreScore,
          borderColor: 'rgba(40, 167, 69, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Modified Score',
          data: scoreModifiedScore,
          borderColor: 'rgba(255, 193, 7, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Performance Points (current)',
          data: scorePP,
          borderColor: 'rgba(220, 53, 69, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Combo',
          data: scoreCombo,
          borderColor: 'rgba(255, 16, 242, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Bad Cuts',
          data: scoreBadCuts,
          borderColor: 'rgba(255, 87, 34, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Missed Notes',
          data: scoreMissedNotes,
          borderColor: 'rgba(23, 162, 184, 1)',
          tension: 0.1,
          hidden: true
        },{
          label: 'Bad Cuts Or Missed Notes',
          data: scoreBadCutsOrMissedNotes,
          borderColor: 'rgba(108, 117, 125, 1)',
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
        y: {
            title: {
                display: true,
                text: 'Y Axis 1'
            }
        },
      }
    }
  };

</script>

<main>
    <h1><span class="name">{data.map_data.song_name}</span> on <span class="name">{data.map_data.difficultyraw}</span> top score history</h1>

  <!--<div class="old-data-warning">Please note data before collecting of scores started (3rd of May, 2025) doesn't factor in scores which have been overridden, meaning a fair amount of data is missing. Please only trust data after this date.</div>-->

  <div class="graph">
    <canvas use:chartRender={config}></canvas>
  </div>

  <h1>Scores</h1>

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

  .old-data-warning {
    font-family: sans-serif;
    padding: 15px;
    background-color: rgb(200, 0, 0);
    border-radius: 10px;
    text-align: center;
    margin-bottom: 15px;
    width: 1fr;
    color: white;
    font-weight: bolder;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .name {
    color: lightblue;
  }

.score-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>