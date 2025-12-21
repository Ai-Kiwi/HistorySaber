<script lang="ts">    
    import Pagination from '$lib/pagination.svelte';
    import ScoreDisplay from '$lib/scoreDisplay.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import Seo from '$lib/seo.svelte';
    import type { Score } from '$lib/types';
    import OldScoresMissingWarning from '$lib/oldScoresMissingWarning.svelte';
    import Background from '$lib/background.svelte';
</script>

<Seo
  title="About - HistorySaber"
  description="information About HistorySaber."
  url="https://historysaber.com/about"
/>

<Background></Background>

<main class="global-main-content-area-window content">
    <h1>About</h1>
    <p>
        HistorySaber is your go-to platform for exploring historical Beat Saber rankings and player stats from ScoreSaber. HistorySaber keeps track of past leaderboard positions, allowing you to view what the leaderboard looks like in the past and compare changes.
    </p>
    <h2>What HistorySaber Offers</h2>
    <ul>
        <li><b>Historical Leaderboards:</b> Travel back to any date to see the global and regional rankings as they stood.</li>
        <li><b>Complete Score Archiving:</b> We track every score for every active player. This lets you view your top plays from specific dates and see exactly how your skill has improved over time.</li>
        <li><b>Map Evolution:</b> View the "Top Score" history for specific maps and track how star ratings (★) have changed through different ranking phases.</li>
        <li><b>Growth Analytics:</b> By looking at the when and why of your progress, you can identify which maps triggered your largest rank jumps.</li>
    </ul>
    <h2>Data Accuracy & Tracking Log</h2>
    <p>
        Because we rely on snapshots of ScoreSaber data, there unfortunate limitations to information being gathered:
    </p>
    <ul>
        <li><b>Tracking Milestone:</b> Comprehensive player rankings and score tracking began on March 10, 2025.</li>
        <li><b>Inactive Players:</b> We do store data for inactive players; however, if a player has not been active since our tracking started, their profile will appear empty.</li>
        <li><b>Map Star History:</b> Historical star ratings (★) are only available for the period since we recently began gathering map star data, so information on older rating changes may be limited. This may be improved in the future.</li>
        <li><b>Map Top Scores:</b> Please note that top score history for maps may contain gaps or missing entries if those scores were surpassed or deleted before our tracking system could archive them.</li>
        <li><b>Overwritten Scores:</b> If a player's score was overwritten or deleted on ScoreSaber before we began tracking them, that specific data is lost.</li>
        <li><b>Reliability:</b> Dates are pulled directly from ScoreSaber and are 100% reliable. While we strive for completeness, occasional scores may be missing due to the nature of database snapshots.</li>
    </ul>
</main>

<style>
    main {
        margin-top: 80px;
        margin-bottom: 100px;
        max-width: 900px;
        padding: 25px;
        width: 100%;
    }

    h1, h2, p {
        text-align: center;
    }
</style>