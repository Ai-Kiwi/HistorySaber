import { fetchPastTopScoresOnMap, getLeaderboardInfo, getPlayerInfo } from '$lib/server/database'
import type { MapLeaderboard, Score, UserType } from '$lib/types';
import { daysSinceRankCollectStart } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();

    const leaderboard_id = params.leaderboard_id
  
    const scores : Score[] = (await fetchPastTopScoresOnMap(leaderboard_id)).reverse()
    const map_data: MapLeaderboard = await await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"))
    var usernames: string[] = []
    //this is like such a bad idea I find it crazy I wrote this. 
    //Its just so inefficient. I mean there are so many better ways I could have done this
    for (let step = 0; step < scores.length; step++) {
        const userData = await getPlayerInfo(scores[step].player_id)
        usernames.push(userData.name)
    }

    return {
        scores : scores,
        map_data : map_data,
        usernames : usernames
    };
}