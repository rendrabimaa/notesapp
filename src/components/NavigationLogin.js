import React from "react";
import { Link } from "react-router-dom";
import { putAccessToken } from "../utils/api";
import ThemeButton from './buttons/ThemeButton';

function NavigationLogin({ user, setUser }) {
  function logoutHandler() {
    setUser(null);
    putAccessToken('');
  }

  console.log(user.fullname);

  return (
    <div className="nav-login">
      <div className="nav-login__inner">
        <Link to="/"> NOTE IT! </Link>
        <ul>
          <li><ThemeButton /></li>
          <li>
            <Link to='/'>Notes</Link>
          </li>
          <li>
            <Link to='/categories'>Categories</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>{user.fullname}Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationLogin;