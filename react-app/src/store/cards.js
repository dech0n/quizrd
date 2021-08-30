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

// THUNK ACTIONS
// TODO: Implement error handling for each thunk

// get a single card by pk
const getOneCard = (cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`)

    if (res.ok) {
        const card = await res.json()
        dispatch(load([card])) // must be array for the reducer
        // return card
    }
}

// get all cards for a single deck
const getDeckCards = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/cards/decks/${deckId}`)

    if (res.ok) {
        const {cards} = res.json()
        dispatch(load(cards))
        // return cards
    }
}
// create a card

// delete a single card by pk

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
