import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getDeckCards } from '../../store/cards';
import { getOneDeck } from '../../store/decks';
import Card from '../Card/Card.js';

// TODO: use local storage to save user's place in the deck when they refresh
// TODO: figure out why state update is delayed. Maybe need to create a new case where existing state and new items are loaded (excl getUserDecks)
function StudyDeck() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const user = useSelector(state => state.session.user)
    const deck = useSelector(state => state.decks[deckId])
    const cards = Object.values(useSelector(state => state.cards))
    const [cardId, setCardId] = useState()
    const [cardsIndex, setCardsIndex] = useState(0) // number within deck sequence, not card.id -- can be used as an index!!!! (just remember -1)

    // console.log('*** STUDY DECK ***', deck)
    // console.log('*** STUDY CARDS ***', cards)

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

    return !cards["empty"] ? (
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
                {cardsIndex > 0 ?
                    <button
                        type='button'
                        onClick={handlePrev}
                    >
                        Previous
                    </button> : null
                }
                <Card card={cards[cardsIndex]} />
                {cardsIndex < cards.length - 1 ? <button
                    type='button'
                    onClick={handleNext}
                >
                    Next
                </button> : null}
            </div>
        </>
    ) : (
        <>
            <h3>There aren't any cards in this deck!</h3>
            <p>Try adding a few <Link to={`/decks/${deck.id}/cards/add`}>here</Link>.</p>
        </>
    )
}

export default StudyDeck
