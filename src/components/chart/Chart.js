import React from "react";
import './../../styles/Chart.css'
import Image from "../image/Images";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactModal from "react-modal";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, } from 'chart.js';

import { Line } from 'react-chartjs-2';

import { Doughnut } from 'react-chartjs-2';

import ChatBotAiEnergy from "./ChatBotAiEnergy";
import axios from "axios";
import AlaramData from "./AlaramData";
import ChatBotCurrentPower from "./ChatBotCurrentPower";

// import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip, Legend,} from 'chart.js';

//----Bar chart---------
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);



const Chart = () => {

   // const img = [Image.windturbine]

    //----------Chatbot for BarChart---------------
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    //----------Chatbot for line data current and power---------------
    const [isModalOpenCurrentPower, setIsModalOpenCurrentPower] = useState(false);

    const openModalCurrentPower = () => setIsModalOpenCurrentPower(true);
    const closeModalCurrentPower = () => setIsModalOpenCurrentPower(false);

    //------Bar Chart---------------

    // const [chartData, setChartData] = useState(null);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [lineData, setlineData] = useState({
        labels: [],
        datasets: []
    });
    const [lineDataVoltage, setlineDataVoltage] = useState({
        labels: [],
        datasets: []
    });

    const [doughnutData, setDoughnutData] = useState({
        datasets: [],
    });

    const [doughnutCurrentData, setDoughnutCurrentData] = useState({
        datasets: [],
    });


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        fetchlineDataCurrentAndPower();
        fetchlineDataVoltageAndFequency();
        fetchDoughnutPowerData();
        fetchDoughnutCurrentData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://categoryconsumption.azurewebsites.net/api/avgDaily?TagNames=scr1,scr6&FromDate=2024-02-15", {
                headers: {
                    "x-functions-key": "Yokogawa@4321"
                }
            });
            if (response.data && response.data.result && Array.isArray(response.data.result)) {
                const data = response.data.result;
                const labels = data.map(item => item.TagName);
                const values = data.map(item => parseFloat(item.AverageReading));
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: "Average Readings",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(75,192,192,0.4)",
                        hoverBorderColor: "rgba(75,192,192,1)",
                        data: values
                    }]
                });
            } else {
                console.error("Data is not an array:", response.data.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const options = {
        scales: {
            x: { stacked: true },
            y: { stacked: true },
        },
    };

    //---------MultiAxis Line Chart for Current and Power--------------

    // const [lineData, setlineData] = useState(null);
    // const [loading, setLoading] = useState(false);



    const fetchlineDataCurrentAndPower = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://categoryconsumption.azurewebsites.net/api/Daily?TagNames=scr1,scr6&FromDate=2024-02-15", {
                headers: {
                    "x-functions-key": "Yokogawa@4321"
                }
            });
            const result = response.data.result;


            // const labels = result.map(item => new Date(item.TimeStamp).toLocaleDateString());
            const labels = result.map(item => item.TagName);
            const readings = result.map(item => parseFloat(item.Reading));

            setlineData({
                labels: labels,
                datasets: [
                    {
                        label: 'Readings',
                        data: readings,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        yAxisID: 'y1',
                    }
                    // Additional datasets can be added here
                ]
            });
        } catch (error) {
            console.error('Failed to fetch chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    const optionsline = {
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Reading'
                }
            }
            // Additional axes configurations can be added here
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }


    //---------MultiAxis Line Chart for Voltage And Frequency--------------



    const fetchlineDataVoltageAndFequency = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://categoryconsumption.azurewebsites.net/api/Daily?TagNames=scr1,scr6&FromDate=2024-02-15", {
                headers: {
                    "x-functions-key": "Yokogawa@4321"
                }
            });
            const result = response.data.result;


            // const labels = result.map(item => new Date(item.TimeStamp).toLocaleDateString());
            const labels = result.map(item => item.TagName);
            const readings = result.map(item => parseFloat(item.Reading));

            setlineDataVoltage({
                labels: labels,
                datasets: [
                    {
                        label: 'Readings',
                        data: readings,
                        borderColor: 'rgb(90, 54, 198)',
                        backgroundColor: 'rgba(90, 54, 198, 0.5)',
                        yAxisID: 'y1',
                    }
                    // Additional datasets can be added here
                ]
            });
        } catch (error) {
            console.error('Failed to fetch chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    const optionslinevoltage = {
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Reading'
                }
            }
            // Additional axes configurations can be added here
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }


    //--------Doughnut Chart for Power-------------

    const fetchDoughnutPowerData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://categoryconsumption.azurewebsites.net/api/avgDaily?TagNames=scr1,scr6&FromDate=2024-02-15", {
                headers: {
                    "x-functions-key": "Yokogawa@4321"
                }
            });
            const apiData = response.data.result;
            processDataForChart(apiData);
        } catch (error) {
            console.error("Error fetching chart data: ", error);
        }
    };

    const processDataForChart = (data) => {
        const labels = data.map(item => item.TagName);
        const dataPoints = data.map(item => parseFloat(item.AverageReading));

        setDoughnutData({
            labels: labels,
            datasets: [
                {
                    label: "Average Readings",
                    data: dataPoints,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#E7E9ED",
                        "#4BC0C0",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#E7E9ED",
                        "#4BC0C0",
                    ],
                    borderColor: "white",
                    borderWidth: 2,
                }
            ]
        });
    };

    const optionsDoughnutPower = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    //--------Doughnut Chart for Current-------------

    const fetchDoughnutCurrentData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://categoryconsumption.azurewebsites.net/api/avgDaily?TagNames=scr1,scr6&FromDate=2024-02-15", {
                headers: {
                    "x-functions-key": "Yokogawa@4321"
                }
            });
            const apiData = response.data.result;
            processDataForCurrent(apiData);
        } catch (error) {
            console.error("Error fetching chart data: ", error);
        }
    };

    const processDataForCurrent = (data) => {
        const labels = data.map(item => item.TagName);
        const dataPoints = data.map(item => parseFloat(item.AverageReading));

        setDoughnutCurrentData({
            labels: labels,
            datasets: [
                {
                    label: "Average Readings",
                    data: dataPoints,
                    backgroundColor: [

                        "#FFCE56",
                        "#4BC0C0",
                        "#E7E9ED",
                        "#FF6384",
                        "#36A2EB",
                    ],
                    hoverBackgroundColor: [

                        "#FFCE56",
                        "#4BC0C0",
                        "#E7E9ED",
                        "#FF6384",
                        "#36A2EB",
                    ],
                    borderColor: "white",
                    borderWidth: 2,
                }
            ]
        });
    };

    const optionsDoughnutCurrent = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };




    return (
        <div className="Chartcontainer" >
            <div className="row">


                <div className="col-3 " style={{ height: '296px', border: '1px solid gray' }}>
                    {/* <div className="col-3 "> */}
                    <div className="windImage">
                        <img className="imgWindturbine" src={Image.windturbine} alt="Wind-Turbine" />
                    </div>
                    <div className="divEnergy">
                        <p className="pEnergyConsumed">
                            <FontAwesomeIcon icon={faBolt} /> Energy Consumed per minute</p>
                    </div>


                </div>
                <div className="col-9" style={{ height: '296px', border: '1px solid gray' }}>
                    {/* <div className="col-9"> */}

                    <div className="divPEnergyConsumption">
                        <p className="pEnergyConsumption">Energy Consumption</p>
                    </div>
                    <div>
                        <div className="divChat">
                            <button className="btnChat" onClick={openModal}>
                                <FontAwesomeIcon icon={faComment} />
                            </button>

                            <ReactModal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                contentLabel="External Content Modal"
                                // overlayClassName="ReactModal__Overlay"

                            >

                                <header>
                                    <h1 style={{ color: 'rgb(0 79 154)', fontSize: '20px' }}>Ask Questions</h1>
                                </header>

                                {/* <ChatBotEnergy width="100%" height="90%" /> */}

                                <ChatBotAiEnergy chartData={chartData} width="100%" height="90%" />

                                <button onClick={closeModal} style={{ float: 'right', border: '39px', borderRadius: '6px', backgroundColor: 'red', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '27px', width: '38px', position: 'fixed', top: '60px', left: '1102px' }}>X</button>

                            </ReactModal>

                        </div>
                    </div>

                    <div className="divDateTimePicker">
                        <input type="datetime-local" id="birthdaytime" name="birthdaytime" />
                    </div>
                    <div className="divdropdownStatus">
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown link
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="divEnergyConsumptionBarchart">
                        {/* <Bar data={chartData} options={options} /> */}
                        {/* {chartData ? <Bar data={chartData} options={options} /> : <p>Loading chart data...</p>} */}
                        {loading ? <p>Loading data...</p> : (
                            <Bar data={chartData} options={options} />
                        )}
                    </div>

                </div>
                {/* <div className="col-4" style={{ height: '296px', border: '2px solid orange' }}>
                    col3
                </div>
                <div className="col-2" style={{ height: '296px', border: '2px solid green' }}>
                    col4
                </div> */}
            </div>
            <div className="row">
                <div className="col-6" style={{ height: '308px', border: '1px solid gray' }}>
                    {/* <div className="col-6"> */}

                    <div className="divCurrentPower">
                        <p className="pCurrent">
                            Current (Ampere) and Power</p>
                    </div>
                    <div className="divChatCurrentPower">
                        <button className="btnChatCurrentPower" onClick={openModalCurrentPower}>
                            <FontAwesomeIcon icon={faComment} />
                        </button>

                        <ReactModal
                            isOpen={isModalOpenCurrentPower}
                            onRequestClose={closeModalCurrentPower}
                            contentLabel="External Content Modal"
                            // overlayClassName="ReactModal__Overlay"


                        >

                            <header>
                                <h1 style={{ color: 'rgb(0 79 154)', fontSize: '20px' }}>Ask Questions</h1>
                            </header>


                            {/* <ChatBotAiEnergy chartData={chartData} width="100%" height="90%" /> */}

                            <ChatBotCurrentPower lineData={lineData} width="100%" height="90%" />


                            <button onClick={closeModalCurrentPower} style={{ float: 'right', border: '39px', borderRadius: '6px', backgroundColor: 'red', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: 'white', height: '27px', width: '38px', position: 'fixed', top: '60px', left: '1102px' }}>X</button>

                        </ReactModal>


                    </div>
                    <div className="divCurrentSave">
                        <button className="btnCurrentSave">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                    {/* <div className="divCurrentFullScreen">
                        <button className="btnCurrentFullScreen">
                            <FontAwesomeIcon icon={faExpand} />
                        </button>
                    </div> */}
                    <div className="divCurrentLineChart">
                        {/* <Line data={dataline} options={optionsline} /> */}
                        {loading ? <p>Loading data...</p> : (
                            <Line data={lineData} options={optionsline} />
                        )}
                    </div>
                </div>
                <div className="col-3" style={{ height: '308px', border: '1px solid gray' }}>
                    {/* <div className="col-3"> */}

                    <div className="divPower">
                        <p className="pPower">
                            Power</p>
                    </div>
                    <div className="divChatPower">
                        <button className="btnChatPower">
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>
                    <div className="divDoughnutPower">
                        {/* <Doughnut data={datadoughntpower} options={optionsdoughntpower} /> */}
                        {loading ? <p>Loading data...</p> : (
                            <Doughnut data={doughnutData} options={optionsDoughnutPower} />
                        )}
                    </div>
                </div>
                <div className="col-3" style={{ height: '308px', border: '1px solid gray' }}>
                    {/* <div className="col-3"> */}

                    <div className="divCurrentdougP">
                        <p className="pDoughCurrent">
                            Current</p>
                    </div>
                    <div className="divChatCurrent">
                        <button className="btnChatCurrent">
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>
                    <div className="divDoughnutPower">
                        {/* <Doughnut data={datadoughntpower} options={optionsdoughntpower} /> */}
                        {loading ? <p>Loading data...</p> : (
                            <Doughnut data={doughnutCurrentData} options={optionsDoughnutCurrent} />
                        )}
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-2" style={{ height: '452px', border: '1px solid gray' }}>
                    {/* <div className="col-2"> */}

                    <div>
                        <p className="pContactInfo">Contact Info</p>
                        <h6 className="hoffice">Office</h6>
                    </div>
                    <div>
                        <p className="pAddress">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Address</p>
                        <p className="pAddDetail">246 Bowery New York NY 10012 United States</p>
                    </div>
                    <div>
                        <p className="pPhone">
                            <FontAwesomeIcon icon={faPhone} /> Phone</p>
                        <p className="pPhoneNumber">+1112223334</p>
                    </div>
                    <div>
                        <p className="pEmail">
                            <FontAwesomeIcon icon={faEnvelope} /> Email</p>
                        <p className="pEmailAddress">support@office-center.com</p>
                    </div>
                </div>
                <div className="col-6" style={{ height: '452px', border: '1px solid gray' }}>
                    {/* <div className="col-4"> */}

                    <div className="divEnergyMeter">
                        <p className="pEnergyMeter">
                            Energy meter: Alarms</p>
                    </div>
                    <div className="divChatAlaram">
                        <button className="btnChatAlaram">
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>
                    <div className="divEnergySearch">
                        <button className="btnenergySearch">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="divEnergySave">
                        <button className="btnEnergySave">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                    {/* <div className="divEnergyScreen">
                        <button className="btnEnergyFullScreen">
                            <FontAwesomeIcon icon={faExpand} />
                        </button>
                    </div> */}
                    <div style={{ position: 'relative', bottom: '83px' }}>
                        {/* <p>No alarms found</p> */}
                        <AlaramData />
                    </div>
                </div>
                <div className="col-4" style={{ height: '452px', border: '1px solid gray' }}>
                    {/* <div className="col-4"> */}

                    <div className="divVoltageFrequency">
                        <p className="pVoltageFrequency">
                            Voltage and Frequency</p>
                    </div>
                    <div className="divChatVoltageFrequency">
                        <button className="btnChatVoltageFrequency">
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>
                    <div className="divVoltageFrequencySave">
                        <button className="btnVoltageFrequencySave">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                    {/* <div className="divVoltageFrequencyScreen">
                        <button className="btnVoltageFrequencyFullScreen">
                            <FontAwesomeIcon icon={faExpand} />
                        </button>
                    </div> */}
                    <div className="divVoltageFrequencyLineChart">
                        {/* <Line data={dataline} options={optionsline} /> */}
                        {loading ? <p>Loading data...</p> : (
                            <Line data={lineDataVoltage} options={optionslinevoltage} />
                        )}
                    </div>
                </div>
                {/* <div className="col-1" style={{ height: '296px', border: '1px solid gray' }}>
                  

                    <p className="pvltg">Voltage</p>
                    <p className="pVltgValue">229.70V</p>
                </div>
                <div className="col-1" style={{ height: '296px', border: '1px solid gray' }}>
                    

                    <p className="pFrqny">Frequency</p>
                    <p className="pFrqValue">60.90Hz</p>
                </div> */}

            </div>
        </div>
    )
}

export default Chart;