<script lang="ts">
    const { username, user_id, rank } = $props<{ username: String, user_id: String, rank : number}>()
    let color = $state("");
    if (user_id == "76561198424686859") {
        color = "green"
    }else if (user_id == "76561198392945548") {
        color = "purple"
    }else if (rank == 1) {
        color = "diamond"
    }else if (rank < 11) {
        color = "gold"
    }else if (rank < 51) {
        color = "silver"
    }else if (rank < 101) {
        color = "bronze"
    }        


</script>


<div class="username {color}-username">
    {username}
</div>


<style>
    .diamond-username {
        background: linear-gradient(
            135deg,
            rgb(0, 140, 255) 25%,
            rgb(99, 189, 240) 50%,
            rgb(0, 140, 255) 75%
        );
    }

    .gold-username {
        background: linear-gradient(
            135deg,
            rgb(255, 184, 42) 25%,
            rgb(255, 222, 54) 50%,
            rgb(255, 184, 42) 75%
        );
    }

    .silver-username {
        background: linear-gradient(
            135deg,
            rgb(173, 173, 173) 25%,
            rgb(211, 211, 211) 50%,
            rgb(173, 173, 173) 75%
        );
    }

    .bronze-username {
        background: linear-gradient(
            135deg,
            rgb(152, 85, 8) 25%,
            rgb(176, 125, 5) 50%,
            rgb(152, 85, 8) 75%
        );
    }

    .green-username {
        background: linear-gradient(
            135deg,
            rgb(15, 219, 0) 25%,
            rgb(81, 255, 0) 50%,
            rgb(15, 219, 0) 75%
        );
    }

    .purple-username {
        background: linear-gradient(
            135deg,
            rgb(172, 0, 219) 25%,
            rgb(0, 242, 255) 50%,
            rgb(172, 0, 219) 75%
        );
    }

    .username {
        font-weight: bold;
        display: inline-block;
        color: transparent;
        margin: 5px;
        position: relative;
        background-color: white;
        animation: pulse-charge 1s linear infinite;
        background-clip: text;
        background-size: 200% 100%;
    }

    @keyframes pulse-charge {
        0% { background-position: 0 0; }
        100% { background-position: 200% 200%; }
    }
</style>




