import React from "react";
import Navigation from "../components/Navigation";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";


function SignUpPage() {
  function onSignUpHandler(user) {
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Passowrd: ${user.password}`);
  }

  return (
    <>
      <Navigation />
      <section className="sign-up-page">
        <div className="container-sign-up">
          <h2>NOTE IT!</h2>
          <SignUpForm signUp={onSignUpHandler} />
          <p>Already have account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </section>
    </>
  )
}

export default SignUpPage;