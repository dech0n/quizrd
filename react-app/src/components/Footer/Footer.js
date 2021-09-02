import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

// TODO: add icons
function Footer() {
    return (
        <div id='footer-container'>
            <h2 id='footer-header'>Developed with Flask &amp; React/Redux</h2>
            <h3 id='footer-me'>Dechon Ryan</h3>
            <Link id='footer-linkedin' className='footer-link' to='https://www.linkedin.com/in/dechon-r-1230097b/'>LinkedIn</Link>
            <Link id='footer-github' className='footer-link' to='https://github.com/dech0n'>GitHub</Link>
            <Link id='footer-project' className='footer-link' to='https://github.com/dech0n/quizrd'>Project Code &amp; Documentation</Link>
        </div>

    )
}

export default Footer
