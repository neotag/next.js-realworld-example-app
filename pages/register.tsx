import agent from "../utils/agent";
import { useState, ChangeEvent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import Link from "next/Link";
import { LOGIN, LOGOUT } from "../actionTypes";

import { IState } from "../types";

interface RegisterActions {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const mapStateToProps = (state: IState) => ({ ...state.user });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: async (email: string, password: string) =>
    dispatch({ type: LOGIN, payload: await agent.Auth.login(email, password) }),
  signOut: () => dispatch({ type: LOGOUT }),
});

type RegisterProps = IState & RegisterActions;

const Register = (props: RegisterProps) => {
  const [email, setEmail] = useState("neotag01@example.com");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("12345678");
  const { user } = props;

  console.log("props", props);

  const createOnChangeHandler = (setState: any) => {
    return (ev: ChangeEvent<HTMLInputElement>) => setState(ev.target.value);
  };

  const onSignUpSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    agent.Auth.register(username, email, password).then((response: any) => {
      console.log(response ? response.user.token : response);
      agent.Auth.current().then(console.log);
    });
  };

  const onSignInSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    props.signIn(email, password);
  };

  const onSignOuntSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    props.signOut();
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={onSignUpSubmit}>
        <p>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={createOnChangeHandler(setUsername)}
          />
        </p>
        <p>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={createOnChangeHandler(setEmail)}
          />
        </p>
        <p>
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={createOnChangeHandler(setPassword)}
          />
        </p>
        <p>
          <button type="submit">Sign in</button>
        </p>
      </form>
      <h1>Sign in</h1>
      <form onSubmit={onSignInSubmit}>
        <p>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={createOnChangeHandler(setEmail)}
          />
        </p>
        <p>
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={createOnChangeHandler(setPassword)}
          />
        </p>
        <p>
          <button type="submit">Sign in</button>
        </p>
      </form>
      <h1>Sign out</h1>
      <form onSubmit={onSignOuntSubmit}>
        <p>
          <button type="submit">Sign out</button>
        </p>
      </form>
      {user ? "Hi! " + user.username : "Unknown"}
      <p>
        <Link href="/">
          <a>Go to top page.</a>
        </Link>
      </p>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
