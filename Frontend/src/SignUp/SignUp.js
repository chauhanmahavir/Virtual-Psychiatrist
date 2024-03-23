import React, { Component } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    this.sign_up = this.sign_up.bind(this);
    this.set_inputs = this.set_inputs.bind(this);
  }

  set_inputs(event) {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    } else if (event.target.name === "confirm_password") {
      this.setState({ confirm_password: event.target.value });
    }
  }

  sign_up(event) {
    event.preventDefault();
    const json_data = this.state;
    if (json_data.password === json_data.confirm_password) {
      axios
        .post(SERVER_URL + "/user/signup", json_data)
        .then((response) => {
          if (response.status === 200) {
            window.location.href = "/login";
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col md:flex-col md:space-x-32 md:space-y-0 space-y-6 bg-cyan-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden bg-opacity-10">
              <div className="flex flex-col space-y-0 justify-between">
                <div className="z-10 flex justify-center font-bold text-5xl tracking-wide">
                  <h1> Sign Up </h1>
                </div>
                <div className="relative">
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -left-32 -top-40"></div>
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -right-20 -bottom-20"></div>
                  <div className="bg-white z-10 relative rounded-lg shadow-lg p-8 bg-opacity-0 text-white">
                    <form
                      onSubmit={this.sign_up}
                      className="flex flex-col space-y-4 text-xl"
                    >
                      <div>
                        <label className="text-xl">Name</label>
                        <input
                          type="text"
                          min="5"
                          max="10"
                          name="name"
                          onChange={this.set_inputs}
                          pattern=".{2,}"
                          placeholder="Name"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          required
                        ></input>
                      </div>
                      <div>
                        <label className="text-xl">Email</label>
                        <input
                          type="email"
                          placeholder="abc@xyz.com"
                          name="email"
                          onChange={this.set_inputs}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          required
                        ></input>
                      </div>

                      <div>
                        <label className="text-xl">Password</label>
                        <input
                          type="password"
                          placeholder="**********"
                          name="password"
                          onChange={this.set_inputs}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          required
                        ></input>
                      </div>

                      <div>
                        <label className="text-xl">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="**********"
                          name="confirm_password"
                          onChange={this.set_inputs}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          required
                        ></input>
                      </div>

                      <button
                        className="shadow-lg inline-block self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl"
                        name="submit"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }
}
