import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard } from '../../store/cards'

//! 'remove' className adds `display: none` for unfinished features
// TODO: redirect "Finish" button to deck study page
function CardForm({ card, setShowThis }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [frontText, setFrontText] = useState(card.front_text)
    const [backText, setBackText] = useState(card.back_text)
    const [frontImage, setFrontImage] = useState(card.front_image)
    const [backImage, setBackImage] = useState(card.back_image)

    const updateFrontText = (e) => {
        setFrontText(e.target.value)
    }

    const updateBackText = (e) => {
        setBackText(e.target.value)
    }

    const updateFrontImage = (e) => {
        setFrontImage(e.target.value)
    }

    const updateBackImage = (e) => {
        setBackImage(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cardData = {
            front_text: frontText,
            back_text: backText,
            front_image: frontImage,
            back_image: backImage
        }

        const newCard = await dispatch(updateCard(card.id, cardData))
        if (newCard.length) { // implies error array vs card object
            setErrors(newCard)
        } else {
            setShowThis(false)
        }
    }
    return (
        <form
            className='card-form'
            onSubmit={handleSubmit}
        >
            <h2>Flashcard Form</h2>

            <div className='card-form-errors form-errors'>
                {errors.map(error => (
                    <div>{error}</div>
                ))}
            </div>
            <div
                className='form-field-container'
            >
                <input
                    className='form-input'
                    type='text'
                    value={frontText}
                    onChange={updateFrontText}
                />
            </div>
            <label
                className='form-label'
            >
                Front of flashcard
            </label>
            <div
                className='form-field-container remove'
            >
                <input
                    className='form-input'
                    type='text'
                    value={frontImage}
                    onChange={updateFrontImage}
                />
                <label
                    className='form-label'
                >
                    Front image (optional)
                </label>
            </div>
            <div
                className='form-field-container'
            >
                <input
                    className='form-input'
                    type='text'
                    value={backText}
                    onChange={updateBackText}
                />
                <label
                    className='form-label'
                >
                    Back of flashcard
                </label>
            </div>
            <div
                className='form-field-container remove'
            >
                <input
                    className='form-input'
                    type='text'
                    value={backImage}
                    onChange={updateBackImage}
                />
                <label
                    className='form-label'
                >
                    Back image (optional)
                </label>
            </div>
            <div className='form-action-btns card-form-action-btns'>
                <button type='submit'>Update Deck</button>
                <button type='button'>Finish</button>
            </div>
        </form>
    )
}
export default CardForm