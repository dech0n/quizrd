import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneDeck, updateDeck } from '../../store/decks'
import EditDeckForm from '../Deck/EditDeckForm'
import EditDeckFormModal from '../Deck/EditDeckFormModal'
import './Card.css'

// TODO: Create submit handler for deck update form
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const [deck] = Object.values(useSelector(state => state.decks))
    const user = useSelector(state => state.session.user)
    const [showDeckEditForm, setShowDeckEditForm] = useState(false)

    // console.log('*** DECK IN CARD CREATOR ***', deck)

    useEffect(() => {
        dispatch(getOneDeck(deckId))
    }, [dispatch, deckId])

    return deck && deck.owner_id === user.id ? (

        showDeckEditForm ? (
            <EditDeckForm deck={deck} hideThis={setShowDeckEditForm} />
        ) : (
            <>
                <div className='card-creator-header deck-details'>
                    <h1 id='deck-title'>{deck.title}</h1>
                    <h3 id='deck-descripiton'>{deck.description}</h3>
                    {/* deck image goes here */}
                    <button
                        className='edit-deck-btn'
                        onClick={() => setShowDeckEditForm(true)}
                    >Change Deck Details</button>
                    {/* <EditDeckFormModal deck={deck} /> */}
                </div>
            </>)

    ) : (
        <>
            <h1>Loading...</h1>
            <p>If you've been waiting a while, this deck may not belong to you</p>
        </>
    )
}

export default CardCreator
