<script lang="ts">    
  import { Chart } from 'chart.js';
  import type { PageProps } from './$types';
  import { formatDate } from '$lib/utils';
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
  let { data }: PageProps = $props();
 
  const chartRender = (node: any, options: any) => {
    console.log('Action')
    console.log(node)
    console.log(options)

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

</script>
  
<main>
  <div class="basic-info-row">
    <img src="https://cdn.scoresaber.com/avatars/{data.playerData.player_id}.jpg" alt="Profile picture of {data.playerData.name}" class="profile-picture" aria-hidden="true">

    <div class="username">{user_data.name}</div>
  </div>


    <canvas use:chartRender={config}></canvas>



  <slot name="below" />


</main>

<style>
  .profile-picture{
    height: 128px;
    border-radius: 9999px;
    margin-left: 5px;
    font-size: 0px;
  }

  .basic-info-row {
    height: 128px;
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

  }

  .username {
    margin: auto 15px;
    font-size: 50px;
    font-weight: bolder;
    align-self: center;
  }


</style>


