// ACTION CONSTANTS
const LOAD = 'cards/LOAD'
const ADD = 'cards/ADD'
const REMOVE = 'cards/REMOVE'

// ACTION CREATORS
const load = (cards) => ({
    type: LOAD,
    cards: Array.from(cards)
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
        dispatch(load(card))
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
const createCard = (cardData) => async (dispatch) => {
    const res = await fetch(`/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })

    if (res.ok) {
        const card = res.json()
        dispatch(add(card))
        return card
    }
}

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

        case ADD:
            // for a new card
            if (!state[card.id]) {
                const newState = {
                    ...state,
                    [card.id]: card
                }
                return {
                    ...newState
                }
            }

            // for an updated card
            return {
                ...state,
                [card.id]: {
                    ...state[card.id],
                    ...card
                }
            }

        default:
            return state;
    }
}
