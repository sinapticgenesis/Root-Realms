import React from 'react';
import "../App.css";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    "https://cdn.pixabay.com/photo/2022/04/04/18/13/map-7112004_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/05/09/21/28/map-7185565_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/01/10/16/54/map-4755691_1280.jpg"
  ];

  return (
    <div className='webpageBody'>

      <div id='mainBody'>
        <h3>Welcome to Root Realms!</h3>
        <p>
        Here we believe imagination is the key to almost everything. Creating new worlds is quintessential to the experience of all those who enjoy fantasy.
        </p><br></br>
        <p>
        The tools we have developed here are designed to help you organize your world and present it in a fashion that not only makes sense, but is aesthetically pleasing as well. <br></br>
                Create wiki-style pages that allow your audience to explore your world at their own pace, and grasp the deep nuances of the lore you have spent countless hours creating. <br></br>
                The organization and details you bring forwarth using our tools will be fantastic, and we cannot wait to see what you create!
        </p>

        <h5><i>Good luck, and happy creating!</i></h5>
      </div>
      <footer id="frontPageFooter">
        <i>GNU General Public License v3.0 &copy; 2025</i>
      </footer>
    </div>
  );
}
