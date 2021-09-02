import React from 'react'
import { a } from 'react-router-dom'
import './Footer.css'

// TODO: add icons
function Footer() {
    return (
        <div id='footer-container'>
            <h2 id='footer-header'>Developed with Flask &amp; React/Redux</h2>
            <h3 id='footer-me'>Dechon Ryan</h3>
            <a
                rel='noreferrer'
                href='https://www.linkedin.com/in/dechon-r-1230097b/'
                target='_blank'
                id='footer-linkedin'
                className='footer-link'
            >
                LinkedIn
            </a>
            <a
                rel='noreferrer'
                href='https://github.com/dech0n'
                target='_blank'
                id='footer-github'
                className='footer-link'
            >
                GitHub
            </a>
            <a
                rel='noreferrer'
                href='https://github.com/dech0n/quizrd'
                target='_blank'
                id='footer-project'
                className='footer-link'
            >
                Project Code &amp; Documentation
            </a>
        </div>

    )
}

export default Footer
