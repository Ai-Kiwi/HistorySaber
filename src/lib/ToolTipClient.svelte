<script lang="ts">
	export let title = '';

    let hover_enabled : boolean = false

    export let updateTooltipState : Function;
	

	function mouseOver(event: { clientX: number; clientY: number; }) {
        hover_enabled = true
        updateTooltipState(true,event.clientX,event.clientY, title)
	}
	function mouseMove(event: { clientX: number; clientY: number; }) {
        if (hover_enabled) {
            updateTooltipState(true,event.clientX,event.clientY, title)
        }
	}

	function mouseLeave() {
        if (hover_enabled == true) {
            hover_enabled = false
		    updateTooltipState(false,0,0, title)
        }

	}
</script>

<div class="tooltip-parent"
	on:mouseover={mouseOver}
    on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}>
	<slot />
</div>



<style>
	.tooltip-parent {
		position: relative;
		
	}
</style>