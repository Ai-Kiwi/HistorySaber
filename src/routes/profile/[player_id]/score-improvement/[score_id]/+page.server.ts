import { fetchPlayerScoresOnMap, getPlayerInfo } from '$lib/server/database'
import type { Score, UserType } from '$lib/types';
import { daysSinceRankCollectStart } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();

    const player_id = params.player_id
    const score_id = params.score_id
  
    const scores : Score[] = await fetchPlayerScoresOnMap(player_id,score_id)
    const player_data: UserType = await await getPlayerInfo(player_id)


    return {
        scores : scores,
        player_data : player_data
    };
}