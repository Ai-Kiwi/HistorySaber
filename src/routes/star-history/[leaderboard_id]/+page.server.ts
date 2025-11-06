import { fetchPastTopScoresOnMap, getLeaderboardInfo, getLeaderboardRankHistory } from '$lib/server/database/map';
import type { MapLeaderboard, MapLeaderboardStar, Score, UserType } from '$lib/types';
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

    const leaderboard_id = params.leaderboard_id
  
    const ranks : MapLeaderboardStar[] = (await getLeaderboardRankHistory(leaderboard_id)).reverse()
    const map_data = await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"))
    if (!map_data) {
		error(404, {
			message: 'No data found for leaderboard'
		});    
    }

    return {
        map_data : map_data,
        ranks : ranks,
    };
}