import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createCard } from '../../store/cards'

//! 'remove' className adds `display: none` for unfinished features
function CardForm({ deckId }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [frontText, setFrontText] = useState("")
    const [backText, setBackText] = useState("")
    const [frontImage, setFrontImage] = useState(null)
    const [backImage, setBackImage] = useState(null)

    const updateFrontText = (e) => {
        setFrontText(e.target.value)
    }

    const updateBackText = (e) => {
        setBackText(e.target.value)
    }

    const updateFrontImage = (e) => {
        setFrontImage(e.target.value) //!
    }

    const updateBackImage = (e) => {
        setBackImage(e.target.value) //!
    }

    const handleFinish = () => {
        history.push(`/decks/${deckId}/study`)
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
