import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneDeck } from '../../store/decks'

// TODO: Create submit handler for deck update form
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const [ deck ] = Object.values(useSelector(state => state.decks))
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deckImage, setDeckImage] = useState("") // TODO: Get default image instead of using: ""

    const updateTitle = (e) => {
        setTitle(e.target.value || deck.title)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value || deck.description)
    }

    const updateDeckImage = (e) => {
        setDeckImage(e.target.value || deck.image)
    }

    const handleSubmit = () => {
        const updateDeckData = {
            title,
            description,
            deckImage
        }

        // dispatch update thunk here
    }

    useEffect(() => {
        dispatch(getOneDeck(deckId))
    }, [dispatch, deckId])

    return deck && deck.owner_id === user.id ? (
        <form
            className='deck-edit-form'
            onSubmit={''}
            >
            <div className='form-field-container'>
                <input
                    className='form-input'
                    type='text'
                    placeholder={deck.title}
                    value={title}
                    onChange={updateTitle}
                    required
                />
                <label className='form-label'>Deck Title</label>
            </div>
            <div className='form-field-container'>
                <input
                    className='form-input'
                    type='textarea'
                    placeholder={deck.description}
                    value={description}
                    onChange={updateDescription}
                    required
                />
                <label className='form-label'>Deck Description</label>
            </div>
            <div className='form-field-container'>
                <input
                    className='form-input'
                    type='text'
                    value={deckImage}
                    onChange={updateDeckImage}
                />
                <label className='form-label'>Deck Image</label>
            </div>
            {/* <div className='form-field-container'>
                <select className='form-input'>
                {categories.map(category => (
                    <option>{category}</option>
                ))}
                </select>
                <label className='form-label'>Categories</label>
            </div> */}
            <button type='submit'>Update</button>
        </form>
    ) : (
        <h1>Loading...</h1>
    )
}

export default CardCreator
