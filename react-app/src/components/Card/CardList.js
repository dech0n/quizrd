import React from 'react'

/*
ADD THIS CODE TO THE TOP OF THE <li.list-card> (inside)
WHEN IMAGES IMPLEMENTED:

<div id='list-card-thumbnail'>
    {card.front_image ?
        <div
            className={frontImageClasses}
        >
            {card.front_image}
        </div>
        : null
    }
</div>

*/


// TODO: Create click handler for li.card-creator-card that sets the cardId to be used in card preview.
function CardList({ cards }) {
    // for when images are implemented
    // const frontImageClasses = 'list-card-image card-creator-card-image card-creater-card-image-front'
    return (
        <>
            <h3>The Cards</h3>
            <ul id='deck-cards-list'>
                {cards.map(card => (
                    <li className='card card-creator-card list-card'>
                        <div className='list-card-text'>
                            {card.front_text}
                        </div>
                        <div className='card-front card-creator-card-front list-card'>
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
