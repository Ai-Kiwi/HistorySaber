import { getPlayerScoresFiltered } from '$lib/server/database/user_scores.js';
import { searchForUser } from '$lib/server/database/users.js';

export async function GET({ url }) {
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const text = url.searchParams.get('text') || '';
    const page_limit = 50

    const users = await searchForUser(text,page,page_limit)
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
  });


  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}