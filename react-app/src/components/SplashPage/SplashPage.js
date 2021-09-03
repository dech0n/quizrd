import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDecks } from '../../store/decks'
import splashLogo from '../../assets/images/logo-transparent.png'
import './SplashPage.css'

//! used 'hide' class on some elements
function SplashPage() {
    const dispatch = useDispatch()
    const decks = useSelector(state => Object.values(state.decks))

    useEffect(() => {
        dispatch(getAllDecks())
    }, [dispatch])

    return decks ? (
        <div id='splash-container'>
            <div id='splash-page-header'>
                <div id='splash-feature-list'>
                <h1 id='splash-header'>With Quizrd you can...</h1>
                    <div id='splash-feature-create' className='splash-feature'>
                        <h3>Create great flashcards</h3>
                        <p>Create custom decks with exactly what you want to learn.</p>
                    </div>
                    <div id='splash-feature-find' className='splash-feature'>
                        <h3>Find great flashcards</h3>
                        <p>Browse decks created by other avid learners like you.</p>
                    </div>
                    <div id='splash-feature-find' className='splash-feature'>
                        <h3>Share your flashcards</h3>
                        <p>Post a link to your class discussion, or tweet it to the rest of the world!</p>
                    </div>
                </div>
                <div id='splash-logo-container'>
                    <img src={splashLogo} alt='big-logo' id='splash-logo'/>
                </div>
            </div>
            <h2 id='splash-decks-list-header' className='hide'>Check it out...</h2>
            <div id='splash-decks-container' className='hide'>
                <div id='splash-spacer' />
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
