<script lang="ts">
    const { start_date, valueUpdate } = $props<{ start_date: Date, valueUpdate: (value: number) => void; }>()
    let day_range: number = Math.floor((new Date().getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24));

    let value: number = $state(day_range);
    
    function onChange() {
      valueUpdate(value)
    }

    onChange()

</script>



<main>
    <input type="range" min="0" max="{day_range.toString()}" bind:value={value} on:input={onChange} class="date-slider">
</main>


<style>
  .date-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: rgba(50, 50, 50, 0.5);
    border-radius: 10px;
    max-width: calc(100% - 30px);
    margin: 15px auto;
    display: block;
  }

  .date-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 27.5px;
    height: 27.5px;
    border-radius: 50%; 
    background: rgb(100, 100, 100, 1);
    border: 0px;
    cursor: pointer;
  }

  .date-slider::-moz-range-thumb {
    width: 27.5px;
    height: 27.5px;
    border-radius: 50%; 
    background: rgb(100, 100, 100, 1);
    border: 0px;
    cursor: pointer;
  }

  @media (hover: hover) and (pointer: fine) {
    .user-bar {
        backdrop-filter: blur(15px) saturate(130%);
    }
  }
</style>