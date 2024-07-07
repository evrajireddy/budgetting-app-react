import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NewTransaction = () => {

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
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

      </div>
    </form>
  )

}

export default NewTransaction;