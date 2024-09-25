// Header.js
import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Image from '../../image/Images';
import PersonalProtectiveEquipmentThemeContext from './PersonalProtectiveEquipmentThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './../../../styles/Header.css';

function PersonalProtectiveEquipmentHeader() {

    const navigate = useNavigate();

    const handleAdvanceFeaturesClick = () => {
        navigate('/actionorientedfunctionalities/advancefeature');
    }

    const [theme, setTheme] = useState('light');



    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    //  const { theme, toggleTheme } = useContext(PersonalProtectiveEquipmentThemeContext);
    return (
        <Nav class="navbar" style={{ backgroundColor: '#004F9B', height: '77px' }} >
            <Container>
                <Navbar.Brand href="#home">
                    {/* <img
                        src={Image.logoYoko}
                        height="50"
                        
                        className="w-48 h-14 mt-0 mr-2 "
                        alt="Logo"
                    /> */}

                    {/* <div className="bannerHeaderEmailGenerator">
                        <span className="branding2">Y-ChatGPT</span>
                    </div> */}

                    {/* <div className="bannerHeaderEmailGenerator mr-10 -mt-5">
                        <span className="branding2 ">Y-ChatGPT</span>
                    </div> */}
                    <div className="bannerHeaderBarChart">
                        <span className="branding2"style={{marginTop:'8px'}}>Y-ChatGPT</span>
                    </div>

                </Navbar.Brand>

              

                <p className="text-3xl font-semibold" style={{ position: 'absolute', top: '21px', right: '638px' }}>
                    <span className="text-white">Personal Protective Equipment</span>

                </p>

                <button onClick={handleAdvanceFeaturesClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '25px', position: 'absolute', top: '38px', right: '126px' }} title="Back" />
                </button>

                {/* <img
                    src={theme === 'Image.light' ? Image.dark : Image.light}
                    height="45"
                    onClick={toggleTheme}
                   
                    alt="Theme Toggle"
                    style={{ cursor: 'pointer', width: '40px',height: '35px', position: 'fixed', right: '5px', top: '30px'  }}
                /> */}


            </Container>

        </Nav>


    );
}

export default PersonalProtectiveEquipmentHeader;
