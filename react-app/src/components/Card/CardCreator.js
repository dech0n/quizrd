import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneDeck } from '../../store/decks'

// TODO: Create updaters for form inputs
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const [deck] = Object.values(useSelector(state => state.decks))
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState(deck.title || "")
    const [description, setDescription] = useState(deck.description || "")
    const [image, setImage] = useState(deck.image || "") // TODO: Get default image instead of using: ""

    useEffect(() => {
        dispatch(getOneDeck(deckId))
    }, [dispatch, deckId])


    return deck && deck.owner_id === user.id ? (
        <form className=''>
            <div className='form-field-container'>
                <input className='form-input' type='text' />
                <label className='form-label'>Deck Title</label>
            </div>
            <div className='form-field-container'>
                <input className='form-input' type='textarea' />
                <label className='form-label'>Deck Description</label>
            </div>
            <div className='form-field-container'>
                <input className='form-input' type='text' />
                <label className='form-label'>Deck Image</label>
            </div>
        </form>
    ) : (
        <h1>Loading...</h1>
    )
}

export default CardCreator
