<script lang="ts">
    import Tooltip from "./tooltip.svelte";
import type { Score } from "./types";
    const { data }: { data: Score } = $props();
    let dif_name = "unknown"
    if (data.difficulty == 1) {
        dif_name = "Easy"
    }else if (data.difficulty == 3) {
        dif_name = "Normal"
    }else if (data.difficulty == 5) {
        dif_name = "Hard"
    }else if (data.difficulty == 7) {
        dif_name = "Expert"
    }else if (data.difficulty == 9) {
        dif_name = "Expert+"
    }

    const date_formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZoneName: 'short'
    });

    let extra_info = $state(false)
</script>

<main>
    <button class="main-score" on:click={extra_info = !extra_info}>
        <div class="score-icon-parent">
            <img class="score-icon" src="https://cdn.scoresaber.com/covers/{data.map_hash}.png" alt="">
            <div class="score-star-text">
                {#if data.stars != null}
                    {data.stars}☆
                {:else}
                    {dif_name}
                {/if}

            </div>
        </div>

        <div class="score-text">
            <span class="song-name">{data.song_name}</span>
            <span class="sub-song-name">{data.song_sub_name}</span>
            <div style="height:100%"></div>
            <span class="song-author-name">Song by {data.song_author_name}</span>
            <span class="level-author-name">Mapped by {data.level_author_name}</span>
        </div>

        <div class="placement-text">
            <div class="score-stat-row">
                <Tooltip title="Played on {data.device_hmd} with left controller {data.device_controller_left} and right controller {data.device_controller_right}">
                    <span class="score-headset">{data.device_hmd}</span>
                </Tooltip>
                <Tooltip title="{data.accuracy}%">
                    <span class="score-accuracy">{ Math.floor(data.accuracy * 100) / 100}%</span>
                </Tooltip>
                {#if data.stars != null}
                    <span class="score-pp">~{ Math.floor(data.pp * 100) / 100}pp </span>
                {/if}
            </div>
            <div class="score-stat-row">
                {#if data.mods.length > 0}
                    <Tooltip title="Mods that were enabled">
                        <span class="score-mods">{data.mods}</span>
                    </Tooltip>
                {/if}
                <Tooltip title="scored {data.score.toLocaleString()} with max of {data.maxscore.toLocaleString()}. (modifed score would be {data.modified_score.toLocaleString()})">
                    <span class="score-score">{data.score}</span>
                </Tooltip>
                <Tooltip title="{data.missed_notes} misses and {data.bad_cuts} bad cuts. Max combo of {data.max_combo}">
                    {#if data.missed_notes + data.bad_cuts == 0}
                        <span class="score-misses" style="background-color: green;">{data.missed_notes + data.bad_cuts} ✔️</span>
                    {:else}
                        <span class="score-misses">{data.missed_notes + data.bad_cuts} ✖️</span>
                    {/if}
                </Tooltip>
            </div>

            <div style="height:100%"></div>
            <span class="score-time">{ date_formatter.format( new Date(data.time) )}</span>
        </div>    
    </button>

    {#if extra_info == true}
        <div class="clickable-buttons">
            <a href="/score-improvement/{data.leaderboard_id}/{data.player_id}" target="_blank" class="clickable-button">
                Player Score Improvement
            </a>
            <a href="/score-improvement/{data.leaderboard_id}" target="_blank" class="clickable-button">
                Map Score Improvement
            </a>
            <a href="https://scoresaber.com/leaderboard/{data.leaderboard_id}" target="_blank" class="clickable-button">
                ScoreSaber Page
            </a>
        </div>
    {/if}

</main>


<style>
    .main-score {
        border: none;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: rgba(50, 50, 50, 0.25);
        border-radius: 10px;
        padding: 5px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        font-family: sans-serif;
        color: white;
        cursor: pointer;

    }

    .clickable-button {
        background-color: rgba(50, 50, 50, 0.25);
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        text-align: center;
        text-decoration: none;
        font-size: 15px;
        color: white;
        font-weight: bold;
        margin: 5px 2.5px;
    }

    .clickable-buttons {
        display: flex;
    }

    .score-text {
        padding: 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .song-name {
        font-weight: bold;
        color: rgb(255, 255, 255);
    }
    .sub-song-name {
        font-size: 15px;
        color: rgb(245, 245, 245);
    }
    .song-author-name {
        font-size: 15px;
        color: rgb(200, 200, 200);
    }
    .level-author-name {
        font-size: 15px;
        color: rgb(200, 200, 200);
    }

    .placement-text {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        padding: 5px;
        color: white;
    }

    .score-pp {
        text-align: center;
        padding: 5px;
        color: rgb(250, 250, 250);
        background-color: rgb(50, 0,250);
        border-radius: 15px;
        font-weight: bolder;
    }

    .score-score {
        text-align: center;
        padding: 5px;
        color: rgb(250, 250, 250);
        background-color: rgb(75, 75, 75);
        border-radius: 15px;
        font-weight: bolder;
    }

    .score-mods {
        text-align: center;
        padding: 5px;
        color: rgb(250, 250, 250);
        background-color: rgb(30, 150, 200);
        border-radius: 15px;
        font-weight: bolder;
    }

    .score-misses {
        text-align: center;
        padding: 5px;
        font-size: 15px;
        color: rgb(250, 250, 250);
        background-color: red;
        border-radius: 15px;
        font-size: 15px;
        font-weight: bolder;
    }

    .score-headset {
        text-align: center;
        text-wrap-mode: nowrap;
        padding: 5px;
        font-size: 15px;
        color: rgb(250, 250, 250);
        background-color: rgb(75, 75, 75);
        border-radius: 15px;
        font-size: 15px;
        font-weight: bolder;
    }

    .score-stat-row {
        margin: 5px;
        display: flex;
        flex-direction: row;;
        align-items: center;
        justify-content: end;
        flex-wrap: wrap;
        gap: 5px;
    }

    .score-accuracy {
        font-size: 15px;
        color: rgb(250, 250, 250);
        background-color: rgb(110, 110, 110);
        border-radius: 15px;
        font-size: 15px;
        font-weight: bolder;
        padding: 4px 8px;
    }

    .score-icon {
        width: 90px;
        height: 90px;
        border-radius: 15px;
    }

    .score-icon-parent {
        margin: 5px;
        width: 90px;
        height: 90px;
        position: relative;
        text-decoration: none;
    }

    .score-star-text {
        position: absolute;
        padding: 2.5px 5px;
        font-size: 15px;
        font-weight: bold;
        border-radius: 15px;
        bottom: 0px;
        left: 0px;
        z-index: 10;
        background-color: blue;
        color: rgb(255, 255, 255);
    }

</style>
