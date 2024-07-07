import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import AllTransactions from './components/AllTransactions'

function App() {
  return <div>

    <NavigationBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alltransactions" element={<AllTransactions />} />
      
    </Routes>

  </div>;
}

export default App;