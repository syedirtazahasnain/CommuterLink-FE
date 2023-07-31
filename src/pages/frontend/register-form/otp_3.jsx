import React, { useState, useRef } from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Modal, Alert } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import imgfacebook from "../../../Images/facebook.png";
// import imggoogle from "../../../Images/google.png";
// import imgtwitter from "../../../Images/twitter.png";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgpoper from "../../../Images/popper.png";
import { ImageNotSupportedSharp } from "@mui/icons-material";
const Otp_3 = () => {
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const [isOTPMatched, setIsOTPMatched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([]);
  const hardcodedOTP = "12345";
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
      //   if (enteredOTP === hardcodedOTP) {

      //     setIsOTPMatched(true);
      //     alert('OTP is matched')
      //   } else {
      //     setIsOTPMatched(false);
      //     alert('OTP does not match. Please try again.');
      //   }
    }
  };
  const validateOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP === hardcodedOTP) {
      setIsOTPMatched(true);
      // alert("OTP is matched");
      handleShowModal();
    } else {
      setIsOTPMatched(false);
      alert("OTP does not match. Please try again.");
    }
  };
  const resendOTP = () => {
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
                        src={mySlides1}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides2}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides3}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides4}
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
                    <div className="row justify-content-center">
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
                  <p>OTP Entered -{otp.join("")}</p>
                  <CardActions className="row">
                    <div className="col-12 text-end">
                      {/* onClick={() => setModalShow(true)} */}

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
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    </div>
  );
};

export default Otp_3;
