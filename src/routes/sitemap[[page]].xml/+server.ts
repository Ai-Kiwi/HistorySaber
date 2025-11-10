// /src/routes/sitemap.xml/+server.ts
import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';

import { fetchListOfAllLeaderboards } from '$lib/server/database/leaderboards';
import { fetchListOfAllPlayers } from '$lib/server/database/users';

export const prerender = false;

export const GET: RequestHandler = async ({ params }) => {

  const leaderboards = await fetchListOfAllLeaderboards();
  const players = await fetchListOfAllPlayers();

  return await sitemap.response({
    origin: 'https://historysaber.com',
    page: params.page,
    paramValues: {
      '/map/[leaderboard_id]': leaderboards,
      '/profile/[player_id]' : players,
      '/score-improvement/[leaderboard_id]/[player_id]' : []
    },
    additionalPaths: [
      //'/foo.pdf',
        '/all-scores',
        '/api',
        '/leaderboard',
        '/search',
        '/'
    ],

  });
};