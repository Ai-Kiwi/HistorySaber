<script lang="ts">
    import { slide } from "svelte/transition";
    import Tooltip from "./tooltip.svelte";
    import type { Score } from "./types";
    import { parseLevelDifficulties } from "./utils";
    const { data }: { data: Score } = $props();
    let dif_name = parseLevelDifficulties(data.difficulty)


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
        <div class="icon-and-text">
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
        <div class="clickable-buttons" transition:slide={{ duration: 500 }}>
            <a href="/score-improvement/{data.leaderboard_id}/{data.player_id}" target="_blank" class="clickable-button">
                Player Score Improvement
            </a>
            <a href="/score-improvement/{data.leaderboard_id}" target="_blank" class="clickable-button">
                Map Score Improvement
            </a>
            {#if data.stars != null}
            <a href="/star-history/{data.leaderboard_id}" target="_blank" class="clickable-button">
                Star History
            </a>
            {/if}
            <a href="https://scoresaber.com/leaderboard/{data.leaderboard_id}" target="_blank" class="clickable-button">
                ScoreSaber Page
            </a>
        </div>
        <div transition:slide={{ duration: 500 }}>
            <iframe loading="lazy" class="improvement-graph" src="/score-improvement/{data.leaderboard_id}/{data.player_id}?compact=true" frameborder="0"></iframe>
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
        font-size: 0.9375rem;
        color: white;
        cursor: pointer;
        transition: 0.25s ease;
    }

    .main-score:hover {
        background-color: rgba(150, 150, 150, 0.25);
        transition: 0.25s ease;
    }

    .improvement-graph {
        width: 100%;
        height: 500px;
        border-radius: 10px;
    }

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
        color: rgb(245, 245, 245);
    }
    .song-author-name {
        color: rgb(200, 200, 200);
    }
    .level-author-name {
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
        color: rgb(250, 250, 250);
        background-color: red;
        border-radius: 15px;
        font-weight: bolder;
    }

    .score-headset {
        text-align: center;
        text-wrap-mode: nowrap;
        padding: 5px;
        color: rgb(250, 250, 250);
        background-color: rgb(75, 75, 75);
        border-radius: 15px;
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
        color: rgb(250, 250, 250);
        background-color: rgb(110, 110, 110);
        border-radius: 15px;
        font-weight: bolder;
        padding: 4px 8px;
    }

    .score-icon {
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }

    .score-icon-parent {
        margin: 5px;
        width: 90px;
        aspect-ratio: 1;
        position: relative;
        text-decoration: none;
    }

    .score-star-text {
        position: absolute;
        padding: 2.5px 5px;
        font-weight: bold;
        border-radius: 15px;
        bottom: 0px;
        left: 0px;
        z-index: 10;
        background-color: blue;
        color: rgb(255, 255, 255);
        font-size: 0.875rem;
    }

    .icon-and-text {
        display: flex;
        flex-direction: row;
    }

    @media (hover: hover) and (pointer: fine) {
        .main-score {
            backdrop-filter: blur(15px) saturate(130%);
        }

        .clickable-button {
            backdrop-filter: blur(15px) saturate(130%);
        }
    }

    @media (max-width: 650px) {

        .icon-and-text {
            flex-direction: row;
            width: 100%;
        }

        main {
            font-size: clamp(0px,3vw,1.5rem);
        }
        .placement-text {
            align-items: center;
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 5px;
            row-gap: 10px;
            width: 100%;
            padding: 5px;
        }
        .score-stat-row {
            display: contents;
        }

        .score-text {
            font-size: clamp(0.875rem,3.75vw,1.25rem);
        }
        .main-score {
            font-size: clamp(12px,2vw,6.25rem);
            flex-direction: column;
        }
        .clickable-button {
            font-size: 2.75vw;
            padding: 2.5px;
            height: auto;
        }
        .improvement-graph {
            height: 300px;
        }
    }
</style>
