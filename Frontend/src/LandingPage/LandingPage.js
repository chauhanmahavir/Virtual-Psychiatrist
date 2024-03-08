import React, { Component } from 'react'
import RobotImage from '../assets/Images/Robot_Image.png'
import './LandingPage.css'
import FadeIn from 'react-fade-in';
import Typewriter from 'typewriter-effect';
import Button from '../Button/Button'
import Background from '../Background/Background';
import Menu from '../Menu/Menu';
import { NavLink } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
        <div>
        {/* <Background></Background>
        <Menu></Menu> */}
        <FadeIn delay={200}>
        <div className='landing_page_container'>
            <div className='landing_page_menu'>
                {/* <Menu></Menu> */}
            </div>
            <div className='landing_page_div'>
                <div className='landing_page_intro_text'>
                    <div className='landing_page_into_text_1'>
                        {/* Chatbot Services */}
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Virtual Psychiatrist')
                                .callFunction(() => {
                                    console.log('String typed out!');
                                })
                                .pauseFor(2500)
                                .deleteAll()
                                .callFunction(() => {
                                    console.log('All strings were deleted');
                                })
                                .start();
                            }}
                            options={{
                                autoStart: true,
                                loop: true,
                                cursor: "_"
                              }}
                        />
                        <NavLink to="/login"><Button text={"LogIn"}></Button></NavLink>
                    </div>
                </div>
                <div className='robot_image_div'>
                    <img src={RobotImage} className='robot_image'  alt='robot image'></img>
                </div>
            </div>
        </div>
        </FadeIn>
    </div>
    )
  }
}

