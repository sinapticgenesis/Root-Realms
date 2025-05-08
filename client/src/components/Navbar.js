import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';//css file linked.
import LogoutButton from './LogoutButton';
import { AuthContext } from '../AuthContext';



let name='Login';

export default function Navbar() {
    const { isLoggedIn, username } = useContext(AuthContext);

    return (
        <header className="navbar">
            <div className='navbarLogo'>
                <Link to="/">
                    <img src='/logo192.png'></img>
                </Link>
            </div>

            <nav id="mainNavbar">

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/create">Create</Link></li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
                {isLoggedIn && (
                    <div>
                        <span>Hi, {username}!</span>
                        <LogoutButton />
                    </div>
                )}
            </nav>
        </header>
    );
}