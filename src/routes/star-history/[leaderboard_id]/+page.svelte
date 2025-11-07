<script lang="ts">
    import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import type { MapLeaderboardStar, Score } from '$lib/types.js';
    import pkg from 'chart.js';
    const {Chart} = pkg
    const { data } = $props()

    const chartRender = (node: any, options: any) => {
        new Chart (node, options)
    }

    let rank_dates: string[] = []
    let rank_stars: { y: number; x: Date; }[] = []

    const date_formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
    });
  const chart_data = {
      labels: rank_dates,
      datasets: [
        {
          label: 'Stars',
          data: rank_stars,
          borderColor: 'rgba(0, 123, 255, 1)', // Orange
          cubicInterpolationMode: 'monotone',
          yAxisID: 'StarsAxis',
          tension: 0.5,
        }
      ]
  };

  data.ranks.forEach((rank : MapLeaderboardStar) => {
    rank_dates.push(date_formatter.format(rank.update_at))
    rank_stars.push({y: rank.stars, x : rank.update_at})
  })

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
          id: 'StarsAxis',
          type: 'linear',
          position: "left",
          title: { display: true, text: 'Stars' },
          grid: { drawTicks: false, drawOnChartArea: false },
          ticks: {
            callback: function(value: string, index: any, ticks: any) {
              //@ts-ignore
              const chart_data = this.chart;
              if (chart_data.isDatasetVisible(0)) {
                return value + " Stars";
              }else{
                return null
              }
            }
          },
        }],
      }
    }
  };

</script>

<main>
  <h1><span class="name">{data.map_data.song_name}</span> on <span class="name">{data.map_data.difficultyraw}</span> star history</h1>
  <OldScoresMissingWarning></OldScoresMissingWarning>
  <div class="graph">
    <canvas use:chartRender={config}></canvas>
  </div>

  <div class="notice">
    Note: The star rank displayed on the graph should be used as an estimate only and may be inaccurate. Additionally, data for when a map was first ranked is unreliable for dates before April 5th.
  </div>
</main>

<style>
  .graph {
    height: 500px;
    margin-bottom: 15px;
  }

  .notice {
    text-align: center;
    padding: 7.5px;
    font-size: 15px;
    color: gray;
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