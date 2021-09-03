import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// TODO: Add conditional rendering for images
function Card({ card, deckId }) {
    const dispatch = useDispatch()
    const [flipCard, setFlipCard] = useState(true)

    useEffect(() => {
        setFlipCard(true)
    }, [card])

    return card ? (
        <>
            {/* <h1>The Current Flashcard</h1> */}
            <div
                id='study-card'
                onClick={() => setFlipCard(!flipCard)}
            >
                {flipCard ?
                    <div id='study-card-front' className='study-card-content'>
                        <p className='study-card-text'>
                            {card.front_text}
                        </p>
                    </div>
                    : // else
                    <div id='study-card-back' className='study-card-content'>
                        <p className='study-card-text'>
                            {card.back_text}
                        </p>
                    </div>
                }

            </div>
        </>
    ) : (
        <div id='no-cards'>
            <h2>It looks like the are no flashcards in this deck!</h2>
            <h3>Try adding some <Link to={`/decks/${deckId}/cards/add`}>here</Link>.</h3>
        </div>
    )
}

export default Card
