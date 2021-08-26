import React from 'react'
import { useSelector } from 'react-redux'

import FormManagerTable from './DeckManagerTable'

// TODO: add "edit photo" button for profile pic
function HomePage() {
    const user = useSelector(state => state.session.user)
    return user ? (
        <>
            <h1>My Home Page</h1>
            <div className='deck-manager-page-container'>
                <div className='deck-manager-header'>
                    <div className='user-info-container'>
                        {/* profile pic, "Hello <username>!"  */}
                        <img src={user.image} alt='profile pic' />
                        <p>Welcome back, {user.username}!</p>
                    </div>
                    <div className='new-deck-btn-container'>
                        {/* new deck button */}
                    </div>
                </div>
                <div className='deck-manager-container'>
                    <FormManagerTable decks={user.decks}/>
                </div>
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default HomePage
