import React from 'react'

function DeckManagerTable({ decks }) {
    return decks ? (
        <ul className='deck-manager-list'>
            {decks.map(deck => {
                const { categories } = deck
                return (
                    <li key={`${deck.id}-deck-row`}
                        className='deck-manager-row'>
                        <ul key={`${deck.id}-deck-contents`}
                            className='deck-manager-row-contents'>
                            <li key={`${deck.id}-deck-info`}
                                className='deck-info'>
                                <h4
                                 key={`${deck.id}-deck-title`}>{deck.title}</h4>
                                <p key={`${deck.id}-deck-desc`}
                                   className='deck-description'>{deck.description}</p>
                                <p key={`${deck.id}-deck-cats`}>
                                    Categories: {categories.map(category => (
                                        <span key={`${category.id}-catgry-name`}
                                              className='category-name'>• {category.name} </span>
                                    ))}
                                </p>
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    ) : (
        <h2>loading...</h2>
    )
}

export default DeckManagerTable
