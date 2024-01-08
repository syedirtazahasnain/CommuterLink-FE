import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { Link } from "react-scroll";
import { Link as DomLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { resetsignupState } from "../../../redux/signupSlice";
import { resetloginState } from "../../../redux/loginSlice";
const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [checkStatus, setCheckStatus] = useState(false);

  const signupRoute = () => {
    navigate("/signup");

  };
  const home = () => {
    navigate("/")
  }

  const loginRoute = () => {
    navigate("/login");

  };

  const footer = () => {
    navigate("/footer")
  }

  const handleLogout = () => {
    setCheckStatus(false);
    dispatch(resetsignupState());
    dispatch(resetloginState());
    navigate("/");
  };

  useEffect(() => {
    if (userToken) {
      setCheckStatus(true);
    }
    else {
      setCheckStatus(false);
    }
  }, [userToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div>
      <div className="container">
        <div className="row">

          <div className="pos-f-t">
            <nav className="navbar navbar-expand-lg navbar-white bg-white  fixed-top">
              <DomLink
                className="navbar-brand p-2"
                style={checkStatus ? { pointerEvents: "none" } : null}
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
                    <Link
                      className="nav-link text-black mr-3 ml-3 fw-bold fs-6"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      to="carousel"
                      onClick={home}
                    >
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link
                      className="nav-link text-black mr-3 ml-3 fw-bold fs-6"
                      to="costEarningSection"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      onClick={home}
                      smooth="true"
                      offset={20}
                      duration={50}
                    >
                      CONCEPT
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link
                      className="nav-link text-black mr-3 ml-3 fw-bold fs-6"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      to="howworks"
                      onClick={home}
                      offset={20}
                      duration={50}
                    >
                      HOW IT WORKS?
                    </Link>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link
                      className="nav-link text-black mr-3 ml-3 fw-bold fs-6"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      to="contribute"
                      smooth="true"
                      onClick={home}
                      offset={20}
                      duration={50}
                    >
                      IMPACT
                    </Link>

                  </li>
                  <li className="nav-item nav-grey">
                    <DomLink
                      className="nav-link text-black mr-3 ml-3 text-dark fw-bold fs-6"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      to="/Faq"
                    >
                      FAQS
                    </DomLink>
                  </li>
                  <li className="nav-item nav-grey">
                    <Link
                      className="nav-link text-black mr-3 ml-3 fw-bold fs-6"
                      style={checkStatus ? { pointerEvents: "none" } : null}
                      to="contact"
                      onClick={home}
                      smooth="true"
                      offset={20}
                      duration={50}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>

                <div>
                  {/* <button
                    className="btn-custom mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                    onClick={signupRoute}
                    disabled={checkStatus}
                  >
                    Sign up
                  </button> */}

                  <button
                    className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold fs-6"
                    onClick={loginRoute}
                    //disabled={checkStatus}
                  >
                    Login
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
