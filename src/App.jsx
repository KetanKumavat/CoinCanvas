import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';

function App() {

  return (
    <BrowserRouter>
      
        <div className="m-0 p-0 box-border scroll-smooth">
          <Header />
          <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins/:id" Component={CoinPage} />
          </Routes>
        </div>
      
    </BrowserRouter>
  );
}

export default App
