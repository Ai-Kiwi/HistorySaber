import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';

export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const player = url.searchParams.get('player') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    const sort = url.searchParams.get('sort') || '2025-03-10';

    const reverse = url.searchParams.get('reverse') || 'false';
    const only_ranked = url.searchParams.get('only_ranked') || 'true';

    if (sort == "hardest") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"stars",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "recent") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"time",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "accuracy") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"accuracy",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "max_combo") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"max_combo",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "bad_cuts_or_misses") {
      let scores = await getPlayerScoresFiltered(player, new Date(date), page, 8, "bad_cuts_and_misses", reverse == "true", only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "score") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"score",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else{
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"pp",reverse == "true",only_ranked == "true")
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}