import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_profile: "hidden",
    };

    this.toggle_user_profile = this.toggle_user_profile.bind(this);
    this.sing_out = this.sing_out.bind(this);
  }

  sing_out(event) {
    console.log("cskjbvf");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("session_id");
    window.location.href = "/";
  }

  toggle_user_profile() {
    if (this.state.user_profile === "hidden") {
      this.setState({ user_profile: "" });
    } else {
      this.setState({ user_profile: "hidden" });
    }
  }

  render() {
    return (
      <div class="flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          type="button"
          class="flex text-sm bg-transperent rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          onClick={this.toggle_user_profile}
        >
          <span class="sr-only">Open user menu</span>
          <ion-icon
            name="person-circle-outline"
            class="h-9 w-9 rounded-full bg-transparent"
          ></ion-icon>
        </button>
        <div
          className={`z-50 ${this.state.user_profile} absolute my-12 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
          id="user-dropdown"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">
              {this.props.name}
            </span>
            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {this.props.email}
            </span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={this.toggle_user_profile}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={this.toggle_user_profile}
              >
                History
              </NavLink>
            </li>
            <li>
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                onClick={this.sing_out}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
        {/* Profile Page */}
      </div>
    );
  }
}
