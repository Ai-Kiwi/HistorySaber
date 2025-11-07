<script>
    import Seo from "$lib/seo.svelte";

    // If you want to load this dynamically or scroll to sections, add logic here
  </script>
  
<Seo
  title="API Info - HistorySaber"
  description="Explore HistorySaber's API and learn how to access historical Beat Saber data programmatically."
  url="https://historysaber.com/api"
/>

  <style>
    main {
      max-width: 900px;
      margin: 2rem auto;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
  
    h1 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  
    section {
      margin-bottom: 3rem;
    }
  
    h2 {
      color: white;
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
  
    .endpoint {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-top: 1rem;
      font-family: sans-serif;
      background-color: rgba(50, 50, 50, 0.25);
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      gap: 5px;
      justify-items: start;
      flex-wrap: wrap;
    }
  
    code {
      background: #333;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }
  
    .method {
      font-weight: bold;
      color: #005f73;
    }
  
    .url {
      font-family: monospace;
      color: #e3e3e3;
    }
  
    ul {
      margin: 0.5rem 0 1rem 1.2rem;
      padding: 0;
    }
  
    li {
      margin-bottom: 0.3rem;
    }
  
    .response {
      font-family: monospace;
      background: #353535;
      border: 1px solid #ccc;
      padding: 0.8rem;
      border-radius: 6px;
      white-space: pre-wrap;
    }
  </style>
  
  <main>
    <h1>📊 API Documentation</h1>
  
    <section>
      <h2>Leaderboard</h2>
      <div class="endpoint">
        <p><span class="method">GET</span> <span class="url">/api/leaderboard</span></p>
        <ul>
          <li><code>page</code> – page number (default: 1)</li>
          <li><code>country</code> – country codes (comma-separated)</li>
          <li><code>date</code> – snapshot date (default: 2025-03-10)</li>
          <li><code>page_size</code> – results per page (1–100)</li>
        </ul>
        <p class="response">{'{ scores: [...], page: 1, total: 1200 }'}</p>
      </div>
    </section>
  
    <section>
      <h2>Leaderboard Map History</h2>
      <div class="endpoint">
        <p><span class="method">GET</span> <span class="url">/api/past_map_stats</span></p>
        <ul>
          <li><code>map</code> – leaderboard ID</li>
          <li><code>player</code> – player ID (optional)</li>
        </ul>
        <p class="response">{'{ scores: [...], map_data: {...}, player_data?: {...} }'}</p>
      </div>
    </section>
  
    <section>
      <h2>Player History</h2>
      <div class="endpoint">
        <p><span class="method">GET</span> <span class="url">/api/past_player_stats</span></p>
        <ul>
          <li><code>player</code> – player ID</li>
        </ul>
        <p class="response">{'{ past_pp: [...], past_rank: [...], ... }'}</p>
      </div>
    </section>
  
    <section>
      <h2>Player Scores</h2>
      <div class="endpoint">
        <p><span class="method">GET</span> <span class="url">/api/player_scores</span></p>
        <ul>
          <li><code>player</code> – player ID</li>
          <li><code>page</code> – page number</li>
          <li><code>date</code> – snapshot date</li>
          <li><code>sort</code> – one of: <code>pp</code>, <code>score</code>, <code>accuracy</code>, <code>max_combo</code>, <code>bad_cuts_or_misses</code>, <code>hardest</code>, <code>recent</code></li>
          <li><code>reverse</code> – <code>true</code>/<code>false</code></li>
          <li><code>only_ranked</code> – <code>true</code>/<code>false</code></li>
          <li><code>page_size</code> – results per page (1–100)</li>
        </ul>
        <p class="response">{'{ scores: [...] }'}</p>
      </div>
    </section>
  
    <section>
      <h2>Search Players</h2>
      <div class="endpoint">
        <p><span class="method">GET</span> <span class="url">/api/search</span></p>
        <ul>
          <li><code>text</code> – search query</li>
          <li><code>page</code> – page number</li>
          <li><code>page_size</code> – results per page</li>
        </ul>
        <p class="response">{'{ players: [...] }'}'</p>
      </div>
    </section>

    <section>
        <h2>Embeds</h2>
      
        <div class="endpoint">
          <p><span class="method">GET</span> <span class="url">/profile/[player_id]</span></p>
          <p><strong>Description:</strong> Embeds a compact view of a player's stats, score history, and progression graph.</p>
      
          <ul>
            <li><code>compact</code> – <code>true</code> to enable embed mode</li>
            <li><code>scores</code> – <code>true</code>/<code>false</code> to show top scores</li>
            <li><code>scores_sort</code> – one of:
              <code>recent</code>,
              <code>recent-duplicated</code>,
              <code>hardest</code>,
              <code>accuracy</code>,
              <code>max_combo</code>,
              <code>bad_cuts_or_misses</code>,
              <code>score</code>,
              <code>pp</code> (default)
            </li>
            <li><code>only_ranked</code> – <code>true</code>/<code>false</code> to hide unranked scores</li>
            <li><code>score_count</code> – number of scores to show (1–100)</li>
            <li><code>graph</code> – <code>true</code>/<code>false</code> to show performance graph</li>
            <li><code>settings</code> – <code>true</code>/<code>false</code> to show settings like score page or sort</li>
          </ul>
      
          <p class="response">Renders an embeddable component of player history and optionally scores/settings.</p>
          <p><strong>Example:</strong><br>
            <code>/profile/3225556157461414?compact=true&scores=true&scores_sort=recent&graph=true&settings=true&only_ranked=true&score_count=5</code>
          </p>
        </div>
      
        <div class="endpoint">
          <p><span class="method">GET</span> <span class="url">/score-improvement/[map_id]/[player_id?]</span></p>
          <p><strong>Description:</strong> Displays score improvements on a specific map. With <code>player_id</code>, shows that player's top scores. Without it, shows top scores across all players.</p>
      
          <ul>
            <li><code>compact</code> – <code>true</code> for embed mode</li>
          </ul>
      
          <p class="response">Embeds player or global top improvements on the specified map.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li><code>/score-improvement/636520/1922350521131465?compact=true</code> – Player’s score progress on map</li>
            <li><code>/score-improvement/636520?compact=true</code> – Global top scores on map</li>
          </ul>
        </div>
      </section>
  </main>