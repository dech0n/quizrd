// ACTION CONSTANTS
const LOAD = 'cards/LOAD'
const DECK_LOAD = 'cards/DECK_LOAD'
const ADD = 'cards/ADD'
const REMOVE = 'cards/REMOVE'

// ACTION CREATORS

// loads one or more cards to the state
const load = (cards) => ({
    type: LOAD,
    cards: cards
})

const deckLoad = (cards) => ({
    type: DECK_LOAD,
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
        return card
    }
}


// get all cards for a single deck
export const getDeckCards = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/cards/decks/${deckId}`)

    if (res.ok) {
        const { cards } = await res.json()
        // console.log('*** DECK CARDS - THUNK ***', cards)
        dispatch(deckLoad(cards))
        return cards
    }
}


// create a card
export const createCard = (cardData) => async (dispatch) => {
    const res = await fetch(`/api/cards/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })

    if (res.ok) {
        const card = await res.json()
        dispatch(add(card))
        return card
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An error occurred. Please try again."]
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
                ...state,
                ...allCards
            };

        case DECK_LOAD:
            const allDeckCards = {}
            if (cards) {
                cards.forEach(card => {
                    allDeckCards[card.id] = card
                })
            }

            return {
                ...allDeckCards
            };

        case ADD:
            // ensures conditional rendering in components updates properly
            if ("empty" in state) {
                delete state["empty"]
            }

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
