import React, { useEffect, useState } from 'react';
import '../styles/NotFound.css'
import Image from '../../src/components/image/Images';

export default function NotFound() {
    return (
        <>
            <div class="containerError">
                <h1 className='texthead'>
                    <strong>We’re not quite sure. You can go back, or try looking on Home Page if you need a hand.</strong>
                </h1>

                <a class="alog" href="/login">Home</a>

            </div>
            <div>
                <footer className='footer'>
                    <img src={Image.footerLogo} alt='FooterLogo' style={{ width: '8%' }} />
                    <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
                </footer>
            </div>
        </>

    )
}