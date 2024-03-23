import React, { Component } from 'react'
import "./Background.css";
import ParticleBG from "../ParticleBG/ParticleBG";

export default class Background extends Component {
  render() {
    return (
      <div className='bg_image'>
        <ParticleBG />
        <div className="gradient-01"></div>
        <div className="gradient-02"></div>
    </div>
    )
  }
}
