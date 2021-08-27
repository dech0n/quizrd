import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import authenticate from '../../store/session'
import DeckManagerTable from './DeckManagerTable'

// TODO: add "edit photo" button for profile pic
// TODO: make sure there's a default image for profile pics (and proper updates for User model)
function HomePage() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    // TODO: click handler for New Deck button
    // TODO: useEffect for rerender after New Deck created

    return user ? (
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
                        <button>+ New Deck</button>
                    </div>
                </div>
                <div className='deck-manager-container'>
                    <DeckManagerTable decks={user.decks}/>
                </div>
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default HomePage
