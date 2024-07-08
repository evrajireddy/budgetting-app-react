// GridComponent.js

import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';

const AllTransactions = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3456/transactions'); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log("result" , jsonData);
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="grid-container">
            <h2>Grid Component</h2>
            <div className="grid">
                {data.map(item => (
                    <div key={item.id} className="grid-item">
                        <span>{item.title}</span>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTransactions;
