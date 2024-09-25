import React from "react";
//import './../../styles/Home.css'
import './../../styles/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faDownload ,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Image from "../image/Images";
import Chart from "../chart/Chart";
import { useNavigate } from "react-router-dom";

const GenDCS = () => {

    const navigate = useNavigate();

    const handleAdvanceFeaturesClick = () => {
        navigate('/actionorientedfunctionalities/advancefeature');
    }

    return (

        <>
            {/* <header className="loginHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-4 logoname">
                            <p className="pSmart">Smart office &gt; Energy Meter:Energy meter</p>
                        </div>
                        <div className="col">

                            <div className="dropdown dropdownSmart">
                                <button className="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                                    Smart Office
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            <p className="pRealTime">
                                <FontAwesomeIcon icon={faClock} /> Realtime-last day</p>


                        </div>
                        <div className="col">
                            <div className="divEditmode">
                                <p className="pEditmode">
                                    <FontAwesomeIcon icon={faPencilAlt} /> Edit mode</p>
                            </div>
                            <div className="divDownload">
                                <p className="pDownload">
                                    <FontAwesomeIcon icon={faDownload} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header> */}

            <div className='bg-[#1f4e96] text-black text-center py-4 h-20'>
                <div className='flex justify-between items-center text-2xl'>
                    {/* <img src={Image.headerlogo} alt='logo' className='w-48 h-14 mt-0 mr-2 ml-20' /> */}
                    <div className="bannerHeaderBarChart">
                        <span className="brandingFaqYoko">Y-ChatGPT</span>
                    </div>
                    <button onClick={handleAdvanceFeaturesClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '30px',position:'fixed',top:'27px',right:'51px' }} title="Back" />
                    </button>
                </div>
            </div>

            <div>
                <Chart />
            </div>
            <div>
                <footer className='footer'>
                    <img src={Image.footerLogo} alt='FooterLogo' style={{ width: '11%',position:'fixed',left:'17px'  }} />
                    <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default GenDCS;