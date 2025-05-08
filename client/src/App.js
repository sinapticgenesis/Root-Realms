import logo from './logo.svg';
import './App.css'; //import custom css styling.

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
// import Login from './components/Login';
// import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import ArticleView from './components/ArticleView';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/create" element={<ArticleForm />} />
        <Route path="/articles/:id" element={<ArticleView />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
