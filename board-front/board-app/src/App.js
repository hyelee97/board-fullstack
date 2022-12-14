import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<ListBoardComponent/>}></Route>
              <Route path="/board" element={<ListBoardComponent/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;