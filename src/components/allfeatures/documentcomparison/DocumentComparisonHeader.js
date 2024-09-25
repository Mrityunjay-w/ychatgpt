import React, { useContext } from 'react';
import DocumentComparisonThemeContext from './DocumentComparisonThemeContext';
import Image from '../../image/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const DocumentComparisonHeader = () => {

    const navigate = useNavigate();

    const handleAdvanceFeaturesClick = () => {
        navigate('/actionorientedfunctionalities/advancefeature');
    }

    const { theme, toggleTheme } = useContext(DocumentComparisonThemeContext);

    return (
        <div className=''>
            <div className='text-2xl '>
               
                <div className="bannerHeaderDocumentComparision">
                    <span className="branding2" style={{marginTop:'0px'}}>Y-ChatGPT</span>
                </div>
                <div dir='rtl'>

                    <p className="text-3xl font-semibold ms-32 ">
                        <span className="text-white" style={{position: 'absolute', top: '21px', right: '709px'}}>Document Comparision</span>
                    </p>
                </div>

                <button onClick={handleAdvanceFeaturesClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '25px', position: 'absolute', top: '32px', right: '126px' }} title="Back" />
                </button>

                {/* <img alt='DarkMode' onClick={toggleTheme} src={theme === 'Image.light' ? Image.dark : Image.light} style={{ width: '38px', height: '35px', position: 'relative', cursor: 'pointer',left:'1774px',bottom:'99px' }} /> */}
            </div>

        </div>

    )
}

export default DocumentComparisonHeader;