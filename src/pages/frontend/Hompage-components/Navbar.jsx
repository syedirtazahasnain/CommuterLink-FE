import React from "react";
import { BASE_URL } from "../../../constants";
import { Link } from "react-scroll";
import { Link as DomLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
const Navbar = () => {

  const navigate = useNavigate();

  const signupRoute = () => {
    navigate("/signup");

  };

  const loginRoute = () => {
    navigate("/login");

  };

  return (
    <div>
      <div className="container ">
        <div className="row">

          <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <DomLink
                className="navbar-brand ml-3"
                to="/"
              >
                <img src={`${BASE_URL}/assets/images/CL-logo.png`} width="mr-auto" height="40px" alt="logoimg" />
              </DomLink>
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
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto  font-size:'12px' font-family:'Poppins, sans-serif'">
                  <li className="nav-item">
                    <DomLink className="nav-link mr-3 ml-3" to="/">
                      HOME
                    </DomLink>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="carousel" spy="true" smooth="true" offset={30} duration={100}>
                      CONCEPT
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="howworks">
                      HOW IT WORKS?
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="contribute" spy="true" smooth="true" offset={30} duration={100}>
                      CONTRIBUTE
                    </Link>
                   
                  </li>
                  <li className="nav-item">
                    <DomLink className="nav-link mr-3 ml-3" to="/Faq">
                      FAQS
                    </DomLink>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mr-3 ml-3" to="contact" spy="true" smooth="true" offset={30} duration={100}>
                      CONTACT
                    </Link>
                  </li>
                </ul>
                  
                <Button
                  className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                  onClick={signupRoute}
                >
                  Sign up
                </Button>

                <Button
                  className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                  onClick={loginRoute}
                >
                  Login
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
