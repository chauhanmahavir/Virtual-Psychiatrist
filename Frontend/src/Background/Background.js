import React, { Component } from 'react'
import BackgroundImage from "../assets/Images/Background.png";
import "./Background.css";

export default class Background extends Component {
  render() {
    return (
      <div className='background_image'>
        <img className='bg_image' src={BackgroundImage} alt='Background Image'></img>
    </div>
    )
  }
}
