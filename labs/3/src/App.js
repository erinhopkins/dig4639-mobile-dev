import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/Card/index.js";

function App() {
  return (
    <div className="App">
      <Card content="This is a card!"></Card>
    </div>
  );
}

export default App;
