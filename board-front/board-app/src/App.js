import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent2 from './components/ListBoardComponent2';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<ListBoardComponent2/>}></Route>
              <Route path="/board" element={<ListBoardComponent2/>}></Route>
              <Route path="/create-board" element={<CreateBoardComponent/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;