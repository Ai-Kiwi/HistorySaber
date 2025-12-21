<script>

</script>

<main>
    <div class="background-mascots">
        <img src="/images/left.webp" alt="" class="mascot left-mascot">
        <img src="/images/right.webp" alt="" class="mascot right-mascot">
    </div>
    <div class="neon-overlay"></div>
</main>


<style>
    main {
        z-index: -5;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
    }

    .neon-overlay {
        width: 100vw;
        height: 100vh;
        background: 
        radial-gradient(circle at right bottom,rgba(10, 45, 80, 1) 0%, rgba(15, 15, 15, 0.25) 75%, rgba(15, 15, 15, 0) 100%),
        radial-gradient(circle at left bottom,rgba(80, 10, 10, 1) 0%, rgba(15, 15, 15, 0.25) 75%, rgba(15, 15, 15, 0) 100%);
        background-blend-mode: color;
        backdrop-filter: blur(2.5px);
    }

    .background-mascots {
        width: 100vw;
        height: 100vh;
        z-index: -10;
        position: absolute;
        
        
    }

    .main-content {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }

    .mascot {
        position: absolute;
        top: 50%;
        width: 25vw;
        padding: 5vw;
        transform: translateY(-50%);
        filter: blur(15px);
        
    }

    .left-mascot {
        left: 0px;
        z-index: 0;
        animation: float 3s ease-in-out infinite;
        filter: drop-shadow(0px 0px 15px rgba(160, 20, 20, 0.25));
    }
    
    .right-mascot {
        right: 0px;
        z-index: 0;
        animation: float 3s ease-in-out infinite;
        animation-delay: -0.5s;
        filter: drop-shadow(0px 0px 15px rgba(20, 90, 160, 0.25));
    }
</style>