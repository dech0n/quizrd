import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createDeck } from "../../store/decks";

// TODO: find a default image for new decks
function DeckForm() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(""/* get a default image */)
    // const [categories, setCategories] = useState([])

    // TODO: create submit handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        const deckData = {
            title,
            description,
            image,
            // categories
        }
        const newDeck = dispatch(createDeck(deckData))
        if (newDeck.errors) {
            setErrors(newDeck.errors)
        }

        // TODO: redirect to card creation page
    }

    // TODO: create update handlers for input (updateTitle, etc)
    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateImage = (e) => {
        setImage(e.target.value)
    }

    return (
        <form
        onSubmit={handleSubmit}>
            <ul className='form-errors-list deck-form-errors'>
                {errors.map((error, index) => (
                    <li key={`${index}-deck-create-error`}>
                        {error}
                    </li>
                ))}
            </ul>
            <div className='deck-field-container deck-title-container form-field-container'>
                <input
                    className='deck-form-input deck-title-input form-input'
                    type='text'
                    name='title'
                    value={title}
                    onChange={updateTitle}
                    required
                />
                <label
                    className='deck-form-label deck-title-label form-label'
                    htmlFor='title'
                >Title</label>
            </div>
            <div className='deck-field-container deck-description-container form-field-container'>
                {/* Style textarea with border-left & border-bottom only */}
                <textarea
                    className='deck-form-input deck-description-input form-input'
                    type='text'
                    name='description'
                    value={description}
                    onChange={updateDescription}
                />
                <label
                    className='deck-form-label deck-description-label form-label'
                    htmlFor='description'>Description</label>
            </div>
            <div className='deck-field-container deck-image-container form-field-container'>
                <input
                    className='deck-form-input deck-image-input form-input'
                    type='text' /* might have to change this ? */
                    name='image'
                    value={image}
                    onChange={updateImage} />
                <label
                    className='deck-form-label deck-image-label form-label'
                    htmlFor='image'
                >Image</label>
            </div>
            <div className='deck-field-container deck-form-action-container form-action-container'>
                <button
                    className='form-btn submit-btn'
                    type='submit'
                >Create</button>
                <button
                    className='form-btn cancel-btn'
                    type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default DeckForm
