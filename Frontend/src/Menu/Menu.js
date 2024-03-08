import React, { Component } from 'react'
import './Menu.css'
import { NavLink } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        <NavLink className='menu_element' to="/"><div className='menu_element'>Home</div></NavLink>
        <NavLink className='menu_element' to="/about"><div className='menu_element'>About</div></NavLink>
        <NavLink className='menu_element' to="/contact"><div className='menu_element'>Contact</div></NavLink>
        <NavLink className='menu_element' to="/login"><div className='menu_element'>Log In</div></NavLink>
        <NavLink className='menu_element' to="/signup"><div className='menu_element'>Sign Up</div></NavLink>
    </div>
    )
  }
}
