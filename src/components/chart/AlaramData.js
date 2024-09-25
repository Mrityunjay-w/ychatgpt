import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../styles/AlaramData.css'


const DataTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make sure you replace 'YOUR_API_ENDPOINT' with your actual API endpoint URL
                const response = await axios.get('https://categoryconsumption.azurewebsites.net/api/alarm?fromDate=2024-02-15',{
                    headers: {
                        "x-functions-key": "Yokogawa@4321"
                    }
                });
                setData(response.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => prev + 1);
    const prevPage = () => setCurrentPage(prev => prev - 1);

    return (
        <div>
            {/* <h1>Data Table</h1> */}
            <Table data={currentRecords} />
            <Pagination
                currentPage={currentPage}
                recordsPerPage={recordsPerPage}
                totalRecords={data.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
};

const Table = ({ data }) => (
    <table>
        <thead>
            <tr>
                <th>Timestamp</th>
                <th>Topic Name</th>
                <th>Max</th>
                <th>Min</th>
                <th>Max Threshold</th>
                <th>Min Threshold</th>
                <th>Status</th>
                <th>Payload</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.Timestamp}</td>
                    <td>{item.topicName}</td>
                    <td>{item.max}</td>
                    <td>{item.min}</td>
                    <td>{item.maxThreshold}</td>
                    <td>{item.minThreshold}</td>
                    <td>{item.status}</td>
                    <td>{item.Payload}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const Pagination = ({ currentPage, recordsPerPage, totalRecords, paginate, nextPage, prevPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            <button onClick={() => prevPage()} disabled={currentPage === 1}>Prev</button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={number === currentPage ? 'active' : ''}
                >
                    {number}
                </button>
            ))}
            <button
            // style={{color:'blue'}}
                onClick={() => nextPage()}
                disabled={currentPage === pageNumbers.length}
            >
                Next
            </button>
        </div>
    );
};

export default DataTable;
