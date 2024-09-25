import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import './../../styles/Login.css';
import ReactModal from 'react-modal';

const PersonalProtectiveEquipment = () => {
    const [isModalOpenPersonalProtectiveEquipment, setIsModalOpenPersonalProtectiveEquipment] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/imagevideorecognitionservices/personalprotectiveequipment') {
            setIsModalOpenPersonalProtectiveEquipment(true);
        } else {
            setIsModalOpenPersonalProtectiveEquipment(false);
        }
    }, [location]);

    const closeModalPersonalProtectiveEquipment = () => {
        setIsModalOpenPersonalProtectiveEquipment(false);
    };

    const urlPPE = "https://personalprotectiveequipmentdetection.azurewebsites.net/";

    return (
        <>
            <div>

                <ReactModal
                    isOpen={isModalOpenPersonalProtectiveEquipment}
                    onRequestClose={closeModalPersonalProtectiveEquipment}
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
                            backgroundColor: 'rgba(0, 0, 0, 0.75)' // Optional: Add a semi-transparent background
                        }
                    }}

                >
                    <iframe title="External Content" src={urlPPE} width="100%" height="90%" />
                    <button onClick={closeModalPersonalProtectiveEquipment} style={{ float: 'right', border: 'none', borderRadius: '6px', backgroundColor: 'red', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '42px', width: '90px' }}>Close</button>
                </ReactModal>

            </div>

        </>
    );
};

export default PersonalProtectiveEquipment;
