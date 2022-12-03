import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import SignUpForm from "./SignUpForm";

function LoginForm({ login, signUp }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className="loginnnn">
      <div className="container">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src="Gambar 1.jpg" alt="" />
            <div className="text">
              <span className="text-1">Cornell Note Taking <br /> A Method to take</span>
              <span className="text-2">great notes</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src="Gambar 1.jpg" alt="" />
            <div className="text">
              <span className="text-1">Complete miles of journey <br /> with one step</span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={onSubmitHandler}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">Don't have an account? <label for="flip">Sign up now</label></div>
                </div>
              </form>
            </div>
            <SignUpForm signUp={signUp} />
          </div>
        </div>
      </div>
    </div>
  );
}

LoginForm.propType = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
