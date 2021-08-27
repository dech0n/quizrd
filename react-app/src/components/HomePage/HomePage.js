import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createDeck, deleteDeck, getUserDecks } from '../../store/decks'
import DeckManagerTable from './DeckManagerTable'

// TODO: add "edit photo" button for profile pic
// TODO: make sure there's a default image for profile pics (and proper updates for User model)
function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const decks = useSelector(state => state.decks)

    // TODO: click handler for New Deck button
    const handleClick = (deckId) => {
        // bring up deck creation modal
        return null
    }
    // TODO: click handler for delete (deck) button
    const handleDelete = (deckId) => {
        dispatch(deleteDeck(deckId))
    }

    useEffect(() => {
        dispatch(getUserDecks(user.id))
    }, [dispatch, user.id])

    //! for testing deck creation
    const handleSubmit = (deckData) => {
        dispatch(createDeck(deckData))
    }

    let count = 0
    const deckData = {
        title: `Test Deck ${++count}`,
        description: 'This deck tests deck creation',
        image: null,
        categories: [
            {name: 'Test'},
            {name: `Test ${count}`}
        ]
    }

    console.log('*** COMPONENT DECKS ***', decks)

    return user && decks ? (
        <>
            <h1>My Home Page</h1>
            <div className='deck-manager-page-container'>
                <div className='deck-manager-header'>
                    <div className='user-info-container'>
                        {/* profile pic, "Hello <username>!" Add # decks & # decks-learninig under username ?  */}
                        <img src={user.image} alt='profile pic' />
                        <p>Welcome back, {user.username}!</p>
                    </div>
                    <div className='new-deck-btn-container'>
                        <button onClick={() => handleSubmit(deckData)}>+ New Deck</button>
                        {/* <button onClick={() => handleSubmit(deckData)}>+ TEST DECK CREATE</button> */}
                    </div>
                </div>
                <div className='deck-manager-container'>
                    <DeckManagerTable decks={Object.values(decks)} handleDelete={handleDelete}/>
                </div>
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default HomePage
