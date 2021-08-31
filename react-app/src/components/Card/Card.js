import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCard } from '../../store/cards'

function Card({ cardId }) {
    const dispatch = useDispatch()
    const card = useSelector(state => state.cards[cardId])
    const [flipCard, setFlipCard] = useState(true)

    useEffect(() => {
        dispatch(getOneCard(cardId))
    }, [dispatch, cardId])

    return (
        <>
            <h1>The Current Flashcard</h1>
            <div id='study-card'>
                {flipCard ?
                    <div
                        id='study-card-front'
                        onClick={() => setFlipCard(!flipCard)}
                    >{card.front_text}</div>
                    : // else
                    <div
                        id='study-card-back'
                        onClick={() => setFlipCard(!flipCard)}
                    >{card.back_text}</div>
                }

            </div>
        </>
    )
}

export default Card
