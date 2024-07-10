// GridComponent.js

import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL
import { useParams } from "react-router-dom";

const Transaction = (props) => {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response = await fetch('http://localhost:3456/transactions'); 
            const response = await fetch(`http://localhost:3456/transactions/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log("result", jsonData);
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="grid-container">
            <h2>Grid Component</h2>
            <div className="grid">
                <div key={data.id} className="grid-item">
                    <span>{data.item_name}</span>
                    <p>{data.from}</p>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
