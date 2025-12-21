<script>
    import Background from "$lib/background.svelte";
import Seo from "$lib/seo.svelte";


</script>

<Seo
  title="Assets - HistorySaber"
  description="Browse and download visual assets, icons, and images used on HistorySaber."
  url="https://historysaber.com/assets"
/>

<Background></Background>

<main class="global-main-content-area-window ">
    <h1>Assets used for our website</h1>
    <h3>High quality versions, for puting on websites recommend compressing</h3>
    <img src="/images/big-logo.png" alt="" class="share-image">
    <img src="/images/big-mini-logo.png" alt="" class="share-image">
</main>

<style>
    main {
      margin-top: 80px;
      margin-bottom: 100px;
      max-width: 900px;
      padding: 25px;
    }
    
    .share-image {
        width: auto;
        max-height: 150px;
        margin: auto;
        display: block;
    }
    h1 {
        font: bold 2.5rem "Inter", sans-serif;
        color: white;
        text-align: center;
    }

    h3{
        color: gray;
        text-align: center;
    }


</style>

