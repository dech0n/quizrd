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
    const cards = useSelector(state => Object.values(state.cards))
    const [cardsIndex, setCardsIndex] = useState(0)

    // console.log('*** STUDY DECK ***', deck)
    // console.log('*** STUDY CARDS ***', cards)

    const handlePrev = () => {
        setCardsIndex(cardsIndex - 1)
    }

    const handleNext = () => {
        setCardsIndex(cardsIndex + 1)
    }

    useEffect(() => {
        dispatch(getOneDeck(deckId))
        dispatch(getDeckCards(deckId))
    }, [dispatch, deckId])

    return deck && cards ? (
        <>
            <div id='deck-study-header'>
                <div id='deck-details'>
                    <h1>{deck.title}</h1>
                    <p>{deck.description}</p>
                </div>
                <div className='deck-study-actions'>
                    {user ? <button type="button">Edit</button> : null} {/* replace with Edit Deck Form Modal */}
                    <button type="button">Preview Deck</button> {/* Bring up modal to preview both sides of every card */}
                </div>
            </div>
            <div id='deck-study-flashcards'>
                {cardsIndex > 0 ?
                    <button
                        type='button'
                        onClick={handlePrev}
                    >
                        Previous
                    </button>
                    : // else
                    // invisible dead button to preserve spacing
                    <button className='hidden-btn'>Previous</button>
                }
                <Card card={cards[cardsIndex]} deckId={deckId} />
                {cardsIndex < cards.length - 1 ? <button
                    type='button'
                    onClick={handleNext}
                >
                    Next
                </button>
                    :
                    // invisible dead button to preserve spacing
                    <button className='hidden-btn'>Next</button>
                }
            </div>
        </>
    ) : (
        <>
            <h3>Loading...</h3>
            <p>There may not be any cards in this deck.<br />
                Try editing it <Link to={`/decks/${deckId}/cards/add`}>here</Link>.</p>
        </>
    )
}

export default StudyDeck
