import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDecks } from '../../store/decks'
import './SplashPage.css'

function SplashPage() {
    const dispatch = useDispatch()
    const decks = useSelector(state => Object.values(state.decks))

    useEffect(() => {
        dispatch(getAllDecks())
    })
    return decks ? (
        <div id='splash-container'>
            {/* Logo Image */}
            <h1>Features</h1>
            {/* Quick blurb about website */}

            <h3>Create great flashcards</h3>
            <p>Create custom decks with exactly what you want to learn.</p>
            <h3>Find great flashcards</h3>
            <p>Browse decks created by other avid learners like you.</p>
            <h3>Share your decks</h3>
            <p>Post a link to your class discussion, or tweet it to the rest of the world!</p>
            <div id='splash-decks-container'>
            <ul id='splash-decks-list'>
                {decks && decks.map(deck => (
                    <Link to={`/decks/${deck.id}/study`}>
                        <li className='splash-deck-tile'>
                            <h4>{deck.title}</h4>
                            <p>{deck.description}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    )
}

export default SplashPage
