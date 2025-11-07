import { fetchPastTopScoresOnMap, getLeaderboardInfo } from '$lib/server/database/map';
import { getPlayerInfo } from '$lib/server/database/users';
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

    const leaderboard_id = params.leaderboard_id
  
    const scores : Score[] = (await fetchPastTopScoresOnMap(leaderboard_id)).reverse()
    const map_data = await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"))
    if (!map_data) {
		error(404, {
			message: 'No data found for leaderboard'
		});    
    }
    var usernames: string[] = []
    //this is like such a bad idea I find it crazy I wrote this. 
    //Its just so inefficient. I mean there are so many better ways I could have done this
    for (let step = 0; step < scores.length; step++) {
        const user_data = await getPlayerInfo(scores[step].player_id)
        usernames.push(user_data.name)
    }

    return {
        scores : scores,
        map_data : map_data,
        usernames : usernames
    };
}