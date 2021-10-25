import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type Card from '$lib/Card'

class Deck {
    stack: Writable<Card[]>;

    constructor() {
        this.stack = writable([]);
    }

    add(card: Card): void {
        let stack: Card[]
        this.stack.subscribe(value => stack = value)

        if (stack.length >= 15) {
            console.log("Deck is full")
            return
        }

        if (stack.find(c => c === card)) {
             console.log("Card already in deck")
             return
        }
            
        this.stack.update(stk => [...stk, card]);
    }

    remove(card: Card): void {
        let stack: Card[]
        this.stack.subscribe(value => stack = value)

        if (stack.find(c => c === card) == undefined) {
            console.log("Card not in deck")
        }
            
        this.stack.update(stk => stk.filter(c => c !== card));
    }
}

export const deckStore = new Deck();