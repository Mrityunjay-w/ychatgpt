import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from '../image/Images';
import Internal from './Internal';
import Web from './Web';

const SearchOriented = () => {
    const navigate = useNavigate();

    const handleLoginMenuClick = () => {
        navigate('/home');
    }
    return(
        <div style={{overflow:'hidden'}}>
              <header className='loginHeader'>
                <div className='container'>
                    <a>
                        <img className='headerLogo' src='assets/logo.png' alt='logo' />
                    </a>


                    <div className='buttonContainer'>

                        <button className='btnLogin' onClick={handleLoginMenuClick}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} title="Back" />

                        </button>

                    </div>
                </div>

            </header>

            <div  style={{ height: '530px'}}>
                     <button  style={{ width: '237px', height: '39px', position: 'fixed', top: '77px', left: '452px', backgroundColor: 'rgb(0, 79, 154)', borderRadius: '10px', color: 'white', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                        Search Oriented Functionalities
                     </button>
                     <div style={{ position: 'relative', top: '54px', left:'259px' }}>
                        <img src='assets/Internal.jpg' style={{ height: '202px', width: '216px' }} alt='Internal' />
                     </div>
                     <div style={{ position: 'relative', left: '589px', bottom: '162px' }}>
                        <img src='assets/Web.jpg' style={{ height: '202px', width: '195px' }} alt='Internal' />
                     </div>
                     <div>
                        <Internal />
                     </div>
                    <div>
                        <Web />
                    </div>

                  </div>

            <div>
               <footer className='footer'>
                  <img src={Image.footerLogo} alt='FooterLogo' style={{ width: '8%' }} />
                  <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
               </footer>
            </div>
        </div>
    )
}

export default SearchOriented;