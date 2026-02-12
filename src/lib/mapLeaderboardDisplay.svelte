<script lang="ts">
    import { slide } from "svelte/transition";
    import Tooltip from "./Tooltip.svelte";
    import type { MapLeaderboard, Score } from "./types";
    import { parseLevelDifficulties } from "./utils";
    import ToolTipClient from "./ToolTipClient.svelte";
    const { data }: { data: MapLeaderboard } = $props();
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

    let tooltip_x = $state(0)
    let tooltip_y = $state(0) 
    let tooltip_enabled = $state(false) 
    let tooltip_title = $state("")

    let extra_info = $state(false)
</script>

<main>
    <button class="main-score" on:click={extra_info = !extra_info}>
        <div class="icon-and-text">
            <div class="score-icon-parent">
                <img class="score-icon" src="https://cdn.scoresaber.com/covers/{data.map_hash}.png" alt="">
                <div class="score-star-text">
                    {#if data.stars != null && data.stars != 0}
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
    </button>

    {#if extra_info == true}
        <div class="clickable-buttons" transition:slide={{ duration: 500 }}>
            <a href="/map/{data.leaderboard_id}" target="_blank" class="clickable-button">
                Map Information
            </a>
            <a href="https://scoresaber.com/leaderboard/{data.leaderboard_id}" target="_blank" class="clickable-button">
                ScoreSaber Page
            </a>
        </div>
    {/if}

</main>

<div class="tooltip">
    {#if tooltip_enabled}
        <Tooltip title={tooltip_title} tooltop_x={tooltip_x} tooltop_y={tooltip_y}></Tooltip>
    {/if}

</div>


<style>
    .tooltip {
        position: absolute;
        top: 0px;
        left: 0px;
    }
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

    .score-icon {
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }

    .score-icon-parent {
        margin: 5px;
        width: 90px;
        height: 90px;
        position: relative;
        text-decoration: none;
        flex-shrink: 0;
    }

    .score-star-text {
        position: absolute;
        padding: 2.5px 5px;
        font-weight: bold;
        border-radius: 15px;
        bottom: 0px;
        left: 0px;
        z-index: 1;
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
