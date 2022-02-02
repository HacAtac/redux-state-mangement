import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className=" mb-4 py-3 flex-row align-center">
      <div
        className="container flex-row justify-space-between-lg justify-center align-center"
        id="header"
      >
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0" id="header-title">
              CRUD App with GraphQL and Redux
            </h1>
          </Link>
          <p className="m-0" id="header-p">
            Get into the mind of a programmer.
          </p>
        </div>
        <div id="header-functions">
          {Auth.loggedIn() ? (
            <>
              <span id="loggedIn-User">
                Hey there, {Auth.getProfile().data.email}!
              </span>
              <button
                className="btn btn-lg btn-light m-2"
                id="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
              {/* <li id="navbtns" className="navbar-nav">
                <a className="nav-link" href="/updateuser">
                  Update User
                </a>
              </li> */}
            </>
          ) : (
            <>
              <Link
                className="btn btn-lg btn-info m-2"
                id="header-buttons"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn btn-lg btn-light m-2"
                id="header-buttons"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
