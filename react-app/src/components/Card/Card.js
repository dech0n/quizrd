import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// TODO: Add conditional rendering for images
function Card({ card }) {
    const dispatch = useDispatch()
    const [flipCard, setFlipCard] = useState(true)

    return card ? (
        <>
            {/* <h1>The Current Flashcard</h1> */}
            <div
            id='study-card'
            onClick={() => setFlipCard(!flipCard)}
            >
                {flipCard ?
                    <div
                        id='study-card-front'
                        // onClick={() => setFlipCard(!flipCard)}
                    >
                        {card.front_text}
                    </div>
                    : // else
                    <div
                        id='study-card-back'
                        // onClick={() => setFlipCard(!flipCard)}
                    >
                        {card.back_text}
                    </div>
                }

            </div>
        </>
    ) : (
        <h1>Oops! Couldn't find a card.</h1>
    )
}

export default Card
