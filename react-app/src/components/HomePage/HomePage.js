import React from 'react'
import { useSelector } from 'react-redux'

function HomePage() {
    const user = useSelector(state => state.session.user)
    return (
        <>
            <h1>My Home Page</h1>
            <p>
                {
                    user.username
                }
            </p>
        </>
    )
}

export default HomePage
