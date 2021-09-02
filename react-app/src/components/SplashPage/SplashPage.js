import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDecks } from '../../store/decks'

function SplashPage() {
    const dispatch = useDispatch()
    const decks = useSelector(state => Object.values(state.decks))

    useEffect(() => {
        dispatch(getAllDecks())
    })
    return decks ? (
        <>
            <h1>Splash Page</h1>
            {/* Logo Image */}
            {/* Quick blurb about website */}
            <ul>
                {decks.map(deck => (
                    <Link to={`/decks/${deck.id}/study`}>
                        <li className='splash-deck-tile'>
                            <h4>{deck.title}</h4>
                            <p>{deck.description}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}

export default SplashPage
