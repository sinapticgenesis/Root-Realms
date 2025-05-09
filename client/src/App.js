import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import ArticleView from './components/ArticleView';
import MyArticles from './components/MyArticles';
import EditArticle from './components/EditArticle';

function App() {
    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="articles" element={<ArticleList />} />
                    <Route path="create" element={<ArticleForm />} />
                    <Route path="articles/:id" element={<ArticleView />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard" element={<MyArticles />} />
                    <Route path="edit/:id" element={<EditArticle />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
