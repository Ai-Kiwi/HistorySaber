import { fetchPlayerScoresOnMap, getLeaderboardInfo, getPlayerInfo } from '$lib/server/database'
import type { MapLeaderboard, Score, UserType } from '$lib/types';
import { daysSinceRankCollectStart } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();

    const player_id = params.player_id
    const leaderboard_id = params.leaderboard_id
  
    

    const scores : Score[] = (await fetchPlayerScoresOnMap(player_id,leaderboard_id)).reverse()
    const player_data: UserType = await await getPlayerInfo(player_id)
    const map_data: MapLeaderboard = await await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"))


    return {
        scores : scores,
        player_data : player_data,
        map_data : map_data,
    };
}