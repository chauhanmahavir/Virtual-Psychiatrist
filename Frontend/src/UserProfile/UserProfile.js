import React, { Component } from "react";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";
import FadeIn from "react-fade-in";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt_token: localStorage.getItem("jwtToken") || "",
      name: "",
      email: "",
      password: "",
      show_password: 0,
    };
    this.enable_password = this.enable_password.bind(this);
    this.update_details = this.update_details.bind(this);
    this.set_inputs = this.set_inputs.bind(this);
    this.go_back = this.go_back.bind(this);
  }

  update_details(event) {
    event.preventDefault();
    const json_data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(SERVER_URL + "/user/update_user_details", json_data, {
        headers: { jwt_token: this.state.jwt_token },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          window.location.reload();
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        window.location.href = "/";
      });
  }

  set_inputs(event) {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  enable_password() {
    if (this.state.show_password == 0) {
      this.setState({ show_password: 1 });
    } else {
      this.setState({ show_password: 0 });
    }
  }

  go_back() {
    window.history.back();
  }
  componentDidMount() {
    axios
      .get(SERVER_URL + "/user/get_user_details", {
        headers: { jwt_token: this.state.jwt_token },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            is_loged_in: 1,
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
          });
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        window.location.href = "/";
        console.error("There was an error!", error);
      });
  }
  render() {
    return (
      <div>
        <FadeIn>
          <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col md:flex-col md:space-x-32 md:space-y-0 space-y-6 bg-cyan-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden bg-opacity-10">
              <div className="flex flex-col space-y-0 justify-between">
                <div className="z-10 flex justify-center font-bold text-5xl tracking-wide">
                  <h1> Profile </h1>
                </div>
                <div className="relative">
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -left-32 -top-40"></div>
                  <div className="absolute z-0 w-52 h-52 bg-teal-400 rounded-full -right-20 -bottom-20"></div>
                  <div className="bg-white z-10 relative rounded-lg shadow-lg p-8 bg-opacity-0 text-white">
                    <form
                      onSubmit={this.update_details}
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
                          value={this.state.name}
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
                          value={this.state.email}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                          required
                          disabled
                        ></input>
                      </div>

                      <div className="relative">
                        <label className="text-xl">Password</label>
                        <input
                          type={this.state.show_password ? "text" : "password"}
                          placeholder="**********"
                          name="password"
                          value={this.state.password}
                          onChange={this.set_inputs}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
                          className="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
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

                      <div className="flex flex-row justify-center">
                        <button
                          className="shadow-lg inline-block self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl mr-10"
                          name="submit"
                          type="submit"
                        >
                          Update
                        </button>

                        <button
                          className="shadow-lg inline-block self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl"
                          name="cancel"
                          type="cancel"
                          onClick={this.go_back}
                        >
                          Cancel
                        </button>
                      </div>
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
