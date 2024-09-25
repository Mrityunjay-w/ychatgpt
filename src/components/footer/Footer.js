import React from 'react'
import './../../styles/Footer.css'
import Image from '../image/Images'

const Footer = () => {

    return (
        <div>
            <footer className='footer'>
                <img src={Image.footerLogo} alt='FooterLogo' />
                <p>&copy; 2023 Yokogawa Electric Corporation. All rights reserved.</p>
            </footer>

        </div>
    )
}

export default Footer;