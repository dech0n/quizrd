import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard } from '../../store/cards'

//! 'remove' className adds `display: none` for unfinished features
// TODO: redirect "Finish" button to deck study page
function EditCardForm({ card, setShowThis }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [frontText, setFrontText] = useState(card.front_text)
    const [backText, setBackText] = useState(card.back_text)
    const [frontImage, setFrontImage] = useState(card.front_image)
    const [backImage, setBackImage] = useState(card.back_image)

    // useEffect(() => {

    // }, [card])

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

    const handleCancel = () => {
        setShowThis(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cardData = new FormData()
        cardData.append("front_text", frontText)
        cardData.append("back_text", backText)
        cardData.append("front_image", frontImage)
        cardData.append("back_image", backImage)

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
            <h3 className='card-creator-subheader card-creator-form-header'>Edit Flashcard</h3>

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
                    className='card-form-submit-btn'
                    type='submit'>Update Card</button>
                <button
                    className='cancel-btn card-form-cancel-btn card-form-alt-btn'
                    type='button'
                    onClick={handleCancel}
                >Cancel</button>
            </div>
        </form>
    )
}
export default EditCardForm
