import React from "react";
import logo from '../../../Images/CL-logo.png';
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <Link className="navbar-brand ml-3" to="https://www.commuterslink.com/">
            <img src={logo} width="mr-auto" height="40px" alt="logoimg" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto  font-size:'12px' font-family:'Poppins, sans-serif'">
              <li className="nav-item">
                <Link className="nav-link mr-3" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mr-3" to="/carousel">
                  CONCEPT
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mr-3" to="/howworks">
                  HOW IT WORKS?
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mr-3" to="/contribute">
                  CONTRIBUTE
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link mr-3" href="faq1.html">
                  FAQS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mr-3" href="#contact">
                  CONTACT
                </a>
              </li>
            </ul>
              <Link
                to="/signup"
                className="btn btn-outline-custom m-0 fw-bold"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-custom m-2 fw-bold mr-3"
              >
                Login
              </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
