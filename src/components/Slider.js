import React from 'react';
import { Slide } from 'react-slideshow-image';
import styled from "styled-components";
 

const slideImages = [
    "img/firstSlide.jpg",
    "img/homeScreen.jpg",
    "img/slideimg.jpg",
    "img/pixlr.jpg"
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
 const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`,'backgroundRepeat'  : 'no-repeat',
       'backgroundPosition': 'center','height':`400px`}}>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`,'backgroundRepeat'  : 'no-repeat',
       'backgroundPosition': 'center','backgroundSize': 'cover','height':`400px`}}>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`,'backgroundRepeat'  : 'no-repeat',
       'backgroundPosition': 'center','backgroundSize': 'cover','height':`400px`}}>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[3]})`,'backgroundRepeat'  : 'no-repeat',
       'backgroundPosition': 'center','backgroundSize': 'cover','height':`400px`}}>
          </div>
        </div>
      </Slide>
    )
}
export default Slideshow;