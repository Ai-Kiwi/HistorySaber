<script lang="ts">
    import type { PageProps } from './$types';
    import Navbar from '$lib/navbar.svelte';
    import Footer from '$lib/footer.svelte'
    import { onMount } from 'svelte';
    let { children }  = $props();
    let showVideo = $state(false);

    onMount(() => {
    // Basic check: only show video if screen is wider than 768px (adjust as needed)
    if (window.innerWidth >= 768) {
      showVideo = true;
    }
    console.log(window.innerWidth)
  });

  </script>
  
  <main class="layout">
    <Navbar />
    

    <span class="hero">
        {@render children()}
    </span>
    
    {#if showVideo}
      <video preload="none" autoplay muted loop playsinline id="bg-video">
        <!--surprisingly winded up looking worse-->
        <!--<source src="background_av1.webm" type="video/webm; codecs=av01">
        <source src="background_vp9.webm" type="video/webm; codecs=vp9">-->
        <source src="background_h264.mp4" type="video/mp4">
      </video>
    {/if}

    <Footer />
  </main>
  
  
  
  
  
  <style>  

    #bg-video {
      position: fixed;
      filter: blur(15px);
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      z-index: -1;
      pointer-events: none;
    }

    .hero {
      padding: 25px 25px;
      background-color: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(20px);
      border-radius: 15px;
      margin: 20px auto;
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