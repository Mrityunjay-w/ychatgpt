import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import './../../styles/Login.css';
import ReactModal from 'react-modal';

const SOC = () => {
    const [isModalOpenSOC, setIsModalOpenSOC] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/securityservices/customerassetsandinformationsecurity') {
            setIsModalOpenSOC(true);
        } else {
            setIsModalOpenSOC(false);
        }
    }, [location]);

    const closeModalSOC = () => {
        setIsModalOpenSOC(false);
    };

    const urlSOC = "https://ychatgpt-soc.azurewebsites.net/";

    return (
        <>
            <div>

                <ReactModal
                    isOpen={isModalOpenSOC}
                    onRequestClose={closeModalSOC}
                    contentLabel="External Content Modal"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-80%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%', // Set the width here
                            height: '95%' // Adjust the height if needed
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)' 
                        }
                    }}

                >
                    <iframe title="External Content" src={urlSOC} width="100%" height="90%" />
                    <button onClick={closeModalSOC} style={{ float: 'right', border: 'none', borderRadius: '6px', backgroundColor: 'red', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '42px', width: '90px' }}>Close</button>
                </ReactModal>

            </div>

        </>
    );
};

export default SOC;
