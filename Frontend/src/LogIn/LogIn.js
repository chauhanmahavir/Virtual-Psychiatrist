import React, { Component } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      jwt: localStorage.getItem("jwtToken") || "",
      show_password: 0,
      button: false,
    };

    this.check_login = this.check_login.bind(this);
    this.set_input = this.set_input.bind(this);
    this.enable_password = this.enable_password.bind(this);
  }

  enable_password() {
    if (this.state.show_password == 0) {
      this.setState({ show_password: 1 });
    } else {
      this.setState({ show_password: 0 });
    }
  }

  check_login(event) {
    event.preventDefault();
    this.setState({ button: true });
    const json_data = this.state;
    if (json_data.email !== "" && json_data.password !== "") {
      axios
        .post(SERVER_URL + "/user/login", json_data)
        .then((response) => {
          console.log(response.data);
          const jwt_token = response.data.jwt;
          localStorage.setItem("jwtToken", jwt_token);
          if (response.status === 200) {
            window.location.href = "/history";
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          window.location.href = "/";
        });
    }
  }

  set_input(event) {
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }
  render() {
    return (
      <div>
        <FadeIn>
          <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col md:flex-col md:space-x-32 md:space-y-0 space-y-6 bg-cyan-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden bg-opacity-10">
              <div className="flex flex-col space-y-8 justify-between">
                <div className="z-10 flex justify-center font-bold text-5xl tracking-wide">
                  <h1> Log In </h1>
                </div>
                <div className="relative">
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -left-32 -top-40"></div>
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -right-20 -bottom-20"></div>
                  <div className="bg-white z-10 relative rounded-lg shadow-lg p-8 bg-opacity-0 text-white">
                    <form
                      onSubmit={this.check_login}
                      className="flex flex-col space-y-4 text-xl"
                    >
                      <div>
                        <label for="" className="text-xl">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="abc@xyz.com"
                          name="email"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          onChange={this.set_input}
                          required
                        ></input>
                      </div>

                      <div className="relative">
                        <label for="" className="text-xl">
                          Password
                        </label>
                        <input
                          type={this.state.show_password ? "text" : "password"}
                          placeholder="**********"
                          name="password"
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                          class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          onChange={this.set_input}
                          required
                        ></input>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 px-3 py-2"
                          onClick={this.enable_password}
                        >
                          {this.state.show_password ? (
                            <ion-icon
                              name="eye-off-outline"
                              class="h-8 w-8 mt-8"
                            ></ion-icon>
                          ) : (
                            <ion-icon
                              name="eye-outline"
                              class="h-8 w-8 mt-8"
                            ></ion-icon>
                          )}
                        </button>
                      </div>

                      <button
                        type="submit"
                        name="submit"
                        className="shadow-lg inline-block self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl disabled:bg-gray-50 disabled:text-gray-600 disabled:bg-opacity-70"
                        disabled={this.state.button}
                      >
                        Log In
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
