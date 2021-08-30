// ACTION CONSTANTS
const LOAD = 'cards/LOAD'
const ADD = 'cards/ADD'
const REMOVE = 'cards/REMOVE'

// ACTION CREATORS
const load = (cards) => ({
    type: LOAD,
    cards
})

const add = (cards) => ({
    type: ADD,
    cards
})
const remove = (cards) => ({
    type: REMOVE,
    cards
})

const initialState = {}
export default function cardsReducer(state = initialState, {type, cards}) {
    // makes it easier to denote a single card vs. multiple cards
    const card = cards

    switch (type) {
        case LOAD:
            const allCards = {}
            if (cards) {
                cards.forEach(card => {
                    allCards[card.id] = card
                })
            }

            return {
                ...allCards
            };

        default:
            return state;
    }
}
