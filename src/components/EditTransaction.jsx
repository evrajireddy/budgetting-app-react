// GridComponent.js

import React, { useState, useEffect } from 'react';
import { json, Link } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL
import { useParams } from "react-router-dom";


const EditTransaction = () => {
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

    const handleDelete = (event) => {
        const transactionId = event.target.getAttribute('data-transactionid');

        fetch(`http://localhost:3456/transactions/${transactionId}`, {
            method: 'DELETE',
        }).then((data) => {window.location.href = "/";})
            .catch((err) => console.log('error in deleted'));


    };

    const handleEdit = (event) => {

    }

    return (
        <div className="grid-container">
            <h2>Grid Component</h2>
            <div className="grid">
                <div key={data.id} className="grid-item">
                    <span>{data.item_name}</span>
                    <p>{data.from}</p>

                    <Link to={{ pathname: `/edittransaction/${transaction.id}` }}>Edit Transaction</Link>
                    <button id={"btn_del_" + data.id} data-transactionid={data.id} type="button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default EditTransaction;
