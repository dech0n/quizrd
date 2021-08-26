import React from 'react'

function DeckManagerTable({ decks }) {
    // consider <caption> and <colgroup> elements
    return (
        <ul className='deck-manager-list'>
            {decks.map(deck => (
                <li
                    key={`${deck.id}-${deck.title}`}
                    className='deck-manager-row'>
                    <ul className='deck-manager-row-contents'>
                        <li className='deck-info'>
                            <h4>{deck.title}</h4>
                            <p>{deck.description}</p>
                            <p>Categories: ...</p>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default DeckManagerTable
