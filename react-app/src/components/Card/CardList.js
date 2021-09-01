import React, { useState } from 'react'

// TODO: Create click handler for li.card-creator-card that sets the cardId to be used in card preview.
function CardList({ cards }) {
    const [cardId, setCardId] = useState()

    const frontImageClasses = 'card-image card-creator-card-image card-creater-card-image-front'
    return (
        <>
            <h3>The Cards</h3>
            <ul id='deck-cards-list'>
                {/* Only show the front of cards here -- it's just the list */}
                {cards.map(card => ( //!
                    <li className='card card-creator-card'>
                        <div className='card-front card-creator-card-front'>
                            {card.front_image ? <div className={frontImageClasses}>{card.front_image}</div> : null}
                            {card.front_text}
                            <button type='button'>Edit</button>
                            <button type='button'>Delete</button>
                        </div>
                    </li>
                ))
                }
            </ul>
        </>
    )
}

export default CardList
