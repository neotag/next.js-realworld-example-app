import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import agent from "../utils/agent";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  login() {
    const token = root.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillMount() {
    if (process.client) this.login();
  }

  render() {
    const { Component, pageProps } = this.props;
    if (global.window) window.store = store;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;
