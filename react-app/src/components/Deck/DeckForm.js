import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createDeck } from "../../store/decks";

// TODO: find a default image for new decks
function DeckForm() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState(/* get a default image */)
    // const [categories, setCategories] = useState([])

    // TODO: create submit handler
    const handleSubmit = (deckData) => {
        dispatch(createDeck(deckData))
    }

    const deckData = {
        title,
        description,
        image,
        // categories
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
        <form>
            <ul className='form-errors-list deck-form-errors'>
                {/* display errors here */}
            </ul>
            <div className='deck-field-container deck-title-container'>
                <input
                    className='deck-form-input deck-title-input'
                    type='text'
                    name='title'
                    value={title}
                    onChange={updateTitle}
                />
                <label
                    className='deck-form-label deck-title-label'
                    htmlFor='title'
                    >Title</label>
            </div>
            <div className='deck-field-container deck-description-container'>
                <input
                    className='deck-form-input deck-description-input'
                    type='text'
                    name='description'
                    value={description}
                    onChange={updateDescription}
                />
                <label
                    className='deck-form-label deck-description-label'
                    htmlFor='description'>Description</label>
            </div>
            <div className='deck-field-container deck-image-container'>
                <input
                    className='deck-form-input deck-image-input'
                    type='text' {/* might have to change this ? */}
                    name='image'
                    value={image}
                    onChange={updateImage} />
                <label
                    className='deck-form-label deck-image-label'
                    htmlFor='image'
                    >Image</label>
            </div>
            <div className='deck-field-container deck-submit-container'>
                <button onSubmit={() => handleSubmit(deckData)}>Create</button>
                <button>Cancel</button>
            </div>
        </form>
    )
}
