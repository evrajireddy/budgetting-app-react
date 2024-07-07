import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div>
      <h1>Budget App</h1>
      <Link to="/newtransaction">New Transaction</Link>
    </div>
  )

}

export default NavigationBar;