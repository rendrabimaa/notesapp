import React from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function SignUpForm({ signUp }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    signUp({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="sign-up-input">
      <input type="text" placeholder="name" value={name} onChange={handleNameChange} />
      <input type="email" placeholder="email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
      <button>Create Account</button>
    </form>
  );
}

SignUpForm.propType = {
  login: PropTypes.func.isRequired,
};

export default SignUpForm;
