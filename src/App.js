import React from 'react'
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


function App() {
  return (
    <div >
      <h1>Kino</h1>
      <Router>
      <Routes>
        <Route path='/' element={ <Home />} /> 
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
