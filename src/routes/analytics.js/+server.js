export async function GET() {
    const res = await fetch('https://cloud.umami.is/script.js');
    const body = await res.text();
  
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
  