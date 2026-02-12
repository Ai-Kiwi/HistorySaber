<script lang="ts">
    import Background from "$lib/background.svelte";
    import MapLeaderboardDisplay from "$lib/mapLeaderboardDisplay.svelte";
    import Pagination from "$lib/pagination.svelte";
    import Seo from "$lib/seo.svelte";
    import type { UserType } from "$lib/types";
    import Userbar from "$lib/userbar.svelte";
    import UserBarLabels from "$lib/userBarLabels.svelte";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";

  let loading_scores = $state(false)
  let loading_outdated = false
  let user_text_searching = $state("")
  let user_page_selected = $state(1)
  let search_results: any[]  = $state([])
  let search_content = $state("user");

  async function fetchSearch() {
    if (loading_scores == true) {
      loading_outdated = true
      return
    }
    loading_scores = true;

    try{
      const params = new URLSearchParams({ 
        page: user_page_selected.toString(), 
        text: user_text_searching, 
        content: search_content,
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch user search data:', res.statusText);
        loading_scores = false;
        return;
      }

      const result_data = await res.json();
      console.log(search_results)
      search_results = result_data

    }catch(e){
      console.log(`failed fetching data ${e}`)
    }


    loading_scores = false
    if (loading_outdated == true) {
      loading_outdated = false
      setTimeout(fetchSearch, 100);
    }
  }
</script>

<Seo
  title="User Search - HistorySaber"
  description="Search for Beat Saber players and explore their historical scores, rankings, and stats on HistorySaber."
  url="https://historysaber.com/search"
/>

<Background></Background>

<main class="global-main-content-area-window">
    <h1 class="page-header">Search</h1>

    <input class="search-text" placeholder="username" bind:value={user_text_searching} on:input={fetchSearch}>

    <div class="sort-select-section">
      <button class="{search_content == "user" ? "sort-select-selected" : "sort-select"}" on:click={()=>{search_content="user"; search_results=[]; fetchSearch()}}>Users</button>
      <button class="{search_content == "map" ? "sort-select-selected" : "sort-select"}" on:click={()=>{search_content="map"; search_results=[]; fetchSearch()}}>Maps</button>
    </div>

    <Pagination current_page_selected={user_page_selected} pageChanged={(page: number) => {user_page_selected = page; fetchSearch()}} pageSizeChanged={()=>{}} current_page_size={""}></Pagination>


    <div class="{loading_scores ? 'shimmer' : ''}">
      {#if search_results.length > 0}
        {#if search_content == "user"}
          <div class="search-list-users">
            <UserBarLabels></UserBarLabels>
            {#each search_results as user, i (user.player_id)}
              <label animate:flip={{ duration: 500 }}>
                <Userbar relative_number={i + 1 + ((user_page_selected - 1) * 50)} user={user}></Userbar>
              </label>
            {/each}
          </div>
        {:else if search_content == "map"}
          <div class="search-list-maps">
            {#each search_results as map, i (map.leaderboard_id)}
              <label animate:flip={{ duration: 500 }}>
                <MapLeaderboardDisplay data={map}></MapLeaderboardDisplay>
              </label>
            {/each}
          </div>
        {:else}
          <h2>
            Not a Valid search content selected
          </h2>
        {/if}
      {:else}
        <h2>
          No search results
        </h2>
      {/if}
      </div>


      <Pagination current_page_selected={user_page_selected} pageChanged={(page: number) => {user_page_selected = page; fetchSearch()}} pageSizeChanged={()=>{}} current_page_size={""}></Pagination>

</main>

<style>
  main {
    margin-top: 80px;
    margin-bottom: 100px;
    max-width: 900px;
    padding: 25px;
    width: 100%;
  }

  .search-list-users {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .search-list-maps {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
  }

  @media (max-width: 800px) {
    .search-list-maps {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  h1 {
      text-align: center;
      font-size: 2.5rem;
  }
  h2 {
      text-align: center;
  }

  .search-text {
    background-color: black;
    margin: 15px;
    border-radius: 15px;
    width: calc(100% - 25px);
    border: 0px;
    color: white;
    padding: 5px;
    font-size: 1.25rem;
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }
</style>