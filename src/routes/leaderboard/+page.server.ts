import { getLeaderboardPage } from '$lib/server/database/leaderboards';
import { getPlayerScoresFiltered } from '$lib/server/database/user_scores';
import { getPlayerInfo, getPlayerPastPpValues } from '$lib/server/database/users';
import { daysSinceRankCollectStart, formatDate } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    setHeaders({
        'Content-Security-Policy': "frame-ancestors *", // or specify allowed domains
        'X-Frame-Options': 'ALLOWALL',
        'Referrer-Policy': 'no-referrer'
    });
    const initial_player_scores = await getLeaderboardPage(1, formatDate(new Date()), 50)

    return {
        initial_leaderboard : initial_player_scores
    };
}