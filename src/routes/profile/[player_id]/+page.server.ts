import { getPlayerScoresFiltered } from '$lib/server/database/user_scores';
import { getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database/users';
import { daysSinceRankCollectStart, formatDate } from '$lib/utils';
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

    let player_id = params.player_id
  
    const days = daysSinceRankCollectStart()

    const past_pp = await getPlayerPastPpValues(player_id, days + 1)
    if (!past_pp) {
      error(404, {
        code: 'invalid-player',
        message: "invalid-player"
      }); 
    }
    const player_data = await getPlayerInfo(player_id)
    if (!player_data) {
      error(404, {
        code: 'invalid-player',
        message: "invalid-player"
      }); 
    }

    const initial_player_scores = await getPlayerScoresFiltered(player_id, new Date(), 1, 12, "pp", false, true)
    if (!initial_player_scores) {
        error(404, {
            code: 'invalid-player',
            message: "invalid-player"
        });
    }

    return {
        past_pp: past_pp.pp_values,
        past_rank : past_pp.rank_values,
        past_country_rank : past_pp.country_values,
        past_dates : past_pp.dates,
        player_data: player_data,

        past_total_score : past_pp.total_score_values,
        past_total_ranked_score : past_pp.total_ranked_score_value,
        past_average_ranked_accuracy : past_pp.average_ranked_accuracy_value,
        past_total_play_count : past_pp.total_play_count_value,
        past_ranked_play_count : past_pp.ranked_play_count_value,

        initial_scores : initial_player_scores
    };
}