import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneDeck, updateDeck } from '../../store/decks'
import EditDeckFormModal from '../Deck/EditDeckFormModal'

// TODO: Create submit handler for deck update form
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const [deck] = Object.values(useSelector(state => state.decks))
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneDeck(deckId))
    }, [dispatch, deckId])

    return deck && deck.owner_id === user.id ? (
        <>
            <h1>{deck.title}</h1>
            <h6>{deck.description}</h6>
            <EditDeckFormModal deck={deck} />
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default CardCreator
