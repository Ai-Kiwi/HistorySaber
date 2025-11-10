<script>
	let dismissed = $state(false);
  import { browser } from "$app/environment"

  if (typeof localStorage !== 'undefined') {
    dismissed = localStorage.getItem('oldScoresMissingWarningDismissed') === 'true';
    console.log(localStorage.getItem('oldScoresMissingWarningDismissed') === 'true')
  }

  function dismiss() {
    if(!browser)return;
    try {
      dismissed = true;
      localStorage.setItem('oldScoresMissingWarningDismissed', 'true');
    }catch(err) {
      console.log(err)
    }

  }
</script>


<main>
  {#if dismissed == false}
    <div class="old-data-warning">
      Please note that scores from before data collection began (May 3rd, 2025) will be largely incomplete. Additionally, due to the system not being perfect, a very small number of scores from after that date might also be missing.      <button class="dismiss-button" on:click={dismiss}>
        Dismiss
      </button>
    </div>
  {/if}

</main>

<style>
  .old-data-warning {
    font-family: sans-serif;
    padding: 15px;
    background-color: rgb(160, 0, 0);
    border-radius: 10px;
    text-align: center;
    font-size: 0.9375rem;
    width: 1fr;
    color: white;
    font-weight: bolder;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: baseline;
    transition: 0.3s;
    margin-bottom: 15px;
  }

  .old-data-warning:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    background-color: rgb(175, 0, 0);
    transition: 0.3s;
  }

  .dismiss-button {
    font-family: sans-serif;
    margin-top: 15px;
    padding: 15px;
    background-color: rgb(150, 0, 0);
    border-radius: 10px;
    text-align: center;
    font-size: 0.9375rem;
    color: white;
    font-weight: bolder;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border: 3px white solid;
    transition: 0.3s;
  }

  .dismiss-button:hover {
    background-color: rgb(200, 0, 0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
</style>