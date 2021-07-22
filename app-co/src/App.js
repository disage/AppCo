import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main/Main';
import Statistics from './pages/Statistics/Statistics';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Main} />
        <Route path="/statistics" component={Statistics} />
      </BrowserRouter>
    </div>
  );
};

export default App;
