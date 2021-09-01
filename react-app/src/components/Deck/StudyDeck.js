import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getDeckCards } from '../../store/cards';
import { getOneDeck } from '../../store/decks';
import Card from '../Card/Card.js';

// TODO: use local storage to save user's place in the deck when they refresh
function StudyDeck() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const user = useSelector(state => state.session.user)
    const deck = useSelector(state => state.decks[deckId])
    const cards = Object.values(useSelector(state => state.cards))
    const [cardId, setCardId] = useState()
    const [cardsIndex, setCardsIndex] = useState(0) // number within deck sequence, not card.id -- can be used as an index!!!! (just remember -1)

    // console.log('*** STUDY DECK ***', deck)
    console.log('*** STUDY CARDS ***', cards)

    // TODO: create handleNext and handlePrev click handlers

    const handlePrev = () => {
        setCardId(cardId - 1)
        setCardsIndex(cardsIndex - 1)
    }

    const handleNext = () => {
        setCardId(cardId + 1)
        setCardsIndex(cardsIndex + 1)
    }

    useEffect(() => {
        dispatch(getOneDeck(deckId))
        dispatch(getDeckCards(deckId))
    }, [dispatch, deckId])

    return deck && !cards["empty"] ? (
        <>
            {console.log('*** CARD ***', cards[cardsIndex - 1])}
            {console.log('*** CARD INDEX ***', cardsIndex, "-1")}
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
                {cardsIndex > 0 ?
                    <button
                        type='button'
                        onClick={handlePrev}
                    >
                        Previous
                    </button> : null
                }
                <Card card={cards[cardsIndex]} />
                {cardsIndex < deck.cards?.length ? <button
                    type='button'
                    onClick={handleNext}
                >
                    Next
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
