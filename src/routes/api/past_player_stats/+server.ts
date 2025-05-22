import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';
import { getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database/users';
import { daysSinceRankCollectStart } from '$lib/utils';

export async function GET({ url }) {
  try {
    const player = url.searchParams.get('player') || '';
  
    const days = daysSinceRankCollectStart()

    const pastPp = await getPlayerPastPpValues(player, days + 1)
    const playerData = await getPlayerInfo(player)



    const player_data = {
        pastPp: pastPp.pp_values,
        pastRank : pastPp.rank_values,
        pastCountryRank : pastPp.country_values,
        pastDates : pastPp.dates,
        playerData: playerData,

        pastTotalScore : pastPp.total_score_values,
        pastTotalRankedScore : pastPp.total_ranked_score_value,
        pastAverageRankedAccuracy : pastPp.average_ranked_accuracy_value,
        pastTotalPlayCount : pastPp.total_play_count_value,
        pastRankedPlayCount : pastPp.ranked_play_count_value,
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