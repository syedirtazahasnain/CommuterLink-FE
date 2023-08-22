import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/base";

const Office_School = () => {
  const backgroundLogo = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
  };
  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
  };

  // const [radio1, setRadio1 ] = useState("");
  // const [radio2, setRadio2] = useState("");

  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  // const navigate = useNavigate();

  //  const route = () =>{

  //   if(radio1){
  //     navigate("/rider-registration");
  //   }

  //     if(radio2){
  //       navigate("/driver-registration");
  //     }
  //  };

  //  console.log("Selected", radio1);

  return (
    <div>
      <div>
        <section
          id="sign-up"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 d-flex fixed"
                style={{
                  marginTop: "12vh",
                }}
              >
                <Carousel
                  style={{
                    backgroundColor: "#eee",
                  }}
                  className="carousel-container"
                  prevIcon={null}
                  nextIcon={null}
                  indicators={null}
                >
                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="Forth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>

              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
                <div className="container">
                  <div className="row justify-content-center py-15 my-4">
                    <div className="col-10">
                      <div className="card text-center border-0 shadow rounded rounded-4">
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <div
                                className="card-body rounded rounded-4"
                                //   style={{ background: "rgb(22,70,57)" }}
                              >
                                <div>
                                  <div>
                                    {" "}
                                    <img
                                      src={`${BASE_URL}/assets/images/Vector.png`}
                                      alt="Sample photo"
                                      className="bg-success"
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </div>
                                  <div className="text-white">
                                    {name}
                                    <br />
                                    {email}
                                  </div>
                                  <h5
                                    className="card-title mt-4 text-success"
                                    style={{ color: "yellow" }}
                                  >
                                    FullName
                                  </h5>
                                  <p>test@gmail.com</p>
                                </div>
                                <div className="">
                                  <h5 className="text-success mb-4">
                                    I want to share ride for
                                  </h5>
                                  <Button
                                    variant="success"
                                    className="btn-lg bg-success text-white  border-0 rounded
                                  rounded-4  mb-2"
                                  >
                                    Office
                                  </Button>
                                  <p>Or</p>
                                  <Button
                                    variant="success"
                                    className="btn-lg bg-success text-white border-0 rounded
                                 rounded-4"
                                  >
                                    School/University
                                  </Button>{" "}
                                  {/* <div className="container text-center justify-content-center">
                                  <div className="text-center">
                                    {" "}
                                    <label className="radio-button ">
                                      <input
                                        type="radio"
                                        id="option1"
                                        name="option"
                                        value="office"
                                      />
                                      <span
                                        className="ml-3"
                                        style={{ color: "#198754" }}
                                      >
                                        Office
                                      </span>
                                    </label>
                                  </div>

                                  <div className="text-center">
                                    {" "}
                                    <label class="radio-button">
                                      <input
                                        type="radio"
                                        id="option2"
                                        name="option"
                                        value="University"
                                      />
                                      <span
                                        className="ml-3"
                                        style={{ color: "#198754" }}
                                      >
                                        University (Only if you are over 18
                                        years)
                                      </span>
                                    </label>
                                  </div>
                                </div> */}

                                  </div>
                                <form id="numberForm">
                                  <div>
                                    <p className="mt-2  fs-5 text-success cursor-pointer">
                                      On long term basis
                                    </p>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Office_School;
