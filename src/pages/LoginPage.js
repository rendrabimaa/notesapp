import React from "react";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  function onLoginHandler(user) {
    console.log(`Email: ${user.email}`);
    console.log(`Passowrd: ${user.password}`);
  }

  return (
    <>
      <Navigation />
      <section>
          <LoginForm login={onLoginHandler} />
      </section>
    </>
  )
}

export default LoginPage;