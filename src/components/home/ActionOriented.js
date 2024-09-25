import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from '../image/Images';
import Intranet from './Intranet';
import AssistBot from './AssistBot';


const ActionOriented = () => {
    const navigate = useNavigate();

    const handleActionOrientedMenuClick = () => {
        navigate('/home');
    }
    const handleAdvaceMenuClick = () => {
        navigate('/advancefeature');
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <header className='loginHeader'>
                <div className='container'>
                    <a>
                        <img className='headerLogo' src='assets/logo.png' alt='logo' />
                    </a>


                    <div className='buttonContainer'>

                        <button className='btnLogin' onClick={handleActionOrientedMenuClick}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} title="Back" />

                        </button>

                    </div>
                </div>

            </header>

            <div style={{ height: '530px', width: '613px' }}>
                <button style={{ width: '237px', height: '39px', position: 'fixed', top: '77px', left: '513px', backgroundColor: 'rgb(0, 79, 154)', borderRadius: '10px', color: 'white', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                    Action Oriented Functionalities
                </button>
                <div style={{ position: 'relative', top: '54px', left: '280px' }}>
                    <img src='assets/Intranet.jpg' style={{ height: '202px', width: '175px' }} alt='Internet' />
                </div>
                <div style={{ position: 'relative', left: '507px', bottom: '162px' }}>
                    <img src='assets/AssistBot.webp' style={{ height: '202px', width: '195px' }} alt='Web' />
                </div>
                <div style={{ position: 'relative', left: '748px', bottom: '373px' }}>
                    <img src='assets/AdvanceFeature.png' style={{ height: '190px', width: '195px' }} alt='AdvanceFeature' />
                </div>
                <div>
                    <Intranet />
                </div>
                <div>
                    <AssistBot />
                </div>
                <div>
                    <button onClick={handleAdvaceMenuClick} style={{ width: '182px', height: '39px', position: 'fixed', top: '331px', left: '800px', color: 'rgb(0, 79, 154)', borderRadius: '10px', backgroundColor: 'white', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Advance Features
                    </button>
                </div>

                {/* <div style={{ position: 'relative', left: '437px', bottom: '432px' }}>
                    <button style={{ width: '131px', borderRadius: '5px', border: 'none' }}>Advance Features</button>
                </div> */}

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

export default ActionOriented;