import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import AllTransactions from './components/AllTransactions'
import NewTransaction from './components/NewTransaction';

function App() {
  return <div>

    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alltransactions" element={<AllTransactions />} />
      <Route path="/newtransaction" element={<NewTransaction />} />
      
    </Routes>

  </div>;
}

export default App;