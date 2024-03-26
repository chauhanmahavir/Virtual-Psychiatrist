import React, { Component } from "react";
import FadeIn from "react-fade-in";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show_history: 1,
      title: "History",
      button_title: "New Chat",
      jwt_token: localStorage.getItem("jwtToken") || "",
      session_name: "",
    };

    this.show_chat_name = this.show_chat_name.bind(this);
    this.hide_chat_name = this.hide_chat_name.bind(this);
    this.set_session_id = this.set_session_id.bind(this);
    this.create_session_id = this.create_session_id.bind(this);
    this.set_input = this.set_input.bind(this);
  }

  set_input(event) {
    this.setState({ session_name: event.target.value });
  }

  create_session_id(event) {
    event.preventDefault();
    axios
      .post(
        SERVER_URL + "/chat/create_chat_session",
        { session_name: this.state.session_name },
        { headers: { jwt_token: this.state.jwt_token } }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          console.log(response.data.session_id);
          this.set_session_id(response.data.session_id);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  set_session_id(key) {
    console.log(key);
    localStorage.setItem("session_id", key);
    window.location.href = "/chatscreen";
  }

  hide_chat_name(event) {
    this.setState({
      show_history: 1,
      title: "History",
      button_title: "New Chat",
    });
  }

  show_chat_name(event) {
    if (this.state.show_history === 0) {
      this.hide_chat_name();
    } else {
      this.setState({
        show_history: 0,
        title: "New Chat",
        button_title: "History",
      });
    }
  }

  componentDidMount() {
    axios
      .post(
        SERVER_URL + "/chat/get_session_history",
        {},
        { headers: { jwt_token: this.state.jwt_token } }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ data: response.data.history });
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
          <div className="flex w-full min-h-screen justify-center items-center text-md md:text-lg lg:text-lg xl:text-lg">
            <div className="flex flex-col md:flex-col md:space-x-32 md:space-y-0 space-y-6 bg-cyan-700 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden bg-opacity-10">
              <div className="flex flex-col space-y-8 justify-between">
                <div className="flex flex-col sm:flex-row justify-between items-center font-bold tracking-wide">
                  <h1 className="text-center sm:text-left px-4 py-2 sm:py-0 text-4xl">
                    {this.state.title}
                  </h1>
                  <div>
                    <button
                      className="bg-cyan-700 text-white font-bold shadow-lg rounded-lg px-6 py-2 uppercase sm:ml-4 flex flex-row"
                      onClick={this.show_chat_name}
                    >
                      {this.state.show_history ? (
                        <ion-icon name="create-outline"></ion-icon>
                      ) : (
                        <ion-icon name="timer-outline"></ion-icon>
                      )}
                      <div className="ml-2">{this.state.button_title}</div>
                    </button>
                  </div>
                </div>
                {this.state.show_history ? (
                  <FadeIn>
                    <div className="relative overflow-x-auto shadow-lg rounded-lg sm:rounded-lg max-h-96 min-h-96">
                      <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Chat Name
                            </th>

                            <th scope="col" class="px-6 py-3">
                              Date
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.data.length > 0 ? (
                            this.state.data.map((item, index) => (
                              <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                                onClick={() =>
                                  this.set_session_id(item.session_id)
                                }
                                key={item.session_id}
                              >
                                <th
                                  scope="row"
                                  class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {item.session_name}
                                </th>
                                <td class="px-6 py-4">{item.created_at}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="2"
                                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                              >
                                No History Available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </FadeIn>
                ) : (
                  <div>
                    <FadeIn>
                      <form
                        onSubmit={this.create_session_id}
                        className="flex flex-col space-y-4 text-xl"
                      >
                        <div>
                          <label for="" className="text-xl">
                            Chat Name
                          </label>
                          <input
                            type="text"
                            placeholder="Chat Name"
                            name="name"
                            class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300 valid:border-green-500 invalid:border-red-500 valid:ring-2 valid:ring-teal-500 bg-transparent"
                            onChange={this.set_input}
                            required
                          ></input>
                        </div>
                        <div className="flex justify-center py-4">
                          <button
                            type="submit"
                            name="submit"
                            className="shadow-lg self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl mr-10"
                          >
                            Start
                          </button>
                          <button
                            type="button"
                            name="cancle"
                            className="shadow-lg self-center bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-xl"
                            onClick={this.hide_chat_name}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </FadeIn>
                  </div>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }
}
