import { fetchAllScoresDuplicatedPaged } from '$lib/server/database/main.js';
import { fetchAllPlayerScoresDuplicatedPaged, getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';
import { getPlayerInfo } from '$lib/server/database/users.js';

export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    let page_size = Number(url.searchParams.get('page_size')) || 8;
    if (page_size < 1 || page_size > 100) {
      page_size = 8
    }
    
    let scores = await fetchAllScoresDuplicatedPaged(page,page_size)

    let usernames: string[] = []
    //this is like such a bad idea I find it crazy I wrote this. 
    //Its just so inefficient. I mean there are so many better ways I could have done this
    for (let step = 0; step < scores.length; step++) {
      try {
        const user_data = await getPlayerInfo(scores[step].player_id)
        usernames.push(user_data.name)
      } catch {
        usernames.push(`N/A (${scores[step].player_id})`)
      }
      
    }

    return new Response(JSON.stringify({
      scores : scores,
      usernames : usernames
    }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}