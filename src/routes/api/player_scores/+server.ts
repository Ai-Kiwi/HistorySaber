import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';

export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const player = url.searchParams.get('player') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    const sort = url.searchParams.get('sort') || '2025-03-10';


    if (sort == "hardest") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"stars",false,true)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "recent-all") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"time",false,false)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "recent-ranked") {
      let scores = await getPlayerScoresFiltered(player,new Date(date),page,8,"time",false,true)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "accuracy-ranked") {
      let scores = await await getPlayerScoresFiltered(player,new Date(date),page,8,"accuracy",false,true)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "accuracy-all") {
      let scores = await await getPlayerScoresFiltered(player,new Date(date),page,8,"pp",false,false)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else{
      let scores = await await getPlayerScoresFiltered(player,new Date(date),page,8,"pp",false,true)
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