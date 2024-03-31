import React, { Component } from "react";
import SendImg from "../assets/Images/send.png";
import loader from "../assets/Images/loader.gif";
import FadeIn from "react-fade-in/lib/FadeIn";
import autoAnimate from "@formkit/auto-animate";
import axios from "axios";
import { SERVER_URL } from "../config/config.js";

export default class Chatscreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aiStyle: "bg-white bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto",
      loading: 0,
      value: "",
      jwt_token: localStorage.getItem("jwtToken") || "",
      chat: [],
      new_message: "",
      session_id: localStorage.getItem("session_id") || "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.set_new_message = this.set_new_message.bind(this);

    this.parentRef = React.createRef();
  }

  async handleSubmit(event) {
    if (this.state.new_message.length > 0) {
      var updated_chat = this.state.chat;

      var filter_message = this.state.new_message
        .replace(/[^\w\s.?!']|_/g, "")
        .replace(/\s+/g, " ")
        .trim();
      console.log(filter_message);
      this.setState({
        new_message: filter_message,
      });
      updated_chat.push({
        sender: "human",
        message: filter_message,
      });
      this.setState({ loading: 1, chat: updated_chat });
      await axios
        .post(
          SERVER_URL + "/chat/generate_message",
          {
            session_id: this.state.session_id,
            message: filter_message,
          },
          { headers: { jwt_token: this.state.jwt_token } }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            updated_chat.push({
              sender: "gpt",
              message: response.data.response,
            });
            this.setState({ loading: 0, chat: updated_chat, new_message: "" });
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          window.location.href = "/";
          console.error("There was an error!", error);
        });
    }
  }

  set_new_message(event) {
    this.setState({ new_message: event.target.value });
  }

  async componentDidMount() {
    this.setState({ loading: 1 });
    if (this.state.jwt === "") {
      window.location.href = "/";
    }
    if (this.parentRef.current) {
      autoAnimate(this.parentRef.current);
    }
    await axios
      .post(
        SERVER_URL + "/chat/get_chat_by_session",
        { session_id: this.state.session_id },
        { headers: { jwt_token: this.state.jwt_token } }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ chat: response.data.chat_history });
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        window.location.href = "/";
        console.error("There was an error!", error);
      });
    this.setState({ loading: 0 });
  }

  componentDidUpdate() {
    if (this.parentRef.current) {
      autoAnimate(this.parentRef.current);
    }
    const buffer = document.getElementById("chat_body");
    buffer.scrollTop = buffer.scrollHeight;
  }

  render() {
    return (
      <FadeIn>
        <div className="h-screen space-y-3 sm:px-16 px-2 text-white overflow-hidden flex flex-col">
          {/* Body */}
          <div
            ref={this.parentRef}
            id="chat_body"
            className="h-[80%] sm:h-[84%] overflow-auto w-full max-w-5xl min-w-[20rem] pt-8 px-4 self-center scroll-smooth scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md text-xs md:text-lg lg:text-lg xl:text-lg"
          >
            {this.state.chat.length > 0 ? (
              this.state.chat.map((item, index) => (
                <div className="flex flex-col gap-4 py-3" key={index}>
                  <div
                    key={index}
                    className={`border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%] ${
                      item.sender === "gpt" && this.state.aiStyle
                    }`}
                  >
                    <pre className="whitespace-pre-wrap">
                      <span>{item.message}</span>
                    </pre>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p
                  colSpan="2"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-xs md:text-lg lg:text-lg xl:text-lg"
                >
                  Start New Conversation
                </p>
              </div>
            )}
          </div>
          {/* Body End */}
          <div className="w-full max-w-5xl min-w-[20rem] self-center">
            <div className="w-full bg-white bg-opacity-10 max-h-40 rounded-2xl px-4 py-4 overflow-auto relative">
              {this.state.loading ? (
                <img src={loader} className="w-8 m-auto" />
              ) : (
                <>
                  <input
                    onKeyDown={(e) => {
                      if (e.keyCode === 13 && e.shiftKey === false) {
                        e.preventDefault(); // Prevents the default behavior of pressing Enter (e.g., creating a new line)
                        this.handleSubmit();
                      }
                    }}
                    rows={1}
                    className="border-0 row-auto bg-transparent outline-none w-11/12 text-xs md:text-lg lg:text-lg xl:text-xl"
                    value={this.state.new_message}
                    type="text"
                    onChange={this.set_new_message}
                    placeholder={
                      this.state.chat.length > 0
                        ? "Message Harmony"
                        : "Start Chat with Harmony"
                    }
                    autoFocus
                  />

                  <img
                    onClick={this.handleSubmit}
                    src={SendImg}
                    width={25}
                    alt="send-button"
                    className="absolute top-4 right-7 hover:cursor-pointer ease-in duration-100 hover:scale-125"
                  />
                </>
              )}
            </div>
            <p className="flex justify-center text-gray-200 text-sm">
              Harmony can make Mistakes.
            </p>
          </div>
        </div>
      </FadeIn>
    );
  }
}
