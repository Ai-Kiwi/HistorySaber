import { fetchPastTopScoresOnMap, getLeaderboardInfo } from '$lib/server/database/map.js';
import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';
import { fetchPlayerScoresOnMap, getPlayerInfo } from '$lib/server/database/users.js';
import type { Score, UserType } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
  try {
    const player_id = url.searchParams.get('player') || 'none';
    const leaderboard_id = url.searchParams.get('map') || '';

    if (player_id === "none") {
      const scores_unsafe = await fetchPastTopScoresOnMap(leaderboard_id)
        if (!scores_unsafe) {
        error(404, {
          code: 'invalid-leaderboard',
          message: "invalid-leaderboard"
        });
      }

      const scores : Score[] = (scores_unsafe).reverse()
      const map_data = await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"))
      if (!map_data) {
        error(404, {
          code: 'invalid-leaderboard',
          message: "invalid-leaderboard"
        });    
      }
      let usernames: string[] = []
      //this is like such a bad idea I find it crazy I wrote this. 
      //Its just so inefficient. I mean there are so many better ways I could have done this
      for (let step = 0; step < scores.length; step++) {
        const user_data = await getPlayerInfo(scores[step].player_id)
        if (user_data != undefined) {
          usernames.push(user_data.name)
        } else {
          usernames.push(`N/A (${scores[step].player_id})`)
        }
      }

      const response = {
          scores : scores,
          map_data : map_data,
          usernames : usernames
      };

      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }else{
      const player_data = await await getPlayerInfo(player_id)
      if (!player_data) {
        error(404, {
          code: 'invalid-player',
          message: "invalid-player"
        });    
      }
      const scores_unsafe = await fetchPlayerScoresOnMap(player_id,leaderboard_id)
      if (!scores_unsafe) {
        error(404, {
          code: 'invalid-leaderboard',
          message: "invalid-leaderboard"
        });
      }
      const scores : Score[] = (scores_unsafe).reverse()
      const map_data = await getLeaderboardInfo(leaderboard_id, new Date("2100-1-1"));
      if (!map_data) {
        error(404, {
          code: 'invalid-leaderboard',
          message: "invalid-leaderboard"
        });       
      }

    
      const response = {
          scores : scores,
          player_data : player_data,
          map_data : map_data,
      };

      return new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}