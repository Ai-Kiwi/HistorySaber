import { getCountryLeaderboardPage, getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database'
import { daysSinceRankCollectStart } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    //const response = await fetch('https://api.example.com/data');
    //const data = await response.json();

    let player_id = params.player_id
  
    const days = daysSinceRankCollectStart()

    const pastPp = await getPlayerPastPpValues(player_id, days + 1)
    const playerData = await getPlayerInfo(player_id)



    return {
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
}