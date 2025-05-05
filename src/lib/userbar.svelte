<script lang="ts">
    import type { UserType } from '$lib/types'
    export let user: UserType;

    import { countries } from '$lib/userData'
    const formattedDate = new Date(user.snapshot_date).toISOString().split("T")[0].replace(/-/g, '-')

    //    <a href="/country-ranks/{formattedDte}/{user.country}/1">
</script>

<div class="user-bar">
    <div class="rank">
        #{user.rank}
    </div>
    <img src="https://cdn.scoresaber.com/avatars/{user.player_id}.jpg" alt="Profile picture of {user.name}" class="profile-picture" aria-hidden="true">

    <div class="country-rank">
        #{user.country_rank}
        <img class="country-rank-image" src={countries[user.country as keyof typeof countries].img} alt="">
    </div>
    <a href="/profile/{user.player_id}">
        <div class=username>
            {user.name}
        </div>
    </a>
    <div class=point-score>
        {user.pp}pp
    </div>
</div>

<style>
    .profile-picture{
        height: 32px;
        border-radius: 9999px;
        margin-left: 5px;
        font-size: 0px;
    }

    .rank{
        height: 25px;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(200, 200, 200);
        color: black;
        padding: 0px 5px 0px 5px;
    }
    .country-rank{
        margin: 0px 0px 0px 5px;
        height: 25px;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(125, 125, 125);
        padding: 0px 5px 0px 5px;
        display: flex;
        color: white;
        font-style: normal;
        text-decoration: none;
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
        width: 200px;
    }
    .point-score{
        height: 25px;
        border-radius: 5px;
        font-size: 15px;
        background-color: rgb(54, 101, 212);     
        padding: 0px 5px 0px 5px;
        color: rgb(250, 250, 250);
        width: 100px;
    }
    .user-bar{
        font-family: sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 25px;
        width: 100%;
        background-color: rgb(50, 50, 50);
        border-radius: 10px;
        padding: 5px;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
</style>

