import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCard } from '../../store/cards'

function CardForm({ deckId }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [frontText, setFrontText] = useState("")
    const [backText, setBackText] = useState("")
    const [frontImage, setFrontImage] = useState("")
    const [backImage, setBackImage] = useState("")

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
            deck_id: deckId,
            front_text: frontText,
            back_text: backText,
            front_image: frontImage,
            back_image: backImage
        }

        const newCard = await dispatch(createCard(cardData))
        if (newCard.length) {
            setErrors(newCard)
        } else {
            setFrontText("")
            setFrontImage("")
            setBackText("")
            setBackImage("")
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
                className='form-field-container'
            >
                <input
                    className='form-input'
                    type='text'
                    value={frontImage}
                    onChange={updateFrontImage}
                />
            </div>
            <label
                className='form-label'
            >
                Front image (optional)
            </label>
            <div
                className='form-field-container'
            >
                <input
                    className='form-input'
                    type='text'
                    value={backText}
                    onChange={updateBackText}
                />
            </div>
            <label
                className='form-label'
            >
                Back of flashcard
            </label>
            <div
                className='form-field-container'
            >
                <input
                    className='form-input'
                    type='text'
                    value={backImage}
                    onChange={updateBackImage}
                />
            </div>
            <label
                className='form-label'
            >
                Back image (optional)
            </label>
            <div className='form-action-btns card-form-action-btns'>
                <button type='submit'>Update Deck</button>
                <button type='button'>Finish</button>
            </div>
        </form>
    )
}
export default CardForm
