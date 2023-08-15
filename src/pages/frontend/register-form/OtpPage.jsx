import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import { BASE_URL } from "../../../constants";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Modal, Alert } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/base";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import imgpoper from "../../../Images/popper.png";
import { ImageNotSupportedSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { setsignupState } from "../../../redux/signupSlice";

const OtpPage = () => {
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const [isOTPMatched, setIsOTPMatched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]);
  const hardcodedOTP = "12345";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.signup.data);
  const postData = async () => {
    try {
      let email = userData.email;
      let password = userData.password;
      const body = {
        email: userData.email,
        number: userData.phone,
        provider: userData.provider,
        password: userData.password,
        confirm_password: userData.confirmPassword,
        name: userData.name,
        otp: userData.otp,
        token: userData.token,
      };
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonresponse = await response.json();
      console.log(jsonresponse);
      if (jsonresponse.statusCode == 200) {

        const loginDetails = {
          email: email,
          password: password,
        };
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
          }
        );
        const jsonresponse = await response.json();

        if(jsonresponse.statusCode == 200){
          console.log(jsonresponse);
          dispatch(setloginState(jsonresponse.access_token));
          navigate("/nested");
        }
      } else {
        alert("Error: " + jsonresponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setOTP((prevOTP) => {
      const newOTP = [...prevOTP];
      newOTP[index] = value;
      return newOTP;
    });
    if (e.nextSibling) {
      e.nextSibling.focus();
      //   inputRefs.current[index + 1].focus();
    }
    if (index === 5) {
      // If the last input field is filled, validate the OTP
      const enteredOTP = otp.join("");
    }
  };
  const validateOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP == userData.otp) {
      setIsOTPMatched(true);
      alert("OTP is matched");
      // handleShowModal();
      postData();
    } else {
      setIsOTPMatched(false);
      alert("OTP does not match. Please try again.");
    }
  };

  const resendOTP = async () => {
    const body = {
      email: userData.email,
      number: userData.phone,
      signatur: "",
    };
    const response = await fetch(
      "https://staging.commuterslink.com/api/v1/send/otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const jsonresponse = await response.json();
    if (jsonresponse.statusCode == 200) {
      dispatch(
        setsignupState({
          otp: jsonresponse.otp,
          token: jsonresponse.token,
        })
      );
    } else {
      alert("Resend OTP Error: " + jsonresponse.message);
    }
    alert("OTP has been sent again!");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <Navbar />

        <section
          id="sign-up"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10vh",
                }}
              >
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
                    }}
                    className="carousel-container"
                    prevIcon={null}
                    nextIcon={null}
                    indicators={null}
                  >
                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={`${BASE_URL}/assets/images/signup.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={`${BASE_URL}/assets/images/signup-6.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>

              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
                <Card
                  sx={{
                    marginTop: "10vh",
                    maxWidth: "400px",
                    marginLeft: "5px",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h4"
                      color="#198754"
                    >
                      OTP Verification
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      <p className="text-center">
                        We have sent “One Time Password” on your Mobile Number
                        and Email{" "}
                      </p>{" "}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="h5"
                      color="#198754"
                    >
                      Enter OTP
                    </Typography>
                    <div className="d-flex justify-content-center">
                      {otp.map((data, index) => {
                        return (
                          <FormControl
                            sx={{ m: 1, width: "5ch" }}
                            variant="outlined"
                            key={0}
                          >
                            <OutlinedInput
                              id="outlined-adornment-weight"
                              className="otp-input"
                              aria-describedby="outlined-weight-helper-text"
                              key={1}
                              value={data}
                              onChange={(e) => handleInputChange(e, index)}
                              onFocus={(e) => e.target.select()}
                              ref={(el) => inputRefs.current[index]}
                              inputProps={{
                                "aria-label": "weight",
                                maxLength: 1,
                              }}
                            />
                          </FormControl>
                        );
                      })}
                    </div>
                  </CardContent>

                  <CardActions className="row">
                    <div className="col-12 text-end">
                      <Button
                        variant="outlined"
                        type="submit"
                        onClick={validateOTP}
                        className="btnregistration"
                      >
                        Submit
                      </Button>
                    </div>
                  </CardActions>
                  <Typography sx={{ fontSize: "14px" }}>
                    {" "}
                    <p className="text-center">
                      Didn't get the code?
                      <Button
                        variant="text"
                        onClick={resendOTP}
                        style={{ color: "#198754" }}
                      >
                        Resend
                      </Button>
                    </p>{" "}
                  </Typography>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Modal show={showModal} onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="success">
              You've achieved something amazing! Well done!
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              <Link to="/nested">Next</Link>
            </Button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    </div>
  );
};

export default OtpPage;
