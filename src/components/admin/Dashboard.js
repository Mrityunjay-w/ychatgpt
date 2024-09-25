import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './../../styles/Login.css'
import Image from '../image/Images';
import { useNavigate } from 'react-router-dom';



Chart.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://categoryconsumption.azurewebsites.net/api/main',
                    {
                        headers: {
                            'x-functions-key': 'Yokogawa@4321',
                        },
                    }
                );
                const apiData = response.data;

                console.log('Data from the API:', apiData);

                if (!apiData || !apiData.result || !Array.isArray(apiData.result) || apiData.result.length === 0) {
                    console.warn('Invalid or empty data received from the API');
                    return;
                }

                // Extract labels and values from the data
                const labels = apiData.result.map(entry => entry.CategoryGroup);
                const values = apiData.result.map(entry => parseFloat(entry.Percentage));

                setChartData({
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: [
                            'red',
                            'blue',
                            'green',
                            'orange',

                        ],
                    }],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    // Function to handle admin menu click and redirect to Dashboard
    const handleHomeMenuClick = () => {
       navigate('/home'); 
    };
 

    return (

        <div>


            <header className='loginHeader'>
                <div className='container'>
                    <a>
                        <img className='headerLogo' src='assets/logo.png' alt='logo' />
                    </a>


                    <div className='buttonContainer'>

                        <button className='btnLogin' onClick={handleHomeMenuClick}>Home</button>

                    </div>
                </div>

            </header>

            <div style={{ width: '32%', margin: 'auto' }}>
                
                <Pie data={chartData} plugins={[ChartDataLabels]} options={{
                    plugins: {
                        datalabels: {
                            formatter: (value, context) => {
                                const label = context.chart.data.labels[context.dataIndex];
                                return `${label}: ${value}%`;
                            },
                            color: 'white',
                        },
                    },
                }}
                />
            </div>

            <div>
               <footer className='footer'>
                  <img src={Image.footerLogo} alt='FooterLogo' style={{ width: '7%' }} />
                  <p>&copy; 2024 Yokogawa Electric Corporation. All rights reserved.</p>
               </footer>
            </div>

        </div>
    );
};

export default Dashboard;
