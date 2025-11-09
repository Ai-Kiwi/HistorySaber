<script lang="ts">
    import type { PageProps } from './$types';
    import Navbar from '$lib/navbar.svelte';
    import Footer from '$lib/footer.svelte'
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import { fade } from 'svelte/transition';

    let { children }  = $props();

    onMount(() => {
    // Basic check: only show video if screen is wider than 768px (adjust as needed)
  });
  const compact = page.url.searchParams.get('compact') === 'true';

  let scroll_y = $state(0);
</script>
  
{#if compact == false}
  <script async defer data-website-id="61d67539-1641-4e28-893c-3ddda6641e5f" src="/analytics.js"></script>  
  <main class="layout">
    {#if scroll_y < 25}
      <div transition:fade={{ duration: 150 }}>
        <Navbar />
      </div>
    {/if}
    

    <span class="hero">
        {@render children()}
    </span>


  <div class="anime-girl-area" class:moved={(scroll_y <= 25)}>
    <!--<img src="/left.png" alt="" class="anime-girl right-anime-girl">
    <img src="/right.png" alt="" class="anime-girl left-anime-girl">-->
  </div>


    <Footer />
</main>
{:else}
  {@render children()}
{/if}
  

<svelte:body class:compact={compact} />
<svelte:window bind:scrollY={scroll_y} />

<style>  

  .anime-girl-area {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    align-items: flex-start;
    transform: translateY(0);
    transition: transform 1.0s ease;
  }

  .anime-girl-area.moved {
    transform: translateY(40px);
  }


  .anime-girl {
    visibility: hidden;
    max-width: calc(((100% - 1000px) / 2)); 
    height: 1fr;
    padding: 50px;
    max-height: calc(100vh - 20%);
  }

  .left-anime-girl {
    animation: float 3s ease-in-out infinite;
    align-self: flex-start;
    padding-bottom: 20%;
    filter: drop-shadow(0px 0px 15px rgba(160, 20, 20, 0.5));
  }
  
  .right-anime-girl {
    animation: float 3s ease-in-out infinite;
    animation-delay: -0.5s;
    align-self: flex-end;
    filter: drop-shadow(0px 0px 15px rgba(20, 90, 160, 0.5));
  }

    @keyframes float {
      0% {
          transform: translateY(0);
      }

      50% {
          transform: translateY(-2%);
      }

      100% {
          transform: translateY(0);
      }
  }

  .hero {
    padding: 25px 25px;
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    margin-top: 90px;
    max-width: clamp(0px,900px,calc(100vw - 50px));
    width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    .hero {
      border-radius: 8px;
      padding: 15px 15px;
      width: 100vw;
      max-width: clamp(0px,900px,calc(100vw - 30px));
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  @media (min-width: 1500px) {
    .anime-girl {
      visibility: visible;
      max-width: calc(((100% - 900px) / 2)); 
    }
  }

  @media (min-width: 1700px) {
    .hero {
      max-width: 1100px;
    }

    .anime-girl {
      max-width: calc(((100% - 1000px) / 2)); 
    }
  }

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;  /* Ensures the layout takes the full height of the screen */
    width: 100vw;
    color: white;
    flex: 1;  /* Takes up remaining space */
  }
</style>