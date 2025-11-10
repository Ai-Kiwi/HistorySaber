<script lang="ts">
    import { page } from '$app/state';
    import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import Seo from '$lib/seo.svelte';
    import type { Score } from '$lib/types.js';
    import PastTopScoresGraph from '../../../map/[leaderboard_id]/graphs/PastTopScoresGraph.svelte';
    const { data } = $props()

    let compact = page.url.searchParams.get('compact') === 'true';

</script>

<Seo
  title="{data.player_data.name}'s Score Progress - {data.map_data.song_name} ({data.map_data.difficulty}) mapped by {data.map_data.level_author_name} - HistorySaber"
  description="Track {data.player_data.name}'s score improvements over time on {data.map_data.song_name} ({data.map_data.difficulty}) mapped by {data.map_data.level_author_name} on HistorySaber."
  url="http://historysaber.com/score-improvement/{data.map_data.leaderboard_id}/{data.player_data.player_id}"
  image="https://historysaber.com/og-image/user-map/{data.player_data.player_id}/{data.map_data.leaderboard_id}"
/>

{#if compact == true}
  <PastTopScoresGraph scores={data.scores}></PastTopScoresGraph>
{:else}
<main>
    <h1><span class="name">{data.player_data.name}</span> playing <span class="name">{data.map_data.song_name}</span> on <span class="name">{data.map_data.difficultyraw}</span> top score history</h1>
  <OldScoresMissingWarning NOTICE_ID="user-score-improvement-missing-scores"></OldScoresMissingWarning>
  <PastTopScoresGraph scores={data.scores}></PastTopScoresGraph>

  <h2>Scores</h2>

  {#if data.scores.length > 0}
    <div class="score-list">
      {#each data.scores as score}
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
{/if}

<style>

  h1, h2, h3 {
    text-align: center;
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
    main {
      font-size: clamp(0px,3vw,1.5rem);
    }
  }
</style>