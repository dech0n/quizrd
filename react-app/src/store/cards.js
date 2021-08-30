// ACTION CONSTANTS
const LOAD = 'cards/LOAD'
const ADD = 'cards/ADD'
const REMOVE = 'cards/REMOVE'

// ACTION CREATORS

// loads one or more cards to the state
const load = (cards) => ({
    type: LOAD,
    cards: cards
})

// adds a single card to the state
const add = (cards) => ({
    type: ADD,
    cards
})

// removes a single card from the state
const remove = (cards) => ({
    type: REMOVE,
    cards
})

// THUNK ACTIONS
// TODO: Implement error handling for each thunk

// get a single card by pk
export const getOneCard = (cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`)

    if (res.ok) {
        const card = await res.json()
        dispatch(load([card])) // must be an array for LOAD case in reducer
        // return card
    }
}


// get all cards for a single deck
export const getDeckCards = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/cards/decks/${deckId}`)

    if (res.ok) {
        const { cards } = await res.json()
        // console.log('*** DECK CARDS - THUNK ***', cards)
        dispatch(load(cards))
        // return cards
    }
}


// create a card
export const createCard = (cardData) => async (dispatch) => {
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

// update a single card by pk
export const updateCard = (cardId, cardData) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })

    if (res.ok) {
        const updatedCard = await res.json()
        dispatch(add(updatedCard))
        return updateCard
    }
}

// delete a single card by pk
export const deleteCard = (cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const card = await res.json()
        dispatch(remove(card))
        return card
    }
}


const initialState = {}

export default function cardsReducer(state = initialState, { type, cards }) {
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

        case REMOVE:
            const newState = { ...state }
            delete newState[card.id]
            return {
                ...newState
            }

        default:
            return state;
    }
}
