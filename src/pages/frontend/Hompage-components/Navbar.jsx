import React from "react";
import logo from "../../../Images/CL-logo.png";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
const Navbar = () => {
  return (
    <div>
      <div className="container ">
        <div className="row">

          <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <Link
                className="navbar-brand ml-3"
                to="https://www.commuterslink.com/"
              >
                <img src={logo} width="mr-auto" height="40px" alt="logoimg" />
              </Link>
              <button
                className="navbar-toggler mr-2 d-lg-none" // Add 'd-lg-none' class to hide the button in desktop view
                style={{
                  color: '#198754',
                  width: '40px',
                  height: '35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" style={{}}></span>
              </button>

              {/* <div class="fixed-top"> */}
              {/* <div class="bg-dark p-4">
      <h5 class="text-white h4">Collapsed content</h5>
      <span class="text-muted">Toggleable via the navbar brand.</span>
    </div> */}
              {/* <button class="navbar-toggler" type="button" data-toggle="collapse"
data-target="#navbarSupportedContent" 
aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button> */}
              <div
                // className="collapse navbar-collapse"
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto  font-size:'12px' font-family:'Poppins, sans-serif'">
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="/">
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="/carousel">
                      CONCEPT
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="/howworks">
                      HOW IT WORKS?
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="/contribute">
                      CONTRIBUTE
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="/Faq">
                      FAQS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mr-3 ml-3" href="#contact">
                      CONTACT
                    </a>
                  </li>
                </ul>
                  <button
                    className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                  >
                    Sign up
                  </button>
                <Link
                  to="/signup"
                >
                </Link>
                <Link
                  to="/login"
                >

                  <button
                    className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
