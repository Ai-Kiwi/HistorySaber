<script lang="ts">    
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
  import UserBar from '$lib/userbar.svelte'
  import { goto, invalidate } from '$app/navigation';
  import { page } from '$app/state';
  import type { LeaderboardData, LeaderboardSelections, UserType } from '$lib/types';
  import { onMount } from 'svelte';
  import { formatDate, haveSameValues } from '$lib/utils';
  import { Circle } from 'svelte-loading-spinners';
  import Multiselect from 'svelte-multiselect';
  import { writable } from 'svelte/store';
    import { countries } from '$lib/userData';

  let selectable_countries = [];
  for (const key in countries) {
    if (Object.prototype.hasOwnProperty.call(countries, key)) {
      selectable_countries.push(countries[key as keyof typeof countries].name);
    }
  }
  let selectedCountries = $state([]);

  let current_data_selection: LeaderboardSelections = {
    country: [],
    page: 1,
    date_moved_forward: 0,
  }
  let loading_new_data = $state(false);
  let CurrentSelectedDaysSinceStart: number = $state(0);
  let current_page_selected: number = $state(1);
  
  function date_from_time_since_start(days: number) {
    let date = new Date()
    date.setTime(new Date(startDate).getTime() + (days * 24 * 60 * 60 * 1000 ))
    return date 
  }


  const startDate: Date = new Date('2025-03-10');
  let currentDate = $derived.by(() => {
    return date_from_time_since_start(CurrentSelectedDaysSinceStart)
  });
  let current_user_data : UserType[] = $state([]);

  let new_selections: LeaderboardSelections = $derived.by(() => {
    return { 
      country: [...selectedCountries],
      page: current_page_selected,
      date_moved_forward: CurrentSelectedDaysSinceStart,
    };
  });

  // Set the reference start date
  let dayRange: number = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));



  async function fetchData() {
    if (loading_new_data == true) { 
      return
    }
    loading_new_data = true;
    console.log("fetching leaderboard data")
    let RequestSelection : LeaderboardSelections = {
      country: [...new_selections.country], //create copy
      date_moved_forward: new_selections.date_moved_forward,
      page: new_selections.page
    }
    try{
      //run request
      let converted_country: string[] = []
      RequestSelection.country.forEach((country) => {
        for (var key in countries) {
          if (countries[key as keyof typeof countries].name == country) {
            converted_country.push(key)
          }
        }
      })

      const params = new URLSearchParams({ page: RequestSelection.page.toString(), country: converted_country.toString(), date : formatDate(date_from_time_since_start(RequestSelection.date_moved_forward)) });
      const res = await fetch(`/api/leaderboard?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch leaderboard data:', res.statusText);
        loading_new_data = false;
        return;
      }

      const user_data = await res.json();
      current_data_selection.country = [...RequestSelection.country] //clone array
      current_data_selection.date_moved_forward = RequestSelection.date_moved_forward
      current_data_selection.page = RequestSelection.page
      current_user_data = user_data
    }catch(e){
      console.log(`failed fetching data ${e}`)
    }
  
    loading_new_data = false;
    if (current_data_selection.date_moved_forward != new_selections.date_moved_forward || current_data_selection.page != new_selections.page || !haveSameValues(current_data_selection.country, new_selections.country)) {
      console.log("already updated leaderboards, refetching data")
      setTimeout(fetchData, 100);
    }
  }

  CurrentSelectedDaysSinceStart = dayRange;

  onMount(() => {
    fetchData()
  })
</script>



<main>

    <h1>Scoresaber past leaderboard</h1>
    <span class="date_text">Date: {formatDate(currentDate)}</span>
    <input type="range" min="0" max="{dayRange.toString()}" bind:value={CurrentSelectedDaysSinceStart} on:input={fetchData} class="date_slider">
    
    <div class="pagination">
      <button class="page-btn" id="prev-btn" on:click={()=>{current_page_selected -= 1; fetchData(); if (current_page_selected < 1) {current_page_selected = 1}}}>←</button>
      <input class="page-input" type="number" min="1" id="page-input" bind:value={current_page_selected} on:input={fetchData}>
      <button class="page-btn" id="next-btn" on:click={()=>{current_page_selected += 1; fetchData()}}>→</button>
      {#if loading_new_data == true}
        <Circle size="40" color="#F8F8F8" unit="px" duration="0.4s"/>
      {/if}
      <Multiselect --sms-options-bg="black"
        bind:value={selectedCountries}
        options={selectable_countries}
        placeholder="Choose countries"
      />
    </div>
    {#if current_user_data.length > 0}
      <div class="user-list">
        {#each current_user_data as user}
          <UserBar user={user}></UserBar>
        {/each}
      </div>
    {:else}
    <h2>
      No users to display on this page
    </h2>
    {/if}
  
  <div class="pagination">
    <button class="page-btn" id="prev-btn" on:click={()=>{current_page_selected -= 1; fetchData(); if (current_page_selected < 1) {current_page_selected = 1}}}>←</button>
    <input class="page-input" type="number" min="1" id="page-input" bind:value={current_page_selected} on:input={fetchData}>
    <button class="page-btn" id="next-btn" on:click={()=>{current_page_selected += 1; fetchData()}}>→</button>
  </div>
</main>



<style>
  .user-list{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input[type=number] {
    -webkit-appearance: textfield;
    -moz-appearance:    textfield;
    appearance:         textfield;
    height: 30px;
  }

  /* Chrome, Safari, Edge */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  h1 {
    text-align: center;
    font-size: 40px;
  }

  h2 {
    text-align: center;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px auto;
  }

  .page-btn {
    background-color: #444;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
  }

  .page-btn:hover {
    background-color: #666;
  }

  .page-input {
    width: 60px;
    padding: 5px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: #222;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }


  .date_slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: rgb(50, 50, 50);
    border-radius: 10px;
    max-width: calc(100% - 30px);
    margin: 15px auto;
    display: block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .date_slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: rgb(125, 125, 125);
    cursor: pointer;
  }

  .date_slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgb(125, 125, 125);;
    cursor: pointer;
  }

  .date_text {
    font-size: 20px;
    margin: 15px;
    font-style: normal;
    font-weight: bold;
  }



</style>