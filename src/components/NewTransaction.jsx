import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  }
  const handleAmountChange = (event) => {
    this.setAmount(event.target.value);
  }
  const handleFromChange = (event) => {
    this.setFrom(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      date: date,
      item_name: name,
      amount: amount,
      from: from,
    }
    fetch(`http://localhost:3456/transactions`,
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
      }).catch(error => console.error('Error: fetching transactions', error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Add a new item</h2>

        Date <input type="text" id="txt_date" value={date} onChange={handleDateChange} ></input>
        Name <input type="text" id="txt_Name" value={name} onChange={handleNameChange}></input>
        Amout <input type="text" id="txt_Amount" value={amount} onChange={handleAmountChange}></input>
        From <input type='text' id="txt_From" value={from} onChange={handleFromChange}></input>

        <input type="submit" value="CREATE NEW ITEM" />
        { showAlert && (
        <div className="alert">
          Please enter a valid name (without numbers).
        </div>
      )}
      {!isValid && (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      )}
      </div>
    </form>
  )

}

export default NewTransaction;