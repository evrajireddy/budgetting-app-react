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
        <div className='container'>

            <div className="form-horizontal">
                <div key={data.id} className="grid-item">


                    <h1>Edit item</h1>

                    <div className="form-group">
                        <label className="control-label">Date</label>
                        <input type="text" className="form-control" id="txt_date" value={date} onChange={handleDateChange} ></input>
                    </div>
                    <div className="form-group">
                        <label className="control-label">
                            Name </label>Ï
                        <input type="text" className="form-control" id="txt_Name" value={name} onChange={handleNameChange}></input>
                    </div>
                    <div className="form-group">
                    <label className="control-label">Amout </label>
                        <input type="text" className="form-control" id="txt_Amount" value={amount} onChange={handleAmountChange}></input>
                    </div>
                    <div className="form-group">
                    <label className="control-label">From</label>
                         <input type='text' className="form-control" id="txt_From" value={from} onChange={handleFromChange}></input>
                    </div>
                    <br />
                    <button id="btnSubmit" className='btn btn-secondary' data-transactionid={data.id} type="button" onClick={handleSubmit}>Submit</button>

                </div>
            </div>
        </div>
    );
};

export default EditTransaction;
