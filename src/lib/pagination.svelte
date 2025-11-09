<script lang="ts">
    export let current_page_selected : number;
    export let current_page_size : string;
    export let pageChanged : (page : number) => void;
    export let pageSizeChanged : (size : number) => void;

    function valueUpdate() {
        pageChanged(current_page_selected)
    }

    function pageSizeUpdate() {
      pageSizeChanged(Number(current_page_size))
    }
</script>

<main>
    <div class="pagination">
        <button class="page-btn" id="prev-btn" on:click={()=>{current_page_selected -= 1; valueUpdate(); if (current_page_selected < 1) {current_page_selected = 1}}}>←</button>
        <input class="page-input" type="number" min="1" id="page-input" bind:value={current_page_selected} on:input={valueUpdate}>
        <button class="page-btn" id="next-btn" on:click={()=>{current_page_selected += 1; valueUpdate()}}>→</button>
        {#if current_page_size != ""}
          <select id="page-size" placeholder={current_page_size} bind:value={current_page_size} on:change={() => {pageSizeUpdate()}}>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        {/if}

    </div>
</main>


<style>
  .page-size{ 

  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px auto;
  }

  .page-btn {
    background-color: #444;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
  }

  .page-btn:hover {
    background-color: #666;
  }

  .page-input {
    width: 60px;
    padding: 5px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: #222;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  input[type=number] {
    -webkit-appearance: textfield;
    -moz-appearance:    textfield;
    appearance:         textfield;
    height: 30px;
  }

  /* Chrome, Safari, Edge */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #page-size {
    width: 60px;
    padding: 5px;
    font-size: 16px;
    text-align: center;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: #222;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    #page-size {
      width: 35px;
      height: 30px;
      font-size: 12px;
    }

    .page-btn {
      width: 35px;
      height: 35px;
      font-size: 10px;
    }


    .page-input {
      width: 35px;
      height: 35px;
      font-size: 15px;
      padding: 3px;
    }

  }
</style>