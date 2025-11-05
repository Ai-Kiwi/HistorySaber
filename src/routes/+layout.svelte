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

    <Footer />
</main>
{:else}
  {@render children()}
{/if}
  
  
<svelte:window bind:scrollY={scroll_y} />
  
  <style>  

    .hero {
      padding: 25px 25px;
      background-color: rgba(0, 0, 0, 0.55);
      border-radius: 15px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      margin-top: 90px;
      max-width: 1000px;
      width: 90%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
  
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;  /* Ensures the layout takes the full height of the screen */
    }
  
    main {
      font-family: "Inter", sans-serif;
      color: white;
      flex: 1;  /* Takes up remaining space */
      min-height: calc(100vh - 70px);
    }
  </style>
