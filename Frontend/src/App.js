import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Contact from "./Contact/Contact";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";
import Background from "./Background/Background";
import Menu from "./Menu/Menu";
import Chatscreen from "./Chatscreen/Chatscreen";

import React, { Component } from "react";
import History from "./History/History";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: localStorage.getItem("jwtToken") || "",
      is_loged_in: 0,
    };
  }

  componentDidMount() {
    if (this.state.jwt !== "") {
      console.log("1");
      this.setState({ is_loged_in: 1 });
    } else {
      console.log("0");
      this.setState({ is_loged_in: 0 });
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Background></Background>
          <Menu></Menu>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>

            <Route path="/contact" element={<Contact />}></Route>

            <Route path="/login" element={<LogIn />}></Route>

            <Route path="/signup" element={<SignUp />}></Route>

            <Route path="/chatscreen" element={<Chatscreen />}></Route>

            <Route path="/history" element={<History />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
