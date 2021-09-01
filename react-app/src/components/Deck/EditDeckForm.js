import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDeck } from '../../store/decks'
import './Deck.css'

// TODO: Style errors section
function EditDeckForm({ deck, showThis }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState(deck.title)
    const [description, setDescription] = useState(deck.description)
    const [deckImage, setDeckImage] = useState("") // TODO: Get default image instead of using: ""

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateDeckImage = (e) => {
        setDeckImage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (title === "") setTitle(deck.title)
        const updatedDeckData = {
            title,
            description,
            deckImage
        }

        const udpatedDeck = await dispatch(updateDeck(deck.id, updatedDeckData))
        if (udpatedDeck.length) { // implies an array instead of an object
            setErrors(udpatedDeck)
        } else {
            showThis(false)
        }
    }

    return deck && deck.owner_id === user.id ? (
        <form
            className='deck-edit-form deck-form'
            onSubmit={handleSubmit}
        >
            <div>
            {/* {console.log('*** FORM ERRORS ***', errors)} */}
                {errors.map(error => (
                    <div>{error}</div>
                ))}
            </div>
            <div className='form-field-container'>
                <input
                    className='form-input'
                    type='text'
                    placeholder={deck.title}
                    value={title}
                    onChange={updateTitle}
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
            <div className='form-actions deck-form-actions'>
            <button
                type='submit'
                className='submit-btn deck-form-btn form-btn'
            >Update</button>
            <button
                type='button'
                className='cancel-btn deck-cancel-btn deck-form-btn form-btn'
                onClick={() => showThis(false)}
            >Cancel</button>
            </div>
        </form>
    ) : (
        <h1>Loading...</h1>
    )
}

export default EditDeckForm
