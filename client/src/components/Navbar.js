import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav id="mainNavbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
    );
}