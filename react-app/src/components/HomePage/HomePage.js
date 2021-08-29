import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteDeck, getUserDecks } from '../../store/decks'
import DeckFormModal from '../Deck/DeckFormModal'
import DeckManagerTable from './DeckManagerTable'
import './HomePage.css'

// TODO: add "edit photo" button for profile pic
// TODO: make sure there's a default image for profile pics (and proper updates for User model)
// TODO: add default image for decks
// TODO: create confirmation modal for delete before deleting
// TODO: GET AWS INTEGRATED or whatever FOR PHOTOS (& AUDIO ??)
// TODO: add share feature for decks
function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const decks = useSelector(state => state.decks)

    // TODO: click handler for delete (deck) button
    const handleDelete = (deckId) => {
        dispatch(deleteDeck(deckId))
    }

    useEffect(() => {
        dispatch(getUserDecks(user.id))
    }, [dispatch, user.id])

    // console.log('*** COMPONENT DECKS ***', decks)

    return user && decks ? (
        <>
            <div className='homepage-container'>
                <div className='homepage-header'>
                    <div className='user-info-container'>
                        <img className='profile-pic' src={user.image} alt='profile pic' />
                        <p>Welcome back, <span id='current-user'>{user.username}</span>!</p>
                        <p>Decks Created ({Object.values(decks).length})</p>
                    </div>
                    <div className='new-deck-btn-container'>
                        <DeckFormModal />
                    </div>
                </div>
                <div className='deck-list-container'>
                    <div className='deck-manager-table-container'>
                        <DeckManagerTable decks={Object.values(decks)} handleDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default HomePage
