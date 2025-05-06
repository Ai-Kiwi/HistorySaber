<script lang="ts">
  import type { PageProps } from './$types';
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
  let { data }: PageProps = $props();
  const system_info = data.info
  
</script>

<main>

  

  <!--<div class="logo">History Saber</div>-->

  <img src="big-logo.png" alt="Logo of the History Saber website" class="logo">
  
  <div class="description">
    <p>
      History Saber is your go-to platform for exploring historical Beat Saber rankings and player stats from
      <strong>ScoreSaber</strong>.
    </p>
  
    <p>
      Player rankings are tracked starting from <strong>March 10, 2025</strong>. Score tracking is now active, but only for <strong>active players</strong>. Note that we do not have historical scores from before tracking began. If a player had scores that were later overwritten or deleted, that older data is lost. Because of this, only the <strong>list of top plays on each day since tracking started</strong> (and since the player became active) can be considered accurate.
    </p>
  
    <p>
      <strong>Inactive players</strong> currently have no score data downloaded at all. I'm looking into whether this can be improved in the future.
    </p>
  
    <p>
      Got older data or want to help improve the site? Feel free to reach out!
    </p>
  
    <p>
      For data downloads or feature requests, contact us at
      <a href="mailto:contact@aikiwi.dev">contact@aikiwi.dev</a>.
    </p>
  
    <p>
      Happy browsing!
    </p>
  </div>

  <div class="info-container">
    <div class="info-box">
      <div class="info-value">{Number(data.info.player_history_count).toLocaleString()}</div>
      <div class="info-label">Total Player Records</div>
    </div>
    <div class="info-box">
      <div class="info-value">{data.info.player_history_size}</div>
      <div class="info-label">Player Data Size</div>
    </div>
    <div class="info-box">
      <div class="info-value">{Number(data.info.player_scores_count).toLocaleString()}</div>
      <div class="info-label">Total Score Records</div>
    </div>
    <div class="info-box">
      <div class="info-value">{data.info.player_scores_size}</div>
      <div class="info-label">Score Data Size</div>
    </div>
  </div>

</main>





<style>
  .info-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;  /* Centers the items vertically */
    gap: 20px;  /* Space between the boxes */
    max-width: 1000px;
    width: 100%;
    align-self: center;
    flex-wrap: wrap;
  }

  .info-box {
    padding: 20px;
    display: flex;
    flex: 1 1 0px;
    flex-direction: column;
    justify-content: space-evenly;  /* Center content vertically */
    align-items: center;  /* Center content horizontally */
    text-align: center;
  }

  .info-value {
    font-size: 32px;  /* Large numbers */
    font-weight: bold;
    color: #f1f1f1;  /* Light grey color for values */
    margin-bottom: 10px;  /* Space between value and label */
  }

  .info-label {
    font-size: 14px;
    color: #bbb;  /* Lighter grey for the label */
  }

  .logo {
    max-width: 100%;
    max-height: 100%;
    font-weight: bold;
    color: #1abc9c;
    white-space: nowrap;
    text-align: center;
    margin-bottom: 35px;
    font-size: clamp(2rem, 12vw, 8rem);
  }


</style>