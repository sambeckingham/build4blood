<script lang="ts">
    import CampaignCards from '$lib/CampaignCards.json'
    import type Card from '$lib/Card'
    import Deck from './deck.svelte';

    import { deckStore } from '$lib/DeckStore'

    const cards: Card[] = CampaignCards

    let filter: string = ""
    $: filteredCards = cards.filter(card =>
        card.Name.includes(filter)
    )

    function addCard(card: Card) {
        deckStore.add(card)
    }
</script>

<header>
    <img class="logo" src="/build4bloodraster.webp" />
</header>

<main>
    <div class="cards">
        <h2>Cards</h2>
        <input type="text" bind:value="{filter}"/>
        <div class="card-grid">
        {#each filteredCards as card (card.Name)}
            <button on:click={() => addCard(card)}>{card.Name}</button>
        {/each}
        </div>
    </div>

    <div class="deck">
        <h2>Deck</h2>
        <Deck />
    </div>
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
        grid-template-columns: 1fr 1fr;
    }



    .logo {
        width: 500px;
        margin: 0 auto;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
    }

    .card-grid button {
        height: 300px;
        background: none;
        color: white;
        border: 2px lightseagreen solid ;
        border-radius: 10px

    }
</style>