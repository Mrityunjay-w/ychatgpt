import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import './../../styles/Login.css';
import ReactModal from 'react-modal';

const TranslateYourDocs = () => {
    const [isModalOpenTranslate, setIsModalOpenTranslate] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/translationservices/translateyourdocs') {
            setIsModalOpenTranslate(true);
        } else {
            setIsModalOpenTranslate(false);
        }
    }, [location]);

    const closeModalTranslate = () => {
        setIsModalOpenTranslate(false);
    };

    const url = "https://translateyourdocs.azurewebsites.net/";

    return (
        <>
            <div>

                <ReactModal
                    isOpen={isModalOpenTranslate}
                    onRequestClose={closeModalTranslate}
                    contentLabel="External Content Modal"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            // backgroundColor:'cornsilk',
                            bottom: 'auto',
                            marginRight: '-80%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%', // Set the width here
                            height: '95%' // Adjust the height if needed
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Optional: Add a semi-transparent background

                        }
                    }}

                >



                    <iframe title="External Content" src={url} width="100%" height="90%" />
                    {/* <h5 style={{ color: 'black', fontSize: 'x-large', float: 'left', marginTop: '25px' }}>Y-ChatGPT</h5> */}
                    <button onClick={closeModalTranslate} style={{ float: 'right', border: 'none', borderRadius: '6px', backgroundColor: 'red', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '42px', width: '90px' }}>Close</button>

                

                </ReactModal>



            </div>

        </>
    );
};

export default TranslateYourDocs;
