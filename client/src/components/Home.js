import React from 'react';
import "../App.css";
import "./Home.css";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="webpageBody">
            <div id="mainBody" className="home-content">
                {/* <img src={logo} alt="Root Realms Logo" className="home-logo" /> */}

                <h1>Welcome to <span className="highlight">Root Realms!</span></h1>

                <p className="intro-text">
                    Here we believe imagination is the key to almost everything. Creating new worlds is quintessential 
                    to the experience of all those who enjoy fantasy.
                </p>

                <p className="intro-text">
                    The tools we have developed here are designed to help you organize your world and present it in a fashion 
                    that not only makes sense, but is aesthetically pleasing as well. 
                    <br /><br />
                    Create wiki-style pages that allow your audience to explore your world at their own pace, and grasp the deep nuances 
                    of the lore you have spent countless hours creating. 
                    <br /><br />
                    The organization and details you bring forth using our tools will be fantastic, and we cannot wait to see what you create!
                </p>

                <h5><i>Good luck, and happy creating!</i></h5>

                <div className="cta-buttons">
                    <button onClick={() => navigate('/about')}>Learn More</button>
                    <button onClick={() => navigate('/register')}>Getting Started</button>
                </div>
            </div>
        </div>
    );
}
