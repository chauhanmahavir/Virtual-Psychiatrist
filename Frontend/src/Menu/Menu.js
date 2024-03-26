import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import logo from "../assets/Images/Robot Emoji Icon.png";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";
import UserMenu from "../UserMenu/UserMenu.js";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show_menu: "hidden",
      jwt_token: localStorage.getItem("jwtToken") || "",
      is_loged_in: 0,
      name: "",
      email: "",
    };

    this.toggle_menu = this.toggle_menu.bind(this);
  }

  toggle_menu() {
    if (this.state.show_menu === "hidden") {
      this.setState({ show_menu: "" });
    } else {
      this.setState({ show_menu: "hidden" });
    }
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
            is_loged_in: 1,
            name: response.data.name,
            email: response.data.email,
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
      <div>
        <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Harmony Logo" />
              <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                Harmony
              </span>
            </a>
            {this.state.is_loged_in ? (
              <UserMenu name={this.state.name} email={this.state.email} />
            ) : (
              <></>
            )}

            <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
              <button
                data-collapse-toggle="navbar-language"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-language"
                aria-expanded="false"
                onClick={this.toggle_menu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-between ${this.state.show_menu} w-full md:flex md:w-auto md:order-1`}
              id="navbar-language"
            >
              <ul className="flex flex-col text-2xl font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:dark:bg-transparent">
                <li>
                  <NavLink
                    onClick={this.toggle_menu}
                    to="/"
                    class="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.toggle_menu}
                    to="/contact"
                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    activeClassName="active"
                  >
                    Contact
                  </NavLink>
                </li>
                {this.state.is_loged_in ? (
                  <div className="hidden"></div>
                ) : (
                  <li>
                    <NavLink
                      onClick={this.toggle_menu}
                      to="/signup"
                      class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      activeClassName="active"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                )}

                {this.state.is_loged_in ? (
                  <li className="hidden"></li>
                ) : (
                  <li>
                    <NavLink
                      onClick={this.toggle_menu}
                      to="login"
                      class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      activeClassName="active"
                    >
                      Log In
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
