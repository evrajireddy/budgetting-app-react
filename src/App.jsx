import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Transaction from './components/Transaction'
import NewTransaction from './components/NewTransaction';
import EditTransaction from './components/EditTransaction';

function App() {
  return <div>

    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions/:id" Component={Transaction} />
      <Route path="/newtransaction" element={<NewTransaction />} />
      <Route path="/edittransaction/:id" element={<EditTransaction />} />

    </Routes>

  </div>;
}

export default App;