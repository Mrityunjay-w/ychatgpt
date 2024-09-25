import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './../../styles/Login.css'
import axios from 'axios';
import Image from '../image/Images';
import { FaHome } from 'react-icons/fa';
import YearDropdown from './YearDropdown';
import { useState } from 'react';
import './../../styles/Header.css';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

    const navigate = useNavigate();


    const handleHomeMenuClick = () => {
        navigate('/home');
    };

    //------------Dropdown year---------
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (year) => {
        setSelectedYear(year);
        console.log(`Selected year: ${year}`);
    };

    //-----------Bar Chart---------------

    const data = {
        labels: ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            // {
            //     label: '',
            //     data: [null,null,null,null,null],
            //     backgroundColor: 'rgba(75, 192, 192, 0.6)',
            // },
            {
                label: 'Assistance',
                data: [174, 269, 337, 267],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Chat With Your Data',
                data: [267, 87, 174, 261],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Internal',
                data: [87, 142, 265, 147],
                backgroundColor: 'rgba(100, 140, 30, 0.6)',
            },
            {
                label: 'RPA',
                data: [164, 259],
                backgroundColor: 'rgba(360, 190, 50, 0.6)',
            },
            {
                label: 'Translation',
                data: [251, 256, 87],
                backgroundColor: 'rgba(0, 79, 154, 0.6)',
            },
            {
                label: 'Web',
                data: [170, 132, 127, 143],
                backgroundColor: 'rgba(400, 50, 164, 0.6)',
            },
            {
                label: 'Intranet',
                data: [33, 80, 62],
                backgroundColor: 'rgba(0, 120, 234, 0.6)',
            },
            {
                label: '',
                data: [null, null, null, null, null],
                //  backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: '',
                data: [null, null, null, null, null],
                //  backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
           
           
        ],
    };

    // Options for the chart
    const options = {
        plugins: {
            title: {
                display: true,
                // text: 'Stacked Bar Chart Example',
            },
            legend: {
                position: 'top',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                ticks: {
                    // Custom labels for the y-axis
                    callback: function (value, index, values) {

                        const labels = [58, 35, 67, 82, 46, 93, 112, 78];
                        return labels[index] || value;
                    }
                }
            },
        },
    };



    return (
        <div style={{ overflow: 'hidden' }}>



            <div className='bg-[#1f4e96] text-Black text-center py-4 h-20 flex justify-between items-center'>

                <div className='text-2xl'>
                    {/* <img src={Image.headerlogo} alt='logo' className='w-48 h-14 mt-0 mr-2 ml-20' /> */}
                    <div className="bannerHeaderBarChartAdmin">
                        <span className="brandingFaqYoko">Y-ChatGPT</span>
                    </div>
                    <button onClick={handleHomeMenuClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4 ' style={{ border: 'none' }}>
                        <FaHome size={30}  title='Home' style={{color:'white',position:'fixed',top:'27px',right:'51px'}} />

                    </button>
                </div>

            </div>


           
            <div style={{ marginLeft: '376px' }}>
                <YearDropdown
                    startYear={2000}
                    endYear={2030}
                    selectedYear={selectedYear}
                    onYearChange={handleYearChange}
                />

                {/* <p>Selected Year: {selectedYear}</p> */}

            </div>


            <div style={{ height: '455px' }}>
                <Bar data={data} options={options} />
            </div>


            <div>
                <footer className='footer'>
                    <img src={Image.footerLogo} alt='FooterLogo' style={{ width: '11%',position:'fixed',left:'17px' }} />
                    <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
                </footer>
            </div>
        </div>

    )
};

export default BarChart;
