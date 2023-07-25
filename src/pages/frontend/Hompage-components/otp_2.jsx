import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import imgfacebook from "../../../Images/facebook.png";
import imggoogle from "../../../Images/google.png";
import imgtwitter from "../../../Images/twitter.png";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const otp_2 = () => {
  const Size = {
    fonstSize: "14px",
    marginBottom: "8px",
    width: "350px",
    margin: "auto",
  };
  return (
    <div>
      <div>
        <Navbar />
        <section id="sign-up" class="mt-5" style={{ backgroundColor: "#eee" }}>
          <div className="row">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vh",
              }}
            >
              <Carousel
                style={{
                  backgroundColor: "#eee",
                  height: "40vh",
                  width: "30vw",
                }}
                className="carousel-container"
                prevIcon={null}
                nextIcon={null}
                indicators={null}
              >
                <Carousel.Item interval={2000}>
                  <img
                    className="Carousel_image"
                    src={mySlides1}
                    alt="First slide"
                    style={{
                      height: "40vh",
                      marginLeft: "5px",
                      backgroundColor: "#eee",
                    }}
                  />
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="Carousel_image"
                    src={mySlides2}
                    alt="First slide"
                    style={{
                      height: "40vh",
                      marginLeft: "5px",
                      backgroundColor: "white",
                    }}
                  />
                </Carousel.Item>

                <Carousel.Item interval={2000}>
                  <img
                    className="Carousel_image"
                    src={mySlides3}
                    alt="First slide"
                    style={{
                      height: "40vh",
                      marginLeft: "5px",
                      backgroundColor: "#eee",
                    }}
                  />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                  <img
                    className="Carousel_image"
                    src={mySlides4}
                    alt="First slide"
                    style={{
                      height: "40vh",
                      marginLeft: "5px",
                      backgroundColor: "#eee",
                    }}
                  />
                </Carousel.Item>
              </Carousel>

              {/* <div
                className="w3-content w3-section"
                style={{ maxwidth: "400px" }}
              >
                <img
                  className="mySlides"
                  src={mySlides1}
                  style={{ width: "100%" }}
                />
                <img
                  className="mySlides"
                  src={mySlides2}
                  style={{ width: "100%" }}
                />
                <img
                  className="mySlides"
                  src={mySlides3}
                  style={{ width: "100%" }}
                />
                <img
                  className="mySlides"
                  src={mySlides4}
                  style={{ width: "100%" }}
                />
              </div> */}
            </div>

            <div className="col-md-6 mb-2">
              <h3
                className="text-center mb-2"
                style={{
                  color: "#198754",
                  marginBottom: "5px",
                  marginTop: "5vh",
                }}
              >
                {" "}
               OTP Verification
              </h3>{" "}
              <p>We have sent “One Time Password” on your Mobile Number and Email</p>
              <Form className="text-center">
                <Form.Group
                  className="mb-1 mt-5 text-center"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    style={Size}
                    type="text"
                    id="name"
                    placeholder="Username or Email"
                    required=""
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1 text-center"
                  controlId="formBasicEmail"
                >
                  <Form.Control
                    style={Size}
                    type="Password"
                    placeholder="Password"
                    id="password"
                    required=""
                  />
                </Form.Group>
                <div className="ml-3 mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox"
                    style={{ borderBlockColor: " #198754" }}
                    required=""
                  />
                  <label className="form-check-label" for="form2Example3">
                    <div id="span-text" className=" mr-5 small">
                      I agree with all statements in
                      <a href="#!" style={{ textDecoration: "none" }}>
                        <span
                          style={{ color: "#198754", textDecoration: "none" }}
                        >
                          Terms of service
                        </span>
                      </a>
                    </div>
                  </label>
                </div>
                <Button className="btn  formbtn">Login</Button>{" "}
                <div className="container">
                  <div className="row d-flex justify-content-center">
                    <div class="column mr-3">
                      <p class=" text-muted" id="text2">
                        Or continue with
                      </p>
                    </div>
                    <div class="column">
                      <ul
                        class="list-unstyled  d-flex "
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <li class="mr-3">
                          <a href="https://www.linkedin.com/company/sysreforms-international/">
                            <img
                              src={imggoogle}
                              alt=""
                              style={{ height: "25px", width: "25px" }}
                            />
                          </a>
                        </li>
                        <li class="mr-3">
                          <a href="https://www.facebook.com/Sysreforms">
                            <img
                              src={imgfacebook}
                              alt=""
                              style={{ height: "27px", width: "27px" }}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="https://instagram.com/sysreforms_international?igshid=YmMyMTA2M2Y= ">
                            <img
                              src={imgtwitter}
                              alt=""
                              style={{ height: "27px", width: "27px" }}
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr id="hrline2" />
                  <div id="span-text" className="text-center mb-5">
                    New to CommuterLinks? &nbsp;
                    <Link to="/registration">
                      <span style={{ color: "#198754" }}>Registration</span>
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default otp_2;
