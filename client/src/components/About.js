import React from "react";
import "./About.css";

export default function About() {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Root Realms</h1>
                <p className="tagline">Your Complete Worldbuilding Companion</p>
                
                <p>
                    Root Realms is a platform designed for creators who want to bring their fictional worlds to life. 
                    Whether you're crafting intricate lore for a novel, organizing content for a virtual tabletop campaign, 
                    or simply exploring creative ideas, we provide the tools to keep your thoughts structured and accessible.
                </p>

                <h3>Key Features:</h3>
                <ul>
                    <li>Create interconnected wiki-style articles for characters, locations, and artifacts.</li>
                    <li>Seamlessly cross-link articles using intuitive <code>[[wiki-style]]</code> references.</li>
                    <li>Control your content's visibility — keep it private or share with others.</li>
                    <li>Organize your world visually and keep your lore beautifully structured.</li>
                    <li>Perfect for writers, game masters, and creative worldbuilders alike.</li>
                </ul>

                <p className="closing-message">
                    Ready to explore new horizons? Root Realms gives your imagination the foundation it deserves.
                </p>
            </div>
        </div>
    );
}
