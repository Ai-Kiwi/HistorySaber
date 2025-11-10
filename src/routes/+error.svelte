<script>
	import { page } from '$app/state';


    let message = "Error occurred"
    let subtext = "An unknown error has occurred while loading this page"

    if (page.error?.code == "invalid-leaderboard") {
        message = "Invalid Leaderboard"
        subtext = "The leaderboard input does not have any data for it. Likely this means it is not being tracked. It will start being tacked automatically within a day."
    }else if (page.error?.code == "invalid-player") {
        message = "Invalid Player"
        subtext = "The player input does not have any data for it. Likely this means they are not being tracked. They will start being tacked after they become active."
    }


</script>

<h1>{message}</h1>
<h3>{subtext}</h3>