import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createCard } from '../../store/cards'

function CardForm({ deckId }) {
    const history = useHistory()
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
        setFrontImage(e.target.files[0])
    }

    const updateBackImage = (e) => {
        setBackImage(e.target.files[0])
    }

    const handleFinish = () => {
        history.push(`/decks/${deckId}/study`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const cardData = new FormData()
        cardData.append("deck_id", deckId)
        cardData.append("front_text", frontText)
        cardData.append("back_text", backText)
        cardData.append("front_image", frontImage)
        cardData.append("back_image", backImage)

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
            <h3 className='card-creator-subheader card-creator-form-header'>New Flashcard</h3>

            <div className='card-form-errors form-errors'>
                {errors.map(error => (
                    <div>{error}</div>
                ))}
            </div>
            <div
                className='form-field-container'
            >
                <textarea
                    className='form-input card-form-input'
                    type='text'
                    value={frontText}
                    onChange={updateFrontText}
                />
            </div>
            <label
                className='form-label front-card-label'
            >
                Front of flashcard
            </label>
            <div
                className='form-field-container'
            >
                <input
                    className='form-input image-input'
                    type='file'
                    accept='image/*'
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
                <textarea
                    className='form-input card-form-input card-back-input'
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
                className='form-field-container'
            >
                <input
                    className='form-input image-input'
                    type='file'
                    accept='image/*'
                    onChange={updateBackImage}
                />
                <label
                    className='form-label'
                >
                    Back image (optional)
                </label>
            </div>
            <div className='form-action-btns card-form-action-btns'>
                <button
                    className='sumbit-btn card-form-submit-btn'
                    type='submit'
                >+ Add to Deck</button>
                <button
                    id='finish-btn'
                    className='card-form-alt-btn'
                    type='button'
                    onClick={handleFinish}
                >Finish</button>
            </div>
        </form>
    )
}
export default CardForm
