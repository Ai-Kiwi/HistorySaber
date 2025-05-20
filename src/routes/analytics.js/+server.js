export async function GET({ request }) {
    const res = await fetch('https://cloud.umami.is/script.js');
    const body = await res.text();

    const url = new URL(request.url);
    const hostname = url.hostname;

    const ignoredHostnames = [
        'localhost',    // Common local development hostname
        '127.0.0.1',    // IPv4 loopback address
        '::1',          // IPv6 loopback address
        '.aue.devtunnels.ms',
    ];

    const shouldIgnore = ignoredHostnamesOrDomains.some(ignored => {
        if (ignored.startsWith('.')) {
            return hostname.endsWith(ignored);
        }
        return hostname === ignored;
    });

    if (shouldIgnore) {
        console.log(`Umami tracking disabled for development domain: ${hostname}`); // Log for debugging
        return new Response('/* Umami tracking disabled for development environment */', {
            status: 200,
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache this empty script too
            }
        });
    }
  
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
  
