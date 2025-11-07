import { getLeaderboardPage } from '$lib/server/database/leaderboards';
import { getPlayerScoresFiltered } from '$lib/server/database/user_scores';
import { getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database/users';
import { daysSinceRankCollectStart, formatDate } from '$lib/utils';
import type { PageServerLoad } from './$types';

let cache: Record<string, any> = {};

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    setHeaders({
        'Content-Security-Policy': "frame-ancestors *", // or specify allowed domains
        'X-Frame-Options': 'ALLOWALL',
        'Referrer-Policy': 'no-referrer'
    });

    if (!cache["leaderboard_info"] || cache["leaderboard_info_date_expire"] < new Date() ) {
        cache["leaderboard_info"] = await getLeaderboardPage(1, formatDate(new Date()), 50)
        let date = new Date()
        date.setDate(date.getDate() + 1)
        cache["leaderboard_info_date_expire"] = date
        console.log("expired getting new leaderboard page data...")
    }

    return {
        initial_leaderboard : cache["leaderboard_info"]
    };
}