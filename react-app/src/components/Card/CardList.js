import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCard } from '../../store/cards'

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
function CardList({ cards, setCard, showEditForm }) {
    const dispatch = useDispatch()
    // for when images are implemented
    // const frontImageClasses = 'list-card-image card-creator-card-image card-creater-card-image-front'

    const handleEditClick = (card) => {
        // must use setTimeout or edit form doesn't
        // rerender with new card info
        // without clicking cancel
        setTimeout(() => showEditForm(false), 1)
        setTimeout(() => showEditForm(true), 2)
        setCard(card)
    }

    const handleDelete = (cardId) => {
        dispatch(deleteCard(cardId))
    }

    return (
        <>
            <h3>The Cards</h3>
            <ul id='deck-cards-list'>
                {cards.map(card => (
                    <li className='card card-creator-card list-card'>
                        <div className='list-card-text'>
                            {card.front_text}
                        </div>
                        <div className='list-card-actions'>
                            <button
                                type='button'
                                onClick={() => handleEditClick(card)}
                            >Edit
                            </button>
                            <button
                                type='button'
                                onClick={() => handleDelete(card.id)}
                            >Delete
                            </button>
                        </div>
                    </li>
                ))
                }
            </ul>
        </>
    )
}

export default CardList
