import React, { Component } from 'react'
import "./LogIn.css"
import LoginLogo from "../assets/Images/login-logo.png"
import Button from '../Button/Button'
import FadeIn from 'react-fade-in';
import { NavLink } from 'react-router-dom';
import { SERVER_URL } from '../config/config';
import axios from 'axios';

export default class LogIn extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           email: "",
           password: ""
        }
  
        this.check_login = this.check_login.bind(this);
        this.set_input = this.set_input.bind(this);
      }

      check_login() {
        const json_data = this.state;
        if (json_data.email !== "" && json_data.password !== "") {
            axios.post(SERVER_URL + "/user/login", json_data)
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/";
                }
                else {
                    console.log("Error");
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
      }

      set_input(event) {
        if (event.target.name === "email") {
            this.setState({email : event.target.value});
        }

        else if (event.target.name === "password") {
            this.setState({password : event.target.value});
        }
    }
  render() {
    return (
        <div>
        {/* <Background></Background>
        <Menu></Menu> */}
        <FadeIn delay={200}>
        <div className='contact_container'>
            
            <div className='contact_title'>
                    Log In
            </div>
            
            <div className='contact_form_container'>
                
                <div className='contact_form_image'>
                    <img src={LoginLogo} alt="IMG"></img>
                </div>
                
                <div className='contact_form_name'>
                    
                    <br/>
                    <br/>
                    <input className='name_input' type='email' name='email' placeholder='Email' required autoComplete="off" onChange={this.set_input}></input>
                    <br/>
                    <br/>
                    <br/>
                    <input className='name_input' type='password' name='password' placeholder='Password' required autoComplete="off" onChange={this.set_input}></input>
                    <br/>
                    <p className='dont_accout'>Don't Have an Account? <NavLink to="/signup" className="anchor">Sign Up!</NavLink></p>
                    <div className='contact_form_button' onClick={this.check_login}>
                        <Button text = "Log In"></Button>
                    </div>
                </div>
            
            </div>
        
        </div>
        </FadeIn>
    </div>
    )
  }
}
