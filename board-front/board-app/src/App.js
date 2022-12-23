import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent'

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<ListBoardComponent/>}></Route>
              <Route path="/board" element={<ListBoardComponent/>}></Route>
              <Route path="/create-board" element={<CreateBoardComponent/>}></Route>
              <Route path="/create-board/:no" element={<CreateBoardComponent/>}></Route>
              <Route path="/read-board" element={<ReadBoardComponent/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;