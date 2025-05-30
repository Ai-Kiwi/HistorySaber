<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";

    const links = [
      { name: 'Home', href: '/' },
      { name: 'Api', href: '/api' },
      { name: 'Search', href: '/search' },
      { name: 'Leaderboard', href: '/leaderboard' },
      //{ name: 'Stats', href: '/stats' },
    ];

    let ShowPages = $state(false)
    onMount(() => {
      if (window.innerWidth > 600) {
        ShowPages = true
      }
    })
  </script>

<nav>
  <div class="nav-container" style="{ShowPages == true ? 'align-items: center;' : 'align-items: center;'}">
    <a href="/">
      <!--<div class="logo">History Saber</div>-->
      <button class="logo-button" onclick={() => {
        ShowPages = !ShowPages
        if (window.innerWidth > 600) {
          ShowPages = true
        }
      }}>
        <img src="/images/small-logo.png" alt="HistorySaber logo" class="logo">
      </button>
    </a>
    {#if ShowPages == true}
      <ul>
        {#each links as link}
          <li><a href={link.href}>{link.name}</a></li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>
  
  <style>
    /* Ensure all elements inside the nav don't exceed screen width */
    *, *::before, *::after {
      box-sizing: border-box;
    }
  
    nav {
      background-color: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(25px);
      color: #fff;
      padding: 15px 20px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
    }
  
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow-x: hidden; /* Prevents horizontal overflow */
      padding: 0 10px; /* Prevents too much space on the sides */
    }
  
    .logo {
      max-width: 100%;
      max-height: 100%;
      height: 40px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #1abc9c;
      white-space: nowrap;
    }

    a {
      text-decoration: none;
    }
  
    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin: 0;
      padding: 0;
      overflow: hidden; /* Prevents items from overflowing */
    }
  
    li a {
      text-decoration: none;
      color: #ecf0f1;
      font-size: 1rem;
      transition: color 0.3s;
      white-space: nowrap;
    }
  
    li a:hover {
      color: #1abc9c;
    }
    
    @media (max-width: 600px) {
      ul {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 10px;
        margin-top: 10px;
      }
    }

    .logo-button {
      padding: 0px;
      margin: 0px;
      background-color: transparent;
      border: 0px;
      cursor: pointer;
    }


  </style>
  