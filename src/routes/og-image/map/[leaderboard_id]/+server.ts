// src/routes/api/og-image/[filename].ts

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const targetUrl = `https://cdn.scoresaber.com/covers/${params.leaderboard_id}.png`;
  const res = await fetch(targetUrl);

  if (!res.ok) {
    return new Response('Not found', { status: 404 });
  }

  const buffer = await res.arrayBuffer();

  return new Response(Buffer.from(buffer), {
    headers: { 'Content-Type': 'image/png' }
  });
};