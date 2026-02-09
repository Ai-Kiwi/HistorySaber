<footer>
  <div class="text-sections">
    <img src="/images/small-logo.png" alt="" class="small-logo">

    <div class="resources-row">
      <div><a href="/api">Api</a></div>
      -
      <div><a href="https://github.com/Ai-Kiwi/HistorySaber">Github</a></div>
      -
      <div><a href="/assets">Assets</a></div>
      -
      <div><a href="/credits">Credits</a></div>
      -
      <a href="mailto:contact@aikiwi.dev">Contact</a>
    </div>

    <div class="credit-row">
      © 2025-2026 HistorySaber. <br>
    </div>
  </div>
  <div class="footer-cubes">
    <img src="/images/footer-cubes.avif" alt="">
  </div>
</footer>
  
<style>
    footer {
      border-top: 1px solid rgba(25, 25, 25, 1);
      width: 100vw;
      z-index: 10;
      background-color: rgb(0, 0, 0);
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: stretch;
      align-items: stretch;
    }
    .text-sections {
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: rgb(230,230,230);
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: column;
      font-size: 1vw;
      padding: 16px;
      gap: 2px;
      flex: 1.5;
    }
    
    .small-logo {
      width: 30vw;
    }

    .resources-row {
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: row;
      gap: 15px;
      margin-bottom: 16px;
    }

    a {
      color: rgb(200, 200, 200);
      text-decoration: none;
    }

    .footer-cubes {
      display: flex;
      flex-direction: column;
      align-items: end;
      right: 0px;
      flex: 1;
    }
    .footer-cubes img {
      display: block;
      flex: 1 1 0;
      height: 100%;
      object-fit: contain; /* or cover */
    }
  </style>
