<script lang="ts">
    import type { UserType } from '$lib/types'
    export let user: UserType;

    import { countries } from '$lib/userData'
    const formattedDate = new Date(user.snapshot_date).toISOString().split("T")[0].replace(/-/g, '-')

    //    <a href="/country-ranks/{formattedDte}/{user.country}/1">
</script>

<a href="/profile/{user.player_id}" class="user-bar">
    <div class="rank-display">
        <div class="rank">
            #{user.rank}
        </div>
        <div class="country-rank">
            #{user.country_rank}
            <img class="country-rank-image" src={countries[user.country as keyof typeof countries].img} alt="">
            <!--<span class="country-code-text">
                {user.country}
            </span>-->
        </div>
    </div>

    <div class="username-and-pfp">
        <img src="https://cdn.scoresaber.com/avatars/{user.player_id}.jpg" alt="Profile picture of {user.name}" class="profile-picture" aria-hidden="true" style="margin: auto 0px;">

        <div class=username>
            {user.name}
        </div>
    </div>

    <div class="extra-text-info">{ Math.round(user.average_ranked_accuracy * 1000) / 1000 }</div>    
    <div class="extra-text-info">{user.total_play_count}</div>    
    <div class="extra-text-info">{user.ranked_play_count}</div>


    <div class=point-score>
        {user.pp}pp
    </div>
</a>

<style>
    .country-code-text {
        padding-left: 5px;
        color: rgb(210, 210, 210);
        font-weight: bold;
        font-size: 15px;
        margin: auto 0px;
    }

    .profile-picture{
        height: 32px;
        border-radius: 9999px;
        margin-left: 5px;
        font-size: 0px;
    }

    .username-and-pfp{
        flex: 1 1 100px;
        display: flex;
        flex-direction: row;
        width: 100%;
        max-width: 250px;
    }

    .rank-display {
        display: flex;
        flex-direction: row;
        justify-content: baseline;
        width: 150px;
        margin-right: 5px;
    }

    .rank{
        margin-left: 5px;
        height: 25px;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(200, 200, 200);
        color: black;
        padding: 0px 5px 0px 5px;
        width: 50px;
        text-align: center;
        margin-right: 5px;
    }
    .country-rank{
        height: 25px;
        text-align: center;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(125, 125, 125);
        padding: 0px 5px 0px 5px;
        display: flex;
        color: white;
        font-style: normal;
        text-decoration: none;
        flex-direction: row;
        justify-content: center;
    }
    a {
        text-decoration: none;
    }
    .country-rank-image{
        height: 25px;
        padding: 0px 0px 0px 2px;
    }
    .username {
        font-weight: bold;
        font-size: 15px;
        color: rgb(250, 250, 250);
        margin: 5px;
    }
    .point-score{
        height: 25px;
        width: 90px;
        text-align: center;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(54, 101, 212);     
        padding: 0px 5px 0px 5px;
        margin: 5px;
        margin-left: auto;
        color: rgb(250, 250, 250);
    }
    .user-bar{
        font-family: sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;
        min-height: 35px;
        width: 100%;
        background-color: rgba(50, 50, 50, 0.25);
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        gap: 5px;
        justify-items: start;
        flex-wrap: wrap;
        transition: 0.25s ease;
    }

    .user-bar:hover {
        background-color: rgba(150, 150, 150, 0.25);
        transition: 0.25s ease;
    }

    .extra-text-info {
        display: none;
    }

    @media (min-width: 725px) {
        .user-bar {
            display: flex;
            flex-grow: wrap;
            justify-content: space-between
        }
        .point-score{
            margin-left: 0px;
        }
        .extra-text-info {
            display: block;
            width: 50px;
            height: 25px;
            border-radius: 5px;
            font-size: 15px;
            background-color: rgb(75, 75, 75);     
            padding: 0px 5px 0px 5px;
            margin: 5px;
            color: rgb(250, 250, 250);
            text-align: center;
        }
        .username-and-pfp {
            width: 150px;
            min-width: 150px;
        }
    }


</style>

