import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'
import { getDeckCards } from '../../store/cards';
import { getOneDeck } from '../../store/decks';

function StudyDeck() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const user = useSelector(state => state.session.user)
    const deck = useSelector(state => state.decks)
    const cards = Object.values(useSelector(state => state.cards))

    // console.log('*** STUDY DECK ***', deck)
    // console.log('*** STUDY CARDS ***', cards)

    useEffect(() => {
        dispatch(getOneDeck(deckId))
        dispatch(getDeckCards(deckId))
    }, [dispatch, deckId])

    return deck && cards ? (
        <>
            <h1>Study Deck Page</h1>
            <div className='deck-study-actions'>
                {user ? <button type="button">Edit</button> : null} {/* replace with Edit Deck Form Modal */}
                <button type="button">Preview Deck</button>
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
