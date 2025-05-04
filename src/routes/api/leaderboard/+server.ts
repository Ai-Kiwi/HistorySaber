import { getCountryLeaderboardPage, getLeaderboardPage } from '$lib/server/database'


export async function GET({ url }) {
  try {
    const search = url.searchParams.get('search') || "";
    const page = parseInt(url.searchParams.get('page') || '1');
    const country = url.searchParams.get('country') || '';
    const date = url.searchParams.get('date') || '2025-03-10';
    
    if (country == "") {
      let users = await getLeaderboardPage(page,date)
      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    }else{
      let countrys = country.split(",")
      let users = await getCountryLeaderboardPage(page,date,countrys)
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