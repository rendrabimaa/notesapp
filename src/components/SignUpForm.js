import React, { useState } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { sweetAlertError } from "../utils/sweet-alert";

function SignUpForm({ signUp }) {
  const [fullname, handleFullnameChange] = useInput("");
  const [username, handleUsernameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [error, setError] = useState('');

  


  const onSubmitHandler = (event) => {
    event.preventDefault();

    
    if (password.length === 0) {
      setError('Password harus diisi.');
      sweetAlertError('Yahh :(', error);
    } else if (password.length < 8) {
      setError('Password harus memiliki minimal 8 karakter.');
      sweetAlertError('Password harus memiliki Minimal 8 Karakter');
    }else{
      signUp({
        fullname,
        username,
        password,
      });
    }

  };

  console.log(fullname);

  return (
      <div className="signup-form">
          <div className="title">Signup</div>
        <form onSubmit={onSubmitHandler}>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Enter your name" value={fullname} onChange={handleFullnameChange} required/>
              </div>
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your username" value={username} onChange={handleUsernameChange}  required/>
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange}  required/>
              </div>
              <div className="button input-box">
                <input type="submit" value="Submit"/>
              </div>
              <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
            </div>
      </form>
    </div>
  );
}

SignUpForm.propType = {
  login: PropTypes.func.isRequired,
};

export default SignUpForm;
