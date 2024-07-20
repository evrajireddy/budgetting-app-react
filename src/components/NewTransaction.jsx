import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const API = import.meta.env.VITE_API_URL

const NewTransaction = () => {

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setDate(inputDate);
    validateDate(inputDate);
  }

  const handleNameChange = (event) => {
    // Check if inputName contains any digits
    if (/\d/.test(event.target.value)) {
      setShowAlert(true); // Show alert if there are digits
    } else {
      setShowAlert(false); // Hide alert if there are no digits
    }
    setName(event.target.value);
  }

  const validateDate = (inputDate) => {
    // Simple date format validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      setIsValid(false);
      setErrorMessage('Please enter a valid date (YYYY-MM-DD)');
      return;
    }
    else {
      setIsValid(true);
      setErrorMessage('');
    }
  }
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }
  const handleFromChange = (event) => {
    setFrom(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      date: date,
      item_name: name,
      amount: amount,
      from: from,
    }
    //fetch(`http://localhost:3456/transactions`,
    fetch(`${API}/transactions`,
      {
        method: "POST",
        body: JSON.stringify(newTransaction),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(responseP => responseP.json())
      .then(dataP => {
        console.log(dataP);
        window.location.href = "/";
      }).catch(error => console.error('Error: fetching transactions', error));
  }

  return (
    <div className='container'>
      <form className='form-horizontal' onSubmit={handleSubmit}>

        <h1>Add a new item</h1>

        <div className="form-group">
          <label className="control-label">Date </label>
          <input type="text" className="form-control" id="txt_date" value={date} onChange={handleDateChange} ></input>
        </div>

        <div className="form-group">
          <label className="control-label">Name</label>
          <input type="text" className="form-control" id="txt_Name" value={name} onChange={handleNameChange}></input>
        </div>
        <div className="form-group">
          <label className="control-label">Amout</label>
          <input type="text" className="form-control" id="txt_Amount" value={amount} onChange={handleAmountChange}></input>
        </div>
        <div className="form-group">
          <label className="control-label">From</label>
          <input type='text' className="form-control" id="txt_From" value={from} onChange={handleFromChange}></input>
        </div>

        <input type="submit" className='btn btn-secondary' value="CREATE NEW ITEM" />
        {showAlert && (
          <div className="alert">
            Please enter a valid name (without numbers).
          </div>
        )}
        {!isValid && (
          <div style={{ color: 'red' }}>{errorMessage}</div>
        )}

      </form>
    </div>
  )

}

export default NewTransaction;