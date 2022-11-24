import React from "react";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  function onLoginHandler(user) {
    console.log(`Email: ${user.email}`);
    console.log(`Passowrd: ${user.password}`);
  }

  return (
    <>
      <Navigation />
      <section className="login-page">
        <div className="container-login">
          <h2>NOTE IT!</h2>
          <LoginForm login={onLoginHandler} />
          <p>Dont have an account?</p>
          <Link to="/signup">Create Account</Link>
        </div>
      </section>
    </>
  )
}

export default LoginPage;