import React, { useState } from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "react-bootstrap/Modal";
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

const Otp = () => {
  const [modalShow, setModalShow] = useState(false);
  const [otpInput , setOtpInput ] = useState({
    val1:"",
    val2:"",
    val3:"",
    val4:"",
    valu5:"",
  })
  const validateOTP = () => {
    let otpInputs = document.getElementById('outlined-adornment-weight');
    console.log(otpInput)
    let enteredOTP = "";

    for (let i = 0; i < otpInputs.length; i++) {
      enteredOTP += otpInputs[i].value;
    }
    // Perform validation logic here
    let validOTP = "12345"; // Example valid OTP

    if (enteredOTP === validOTP) {
      alert('OTP is valid. Access granted!');
      // $("#congratsPopup").modal("show");
      // setModalShow(true);
      // MyVerticallyCenteredModal();
    } else {
      alert("Invalid OTP. Please try again.");
      clearOTP();
    }
  };
  const clearOTP = () => {
    let otpInputs = document.getElementById('outlined-adornment-weight');
    for (let i = 0; i < otpInputs.length; i++) {
      otpInputs[i].value = "";
    }
  };
  const resendOTP = () => {
    // Perform resend logic here
    alert("OTP has been resent again!");
  };
  // const Size = {
  //   fonstSize: "14px",
  //   marginBottom: "8px",
  //   width: "350px",
  //   margin: "auto",
  // };
  // function MyVerticallyCenteredModal(props) {
  //   return (
  //     <Modal
  //       {...props}
  //       size="sm"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title id="contained-modal-title-vcenter">
  //           Modal heading
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
          
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button onClick={props.onHide}>Close</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // }


  return (
    <div>
      <div>
        <Navbar />
        <section
          id="sign-up"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
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
                        backgroundColor: "#eee",
                      }}
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2000}>
                    <img
                      className="Carousel_image img-fluid"
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
                      className="Carousel_image img-fluid"
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
              </div>
            </div>

            <div className="col-md-6   mb-2 text-center">
              <Card
                sx={{ marginTop: "10vh", maxWidth: "400px", marginLeft: "5px" }}
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
                    {" "}
                    <p className="text-center">
                      We have sent “One Time Password” on your Mobile Number and
                      Email{" "}
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
                    <FormControl sx={{ m: 1, width: "5ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        className="otp-input"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          maxLength: 1,
                        }}
                        onChange={(e) => setOtpInput({ ...otpInput, val1: e.target.value })}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "5ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        className="otp-input"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          maxLength: 1,
                        }}
                        onChange={(e) => setOtpInput({ ...otpInput, val2: e.target.value })}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "5ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        className="otp-input"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          maxLength: 1,
                        }}
                        onChange={(e) => setOtpInput({ ...otpInput, val3: e.target.value })}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "5ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        className="otp-input"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          maxLength: 1,
                        }}
                        onChange={(e) => setOtpInput({ ...otpInput, val4: e.target.value })}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "5ch" }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        className="otp-input"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          maxLength: 1,
                        }}
                        onChange={(e) => setOtpInput({...otpInput, val5: e.target.value })}
                      />
                    </FormControl>
                  </div>
                </CardContent>

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
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
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
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Otp;
