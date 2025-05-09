<script lang="ts">
    const { startDate, valueUpdate } = $props<{ startDate: Date, valueUpdate: (value: number) => void; }>()
    let dayRange: number = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    let value: number = $state(dayRange);
    
    function onChange() {
      valueUpdate(value)
    }

    onChange()

</script>



<main>
    <input type="range" min="0" max="{dayRange.toString()}" bind:value={value} on:input={onChange} class="date_slider">
</main>


<style>
  .date_slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: rgb(50, 50, 50);
    border-radius: 10px;
    max-width: calc(100% - 30px);
    margin: 15px auto;
    display: block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .date_slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: rgb(125, 125, 125);
    cursor: pointer;
  }

  .date_slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgb(125, 125, 125);;
    cursor: pointer;
  }
</style>