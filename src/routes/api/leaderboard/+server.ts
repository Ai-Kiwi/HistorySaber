import { getCountryLeaderboardPage, getLeaderboardPage } from '$lib/server/database/leaderboards';

export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const country = url.searchParams.get('country') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    let page_size = Number(url.searchParams.get('page_size')) || 50;
    if (page_size < 1 || page_size > 100) {
      page_size = 50
    }

    if (country == "") {
      let users = await getLeaderboardPage(page,date,page_size)
      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }else{
      let countrys = country.split(",")
      let users = await getCountryLeaderboardPage(page,date,countrys, page_size)
      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}