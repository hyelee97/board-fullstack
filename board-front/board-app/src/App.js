import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';
import Navigation from "./components/navi/Navigation";
import Menu1 from './components/Menu1';
import Menu2 from './components/Menu2';
import Menu3 from './components/Menu3';
import Menu4 from './components/Menu4';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<ListBoardComponent/>}></Route>
              <Route path="/board" element={<ListBoardComponent/>}></Route>
              <Route path="/create-board" element={<CreateBoardComponent/>}></Route>
              <Route path="/create-board/:no" element={<CreateBoardComponent/>}></Route>
              <Route path="/read-board" element={<ReadBoardComponent/>}></Route>
              <Route path="/menu1" element={<Menu1/>}></Route>
              <Route path="/menu2" element={<Menu2/>}></Route>
              <Route path="/menu3" element={<Menu3/>}></Route>
              <Route path="/menu4" element={<Menu4/>}></Route>
            </Routes>
          </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;