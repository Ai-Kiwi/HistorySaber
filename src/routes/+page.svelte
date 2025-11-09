<script lang="ts">
  import type { PageProps } from './$types';
  import Navbar from '$lib/navbar.svelte';
  import Footer from '$lib/footer.svelte'
    import { formatNumberShort } from '$lib/utils';
    import Seo from '$lib/seo.svelte';
  let { data }: PageProps = $props();
  const system_info = data.info
  
</script>

<svelte:head>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HistorySaber",
      "url": "https://historysaber.com",
      "logo": "https://historysaber.com/images/big-mini-logo.png",
      "sameAs": [
        "https://github.com/Ai-Kiwi/HistorySaber"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Contact Developer",
        "email": "contact@aikiwi.dev"
      }
    }
  </script>
</svelte:head>

<Seo
  title="HistorySaber - Track Beat Saber Scores and Player Stats"
  description="HistorySaber.com is your go-to platform for tracking and analyzing historical Beat Saber scores, rankings, and player stats from ScoreSaber. HistorySaber lets you explore past performances, monitor player progress over time, and dive deep into the competitive Beat Saber scene with detailed insights and country-based leaderboards. Whether you're a casual rhythm gamer or a competitive player, HistorySaber helps you stay informed and ahead"
  url="https://historysaber.com/"
/>

<main>

  

  <!--<div class="logo">HistorySaber</div>-->

  <img src="/images/medium-logo.png" alt="HistorySaber website logo" class="logo">
  
  <div class="description">
    <p>
      HistorySaber is your go-to platform for exploring historical Beat Saber rankings and player stats from
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
      <div class="info-value">{formatNumberShort(Number(data.info.player_history_count))}</div>
      <div class="info-label">Total Player Records</div>
    </div>
    <div class="info-box">
      <div class="info-value">{data.info.player_history_size}</div>
      <div class="info-label">Player Data Size</div>
    </div>
    <div class="info-box-seperator"></div>
    <div class="info-box">
      <div class="info-value">{formatNumberShort(Number(data.info.player_scores_count))}</div>
      <div class="info-label">Total Score Records</div>
    </div>
    <div class="info-box">
      <div class="info-value">{data.info.player_scores_size}</div>
      <div class="info-label">Score Data Size</div>
    </div>
    <div class="info-box-seperator"></div>
    <div class="info-box">
      <div class="info-value">{formatNumberShort(data.info.player_history_unique_players)}</div>
      <div class="info-label">Players Tracked</div>
    </div>
    
  </div>

</main>





<style>

  .info-box-seperator {
    height: 50px;
    width: 1px;
    background-color: rgb(83, 83, 83);
    border-radius: 25px;
  }
  .info-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;  /* Centers the items vertically */
    gap: 20px;  /* Space between the boxes */
    max-width: 1fr;
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
    transition: filter 0.3s ease, scale 0.3s cubic-bezier(0.6, -0.8, 0.2, 1.5);
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

  @media (max-width: 950px) {
    .info-box-seperator {
      width: 100%;
      height: 0px;
    }
    .info-container {
      gap: 0px;
      margin-top: 50px;
      margin-bottom: 50px;
    }
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
    aspect-ratio: 3240 / 512;
    animation: logoPulse 5s ease-in-out infinite;
    filter: drop-shadow(0px 0px 0px #ffffff);
  }

  @keyframes logoPulse {
    0%, 100% { 
      filter: drop-shadow(0px 0px 15px #ffffff00); 
      transform: scale(1)
    }
    50% { 
      filter: drop-shadow(0px 0px 15px #ffffff82); 
      transform: scale(1.01)
    }
  }

  .info-box:hover {
    filter: drop-shadow(0px 0px 50px #ffffff88) drop-shadow(0px 0px 15px #ffffff88);
    scale: 1.25;
  }

  @media (max-width: 480px) {
    .logo {
      display: none;
    }
    
    main {
      font-size: 14px;
    }

    .info-box {
      padding: 5px;
    }

    .info-value {
      font-size: 25px;
    }

    .info-container {
      gap: 0px;
    }
    .info-label {
      font-size: 12px;
    }
    .info-box-seperator {
      height: 15px;
      background-color: transparent;
    }

  }


</style>