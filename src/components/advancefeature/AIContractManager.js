import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';

const AIContractManager = () => {
    const [isModalOpenAIContractManager, setIsModalOpenAIContractManager] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/contractmanagementservices/aicontractmanager') {
            setIsModalOpenAIContractManager(true);
        } else {
            setIsModalOpenAIContractManager(false);
        }
    }, [location]);

    const closeModalAIContractManager = () => {
        setIsModalOpenAIContractManager(false);
    };

    const url = "https://aicontractmanager.azurewebsites.net/";

    return (
        <>
            <div>

                <ReactModal
                    isOpen={isModalOpenAIContractManager}
                    onRequestClose={closeModalAIContractManager}
                    contentLabel="External Content Modal"
                    style={{
                        content: {
                            top: '50%',
                           // left: '60%',
                           left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-80%',
                            transform: 'translate(-50%, -50%)',
                           // width: '70%',
                           width: '100%',
                           // height: '80%'
                            height: '95%'
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        }
                    }}

                >
                    <iframe title="External Content" src={url} width="100%" height="90%" />
                    <button onClick={closeModalAIContractManager} style={{ float: 'right', border: 'none', borderRadius: '6px', backgroundColor: 'red', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '42px', width: '90px' }}>Close</button>
                </ReactModal>



            </div>

        </>
    );
};

export default AIContractManager;
