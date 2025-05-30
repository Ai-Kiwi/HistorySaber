<script lang="ts">
	export let title = '';
	let isHovered = false;
	let x : number;
	let y : number;
	
	function mouseOver(event: { pageX: number; pageY: number; }) {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event: { pageX: number; pageY: number; }) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<div
	on:mouseover={mouseOver}
    on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="tooltip">
        {title}

    </div>
{/if}

<style>
	.tooltip {
		position: absolute;


        font-family: sans-serif;
        background-color: rgb(50, 50, 50);
        border-radius: 10px;
        padding: 5px;
        color: white;

	}
</style>