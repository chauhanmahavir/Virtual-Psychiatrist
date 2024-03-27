import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { SERVER_URL } from "../config/config.js";
import axios from "axios";

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
    };

    this.send_message = this.send_message.bind(this);
    this.set_input = this.set_input.bind(this);
  }

  send_message(event) {
    event.preventDefault();
    const json_data = this.state;
    axios
      .post(SERVER_URL + "/contact/message", json_data)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/";
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  set_input(event) {
    if (event.target.name === "name") {
      this.setState({ name: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "message") {
      this.setState({ message: event.target.value });
    }
  }

  render() {
    return (
      <div>
        <FadeIn>
          <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col md:flex-row md:space-x-32 md:space-y-0 space-y-6 bg-cyan-700 w-full max-w-5xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden bg-opacity-10">
              <div className="flex flex-col space-y-8 justify-between">
                <div className="font-bold text-5xl tracking-wide">
                  <h1> Contact Us </h1>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="inline-flex space-x-2 items-center">
                    <ion-icon name="call" className="text-xl"></ion-icon>
                    <span className="text-xl">+1(XXX) XXX XXXX</span>
                  </div>
                  <div className="inline-flex space-x-2 items-center">
                    <ion-icon name="mail" className=" text-xl"></ion-icon>
                    <span className="text-xl">abc@gmail.com</span>
                  </div>
                  <div className="inline-flex space-x-2 items-center">
                    <ion-icon name="location" className=" text-xl"></ion-icon>
                    <span className="text-xl">Canada</span>
                  </div>
                </div>
                <div className="flex space-x-4 text-lg">
                  <a href="#">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                  <a href="#">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                  <a href="#">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                  <a href="#">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -right-20 -top-20"></div>
                <div className="absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-20 -bottom-20"></div>
                <div className="relative z-10 bg-white rounded-xl shadow-xl p-8 md:w-180 bg-opacity-0 text-white">
                  <form
                    onSubmit={this.send_message}
                    className="flex flex-col space-y-4"
                  >
                    <div>
                      <label for="" className=" text-xl">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        pattern=".{2,}"
                        name="name"
                        onChange={this.set_input}
                        class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                        required
                      ></input>
                    </div>

                    <div>
                      <label for="" className="text-xl">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="abc@xyz.com"
                        name="email"
                        onChange={this.set_input}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                        required
                      ></input>
                    </div>

                    <div>
                      <label for="" className="text-xl">
                        Message
                      </label>
                      <textarea
                        type="text"
                        rows={5}
                        placeholder="Message"
                        name="message"
                        onChange={this.set_input}
                        pattern=".{5,}"
                        class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                        required
                      ></textarea>
                    </div>
                    <button className="shadow-lg inline-block self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }
}
