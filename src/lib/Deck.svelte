<script lang="ts">
    import { deck, deckName, removeCard } from "$lib/DeckStore";
    import { page } from "$app/stores"
    import {dndzone, overrideItemIdKeyNameBeforeInitialisingDndZones} from "svelte-dnd-action";
    import type Card from "./Card";

    overrideItemIdKeyNameBeforeInitialisingDndZones("Name");

    function handleClick(card: Card) {
        removeCard(card)
    }

    function handleConsider(e: CustomEvent<DndEvent>) {
        tempDeck = [...e.detail.items as Card[]]
    }

    function handleFinalize(e: CustomEvent<DndEvent>) {
        const newPosition = e.detail.items.findIndex(c => c.Name === e.detail.info.id)
        const oldPosition = $deck.findIndex(c => c.Name === e.detail.info.id)
        const card = $deck[oldPosition]
        
        deck.update(d => {
            d.splice(oldPosition, 1)
            d.splice(newPosition, 0, card)
            return d
        })
        tempDeck = []
    }

    function copyURL() {
        let newURL: string = window.location.origin

        if ($deck.length > 0) {
            newURL += '?'

            $deck.forEach(card => {
                newURL += `card=${card.Name}&`
            })
        }

        newURL += `deckName=${$deckName}`

        navigator.clipboard.writeText(newURL);

        shareText = "COPIED TO CLIPBOARD"
        setTimeout(() => shareText = "SHARE DECK", 4000)
    }

    let shareText: string = "SHARE DECK"
    let tempDeck: Card[] = []
    $: emptyRows = 15 - $deck.length
    $: _deck = (tempDeck.length > 0) ? tempDeck : $deck
</script>

<div class="deck">
    <button class="share-button row-2" on:click={copyURL}>{shareText}</button>

    <input type="text" class="deck-name row-2" bind:value="{$deckName}" placeholder="New Deck"/>

    <section use:dndzone="{{items: _deck}}" on:consider="{handleConsider}" on:finalize="{handleFinalize}">
        {#each _deck as card, i (card.Name)}
        <div class="row" on:click={handleClick(card)}>
            <div class="row-number">{i + 1}</div>
            <div class="card">{card.Name}</div>
        </div>
        {/each}
    </section>

    {#each Array(emptyRows) as _, i}
    <div class="row empty">
        <div class="row-number">{i + 1 + $deck.length}</div>
        <div class="card">EMPTY</div>
    </div>
    {/each}
</div>

<style>
    .deck {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 2em;
    }

    .row-2 {
        margin: 0 0 1rem 0;
        padding: 1rem;
    }

    .row {
        display: grid;
        grid-template-columns: 2.5rem auto;
        margin: 0 0 0.5rem 0;
        border: 1px solid rgba(18,18,18,1);
        
    }

    .empty {
        color: rgb(58, 59, 58);
    }

    .share-button {
        background-color: #FF0100;
        color: white;
        font-weight: 700;
        border: none;
    }

    .row-number {
        padding: 0.5rem;
        background-color: rgba(13, 15, 13,1);
        color: rgba(103, 103, 103, 1);
        text-align: center;
    }

    .empty > .row-number {
        padding: 0.5rem;
        background-color: rgba(13, 15, 13,1);
        color: rgba(58, 59, 58, 1);
        text-align: center;
    }

    .card {
        padding: 0.5rem;
        background-color: rgba(0,0,0,0.8);
        color: rgba(190, 189, 190, 1);
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }

    .empty > .card {
        color: rgb(58, 59, 58);
    }
</style>