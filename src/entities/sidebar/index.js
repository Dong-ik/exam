import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <a href="/map">Map</a>
                <a href="/login">LOGIN</a>
            </nav>
        </aside>
    );
}

export default Sidebar;