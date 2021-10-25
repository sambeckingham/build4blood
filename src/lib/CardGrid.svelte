<script lang="ts">
    import type Card from '$lib/Card'
    import CampaignCards from '$lib/CampaignCards.json'
	import { addCard, deck, deckName } from '$lib/DeckStore';
    import { onMount } from 'svelte';

    onMount(async () => {
        let params = new URLSearchParams(window.location.search)

        if (params.has('deckName')) {
            deckName.update(() => params.get('deckName'))
        }

        const cards: string[] = params.getAll('card')
        cards.forEach(card => {
            let cardToAdd = CampaignCards.find(c => c.Name === card)
            if (cardToAdd) {
                addCard(cardToAdd)
            }
        })
    })

	const cards: Card[] = CampaignCards;

	let filter: string = '';
	$: filteredCards = cards.filter((card) => card.Name.includes(filter));

</script>

<div class="cards">
    <div class="search">
        <input type="text" class="search-input" bind:value={filter} placeholder="SEARCH"/>
    </div>

    <div class="card-grid">
        {#each filteredCards as card (card.Name)}
            <div class="card" class:in-deck="{$deck.includes(card)}" on:click={() => addCard(card)}>
                <h3>{card.Name}</h3>
                <p>{card["Effect Description"]}</p>
            </div>
        {/each}
    </div>
</div>


<style>
    .cards {
        grid-row: 1 / 3;
        display: grid;
        grid-template-rows: 3rem auto;
    }
    
    .search {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .search-input {
        align-self: flex-end;
        height: 2rem;
        width: 15rem;
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
    }

    .card {
        height: 15rem;
        padding: 0.5rem;
        background: none;
        color: white;
        border: 2px lightseagreen solid ;
        border-radius: 10px

    }

    .in-deck {
        border-color: red;
    }
</style>