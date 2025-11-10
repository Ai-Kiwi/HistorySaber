<script lang="ts">    
  import Pagination from '$lib/pagination.svelte';
  import ScoreDisplay from '$lib/scoreDisplay.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import Seo from '$lib/seo.svelte';
  import type { Score } from '$lib/types';
  import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
  
  let hasLoaded = false
  let loading_scores = $state(false)
  let loading_outdated = false
  let score_page_selected = $state(1)
  let player_scores: Score[]  = $state([])
  let player_usernames: String[] = $state([])
  let score_page_size = $state(Number(page.url.searchParams.get('score_count')) || 8)

  async function fetchScores() {
    if (loading_scores == true || hasLoaded == false) {
      loading_outdated = true
      return
    }
    loading_scores = true;

    try{
      const params = new URLSearchParams({ 
        page: score_page_selected.toString(), 
        page_size: score_page_size.toString(),
      });
      const res = await fetch(`/api/all_scores?${params.toString()}`);
      if (!res.ok) {
        console.error('Failed to fetch player score data:', res.statusText);
        loading_scores = false;
        return;
      }

      const score_data = await res.json();
      player_scores = score_data.scores
      player_usernames = score_data.usernames

    }catch(e){
      console.log(`failed fetching data ${e}`)
    }


    loading_scores = false
    if (loading_outdated == true) {
      loading_outdated = false
      setTimeout(fetchScores, 100);
    }
  }

  onMount(() => {
    hasLoaded = true
    fetchScores()
  })

</script>
  
<main>

  <h1>All Scores</h1>


  <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetchScores()}} pageSizeChanged={(size : number) => {score_page_size = size; fetchScores()}} current_page_size={score_page_size.toString()}></Pagination>

  <OldScoresMissingWarning NOTICE_ID="all-scores"></OldScoresMissingWarning>

  <div class="{loading_scores ? 'shimmer' : ''}">
    {#if player_scores.length > 0}
    <div class="score-list">
      {#each player_scores as score, i}
        {#if i < player_scores.length}
          {#if player_usernames[i] != player_usernames[i-1]}
            <h3>{player_usernames[i]}</h3>
          {/if}
        {:else}
          <h3>{player_usernames[i]}</h3>
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
  </div>


  <Pagination current_page_selected={score_page_selected} pageChanged={(page: number) => {score_page_selected = page; fetchScores()}} pageSizeChanged={(size : number) => {score_page_size = size; fetchScores()}} current_page_size={score_page_size.toString()}></Pagination>

  <div class="notice">
    If you are on this page looking for something, most likely you should instead contact me <br>
    This page was not designed by be used for anything to practical, if you are needing to compare data as broad as between players please contact me. 
    You can reach me by email at contact@aikiwi.dev. It doesn't matter how small I am happy to help.
  </div>

</main>

<Seo
  title="All Scores - HistorySaber"
  description="View every single score that HistorySaber has saved."
  url="http://historysaber.com/all-scores"
/>

<style>
  h2, h1 {
    text-align: center;
  }

  .score-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  h1, h2, h3 {
    text-align: center;
  }
  h3 {
    margin-bottom: 0px;
  }

  .notice {
    text-align: center;
    padding: 7.5px;
    font-size: 0.9375rem;
    color: gray;
  }

  @media (max-width: 480px) {
    .notice {
      font-size: 0.625rem;
      padding: 5px;
    }
  }

</style>


