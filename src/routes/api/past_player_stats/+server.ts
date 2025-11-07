import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';
import { getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database/users';
import { daysSinceRankCollectStart } from '$lib/utils';

export async function GET({ url }) {
  try {
    const player = url.searchParams.get('player') || '';
  
    const days = daysSinceRankCollectStart()

    const past_pp = await getPlayerPastPpValues(player, days + 1)
    const player_info = await getPlayerInfo(player)



    const player_data = {
        past_pp: past_pp.pp_values,
        past_rank : past_pp.rank_values,
        past_country_rank : past_pp.country_values,
        past_dates : past_pp.dates,
        player_data: player_info,

        past_total_score : past_pp.total_score_values,
        past_total_ranked_score : past_pp.total_ranked_score_value,
        past_average_ranked_accuracy : past_pp.average_ranked_accuracy_value,
        past_total_play_count : past_pp.total_play_count_value,
        past_ranked_play_count : past_pp.ranked_play_count_value,
    };

    return new Response(JSON.stringify(player_data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}