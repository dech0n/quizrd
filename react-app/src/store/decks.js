// ACTION CONSTANTS
const LOAD = 'decks/LOAD'
const ADD = 'decks/ADD'
const REMOVE = 'decks/REMOVE'

// ACTION CREATORS
const load = (decks) => ({
    type: LOAD,
    decks
})

const add = (decks) => ({
    type: ADD,
    decks
})
const remove = (decks) => ({
    type: REMOVE,
    decks
})

// THUNK ACTIONS
// TODO: Implement error handling for each thunk
// TODO: create get thunk for single deck

// get one deck by pk
export const getOneDeck = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/decks/${deckId}`)

    if (res.ok) {
        // console.log('*** GET ONE RES ***', res)
        const deck = await res.json() // parses into object
        // console.log('** GET ONE THUNK **', deck)
        dispatch(load([deck])) // must be array for the reducer
    }
}


// get all decks owned by one user
export const getUserDecks = (userId) => async (dispatch) => {
    const res = await fetch(`/api/decks/users/${userId}`)

    if (res.ok) {
        const { decks } = await res.json()
        dispatch(load(decks))
    }
}


// get every deck in the db
export const getAllDecks = () => async (dispatch) => {
    const res = await fetch(`/api/decks`)

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
        return deck
    } else if (res.status < 500) { // error but not server error
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An error occurred. Please try again."]
    }
}


// update one deck by pk
export const updateDeck = (deckId, deckData) => async (dispatch) => {
    const res = await fetch(`/api/decks/${deckId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deckData)
    })

    if (res.ok) {
        const updatedDeck = await res.json()
        dispatch(add(updatedDeck))
        return updatedDeck
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An error occurred. Please try again."]
    }
}


// delete a specific deck by id
export const deleteDeck = (deckId) => async (dispatch) => {
    const res = await fetch(`/api/decks/${deckId}`, {
        method: 'DELETE'
    })
    // console.log('*** THUNK DELETE RES ***', res)

    if (res.ok) {
        const deck = await res.json()
        // console.log('*** THUNK DELETE DECK ***', deck)
        dispatch(remove(deck))
    }
}

// REDUCER
const initialState = {}
export default function decksReducer(state = initialState, { type, decks }) {
    // change payload name to clarify when there is only a single deck changing in state
    const deck = decks
    // console.log('*** DECKS SENT TO REDUCER ***', decks)

    switch (type) {
        case LOAD:
            const allDecks = {}
            if (decks) {
                decks.forEach(deck => {
                    // console.log('*** DECK ADDED TO STATE ***', deck)
                    allDecks[deck.id] = deck
                })
            }
            return {
                ...allDecks
            }

        case ADD:
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
            const newState = { ...state }
            delete newState[deck.id]
            return {
                ...newState
            }

        default:
            return state;
    }
}
