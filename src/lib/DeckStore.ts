import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type Card from '$lib/Card'

export const deck: Writable<Card[]> = writable([])
export const deckName: Writable<string> = writable("")

export function addCard(card: Card): void {      
    deck.update(deck => {
        if (deck.length >= 15) {
            console.log("Deck is full")
            return deck
        }
    
        if (deck.find(c => c === card)) {
            console.log("Card already in deck")
            return deck
        }

        return [...deck, card]
    })
}

export function removeCard(card: Card): void {
    deck.update(deck => {
        if (deck.find(c => c === card) == undefined) {
            console.log("Card not in deck")
            return deck
        };

        return deck.filter(c => c !== card)
    })
}

