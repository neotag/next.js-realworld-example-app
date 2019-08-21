import agent from '../utils/agent';
import { useState, ChangeEvent } from 'react';


const Register = () => {
  const [email, setEmail] = useState("neotag01@example.com");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("12345678");

  const createOnChangeHandler = (setState: any) => {
    return (ev: ChangeEvent<HTMLInputElement>) => setState(ev.target.value)
  }

  const onSignUpSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault()
    agent.Auth.register(username, email, password).then((response: any) => {
      console.log(response ? response.user.token : response)
      agent.Auth.current().then(console.log)
    })
  }

  const onSignInSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault()
    agent.Auth.login(email, password).then((response: any) => {
      console.log(response ? response.user.token : response)
      agent.setToken(response.user.token)
      agent.Auth.current().then(console.log)
    })
  }

  return (<div>
    <h1>Sign up</h1>
    <form onSubmit={onSignUpSubmit}>
      <p><input type="text" name="username" value={username} placeholder="Username" onChange={createOnChangeHandler(setUsername)} /></p>
      <p><input type="text" name="email" value={email} placeholder="Email" onChange={createOnChangeHandler(setEmail)} /></p>
      <p><input type="text" name="password" value={password} placeholder="Password" onChange={createOnChangeHandler(setPassword)} /></p>
      <p><button type="submit">Sign in</button></p>
    </form>
    <h1>Sign in</h1>
    <form onSubmit={onSignInSubmit}>
      <p><input type="text" name="email" value={email} placeholder="Email" onChange={createOnChangeHandler(setEmail)} /></p>
      <p><input type="text" name="password" value={password} placeholder="Password" onChange={createOnChangeHandler(setPassword)} /></p>
      <p><button type="submit">Sign in</button></p>
    </form>
  </div>)
}

export default Register
