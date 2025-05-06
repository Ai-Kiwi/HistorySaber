import { getCountryLeaderboardPage, getLeaderboardPage, getPlayerTopPlays } from '$lib/server/database'


export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const player = url.searchParams.get('player') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    
    let scores = await getPlayerTopPlays(player,new Date(date),page,8)
    return new Response(JSON.stringify(scores), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
    
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}