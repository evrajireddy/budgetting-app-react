// GridComponent.js

import React, { useState, useEffect } from 'react';
import { json, Link } from 'react-router-dom';
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
            const response = await fetch(`https://budgetting-app-express.onrender.com/transactions/${id}`);
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

    const handleDelete = (event) => {
        const transactionId = event.target.getAttribute('data-transactionid');

        //fetch(`http://localhost:3456/transactions/${transactionId}`, {
        fetch(`https://budgetting-app-express.onrender.com/${transactionId}`, {
            method: 'DELETE',
        }).then((data) => { window.location.href = "/"; })
            .catch((err) => console.log('error in deleted'));


    };

    const handleEdit = (event) => {

    }

    return (
        <div className="grid-container">
            <h2>Transaction</h2>
            <div className="grid">
                <div key={data.id} className="grid-item">
                    <div><span>Date:  </span>{data.date}</div>
                    <div><span>Name:  </span> <span>{data.item_name}</span></div>
                    <div><span>Amount:  </span>{data.amount}</div>
                    <div><span>From:  </span> <span>{data.from}</span></div>

                    <Link to={{ pathname: `/edittransaction/${data.id}` }}>Edit Transaction</Link>

                    <button id={"btn_del_" + data.id} data-transactionid={data.id} type="button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
