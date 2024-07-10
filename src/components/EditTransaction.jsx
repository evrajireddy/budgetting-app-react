// GridComponent.js

import React, { useState, useEffect } from 'react';
import { json, Link } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL
import { useParams } from "react-router-dom";



const EditTransaction = () => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("");

    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //const response = await fetch(`http://localhost:3456/transactions/${id}`);
            const response = await fetch(`${API}/transactions/${id}`);
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log("result", jsonData);
            setName(jsonData.item_name);
            setDate(jsonData.date);
            setAmount(jsonData.amount);
            setFrom(jsonData.from);
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        setDate(inputDate);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    const handleFromChange = (event) => {
        setFrom(event.target.value);
    }

    const handleSubmit = (event) => {
        const transactionId = event.target.getAttribute('data-transactionid');
        const editTransaction = {
            date: date,
            item_name: name,
            amount: amount,
            from: from,
        }
       // fetch(`http://localhost:3456/transactions/${transactionId}`,
       fetch(`${API}/transactions/${transactionId}`,
            {
                method: "PUT",
                body: JSON.stringify(editTransaction),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(dataP => {
                window.location.href = "/"; 
            }).catch(error => console.error('Error: Updating transactions', error));
    }

    return (
        <div className="grid-container">

            <div className="grid">
                <div key={data.id} className="grid-item">


                    <h2>Edit item</h2>

                    Date <input type="text" id="txt_date" value={date} onChange={handleDateChange} ></input>
                    Name <input type="text" id="txt_Name" value={name} onChange={handleNameChange}></input>
                    Amout <input type="text" id="txt_Amount" value={amount} onChange={handleAmountChange}></input>
                    From <input type='text' id="txt_From" value={from} onChange={handleFromChange}></input>
                    <br />
                    <button id="btnSubmit" data-transactionid={data.id} type="button" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
};

export default EditTransaction;
