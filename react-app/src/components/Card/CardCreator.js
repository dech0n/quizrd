import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getOneDeck } from '../../store/decks'
import { getDeckCards } from '../../store/cards'
import EditDeckForm from '../Deck/EditDeckForm'
import EditDeckFormModal from '../Deck/EditDeckFormModal'
import CardForm from './CardForm'
import EditCardForm from './EditCardForm'
import CardList from './CardList'
import CardPreview from './CardPreview'
import './Card.css'


/*
CARD PREVIEW logic... hopefully

CardPreview is populated by what is in the card form, so...
CardForm will either take what the user types, or...
the values from whatever card has been clicked in CardList.

useState will help with this.
*/

//! Remove 'remove' class from div#card-creator-card-preview when CardPreview is developed
function CardCreator() {
    const dispatch = useDispatch()
    const { deckId } = useParams()
    const cards = useSelector(state => state.cards)
    const deck = useSelector(state => state.decks[deckId])
    const user = useSelector(state => state.session.user)
    const [showDeckEditForm, setShowDeckEditForm] = useState(false)
    const [showCardEditForm, setShowCardEditForm] = useState(false)
    const [card, setCard] = useState()

    // const [cardId, setCardId] = useState()

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
                {/* <h1>Card Creator</h1> */}
                <div id='card-creator-cards-list'>
                    {!("empty" in cards) ? (
                        <CardList cards={Object.values(cards)} showEditForm={setShowCardEditForm} setCard={setCard} />
                    ) : (
                        <h3>There are no cards in this deck!</h3>
                    )
                    }
                </div>
                <div id='card-creator-card-preview' className='remove'>
                    <h2>Card Preview</h2>
                    <CardPreview />
                </div>
                <div id='card-creator-user-input'>
                    {showCardEditForm ?
                    // null
                    <EditCardForm card={card} setShowThis={setShowCardEditForm}/>
                    :
                    <CardForm deckId={deckId} />
                }
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
