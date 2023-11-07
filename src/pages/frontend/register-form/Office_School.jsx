import React, { useState, useEffect } from "react";
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

  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const schoolRoute = () => {
    navigate("/nested-school");
  };

  const officeRoute = () => {
    navigate("/nested");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  console.log(name, email);

  return (
    <div>
      <div>
        <section
          id="sign-up"
          className="mt-5 main-bg">
          <div className="container">
            <div className="row py-5">
              <div
                className="col-md-6 d-flex fixed"
                style={{
                  marginTop: "10vh",
                }}
              >
                <Carousel
                  className="carousel-container main-bg"
                  prevIcon={null}
                  nextIcon={null}
                  indicators={null}
                >
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                  </Carousel.Item>

                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block  img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride For Office</h4>
                  </Carousel.Item>
                </Carousel>
              </div>

              <div className="col-md-6 mb-2 text-center d-flex justify-content-center">
                <div className="container">
                  <div className="row justify-content-center py-15 my-4">
                    <div className="col-10 mt-2">
                      <div className="card py-5 text-center border-0 shadow rounded rounded-4">
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <div
                                className="card-body rounded rounded-4"
                              //   style={{ background: "rgb(22,70,57)" }}
                              >
                                <div>
                                  <span
                                    className="card-title mt-4 fw-bold fs-6"

                                  >
                                    {name ?
                                      (<span>{name}<br /></span>)
                                      :
                                      (<></>)
                                    }
                                  </span>
                                  <span
                                    className="card-titlefw-bold fs-6"

                                  >
                                    {email ?
                                      (<span className="text-success fw-small">{email}</span>)
                                      :
                                      (<></>)
                                    }
                                  </span>
                                </div>
                                <div className="">
                                  <h5 className="text-dark mb-4">
                                    I want to commute to
                                  </h5>
                                  <div>   <Button
                                    variant="success"
                                    className="btn-custom1 mx-2 border-0 w-150px px-4 py-2 rounded rounded-2 text-white fw-bold"
                                    onClick={officeRoute}
                                  >
                                    Office
                                  </Button></div>
                                  {/* <p className="py-3">Or</p> */}
                                  <div className="py-2">
                                    Or
                                  </div>
                                  <div>
                                    <Button
                                      variant="success"
                                      className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                                      onClick={schoolRoute}
                                    >
                                      School/University
                                    </Button>
                                  </div>
                                  <form id="numberForm">
                                    <div>
                                      <p className="my-3  fs-5  text-success cursor-pointer">
                                        On long term basis (daily)
                                      </p>
                                      {/* <p className="my-3 fw-bold fs-6 text-danger cursor-pointer">
                                      You must be 18 years old or elder to register 
                                    </p> */}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Office_School;
