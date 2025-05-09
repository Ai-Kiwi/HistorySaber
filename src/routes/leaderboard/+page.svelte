<script lang="ts">    
  import UserBar from '$lib/userbar.svelte'
  import type { LeaderboardData, LeaderboardSelections, UserType } from '$lib/types';
  import { onMount } from 'svelte';
  import { formatDate, haveSameValues } from '$lib/utils';
  import Multiselect from 'svelte-multiselect';
  import { countries } from '$lib/userData';
  import DateSelect from '$lib/dateSelect.svelte';
  import Pagination from '$lib/pagination.svelte'
  import { page } from '$app/stores';

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
  let CurrentSelectedDaysSinceStart = $state(0);
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
    //const params = new URLSearchParams(window.location.search);
    //params.set("page", current_page_selected.toString());
    //if (selectedCountries.length > 0) {
    //  params.set("countries", selectedCountries.toString());
    //}
    //params.set("date", date_from_time_since_start(CurrentSelectedDaysSinceStart).toString());
    //const newUrl = `${window.location.pathname}?${params.toString()}`;
    //window.history.pushState({}, '', newUrl);
    return { 
      country: [...selectedCountries],
      page: current_page_selected,
      date_moved_forward: CurrentSelectedDaysSinceStart,
    };
  });
  



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

  function dateUpdate(new_date : number) {
    CurrentSelectedDaysSinceStart = new_date;
    fetchData()
  }

  onMount(() => {
    fetchData()
  })
</script>



<main>

    <h1>Scoresaber past leaderboard</h1>
    <h2 class="date_text">{currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
    <DateSelect 
      startDate={startDate} 
      valueUpdate={dateUpdate}
    ></DateSelect>
    
    <Pagination 
      current_page_selected={current_page_selected} 
      pageChanged={(page) => { current_page_selected = page; fetchData(); }}
    ></Pagination>
      <div class="country-select">
        <Multiselect style="--sms-options-bg: black; border-radius: 10px"
        on:change={fetchData}
        bind:value={selectedCountries}
        options={selectable_countries}
        placeholder="Choose countries"
      />
      </div>

    <div class="{loading_new_data ? 'shimmer' : ''}">
      {#if current_user_data.length > 0}
      <div class="user-list">
        {#each current_user_data as user}
          {#key user.player_id}
            <UserBar user={user}></UserBar>
          {/key}
        {/each}
      </div>
    {:else}
    <h2>
      No users to display on this page
    </h2>
    {/if}
    </div>


  
    <Pagination 
      current_page_selected={current_page_selected} 
      pageChanged={(page) => { current_page_selected = page; fetchData(); }}
    ></Pagination>
</main>



<style>
  .user-list{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  h1 {
    text-align: center;
    font-size: 40px;
  }

  h2 {
    text-align: center;
  }

  .country-select {
    margin: 15px;
    border-radius: 15px;
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
</style>