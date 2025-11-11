<script lang="ts">
	export let title = '';

	export let tooltop_x : number;
	export let tooltop_y: number;
	
</script>

<main>
	<div class="tooltip" style="top: {tooltop_y}px; left: {tooltop_x}px">
		{title}
	</div>
</main>





<style>
	.tooltip {
		position: fixed;

        font-family: sans-serif;
		box-shadow: 0px 0px 5px rgba(0,00, 0,0.5);
        background-color: rgb(35, 35, 35);
        border-radius: 10px;
        padding: 5px;
        color: white;
		z-index: 3;
		margin: 15px;
	}
</style>