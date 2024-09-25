import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';

const ImageSearchBackgroundRemover = () => {
    const [isModalOpenImageSearchBackgroundRemover, setIsModalOpenImageSearchBackgroundRemover] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/recommendersystem/imagesearchbackgroundremoverandocr') {
            setIsModalOpenImageSearchBackgroundRemover(true);
        } else {
            setIsModalOpenImageSearchBackgroundRemover(false);
        }
    }, [location]);

    const closeModalImageSearchBackgroundRemover = () => {
        setIsModalOpenImageSearchBackgroundRemover(false);
    };

    const urlImageSearchBackgroundRemover = "https://imgextractionandvideocreation.azurewebsites.net/";

    return (
        <>
            <div>

                <ReactModal
                    isOpen={isModalOpenImageSearchBackgroundRemover}
                    onRequestClose={closeModalImageSearchBackgroundRemover}
                    contentLabel="External Content Modal"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-80%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '95%'
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        }
                    }}

                >
                    <iframe title="External Content" src={urlImageSearchBackgroundRemover} width="100%" height="90%" />
                    <button onClick={closeModalImageSearchBackgroundRemover} style={{ float: 'right', border: 'none', borderRadius: '6px', backgroundColor: 'red', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '42px', width: '90px' }}>Close</button>
                </ReactModal>





            </div>

        </>
    );
};

export default ImageSearchBackgroundRemover;
