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
            const response = await fetch(`${API}/transactions/${id}`);
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
        fetch(`${API}/transactions/${transactionId}`, {
            method: 'DELETE',
        }).then((data) => { window.location.href = "/"; })
            .catch((err) => console.log('error in deleted'));


    };

    const handleEdit = (event) => {

    }

    return (
        <div className='container'>
            <br />
            <h1>Transaction</h1>
            <div className='fs-5' >

                <table className='table'>
                    <tr><td>Date:  {data.date}</td> </tr>
                    <tr><td>Name:  {data.item_name}</td></tr>
                    <tr><td>Amount: {data.amount}</td></tr>
                    <tr><td>From: {data.from}</td></tr>


                </table>
                <Link className='btn btn-secondary' to={{ pathname: `/edittransaction/${data.id}` }}>Edit Transaction</Link>
<br />
<br />
                <button className='btn btn-secondary' id={"btn_del_" + data.id} data-transactionid={data.id} type="button" onClick={handleDelete}>Delete Transaction</button>

            </div>
        </div>
    );
};

export default Transaction;
