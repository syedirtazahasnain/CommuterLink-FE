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
  const home=()=>{
    navigate("/")
  }

  const loginRoute = () => {
    navigate("/login");

  };

  return (
    <div>
      <div className="container ">
        <div className="row">

          <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-white bg-white  fixed-top">
              <DomLink
                className="navbar-brand p-2"
                to="/"
              >
                <img src={`${BASE_URL}/assets/images/CL-logo.png`} width="mr-auto" height="50px" alt="logoimg" />
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
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item nav-grey">
                    <Link className="nav-link text-black mr-3 ml-3" to="carousel" onClick={home}>
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link className="nav-link text-black mr-3 ml-3" to="carousel" onClick={home} smooth="true" offset={20} duration={50}>
                      CONCEPT
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link className="nav-link text-black mr-3 ml-3" to="howworks" onClick={home} offset={20} duration={50}>
                      HOW IT WORKS?
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link className="nav-link text-black mr-3 ml-3" to="contribute" smooth="true" onClick={home} offset={20} duration={50}>
                      CONTRIBUTE
                    </Link>
                   
                  </li>
                  <li className="nav-item nav-grey">
                    <DomLink className="nav-link text-black mr-3 ml-3 text-dark" to="/Faq">
                      FAQS
                    </DomLink>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link className="nav-link text-black mr-3 ml-3" to="contact" onClick={home} smooth="true" offset={20} duration={50}>
                      CONTACT
                    </Link>
                  </li>
                </ul>
                  
                <button
                  className="btn-custom mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                  onClick={signupRoute}
                >
                  Sign up
                </button>

                <button
                  className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                  onClick={loginRoute}
                >
                  Login
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
