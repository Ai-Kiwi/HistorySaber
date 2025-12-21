<script>
    import Footer from "$lib/footer.svelte";
    import Navbar from "$lib/navbar.svelte";
    import Seo from "$lib/seo.svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

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


<div class="main-content">
    <div class="background-mascots">
        <img src="/images/left.webp" alt="" class="mascot left-mascot">
        <img src="/images/right.webp" alt="" class="mascot right-mascot">
    </div>
    <div class="center-text">
        <img src="/images/medium-logo.png" alt="" class="logo">
        <div class="logo-text">
            Documenting the past, one score at a time.
        </div>
    </div>
    <a class="open-leaderboard-button" href="/leaderboard">
        Open Leaderboards
    </a>
    <div class="foornote-text-section">
        <div class="foornote-text">
            <h3>About HistorySaber</h3>
            <p>
                Track the evolution of the leaderboard. HistorySaber archives player stats and rankings from ScoreSaber, letting you travel back in time to compare changes.
            </p>
            <p>
                <b>Player History:</b> View your scores on specific dates and visualize your growth journey.<br>
                <b>Map Data:</b> Access historical top scores and track changes in star ratings over time.<br>
                <b>Detailed Analytics:</b> Understand not just that your rank increased but when and why.<br>
            </p>
        </div>
        <div class="foornote-text">
            <h3>Data & Feedback</h3>
            <p>
                Note on Accuracy: While dates are pulled directly from ScoreSaber and are fully reliable, please note that some historical scores may be missing or overridden if they were beaten before our tracking began.
            </p>
            <p>
                Found a bug, want to request a feature, or have extra data to contribute? <br>
                Email me at : <a href="mailto:contact@aikiwi.dev">contact@aikiwi.dev</a>.
                <br> Happy browsing!
            </p>
        </div>
    </div>
    
</div>

<style>
    .background-mascots {
        width: 100vw;
        height: 100vh;
        z-index: -2;
        position: absolute;
        background: 
        radial-gradient(circle at right bottom,rgba(10, 45, 80, 1) 0%, rgba(15, 15, 15, 0.25) 50%, rgba(15, 15, 15, 0) 100%),
        radial-gradient(circle at left bottom,rgba(80, 10, 10, 1) 0%, rgba(15, 15, 15, 0.25) 50%, rgba(15, 15, 15, 0) 100%);
        background-blend-mode: color;
        
    }

    .mascot {
        position: absolute;
        top: 5%;
        z-index: 0;
        width: 30vw;
        padding: 3vw;
        animation: float 3s ease-in-out infinite;
        
    }

    .right-mascot {
        right: 0px;
        filter: drop-shadow(0px 0px 15px rgba(20, 90, 160, 0.25));
    }
    
    .left-mascot {
        left: 0px;
        animation-delay: -0.5s;
        filter: drop-shadow(0px 0px 15px rgba(160, 20, 20, 0.25));
    }

    @keyframes float {
      0% {
          transform: translateY(0);
      }

      50% {
          transform: translateY(-1%);
      }

      100% {
          transform: translateY(0);
      }
    }

    .main-content {
        width: 100vw;
        min-height: 100vh;
    }

    .open-leaderboard-button {
        border: 1px solid rgb(98, 156, 232);
        border-radius: 0px;
        padding: 15px 35px;
        background-color: transparent;
        border-radius: 99999px;
        color: white;
        font-size: 1.75vw;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-decoration: none;
    }

    .open-leaderboard-button::after {
        content: "";
        border-radius: 99999px;
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        animation: button-outline-glow 7s ease-in-out infinite;
        box-shadow: 
            0px 0px 15px rgb(79, 111, 253),
            0px 0px 25px rgb(27, 56, 183);
        z-index: 10;
    }


    @keyframes button-outline-glow {
      0% {
        opacity: 75%;
      }

      50% {
        opacity: 100%;
      }

      100% {
        opacity: 75%;
      }
    }

    .logo-text {
        color: rgb(230, 230, 230);
        font-size: 1.75vw;
        z-index: 3;
    }

    .center-text {
        z-index: 3;
        position: relative;
        width: 1fr;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        top: 22.5%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .logo {
        height: 7vw;
        animation: logoPulse 5s ease-in-out infinite;
    }

    @keyframes logoPulse {
      0%, 100% { 
        filter: drop-shadow(0px 0px 10px #ffffff00); 
        transform: scale(1)
      }
      50% { 
        filter: drop-shadow(0px 0px 10px #ffffff4d); 
        transform: scale(1.0)
      }
    }

    .foornote-text-section {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        max-width: 1750px;
        gap: 50px;
        width: calc(100vw - 600px);
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .foornote-text {
        border-radius: 15px;
        padding: 15px;
        text-align: center;
        width: 100%;
        font-size: clamp(1rem,1.2vw,1.3rem);
        box-shadow: 0px 0px 15px rgba(4, 4, 142, 0.549);
        background-color: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(15px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    p {
        margin: 0px;
        margin-bottom: clamp(5px,1.25vw,20px);
    }
    h3 {
        font-size: clamp(1.35rem,1.6vw,1.75rem);
        margin-top: 0px;
        margin-bottom: 5px;
    }
    @media (max-width: 1480px) {
        .foornote-text-section {
            flex-direction: column;
            width: calc(100vw - 400px);
        }
    }

    @media (max-width: 1000px) {
        .foornote-text-section {
            flex-direction: column;
            width: calc(100vw);
            padding: 0px;
            margin: 0px;
            gap: 15px;
        }
        .foornote-text {
            max-width: 1000px;
            font-size: clamp(0.05rem,2.5vw,1rem);
            margin: 0px;
        }

        .logo-text {
            font-size: 3.5vw;
        }

        .logo {
            width: 100vw;
            height: calc(100vw/6.328125);
        }

        .mascot {
            visibility: hidden;
        }

        .open-leaderboard-button {
            font-size: 5vw;
            text-wrap: nowrap;
        }
    }
</style>