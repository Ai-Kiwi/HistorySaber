import { getCountryLeaderboardPage, getLeaderboardPage, getPlayerHardestPlays, getPlayerHighestRankedAccuracyPlays, getPlayerRecentPlays, getPlayerRecentRankedPlays, getPlayerTopPlays } from '$lib/server/database'


export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const player = url.searchParams.get('player') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    const sort = url.searchParams.get('sort') || '2025-03-10';


    if (sort == "hardest") {
      let scores = await getPlayerHardestPlays(player,new Date(date),page,8)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "recent-all") {
      let scores = await getPlayerRecentPlays(player,new Date(date),page,8)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "recent-ranked") {
      let scores = await getPlayerRecentRankedPlays(player,new Date(date),page,8)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "accuracy-ranked") {
      let scores = await getPlayerHighestRankedAccuracyPlays(player,new Date(date),page,8)
      return new Response(JSON.stringify(scores), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
      });
    }else if (sort == "accuracy-unranked") {

    }else{
      let scores = await getPlayerTopPlays(player,new Date(date),page,8)
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