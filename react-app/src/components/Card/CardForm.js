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
                        <div className='card-form-errors form-errors'>
                            {errors.map(error => (
                                <div>{error}</div>
                            ))}
                        </div>
                        <input
                            type='text'
                            value={frontText}
                            onChange={updateFrontText}
                        />
                        <label>Front of flashcard</label>

                        <input
                            type='text'
                            value={frontImage}
                            onChange={updateFrontImage}
                        />
                        <label>Front image (optional)</label>

                        <input
                            type='text'
                            value={backText}
                            onChange={updateBackText}
                        />
                        <label>Back of flashcard</label>

                        <input
                            type='text'
                            value={backImage}
                            onChange={updateBackImage}
                        />
                        <label>Back image (optional)</label>

                        <button type='submit'>+ Add to Deck</button>
                        <button type='button'>Finish</button>
                    </form>
    )
}
export default CardForm
