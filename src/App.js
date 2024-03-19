// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Facts from './components/facts/facts';
//import Login from './components/login/login';



const App = () => {
  return (
    <Router>
      <div className="App">
        {/* En-tête ou barre de navigation si nécessaire */}
        <Routes> {/* Utilisez le composant Routes ici */}
          <Route path="/" element={<Facts />} /> {/* Utilisez "element" au lieu de "component" */}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
