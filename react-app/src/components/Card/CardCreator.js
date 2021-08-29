import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneDeck, updateDeck } from '../../store/decks'
import EditDeckForm from '../Deck/EditDeckForm'
import EditDeckFormModal from '../Deck/EditDeckFormModal'

// TODO: Create submit handler for deck update form
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const [deck] = Object.values(useSelector(state => state.decks))
    const user = useSelector(state => state.session.user)
    const [showDeckEditForm, setShowDeckEditForm] = useState(false)

    useEffect(() => {
        dispatch(getOneDeck(deckId))
    }, [dispatch, deckId])

    return deck && deck.owner_id === user.id ? (
        showDeckEditForm ? (<EditDeckForm deck={deck} hideThis={setShowDeckEditForm} />) : (
            <>
                <h1>{deck.title}</h1>
                <h6>{deck.description}</h6>
                <button
                    className='new-deck-btn'
                    id='homepage-new-deck-btn'
                    onClick={() => setShowDeckEditForm(true)}
                >Change Deck Details</button>
                {/* <EditDeckFormModal deck={deck} /> */}
            </>)
    ) : (
        <h1>Loading...</h1>
    )
}

export default CardCreator
