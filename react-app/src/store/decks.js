// ACTION CONSTANTS
const LOAD = 'decks/LOAD'
const ADD = 'decks/ADD'
const REMOVE = 'decks/REMOVE'

// ACTION CREATORS
const load = (decks) => ({
    action: LOAD,
    decks
})

const add = (decks) => ({
    action: ADD,
    decks
})
const remove = (decks) => ({
    action: REMOVE,
    decks
})

// THUNK ACTIONS
// TODO: Implement error handling for each thunk
// TODO: create get thunk for single deck

// get every deck in the db
export const getAllDecks = () => async (dispatch) => {
    const res = await fetch(`/api/decks`)

    if (res.ok) {
        const { decks } = await res.json()
        dispatch(load(decks))
    }
}


// get all decks owned by one user
export const getUserDecks = (userId) => async (dispatch) => {
    const res = await fetch(`/api/decks/${userId}`)

    if (res.ok) {
        const { decks } = await res.json()
        dispatch(load(decks))
    }
}

// create a deck
export const createDeck = (deckData) => async (dispatch) => {
    const res = await fetch(`/api/decks/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deckData)
    })

    if (res.ok) {
        const deck = await res.json()
        dispatch(add(deck))
    }
}

// delete a specific deck by id
export const deleteDeck = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/decks/${deckId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deck = await res.json()
        dispatch(remove(deck))
    }
}

// REDUCER
const initialState = {}
export default function decksReducer(state = initialState, {type, decks}) {
    switch (type) {
        case LOAD:
            const allDecks = {}
            decks.forEach(deck => {
                allDecks[deck.id] = deck
            })

            return {
                ...state,
                ...allDecks
            }

        case ADD:
            const deck = decks // to clarify this is a single deck
            // if this is a new deck
            if (!state[deck.id]) {
                const newState = {
                    ...state,
                    [deck.id]: deck
                }
                return {
                    ...newState
                }
            }
            // when editing an existing deck
            return {
                ...state,
                [deck.id]: { // reassign the existing key
                    ...state[deck.id], // load the existing data
                    ...deck // overwrite with the new data
                }
            }

        case REMOVE:
            const newState = {...state}
            delete newState[deck.id]
            return {
                ...newState
            }

        default:
            return state;
    }
}
