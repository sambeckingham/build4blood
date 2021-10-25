<script lang="ts">
    import CardGrid from '$lib/CardGrid.svelte';
    import Deck from '$lib/Deck.svelte';
</script>

<header>
    <img class="logo" src="/build4bloodraster.webp" alt="Build 4 Blood"/>
</header>

<main>
    <div class="deck">
        <Deck />
    </div>

    <CardGrid />
</main>

<style>
    :global(body) {
        background-color: black;
        color: white;
        font-family:Arial, Helvetica, sans-serif;
    }

    header {
        display: flex;
        width: 100%;
    }

    main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 3rem 3rem;
    }

    .logo {
        width: 500px;
        margin: 0 auto;
    }

    .deck {
        grid-row: 2 / 3;
    }
</style>