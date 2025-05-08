import React from 'react';
import "../App.css";

export default function Home() {
    return (
        <div className='webpageBody'>
          <div id='frontPageBanner'>
            <canvas></canvas>
          </div>
          <div id='mainBody'>
            <h3>Welcome to Root Realms!</h3>
            <p> 
                Here we believe imagination is the key to almost everything. Creating new worlds is quintessential to the experience of all those who enjoy fantasy. <br></br> 
                The tools we have developed here are designed to help you organize your world and present it in a fashion that not only makes sense, but is aesthetically pleasing as well. <br></br>
                Create wiki-style pages that allow your audience to explore your world at their own pace, and grasp the deep nuances of the lore you have spent countless hours creating. <br></br>
                The organization and details you bring forwarth using our tools will be fantastic, and we cannot wait to see what you create!
            </p>
            <br></br>
            <p> 
                No matter what type of world you are creating you can find our tools useful here. Whether you are creating a world for your fantasy table top game, or designing a cyberpunk dystopia in your next upcoming novel, <br></br>
                you can use our tools to organize and present your brilliant masterpiece. Create a main page that details the introduction of your world and links to all of your sub-articles expounding upon all the nuances and <br></br>
                details you have carefully poured your time into. 
            </p>
            <h5><i>Good luck, and happy creating!</i></h5>
          </div>
          <footer id="frontPageFooter">
            <i>GNU General Public License v3.0 &copy; 2025</i>
          </footer>
        </div>
      );
    }