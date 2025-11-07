<script lang="ts">
    import Pagination from "$lib/pagination.svelte";
    import type { UserType } from "$lib/types";
    import Userbar from "$lib/userbar.svelte";
    import UserBarLabels from "$lib/userBarLabels.svelte";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";

  let loading_scores = $state(false)
  let loading_outdated = false
  let user_text_searching = $state("")
  let user_page_selected = $state(1)
  let search_users: UserType[]  = $state([])

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
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch user search data:', res.statusText);
        loading_scores = false;
        return;
      }

      const user_data = await res.json();
      search_users = user_data

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

<main>
    <h1>Search</h1>

    <input class="search-text" placeholder="username" bind:value={user_text_searching} on:input={fetchSearch}>

    <Pagination current_page_selected={user_page_selected} pageChanged={(page: number) => {user_page_selected = page; fetchSearch()}} pageSizeChanged={()=>{}} current_page_size={""}></Pagination>


    <div class="{loading_scores ? 'shimmer' : ''}">
        {#if search_users.length > 0}
        <div class="search-list">
        <UserBarLabels></UserBarLabels>
          {#each search_users as user (user.player_id)}
            <label animate:flip={{ duration: 500 }}>
              <Userbar user={user}></Userbar>
            </label>
          {/each}
        </div>
      {:else}
      <h2>
        No search results
      </h2>
      {/if}
      </div>


      <Pagination current_page_selected={user_page_selected} pageChanged={(page: number) => {user_page_selected = page; fetchSearch()}} pageSizeChanged={()=>{}} current_page_size={""}></Pagination>

</main>

<style>
    .search-list {
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

  .search-text {
    background-color: black;
    margin: 15px;
    border-radius: 15px;
    width: 100%;
    border: 0px;
    color: white;
    padding: 5px;
    font-size: 20px;
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
</style>