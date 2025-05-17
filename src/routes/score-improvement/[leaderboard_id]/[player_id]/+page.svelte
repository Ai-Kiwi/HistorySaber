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
          cubicInterpolationMode: 'monotone',
          tension: 0.5,
        },{
          label: 'Score',
          data: scoreScore,
          borderColor: 'rgba(40, 167, 69, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Modified Score',
          data: scoreModifiedScore,
          borderColor: 'rgba(255, 193, 7, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Performance Points (current)',
          data: scorePP,
          borderColor: 'rgba(220, 53, 69, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Combo',
          data: scoreCombo,
          borderColor: 'rgba(255, 16, 242, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Bad Cuts',
          data: scoreBadCuts,
          borderColor: 'rgba(255, 87, 34, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Missed Notes',
          data: scoreMissedNotes,
          borderColor: 'rgba(23, 162, 184, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
          hidden: true
        },{
          label: 'Bad Cuts Or Missed Notes',
          data: scoreBadCutsOrMissedNotes,
          borderColor: 'rgba(108, 117, 125, 1)',
          tension: 0.5,
          cubicInterpolationMode: 'monotone',
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
    <h1><span class="name">{data.player_data.name}</span> playing <span class="name">{data.map_data.song_name}</span> on <span class="name">{data.map_data.difficultyraw}</span> top score history</h1>
  {#if data.scores.length > 1}
    <div class="graph">
      <canvas use:chartRender={config}></canvas>
    </div>

    <h2>Scores</h2>
  {/if}

    {#if data.scores.length > 0}
    <div class="score-list">
      {#each [...data.scores].reverse() as score}
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
</style>