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
    import Seo from '$lib/seo.svelte';
  

  </script>
  
<Seo
  title="Credits - HistorySaber"
  description="Meet the team and contributors behind HistorySaber who made it possible."
  url="https://historysaber.com/leaderboard"
/>
  
<main>
    <h1>
        HistorySaber was made possible thanks to the following people
    </h1>

    <div class="feedback-people">
        <a href="https://aikiwi.dev" class="person-section">
            <img class="person-icon" src="credits/ai_kiwi.jpg" alt="Logo for Ai Kiwi">
            <span class="person-name">Ai Kiwi</span>
            <span class="person-credits">
                 - Programming <br>
                 - Development <br>
            </span>
        </a>
        <a href="https://youtube.com/@floffy_vr" class="person-section">
            <img class="person-icon" src="credits/floffy.jpg" alt="Logo for Floffy">
            <span class="person-name">Floffy</span>
            <span class="person-credits">
                - Feedback <br>
                - Ideas <br>
                - Overworking me <br>
            </span>
        </a>
        <a href="https://bckl.gg/iFj0" class="person-section">
            <img class="person-icon" src="https://backloggd-s3.b-cdn.net/i82s4w63wwtcoz385x9evl0t7zy4" alt="Logo for Kale.Is.Bean">
            <span class="person-name">Kale.Is.Bean</span>
            <span class="person-credits">
                - Visuals (Logo) <br>
            </span>
        </a>
    </div>

    <h2>Additional special thanks to the technologies, communities, and individuals that made this possible</h2>

    <div class="tech-credits">
        <p><strong>Built with:</strong> Svelte</p>
        <p><strong>Database:</strong> PostgreSQL, for powering the underlying database technology</p>
        <p><strong>API Source:</strong> ScoreSaber, for providing the essential leaderboard data</p>
        <p><strong>Thanks to the Beat Saber community:</strong> Competitive players, contributors, and enthusiasts for their dedication to the game</p>
        <p><strong>Thanks to Beat Saber:</strong> For creating the game that inspired this project</p>

    </div>
    
</main>
  
  
  
<style>
    .feedback-people {
        display: flex;
        margin: 0px 15px 50px 15px;
        flex-wrap: wrap;
    }

    .person-name {
        margin: 0px auto;
        font-size: 2rem;
        flex: 0 0 auto;
        height: 50px;
        font-family: 'Rajdhani', sans-serif;
        font-weight: bold;
        text-decoration: none;
        color: white;
    }

    .person-icon {
        width: 120px;
        border-radius: 9999px;
        margin: 15px 15px 5px 15px;
    }

    .person-credits {
        width: 100%;
        margin: 0px 15px;
        color: rgb(225, 225, 225);
    }

    .person-section {
        width: 150px;
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        margin: 2.5px;
    }

    a { text-decoration: none; color: white; }

    .tech-credits {
        margin: 0 15px 50px 15px;
        font-family: 'Rajdhani', sans-serif;
        color: rgb(225, 225, 225);
        font-size: 1.1rem;
    }
    .tech-credits p {
        margin: 5px 0;
    }

</style>