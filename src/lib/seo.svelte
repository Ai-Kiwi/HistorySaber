<!-- src/lib/SEO.svelte -->
<script lang="ts">
  export let title: string;
  export let description: string;
  export let url: string;
  export let image: string = 'https://historysaber.com/images/medium-logo.png'; // default OG image
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />

  <!-- Canonical URL -->
  <link rel="canonical" href={url} />
</svelte:head>