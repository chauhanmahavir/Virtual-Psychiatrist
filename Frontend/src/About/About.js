import React, { Component } from 'react'
import "./About.css"
import RobotIcon from "../assets/Images/Robot Emoji Icon.png"
import FadeIn from 'react-fade-in';
import Background from '../Background/Background';
import Menu from '../Menu/Menu';

export default class About extends Component {
  render() {
    return (
        <div>
        {/* <Background></Background>
        <Menu></Menu> */}
        <FadeIn delay={200}>
        <div className='about_container'>
            <div className='about_title'>
                About
            </div>
            <div className='about_main_area'>
                <div className='about_text'>
                    Welcome to our Mental Health Chatbot, a compassionate companion designed to offer support and resources for your emotional well-being. Utilizing advanced natural language processing and machine learning, our chatbot provides a safe space for open conversations and guidance, fostering a positive environment for mental health exploration and self-care. Your mental well-being matters, and we're here to help you navigate your journey towards emotional resilience and support.
                </div>
                <div className='about_image'>
                    <img src={RobotIcon} className='robot_emoji_icon'  alt='robot image'></img>
                </div>
            </div>
        </div>
        </FadeIn>
    </div>
    )
  }
}

