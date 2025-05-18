<script lang="ts">
    import type { UserType } from '$lib/types'

    import { countries } from '$lib/userData'

    //    <a href="/country-ranks/{formattedDte}/{user.country}/1">
</script>

<div class="user-bar">
    <div class="rank-display">
        ranking
    </div>

    <div class="username-and-pfp">
        username
    </div>

    <div class="extra-text-info">Ranked Accuracy</div>    
    <div class="extra-text-info">Total Plays</div>    
    <div class="extra-text-info">Ranked Plays</div>


    <div class=point-score>
        PP Points
    </div>
</div>

<style>
    .username-and-pfp{
        flex: 1 1;
        width: 100%;
        max-width: 250px;
        text-align: center;
    }

    .rank-display {
        width: 150px;
        text-align: center;
    }
    .point-score{
        border-radius: 5px;
        white-space: nowrap;
        width: 90px;
        text-align: center; 
        margin-right: 5px;
        margin-left: auto;
        
        
    }
    .user-bar{
        padding: 5px;
        font-size: 15px;
        color: white;
        font-weight: bolder;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 100%;
        cursor: pointer;
    }

    .extra-text-info {
        display: none;
    }

    @media (max-width: 900px) {
        .user-bar {
            font-size: 12px;
        }

    }

    @media (min-width: 725px) {
        .user-bar {
            display: flex;
            flex-grow: wrap;
            justify-content: space-between;
        }
        .point-score{
            margin-left: 0px;
        }
        .extra-text-info {
            display: inline-block;
            border-radius: 5px;
            margin: 2.5px;
            text-align: center;
            justify-content: center;
            text-wrap: none;
            overflow: visible;
            white-space: nowrap;
            
        }
        .username-and-pfp {
            width: 150px;
            min-width: 150px;
        }
    }


</style>

