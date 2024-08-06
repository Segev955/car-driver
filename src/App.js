import './App.css';
import * as React from "react";
import NavBar from './NavBar';
import Driver from './Driver';
import Drivers from './Drivers';
import NewDriver from './NewDriver';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Drivers />} />
            <Route path='/add' element={<NewDriver />} />
            <Route path='/driver/:id' element={<Driver />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;