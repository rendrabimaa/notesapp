import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function LoginForm({ login }) {
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
    <form onSubmit={onSubmitHandler} className="login-input">
      <input type="email" placeholder="email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
      <button>Login</button>
    </form>
  );
}

LoginForm.propType = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
