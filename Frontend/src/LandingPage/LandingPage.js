import React, { Component } from "react";
import RobotImage from "../assets/Images/Chat bot-amico.png";
import FadeIn from "react-fade-in";
import Typewriter from "typewriter-effect";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_login_button: 1,
      jwt_token: localStorage.getItem("jwtToken") || "",
    };
  }

  componentDidMount() {
    axios
      .post(
        SERVER_URL + "/user/validate_user",
        {},
        { headers: { jwt_token: this.state.jwt_token } }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            show_login_button: 0,
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  render() {
    return (
      <FadeIn delay={200}>
        <div className="flex flex-wrap items-center overflow-hidden">
          {/* Left Div */}
          <div className="w-full sm:w-full md:w-1/2 p-4 flex justify-center sm:justify-start">
            <div className="w-full sm:w-full">
              <div>
                <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Harmony <br/> Virtual Psychiatrist")
                        .callFunction(() => {
                          console.log("String typed out!");
                        })
                        .pauseFor(2500)
                        .deleteAll()
                        .callFunction(() => {
                          console.log("All strings were deleted");
                        })
                        .start();
                    }}
                    options={{
                      autoStart: true,
                      loop: true,
                      cursor: "_",
                    }}
                  />
                </h1>

                <br />
                <br />

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  Your journey to emotional well-being starts here. Chat,
                  explore, and thrive with our compassionate Mental Health
                  Chatbot.
                </p>
              </div>

              <br />
              <br />

              {this.state.show_login_button ? (
                <div className="mt-4 sm:mt-0">
                  <NavLink to="/login">
                    <button className="inline-block self-end bg-cyan-700 text-white font-bold rounded-2xl px-6 py-3 text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl bg-opacity-35">
                      Log In
                    </button>
                  </NavLink>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Right Div */}
          <div className="h-screen sm:w-full md:w-1/2 justify-center hidden sm:flex items-center pl-36">
            <img
              className="object-contain max-w-screen-md max-screen-md"
              src={RobotImage}
              alt="Placeholder"
            />
          </div>
        </div>
      </FadeIn>
    );
  }
}
