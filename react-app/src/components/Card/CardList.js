import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
        // rerender with next card's info in fields
        // without clicking cancel
        setTimeout(() => showEditForm(false), 1)
        setTimeout(() => showEditForm(true), 2)
        setCard(card)
    }

    const handleDelete = (cardId) => {
        dispatch(deleteCard(cardId))
    }

    return cards && !("empty" in cards) ? (
        <>
            <h3 className='card-creator-subheader'>Flashcards (<span id='num-list-cards'>{cards.length}</span>)</h3>
            <ul id='deck-cards-list'>
                {cards.map(card => (
                    <div className='list-card-container'>
                        <li className='card card-creator-card list-card'>
                            <div className='list-card-text'>
                                {card.front_text}
                            </div>
                        </li>
                        <div className='list-card-actions'>
                            <button
                                className='list-card-action-btn list-card-edit-btn edit-btn action-btn'
                                type='button'
                                onClick={() => handleEditClick(card)}
                            >Edit
                            </button>
                            <button
                                className='list-card-action-btn list-card-delete-btn delete-btn action-btn'
                                type='button'
                                onClick={() => handleDelete(card.id)}
                            >Delete
                            </button>
                        </div>
                    </div>
                ))
                }
            </ul>
        </>
    ) : (
        <>
            <h1>Loading...</h1>
            <p>If the page doesn't load,<br />
            click <Link to='/'>here</Link> and try again</p>
        </>
    )
}

export default CardList
