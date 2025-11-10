<script lang="ts">
    import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import { slide } from 'svelte/transition';
    import PastTopScoresGraph from './graphs/PastTopScoresGraph.svelte';
    import StarRankGraph from './graphs/StarRankGraph.svelte';
    import Seo from '$lib/seo.svelte';
    import { parseLevelDifficulties } from '$lib/utils';
    /** @type {import('./$types').PageProps} */
    let { data } = $props();

  let star_rank_history_shown = $state(true)
  let top_score_history_shown = $state(false)
  let dif_name = parseLevelDifficulties(data.map_data.difficulty)

</script>

<Seo
  title="{data.map_data.song_name} ({data.map_data.difficulty}) mapped by {data.map_data.level_author_name} - Full History & Stats - HistorySaber"
  description="Explore the full history for {data.map_data.song_name} ({data.map_data.difficulty}) by {data.map_data.level_author_name} — including top scores, rank trends, player progress, and more — all in one place on HistorySaber."
  url="https://historysaber.com/map/{data.map_data.leaderboard_id}"
  image="https://historysaber.com/og-image/map/{data.map_data.map_hash}"
/>

<main>
  <!--Title and info for level-->
  <div class="top-information">
    <div class="title-and-icon">
        <div class="map-icon-parent">
            <img class="map-icon" src="https://cdn.scoresaber.com/covers/{data.map_data.map_hash}.png" alt="Map Image">
            <div class="map-star-text">
                {#if data.map_data.stars != null && data.map_data.stars != 0}
                    {data.map_data.stars}☆
                {:else}
                    {dif_name}
                {/if}

            </div>
        </div>
        <div class="song-info-text">
            <span class="song-name">{data.map_data.song_name}</span>
            <span class="sub-song-name">{data.map_data.song_sub_name}</span>
            <span class="song-author-name">Song by {data.map_data.song_author_name}</span>
            <span class="level-author-name">Mapped by {data.map_data.level_author_name}</span>
        </div>
    </div>
  </div>
  
  <!--General Info About Map-->
  <div class="song-info-text">
    <span>Max score : {data.map_data.maxscore}</span>
    <span>Map hash : {data.map_data.map_hash}</span>
    <span>Difficulty raw : {data.map_data.difficultyraw}</span>
    <span>Leaderboard id : {data.map_data.leaderboard_id}</span>
  </div>


  {#if data.other_difficulties.length > 1}
    <div class="clickable-buttons" transition:slide={{ duration: 500 }}>
      {#each data.other_difficulties as map_dif}
        <a href="/map/{map_dif.leaderboard_id}" class="clickable-button" data-sveltekit-reload>
          {parseLevelDifficulties(map_dif.difficulty)}
          {#if map_dif.stars != null && map_dif.stars != 0}
              ({map_dif.stars}☆)
          {/if}
        </a>
      {/each}
    </div>
  {/if}







  <!--Star Rank History-->
  {#if data.map_data.stars}
    <button onclick="{()=>{star_rank_history_shown = !star_rank_history_shown}}" aria-label="Show top score section" class="section-toggle {star_rank_history_shown ? "enabled-section" : ""}">
      Star History
    </button>
    {#if star_rank_history_shown}
      <div transition:slide={{ duration: 500 }}>
        <OldScoresMissingWarning NOTICE_ID="leaderboard-global-star-history"></OldScoresMissingWarning>
        <StarRankGraph ranks={data.ranks}></StarRankGraph>
      </div>
    {/if}
  {/if}


  <!--Top Score History-->
  <button onclick="{()=>{top_score_history_shown = !top_score_history_shown}}" aria-label="Show top score section" class="section-toggle {top_score_history_shown ? "enabled-section" : ""}">
    Top Score History
  </button>
  {#if top_score_history_shown}
    <div transition:slide={{ duration: 500 }}>
      <OldScoresMissingWarning NOTICE_ID="leaderboard-global-score-improvement"></OldScoresMissingWarning>
      <PastTopScoresGraph scores={data.scores}></PastTopScoresGraph>
      <div class="score-list">
        {#each [...data.scores] as score, i}
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
    </div>

  {/if}




</main>

<style>
    .clickable-button {
        background-color: rgba(50, 50, 50, 0.25);
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        text-align: center;
        text-decoration: none;
        font-size: 0.9375rem;
        color: white;
        font-weight: bold;
        margin: 5px 2.5px;
        transition: 0.25s ease;
    }

    .clickable-button:hover {
        background-color: rgba(150, 150, 150, 0.25);
        transition: 0.25s ease;
    }

    .clickable-buttons {
      margin-top: 8px;
      display: flex;
    }


  .map-icon {
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }

  .map-icon-parent {
    margin: 16px;
    width: 125px;
    height: 125px;
    position: relative;
    text-decoration: none;
    flex-shrink: 0;
  }


  .map-star-text {
    position: absolute;
    padding: 2.5px 5px;
    font-weight: bold;
    border-radius: 15px;
    bottom: 0px;
    left: 0px;
    z-index: 10;
    background-color: blue;
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
  }

  .title-and-icon {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  .song-name {
    font-size: 2rem;
    font-weight: bold;
  }

  .sub-song-name {
    font-size: 1rem;
  }

  .song-author-name {
    font-size: 1rem;
  }

  .song-info-text {
    display: flex;
    flex-direction: column;
  }

  .level-author-name {
    font-size: 1rem;
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

  .section-toggle {
    width: 100%;
    background-color: rgba(25, 25, 25, 0.9);
    border: 2px rgba(25, 25, 25,0.5) solid;
    border-radius: 16px;
    height: 65px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-top: 25px;
  }

  .enabled-section {
    background-color: transparent;
    border: 0px;

  }
</style>