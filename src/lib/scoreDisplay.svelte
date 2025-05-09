<script lang="ts">
    import type { Score } from "./types";

    export let data: Score;
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
    });

</script>

<main>
    
        <div class="main-score">
            <a href="https://scoresaber.com/leaderboard/{data.leaderboard_id}" class="score-icon-parent">
                <img class="score-icon" src="https://cdn.scoresaber.com/covers/{data.map_hash}.png" alt="">
                <div class="score-star-text">
                    {#if data.stars != null}
                        {data.stars}☆
                    {:else}
                        {dif_name}
                    {/if}

                </div>
            </a>

            <a href="https://scoresaber.com/leaderboard/{data.leaderboard_id}" class="score-text">
                <span class="song-name">{data.song_name}</span>
                <span class="sub-song-name">{data.song_sub_name}</span>
                <div style="height:100%"></div>
                <span class="song-author-name">Song by {data.song_author_name}</span>
                <span class="level-author-name">Mapped by {data.level_author_name}</span>
            </a>

            <div class="placement-text">
                {#if data.stars != null}
                    <span class="score-pp">~{ Math.floor(data.pp * 100) / 100}pp </span>
                {/if}
                <span class="score-accuracy">{ Math.floor(data.accuracy * 100) / 100}%</span>
                <div style="height:100%"></div>
                <span class="score-time">{ date_formatter.format( new Date(data.time) )}</span>
            </div>

        </div>
   

</main>

<style>
    .main-score {
        font-family: sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: rgb(50, 50, 50);
        border-radius: 10px;
        padding: 5px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        font-family: sans-serif;
        color: white;
        cursor: pointer;
    }

    .score-text {
        padding: 5px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-decoration: none;
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
        margin-left: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
    }

    .score-pp {
        margin: 5px;
        font-size: 15px;
        color: rgb(250, 250, 250);
        background-color: rgb(50, 0,250);
        border-radius: 15px;
        font-size: 15px;
        font-weight: bolder;
        padding: 4px 8px;
    }
    .score-accuracy {
        margin: 5px;
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