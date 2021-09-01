import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getDeckCards } from '../../store/cards';
import { getOneDeck } from '../../store/decks';
import Card from '../Card/Card.js';

function StudyDeck() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const user = useSelector(state => state.session.user)
    const deck = useSelector(state => state.decks[deckId])
    const cards = Object.values(useSelector(state => state.cards))
    const [cardId, setCardId] = useState()
    const [cardNum, setCardNum] = useState(1) // number within deck sequence, not card.id

    // console.log('*** STUDY DECK ***', deck)
    console.log('*** STUDY CARDS ***', cards)

    // TODO: create handleNext and handlePrev click handlers

    const handlePrev = () => {
        setCardId(cardId - 1)
        setCardNum(cardNum - 1)
    }

    const handleNext = () => {
        setCardId(cardId + 1)
        setCardNum(cardNum + 1)
    }

    useEffect(() => {
        dispatch(getOneDeck(deckId))
        dispatch(getDeckCards(deckId))
    }, [dispatch, deckId])

    return !cards["empty"] ? (
        <>
            {console.log('*** PRE CARD ID ***', cardId)}
            {console.log('*** PRE CARD ID ***', cardId)}
            <h1>Study Deck Page</h1>
            {/* Add deck tile (and desc?) somewhere */}
            <div className='deck-study-actions'>
                {user ? <button type="button">Edit</button> : null} {/* replace with Edit Deck Form Modal */}
                <button type="button">Preview Deck</button> {/* Brings up modal to preview both sides of every card */}
            </div>
            <div id='deck-study-flashcards'>
                {/***   use a separate component here ???
                 * useState above for cardId,
                 * send to flashcard component as prop,
                 * increment/decrement (setCardId) every time arrow is clicked,
                 * set conditional render:
                 *   - previous arrow: cardId > 1
                 *   - next arrow: cardId < cards.length
                 * get initial cardId from useParams (or just start at 1)   ***/}
                {/* "Previous" button here */}
                {/* render one card at a time */}
                {/* "Next" button here */}
                {cardNum > 1 ?
                    <button
                        type='button'
                        onClick={handlePrev}
                    >
                        Previous
                    </button> : null
                }
                <Card card={cards[cardId]} />
                {cardNum < cards.length ? <button
                    type='button'
                    onClick={handleNext}
                >
                    next
                </button> : null}
            </div>
        </>
    ) : (
        <>
            <h1>Loading...</h1>
            <p>If you've been waiting a while, there may have been an error.<br />Click <Link to='/'>here</Link> and try again.</p>
        </>
    )
}

export default StudyDeck
