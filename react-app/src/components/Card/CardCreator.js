import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOneDeck, updateDeck } from '../../store/decks'
import { createCard, getDeckCards } from '../../store/cards'
import EditDeckForm from '../Deck/EditDeckForm'
import EditDeckFormModal from '../Deck/EditDeckFormModal'
import './Card.css'
import CardForm from './CardForm'

// TODO: Create separate components for different parts of card creator
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    // const [deck] = Object.values(useSelector(state => state.decks))
    // const cards = Object.values(useSelector(state => state.cards))
    const cards = useSelector(state => state.cards)
    const deck = useSelector(state => state.decks[deckId])
    const user = useSelector(state => state.session.user)
    const [showDeckEditForm, setShowDeckEditForm] = useState(false)

    const frontImageClasses = 'card-image card-creator-card-image card-creater-card-image-front'
    const backImageClasses = 'card-image card-creator-card-image card-creater-card-image-back'

    // TODO: Create handleDelete for card delete buttons
    // TODO: Create handleEdit for edit buttons (or conditional render, or modal)
    // TODO: create a click handler for the Finish button (just redirect ?)



    // console.log('*** DECK IN CARD CREATOR ***', deck)
    // console.log('*** CARDS IN CARD CREATOR ***', cards)

    useEffect(() => {
        dispatch(getOneDeck(deckId)) //! causes slight delay loading additional decks when going back to homepage
        dispatch(getDeckCards(deckId))
    }, [dispatch, deckId])

    // TODO: Hide front/back image fields in form until AWS is implemented
    return deck && deck.owner_id === user.id && cards ? (
        <div id='card-creator-page-container'>
            <div id='conditional-render-deck-details-and-form'>
                {showDeckEditForm ? (
                    <EditDeckForm deck={deck} showThis={setShowDeckEditForm} />
                ) : (
                    <>
                        <div className='card-creator-header deck-details'>
                            <h1 id='deck-title'>{deck.title}</h1>
                            <h4 id='deck-description'>{deck.description}</h4>
                            {/* deck image goes here */}
                            <button
                                className='edit-deck-btn'
                                onClick={() => setShowDeckEditForm(true)}
                            >Change Deck Details</button>
                            {/* <EditDeckFormModal deck={deck} /> */}
                        </div>
                    </>
                )
                }
            </div>
            <div id='card-creator'>
                <h1>Card Creator</h1>
                <div id='cards'>
                    {!("empty" in cards) ? (
                        <>
                            <h3>The Cards</h3>
                            <ul id='deck-cards-list'>
                                {/* Only show the front of cards here -- it's just the list */}
                                {Object.values(cards).map(card => ( //!
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
                    ) : (
                        <h3>There are no cards in this deck!</h3>
                    )
                    }
                </div>
                <div id='card-preview'>
                    <h2>Card Preview</h2>
                    <h3>FRONT</h3>
                    <div className='card-preview-front'>
                        <div className='card-front card-creator-card-front'>
                            {/* {card.front_image ? <div className={frontImageClasses}>{card.front_image}</div> : null} */}
                            {/* {card.front_text} */}
                        </div>
                    </div>
                    <h3>BACK</h3>
                    <div className='card-preview-back'>
                        <div className='card-back card-creator-card-back'>
                            {/* {card.back_image ? <div className={backImageClasses}>{card.back_image}</div> : null} */}
                            {/* {card.back_text} */}
                        </div>
                    </div>
                </div>
                <div id='card-creator-user-input'>
                    <h2>Form and Buttons</h2>
                    <CardForm deckId={deckId} />
                </div>
            </div>
        </div>

    ) : (
        <>
            <h1>Loading...</h1>
            <p>If you've been waiting a while, there may have been an error.<br />Click <Link to='/'>here</Link> and try again.</p>
        </>
    )
}

export default CardCreator
