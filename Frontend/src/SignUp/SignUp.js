import React, { Component } from 'react'
import LoginLogo from "../assets/Images/login-logo.png"
import Button from '../Button/Button'
import FadeIn from 'react-fade-in';
import { NavLink } from 'react-router-dom';
import { SERVER_URL } from '../config/config';
import axios from 'axios';

export default class SignUp extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         name: "",
         email: "",
         password: "",
         confirm_password: ""
      }

      this.sign_up = this.sign_up.bind(this);
      this.set_inputs = this.set_inputs.bind(this);
    }

    set_inputs(event) {
        if (event.target.name === "name") {
            this.setState({name : event.target.value});
        }

        else if (event.target.name === "email") {
            this.setState({email : event.target.value});
        }

        else if (event.target.name === "password") {
            this.setState({password : event.target.value});
        }

        else if (event.target.name === "confirm_password") {
            this.setState({confirm_password : event.target.value});
        }
    }

    sign_up(event) {
        const json_data = this.state;
        if (json_data.password === json_data.confirm_password) {
            axios.post(SERVER_URL + "/user/signup", json_data)
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "/login";
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

  render() {
    return (
        <div>
        {/* <Background></Background>
        <Menu></Menu> */}
        <FadeIn delay={200}>
        <div className='contact_container'>
            
            <div className='contact_title'>
                    Sign Up
            </div>
            
            <div className='contact_form_container'>
                
                <div className='contact_form_image'>
                    <img src={LoginLogo} alt="IMG"></img>
                </div>
                
                <div className='contact_form_name'>
                    <input className='name_input' type='text' name='name' placeholder='Name' required autoComplete="off" onChange={this.set_inputs}></input>
                    <br/>
                    <br/>
                    <br/>
                    <input className='name_input' type='email' name='email' placeholder='Email' required autoComplete="off" onChange={this.set_inputs}></input>
                    <br/>
                    <br/>
                    <br/>
                    <input className='name_input' type='password' name='password' placeholder='Password' required autoComplete="off" onChange={this.set_inputs}></input>
                    <br/>
                    <br/>
                    <br/>
                    <input className='name_input' type='password' name='confirm_password' placeholder='Confirm Password' required autoComplete="off" onChange={this.set_inputs}></input>
                    <br/>
                    <p className='dont_accout'>Already Have an Account? <NavLink to="/login" className="anchor">Log In!</NavLink></p>
                    <div className='contact_form_button' onClick={this.sign_up}>
                        <Button text = "Sign Up"></Button>
                    </div>
                </div>
            
            </div>
        
        </div>
        </FadeIn>
    </div>
    )
  }
}
