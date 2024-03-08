import React, { Component } from 'react'
import "./Button.css"

export default class Button extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    }
  }
  render() {
    return (
      <div className='button_main_container'>
        <button className='button_container'>
            {this.props.text}
        </button>
    </div>
    )
  }
}
