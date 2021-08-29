import React from 'react'

function CardCreator() {
    return (
        <form>
            <input type='text' />
            <label>Deck Title</label>
            <input type='textarea' />
            <label>Deck Description</label>
            <input type='text' />
            <label>Deck Image</label>
        </form>
    )
}

export default CardCreator
