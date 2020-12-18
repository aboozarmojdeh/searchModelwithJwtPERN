import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import signIn from '../img/signIn.png';
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const handleOnchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(email, password);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        // console.log(parseRes)
        setAuth(true);
        toast.success("Login successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
     


      <div class="imgcontainer text-center my-5">
    <img src={signIn} alt="Sign-in" style={{borderRadius:'50%',border: '1px solid #2977c9'}} width="20%" height="250" />
  </div>
     
      <form onSubmit={onSubmitForm}>
      <label for="email"><b>Email</b></label>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleOnchange(e)}
        />
        <label for="password"><b>Password</b></label>
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleOnchange(e)}
        />
        <button className="btn btn-success submit-btn">Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </Fragment>
  );
};

export default Login;
