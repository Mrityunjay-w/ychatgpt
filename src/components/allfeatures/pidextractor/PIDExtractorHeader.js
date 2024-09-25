import React, { useContext } from 'react';
import PIDExtractorThemeContext from './PIDExtractorThemeContext';
import Image from '../../image/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './../../../styles/Header.css';

const PIDExtractorHeader = () => {

    const navigate = useNavigate();

    const handleAdvanceFeaturesClick = () => {
        navigate('/actionorientedfunctionalities/advancefeature');
    }

    const { theme, toggleTheme } = useContext(PIDExtractorThemeContext);

    return (
        <div className=''>
            <div className='text-2xl '>
               
                <div className="bannerHeaderBarChart">
                    <span className="branding2"style={{marginTop:'8px'}}>Y-ChatGPT</span>
                </div>
                <div>
                    <p className="text-4xl font-semibold">
                        <span className="text-white" style={{ position: 'absolute', top: '19px' }}>P&ID Extractor</span>
                    </p>
                </div>

                <button onClick={handleAdvanceFeaturesClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '25px', position: 'fixed', top: '32px', right: '126px' }} title="Back" />
                </button>

                {/* <img alt='DarkMode' onClick={toggleTheme} src={theme === 'Image.light' ? Image.dark : Image.light} style={{ width: '38px', height: '35px', position: 'relative', cursor: 'pointer',left:'1774px',bottom:'95px'}} /> */}
            </div>

        </div>

    )
}

export default PIDExtractorHeader;