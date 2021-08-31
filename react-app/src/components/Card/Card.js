import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCard } from '../../store/cards'

function Card({cardId}) {
    const dispatch = useDispatch()
    const card = useSelector(state => state.cards[cardId])

    useEffect(() => {
        dispatch(getOneCard(cardId))
    }, [dispatch, cardId])

    return (
        <h1>The Current Flashcard</h1>
    )
}

export default Card
