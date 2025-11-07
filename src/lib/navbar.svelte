<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";

    const links = [
      { name: 'Home', href: '/' },
      { name: 'Api', href: '/api' },
      { name: 'Search', href: '/search' },
      { name: 'Leaderboard', href: '/leaderboard' },
      //{ name: 'Stats', href: '/stats' },
    ];

    let Show_pages = $state(false)
    onMount(() => {
      if (window.innerWidth > 600) {
        Show_pages = true
      }
    })
  </script>

<nav>
  <div class="nav-container" style="{Show_pages == true ? 'align-items: center;' : 'align-items: center;'}">
      <!--<div class="logo">HistorySaber</div>-->
      <button class="logo-button" onclick={() => {
        Show_pages = !Show_pages
        if (window.innerWidth > 600) {
          Show_pages = true
          goto('/', { replaceState: true });
        }
      }}>
        <img src="/images/small-logo.png" alt="HistorySaber logo" class="logo">
      </button>
    {#if Show_pages == true}
      <ul>
        {#each links as link}
          <button class="logo-button" onclick={() => {
            Show_pages = !Show_pages
            if (window.innerWidth > 600) {
              Show_pages = true
            }
          }}>
            <li><a href={link.href}>{link.name}</a></li>
          </button>
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
      transform: rotateZ(-0.75deg) scale(1);
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 3);
      animation: logoPulse 3s ease-in-out infinite;
      filter: drop-shadow(0px 0px 0px #ffffff);
    }
    .logo:hover {
      filter: drop-shadow(0px 0px 3px #ffffff82); 
      transform: scale(1.01) rotateZ(-3deg);
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
      text-shadow: 0px 0px 4px #ecf0f1;
    }

    .logo-button {
      padding: 0px;
      margin: 0px;
      background-color: transparent;
      border: 0px;
      cursor: pointer;
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




  </style>
  