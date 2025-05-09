import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout() {
    return (
        <div className="layout-container">
            <Outlet />  {/* This renders the current route's component */}
            <footer id="globalFooter">
                <i>GNU General Public License v3.0 &copy; 2025</i>
            </footer>
        </div>
    );
}
