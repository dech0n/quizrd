import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getDeckCards } from '../../store/cards';
import { getOneDeck } from '../../store/decks';
import Card from '../Card/Card.js';
import './Deck.css'

// TODO: use local storage to save user's place in the deck when they refresh
function StudyDeck() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const user = useSelector(state => state.session.user)
    const deck = useSelector(state => state.decks[deckId])
    const cards = useSelector(state => state.cards)
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

    return deck && !("empty" in cards) ? (
        <div id='deck-study-page-container'>
            <div id='deck-study-header'>
                <div id='spacer-div' />
                <div id='deck-details'>
                    <h1 id='deck-title'>{deck.title}</h1>
                    <p id='deck-description'>{deck.description}</p>
                </div>
                <div className='deck-study-actions'>
                    {user ? <button type="button">Edit</button> : null} {/* replace with Edit Deck Form Modal */}
                    <button type="button">Preview Deck</button> {/* Bring up modal to preview both sides of every card */}
                </div>
            </div>
            <div id='deck-study-flashcard'>
                <div className='study-card-action-btn-container'>
                    {cardsIndex > 0 ?
                        <button
                            id='study-card-prev-btn'
                            className='study-card-action-btn'
                            type='button'
                            onClick={handlePrev}
                        >
                            Previous
                        </button>
                        : // else
                        // invisible dead button to preserve spacing
                        <button
                            className='hidden-btn study-card-action-btn'
                        >Previous</button>
                    }
                </div>
                <Card card={Object.values(cards)[cardsIndex]} deckId={deckId} />
                <div className='study-card-action-btn-container'>
                    {cardsIndex < Object.values(cards).length - 1 ?
                        <button
                            id='study-card-next-btn'
                            className='study-card-action-btn'
                            type='button'
                            onClick={handleNext}
                        >
                            Next
                        </button>
                        :
                        // invisible dead button to preserve spacing
                        <button className='hidden-btn study-card-action-btn'
                        >
                            Next
                        </button>
                    }
                </div>
            </div>
        </div>
    ) : (
            <div id='no-cards'>
                <h2>It looks like the are no cards in this deck!</h2>
                <h3>Try adding some <Link to={`/decks/${deckId}/cards/add`}>here</Link>.</h3>
            </div>
    )
}

export default StudyDeck
