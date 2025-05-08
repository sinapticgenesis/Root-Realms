import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';//css file linked.

let name='Login';

export default function Navbar() {
    return (
        <div>
            <div className='navbarLogo'><img src='/logo192.png'></img></div>
            <nav id="mainNavbar">

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/create">Create</Link></li>
                </ul>
                <div>
                <button id='loginButton'>{name}</button>
                </div>

            </nav>
        </div>
    );
}