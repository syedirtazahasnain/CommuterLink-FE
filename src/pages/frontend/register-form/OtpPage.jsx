import React, { useState, useRef, useEffect } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
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
// import imgpoper from "../../../Images/popper.png";
import { ImageNotSupportedSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { setsignupState } from "../../../redux/signupSlice";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";

const OtpPage = () => {

  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const [isOTPMatched, setIsOTPMatched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef([null, null, null, null, null]);
  const hardcodedOTP = "12345";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.signup.data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  console.log("Signup Data:", userData);

  const postData = async () => {
    try {
      let email = userData.email;
      let password = userData.password;
      const body = {
        email: userData.email,
        number: userData.phone,
        provider: userData.provider,
        password: userData.password,
        confirm_password: userData.confirm_password,
        name: userData.name,
        otp: userData.otp,
        token: userData.token,
      };
      const response = await fetch(
        `${API_URL}/api/v1/signup`,
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
          `${API_URL}/api/v1/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
          }
        );
        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log(jsonresponse);
          dispatch(setloginState(jsonresponse.access_token));
          navigate("/office_school");
        }
      } else {
        //alert("Error: " + jsonresponse.message);
        // Swal.fire({
        //   position: 'top',
        //   // icon: 'error',
        //   text: `${jsonresponse.message}`,
        //   customClass: {
        //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
        //   },
        // }
        // )
        displayNotification("error", `${jsonresponse.message}`);
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

    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      // Check if the value is not empty, not the last field, and the next field exists
      inputRefs.current[index + 1].focus();
    }

    if (index === 4) {
      // If the last input field is filled, validate the OTP
      const enteredOTP = otp.join("");
    }
  };
  const otpSuccessful = () => {
    // Swal.fire({
    //   position: 'top',
    //   title: 'Congratulations!',
    //   text: 'Your OTP has been matched',
    //   icon: 'success',
    //   showCancelButton: false,
    //   confirmButtonText: 'OK',
    //   customClass: {
    //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
    //   },
    // });
    displayNotification("success", "Your OTP has been matched");
  };

  const validateOTP = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP == userData.otp) {
      setIsOTPMatched(true);
      // alert("OTP is matched");
      // handleShowModal();
      otpSuccessful();
      postData();
    } else {
      setIsOTPMatched(false);
      // alert("OTP does not match. Please try again.");
      // Swal.fire({
      //   position: 'top',
      //   // icon: 'warning',
      //   text: 'OTP does not match. Please try again.',
      //   customClass: {
      //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
      //   },
      // }
      // )
      displayNotification("error", "OTP does not match. Please try agian.")
    }
  };

  const resendOTP = async () => {
    const body = {
      email: userData.email,
      number: userData.phone,
      signatur: "",
    };
    const response = await fetch(
      `${API_URL}/api/v1/send/otp`,
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
          email: userData.email,
          number: userData.phone,
          provider: userData.provider,
          password: userData.password,
          confirm_password: userData.confirm_password,
          name: userData.name,
          otp: jsonresponse.otp,
          token: jsonresponse.token,
        })
      );
    } else {
      // alert("Resend OTP Error: " + jsonresponse.message);
      // Swal.fire({
      //   position: 'top',
      //   // icon: 'error',
      //   text: `${jsonresponse.message}`,
      //   customClass: {
      //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
      //   },
      // }
      // )
      displayNotification("error", `${jsonresponse.message}`);
    }
    // alert("OTP has been sent again!");
    // Swal.fire({
    //   position: 'top',
    //   // icon: 'warning',
    //   text: 'OTP has been sent again!',
    //   customClass: {
    //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
    //   },
    // }
    // )
    displayNotification("warning", "OTP has been sent again!");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // console.log("After Signup:", userData);

  return (
    <div>
      <div>
        <section
          id="otp"
          className="mt-5 main-bg"
        >
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex fixed"
                style={{
                  marginTop: "12vh",
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
                      className="d-block img-fluid w-auto"
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

              <div className="col-md-6 py-5 mb-3 text-center d-flex justify-content-center">
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
                      <p className="text-center my-3">
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
                    <div className="row justify-content-center d-flex">
                      {otp.map((data, index) => {
                        return (
                          <div className="col-md-2 col-sm-2 col-3" key={0}>
                            <FormControl
                              sx={{ m: 1,width: "100%", // Make the form control take the full width
                              marginBottom: "10px", }}
                              variant="outlined"
                              key={1}
                            >
                              <TextField
                                id="outlined-adornment-weight"
                                className="otp-input"
                                aria-describedby="outlined-weight-helper-text"
                                key={1}
                                value={data}
                                onChange={(e) => handleInputChange(e, index)}
                                onFocus={(e) => e.target.select()}
                                inputProps={{
                                  "aria-label": "weight",
                                  maxLength: 1,
                                  style: { textAlign: "center" },
                                }}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                              />
                            </FormControl>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>

                  <CardActions className="container justify-content-center">
                    <Button
                      variant="outlined"
                      type="submit"
                      onClick={validateOTP}
                      className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                    >
                      Submit
                    </Button>
                    {/* <div className="col-12 text-end">
                    </div> */}
                  </CardActions>
                  <div id="span-text" className="text-center mb-5">
                    Didn't get the code? &nbsp;
                    <Link onClick={resendOTP} style={{ textDecoration: 'none' }}>
                      <span style={{ color: "#198754", textDecoration: 'none' }}>Resend</span>
                    </Link>
                  </div>

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
      </div>
    </div>
  );
};

export default OtpPage;
