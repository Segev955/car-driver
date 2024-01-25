import './App.css';
import * as React from "react";
import NavBar from './NavBar';
import Driver from './Driver';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='content'>
        <Driver />
      </div>
    </div>
  );
}

export default App;