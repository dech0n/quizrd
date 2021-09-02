import React from 'react'

function CardPreview({ card }) {
    return (
        <>
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
        </>
    )
}

export default CardPreview
