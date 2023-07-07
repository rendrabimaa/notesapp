import React from "react";
import { Link } from "react-router-dom";
import { putAccessToken } from "../utils/api";
import ThemeButton from './buttons/ThemeButton';
import { IoMdLogOut } from 'react-icons/io';
import { convertToPascalCase } from "../utils/pascal-case";

function NavigationLogin({ user, setUser }) {
  function logoutHandler() {
    setUser(null);
    putAccessToken('');
  }

  console.log(user.fullname);

  return (
    <div className="nav-login">
      <div className="nav-login__inner">
      <Link to="/" ><img src="Logo.png" alt="Logo" className="logoNav"></img></Link>
        <ul className="nav-login-list">
          <li className="theme"><ThemeButton /></li>
          <li>
            <Link to='/'  className="login-text">Notes</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>{convertToPascalCase(user.fullname)} <IoMdLogOut className="logoutbutton"/></button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationLogin;