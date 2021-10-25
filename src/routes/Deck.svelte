<script lang="ts">
    import type Card from "$lib/Card";

    import { deckStore } from "$lib/DeckStore";

    let deckCards: Card[]

    deckStore.stack.subscribe(value => {
        deckCards = value;
    })
</script>

<ol>
{#each deckCards as card}
    <li on:click={() => deckStore.remove(card)}>{card.Name}</li>
{/each}
</ol>