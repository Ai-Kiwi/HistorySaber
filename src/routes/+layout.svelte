<script lang="ts">
    import { page } from '$app/state';
    import Background from '$lib/background.svelte';
    import Footer from '$lib/footer.svelte';
    import Navbar from '$lib/navbar.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

	let { children } = $props();

	let scroll_y = $state(0);
    let compact = page.url.searchParams.get('compact') === 'true';
    
	function handleScroll() {
		scroll_y = window.scrollY; // or document.documentElement.scrollTop
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

</script>

{#if compact == true}
    {@render children()}
{:else}
<main>
    
    
    {#if scroll_y < 25}
        <div class="nav-div" transition:fade={{ duration: 150 }}>
            <Navbar />
        </div>
    {/if}

    <div class="main-content">
        <div class="side-content">
            
        </div>
        <div class="center-content">

        </div>
        {@render children()}
        <div class="side-content">
            
        </div>

    </div>

    
    <Footer></Footer>
</main>

{/if}


<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    main::before {
        
    }


    .nav-div {
        width: 100vw;
        height: 0px;
        position: static;
    }



    .main-content{
        display: flex;
        flex-direction: row;
        width: 100vw;
        min-height: 100vh;
        align-items: center;
        justify-content: space-evenly;
    }

    .center-content {
        flex: 0 0 auto;
    }

    .side-content {
        flex: 1 1 0px;
        min-width: 0;
    }
</style>