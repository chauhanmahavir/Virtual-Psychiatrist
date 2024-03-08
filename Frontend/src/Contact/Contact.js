import React, { Component } from 'react'
import "./Contact.css"
import EmailLogo from "../assets/Images/email-logo.png"
import Button from '../Button/Button'
import FadeIn from 'react-fade-in';
import Background from '../Background/Background';
import Menu from '../Menu/Menu';

export default class Contact extends Component {
  render() {
    return (
        <div>
        {/* <Background></Background>
        <Menu></Menu> */}
        <FadeIn>
        <div className='contact_container'>
            
            <div className='contact_title'>
                    Contact
            </div>
            
            <div className='contact_form_container'>
                
                <div className='contact_form_image'>
                    <img src={EmailLogo} alt="IMG"></img>
                </div>
                
                <div className='contact_form_name'>
                    <input className='name_input' type='text' name='name' placeholder='Name' required autoComplete="off"></input>
                    <br/>
                    <br/>
                    <br/>
                    <input className='name_input' type='email' name='email' placeholder='Email' required autoComplete="off"></input>
                    <br/>
                    <br/>
                    <br/>
                    <textarea className='name_input message' type='text' name='message' placeholder='Message' required autoComplete="off"></textarea>
                    <br/>
                    <br/>
                    <br/>
                    <div className='contact_form_button'>
                        <Button text = "Submit"></Button>
                    </div>
                </div>
            
            </div>
        
        </div>
        </FadeIn>
    </div>
    )
  }
}

