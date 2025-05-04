<script lang="ts">
    import type { PageProps } from './$types';
    import Navbar from '$lib/navbar.svelte';
    import Footer from '$lib/footer.svelte'
    let { children }  = $props();
    
  </script>
  
  <main class="layout">
    <Navbar />
    
    
    <span class="hero">
        {@render children()}
    </span>
    
    <Footer />
  </main>
  
  
  
  
  
  <style>  
    .hero {
      padding: 25px 25px;
      background-color: #1e1e1e;
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
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #1abc9c;
      white-space: nowrap;
      text-align: center;
      margin-bottom: 35px;
      font-size: 100px;
    }
  
  
  </style>