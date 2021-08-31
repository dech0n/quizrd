import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function DeckManagerTable({ decks, handleDelete }) {
    const history = useHistory()
    const handleClick = (deckId) => history.push(`/decks/${deckId}/cards/add`)
    return decks ? (
        <ul className='deck-manager-list'>
            {decks.map(deck => {
                const { categories } = deck
                return (
                    <li key={`${deck.id}-deck-row`}
                        className='deck-manager-row'>
                        <Link to={`/decks/${deck.id}/study`}>
                            <ul key={`${deck.id}-deck-contents`}
                                className='deck-manager-row-contents'>
                                <li key={`${deck.id}-deck-info`}
                                    className='deck-info'>
                                    <h4 key={`${deck.id}-deck-title`}
                                        className='deck-title'>{deck.title}</h4>
                                    <p key={`${deck.id}-deck-desc`}
                                        className='deck-description'>{deck.description}</p>
                                    <p key={`${deck.id}-deck-cats`}>
                                        Categories: {categories.map(category => (
                                            <span key={`${category.id}-catgry-name`}
                                                className='category-name'>
                                                {/* TODO: Format this better */}
                                                • {category.name} </span>
                                        ))}
                                    </p>
                                </li>
                            </ul>
                        </Link>
                        <li key={`${deck.id}-deck-actions`}
                            className='deck-action-buttons'>
                            <button
                                className='deck-edit-btn deck-action-btn'
                                onClick={() => handleClick(deck.id)}
                            >Edit</button>
                            <button
                                className='deck-delete-btn deck-action-btn delete-btn'
                                onClick={() => handleDelete(deck.id)}
                            >Delete</button>
                        </li>

                    </li>
                )
            })}
        </ul>
    ) : (
        <h2>Getting your decks... !</h2>
    )
}

export default DeckManagerTable
