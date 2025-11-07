// src/routes/api/og-image/[filename].ts

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const targetUrl = `https://cdn.scoresaber.com/avatars/${params.user_id}.jpg`;
  const res = await fetch(targetUrl);

  if (!res.ok) {
    const res = await fetch("https://cdn.scoresaber.com/avatars/oculus.png");
    if (!res.ok) {
      return new Response('Not found', { status: 404 });
    }
    const buffer = await res.arrayBuffer();
    return new Response(Buffer.from(buffer), {
      headers: { 'Content-Type': 'image/png' }
    });
  }

  const buffer = await res.arrayBuffer();

  return new Response(Buffer.from(buffer), {
    headers: { 'Content-Type': 'image/jpeg' }
  });
};