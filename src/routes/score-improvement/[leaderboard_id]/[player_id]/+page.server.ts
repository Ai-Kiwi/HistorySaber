import { getLeaderboardInfo } from '$lib/server/database/map';
import { fetchPlayerScoresOnMap, getPlayerInfo } from '$lib/server/database/users';
import type { MapLeaderboard, Score, UserType } from '$lib/types';
import { daysSinceRankCollectStart } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    setHeaders({
        'Content-Security-Policy': "frame-ancestors *", // or specify allowed domains
        'X-Frame-Options': 'ALLOWALL',
        'Referrer-Policy': 'no-referrer'
    });
    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();

    const player_id = params.player_id
    const leaderboard_id = params.leaderboard_id
  
    const player_data = await await getPlayerInfo(player_id)
    if (!player_data) {
        error(404, {
            code: 'invalid-player',
            message: "invalid-player"
        }); 
    }
    const scores_unsafe = await fetchPlayerScoresOnMap(player_id,leaderboard_id)
    if (!scores_unsafe) {
        error(404, {
            code: 'invalid-leaderboard',
            message: "invalid-leaderboard"
        }); 
    }
    const scores : Score[] = scores_unsafe
    const map_data = await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"));
    if (!map_data) {
        error(404, {
            code: 'invalid-leaderboard',
            message: "invalid-leaderboard"
        });  
    }


    return {
        scores : scores,
        player_data : player_data,
        map_data : map_data,
    };
}