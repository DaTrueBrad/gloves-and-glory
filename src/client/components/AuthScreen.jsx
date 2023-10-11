import React, { useRef } from "react";
import axios from "axios";

const AuthScreen = () => {
  const usernameRef = useRef();
  const passRef = useRef();

  let register = () => {
    let newUser = {
      username: usernameRef.current.value,
      password: passRef.current.value
    }
    axios.post('/api/register', newUser)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  let login = () => {
    let userInfo = {
      username: usernameRef.current.value,
      password: passRef.current.value
    }
    axios.post('/api/login', userInfo)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="text" placeholder="Password" ref={passRef} />
      </div>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default AuthScreen;
