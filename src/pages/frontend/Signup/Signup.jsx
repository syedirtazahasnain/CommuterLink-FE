import React, { useState } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setsignupState } from "../../../redux/signupSlice";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import Form from "react-bootstrap/Form";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [provider, setProvider] = useState("web");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [termsService, setTermsService] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);

  function generateRandomPassword() {
    const length = 3;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }

  function generateRandomOtp(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const googlesignup = useGoogleLogin({
    clientId:
      "380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com",
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });

  const handleFailure = (response) => {
    console.log("handleFailure", response);
  };

  const handleSuccess = async (response) => {
    try {
      if (response && response.access_token) {
        const profile = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
            method: "get",
          }
        );

        if (profile.ok) {
          const userObject = await profile.json();
          const googleuserdata = {
            name: userObject.name,
            email: userObject.email,
            provider: "google",
            provider_id: "DasD" + generateRandomOtp(0, 1000000),
            googletoken: response.access_token,
            password: "jWaeo@123" + generateRandomPassword(),
            otp: generateRandomOtp(0, 1000000),
            phone: "",
          };

          await signupgoogledatapost(googleuserdata);
        } else {
          console.error("Profile request failed with status:", profile.status);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const signupgoogledatapost = async (userData) => {
    try {
      const body = {
        email: userData.email,
        number: userData.phone,
        provider: userData.provider,
        password: userData.password,
        provider_id: userData.provider_id,
        confirm_password: userData.password,
        name: userData.name,
        otp: userData.otp,
        token: userData.googletoken,
      };
      console.log("Google Body:", body);
      const response = await fetch(`${API_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const jsonresponse = await response.json();

      if (jsonresponse.statusCode === 200) {
        dispatch(
          setsignupState({
            email: body.email,
            provider: body.provider,
          })
        );
        console.log("Google Response:", jsonresponse);
        navigate("/number-generate");
      } else {
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position: "top",
          icon: "error",
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: "bg-success", // Apply custom CSS class to the OK button
          },
        });
      }
    } catch (error) {
      console.log("Signup Error:", error.message);
    }
  };

  const postData = async () => {
    try {
      if (
        fullName === "" ||
        email === "" ||
        phoneNumber === null ||
        password === "" ||
        confirmPassword === ""
      ) {
        // alert("Please Fill All Fields!");
        Swal.fire({
          position: "top",
          icon: "warning",
          text: "Please Fill All Fields!",
          customClass: {
            confirmButton: "bg-success",
            // icon:'bg-secondary' // Apply custom CSS class to the OK button
          },
        });
      } else if (password !== confirmPassword) {
        // alert("Confirm password is not matched with new password!")
        Swal.fire({
          position: "top",
          icon: "warning",
          text: "Confirm password is not matched with new password!",
        });
      } else {
        if (termsService) {
          const body = {
            email: email,
            number: phoneNumber,
            signatur: "",
          };
          const response = await fetch(`${API_URL}/api/v1/send/otp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const jsonresponse = await response.json();
          if (jsonresponse.statusCode == 200) {
            dispatch(
              setsignupState({
                name: fullName,
                email: email,
                phone: phoneNumber,
                password: password,
                provider: provider,
                otp: jsonresponse.otp,
                token: jsonresponse.token,
                confirm_password: confirmPassword,
              })
            );
            navigate("/otp");
          } else {
            const errors = jsonresponse.errors;
            for (const field of Object.keys(errors)) {
            // alert("Error: " + jsonresponse.message);
            Swal.fire({
              position: "top",
              icon: "error",
              // text: `${jsonresponse.message}`,
              text: `${errors[field][0]}`,
              customClass: {
                confirmButton: "bg-success",
                // Apply custom CSS class to the OK button
              },
            });
          }
        }
        } else {
          // alert("please check Terms of Service");
          Swal.fire({
            position: "top",
            icon: "warning",
            text: "Please Check Terms of Service",
            customClass: {
              confirmButton: "bg-success", // Apply custom CSS class to the OK button
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);

    if (value.length < 4 && value.trim() !== "") {
      setFullNameError("Full Name must be at least 4 characters");
    } else {
      setFullNameError("");
    }
  };

  const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "" || emailPattern.test(email)) {
      setEmail(email);
      setIsValidEmail(true);
    } else {
      setEmail(email);
      setIsValidEmail(false);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
    const phonePattern = /^03\d{9}$/;
    if (phoneNumber === "" || phonePattern.test(phoneNumber)) {
      setPhoneNumber(phoneNumber);
      setIsValidPhoneNumber(true);
    } else {
      setPhoneNumber(phoneNumber);
      setIsValidPhoneNumber(false);
    }
  };
  const validatePassword = (password) => {
    // Regular expression pattern for validating passwords
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password === "" || passwordPattern.test(password)) {
      setPassword(password);
      setIsValidPassword(true);
    } else {
      setPassword(password);
      setIsValidPassword(false);
    }
  };

  const checkconfirmPassword = (cpassword) => {
    if (password === cpassword) {
      setConfirmPassword(cpassword);
      setisValidConfirmPassword(true);
    } else {
      setConfirmPassword(cpassword);
      setisValidConfirmPassword(false);
    }
  };

  return (
    <div>
      <div>
        <section
          id="sign-up"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex"
                style={{
                  marginTop: "12vh",
                }}
              >
                {/* <div
                  className="col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5vh",
                  }}
                > */}
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
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Share Actual Cost
                    </h4>
                  </Carousel.Item>

                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Offer Your Car or Get a Seat in Other's Car
                    </h4>
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Share Ride for School University
                    </h4>
                  </Carousel.Item>
                  <Carousel.Item interval={2000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Share Ride For Office
                    </h4>
                  </Carousel.Item>
                </Carousel>
                {/* </div> */}
              </div>

              <div className="col-md-5 mb-2 px-5">
                <h1
                  className="text-center text-custom  mb-2"
                  style={{
                    color: "#198754",
                    marginBottom: "5px",
                    marginTop: "10vh",
                  }}
                >
                  {" "}
                  Sign up
                </h1>{" "}
                <Form className="text-center">
                  <Form.Group
                    className="mt-5 mb-1 text-center"
                    controlId="formfullName"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      label="Full Name"
                      value={fullName}
                      onChange={handleFullNameChange}
                      required
                      size="small"
                      error={!!fullNameError}
                      helperText={fullNameError}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => validateEmail(e.target.value)}
                      required
                      size="small"
                      error={!isValidEmail}
                      helperText={!isValidEmail && "Please enter a valid email"}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      value={phoneNumber}
                      label="Mobile Number (03xxxxxxxxx)"
                      onChange={(e) => {
                        if (/^\d{0,11}$/.test(e.target.value)) {
                          validatePhoneNumber(e.target.value);
                        }
                      }}
                      required
                      size="small"
                      error={!isValidPhoneNumber && phoneNumber !== ""}
                      helperText={
                        !isValidPhoneNumber &&
                        phoneNumber !== "" &&
                        "Please enter a valid Phone Number starting with '03' and having 11 digits."
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => validatePassword(e.target.value)}
                      required
                      size="small"
                      error={!isValidPassword}
                      helperText={
                        !isValidPassword &&
                        "Password must have at least 8 characters with mix of letters numbers special  characters"
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type="password"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => checkconfirmPassword(e.target.value)}
                      required
                      size="small"
                      error={!isValidConfirmPassword}
                      helperText={
                        !isValidConfirmPassword &&
                        "Both passwords must be the same"
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="termsService"
                          style={{ borderColor: "#198754" }}
                          required
                          onChange={(e) => setTermsService(e.target.checked)}
                          size="small"
                        />
                      }
                      label={
                        <div id="span-text" className="mr-5 small">
                          I agree with all statements in
                          <a href="" style={{ textDecoration: "none" }}>
                            <span
                              style={{
                                color: "#198754",
                                textDecoration: "none",
                              }}
                            >
                              Terms of service
                            </span>
                          </a>
                        </div>
                      }
                    />
                  </Form.Group>
                  <div className="col-md-12  mt-3 text-center">
                    <Button
                      className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                      onClick={() => postData()}
                    >
                      Sign up
                    </Button>
                  </div>
                  <div className="container text-center">
                    <div className="row d-flex">
                      <div className="column mr-3 mt-2">
                        <p className=" text-muted" id="text2">
                          Or continue with
                        </p>
                      </div>
                      <div className="column">
                        <ul
                          className="list-unstyled  d-flex "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <li className="mr-3">
                            <Tooltip title="Signup With Google">
                              <a onClick={googlesignup}>
                                <img
                                  src={`${BASE_URL}/assets/images/google.png`}
                                  alt=""
                                  style={{
                                    height: "25px",
                                    width: "25px",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                            </Tooltip>
                          </li>
                          {/* <li className="mr-3">
                            <Tooltip title="Signup With Facebook">
                            
                              <a href="https://www.facebook.com/Sysreforms">
                                <img
                                  src={`${BASE_URL}/assets/images/facebook.png`}
                                  alt=""
                                  style={{ height: "27px", width: "27px" }}
                                />
                              </a>
                            </Tooltip>
                            </li> */}
                          {/* <li>
                            <Tooltip title="Signup With Twitter">
                            
                              <a href="https://instagram.com/sysreforms_international?igshid=YmMyMTA2M2Y= ">
                                <img
                                  src={`${BASE_URL}/assets/images/twitter.png`}
                                  alt=""
                                  style={{ height: "27px", width: "27px" }}
                                />
                              </a>
                            </Tooltip>
                            </li> */}
                        </ul>
                      </div>
                    </div>
                    <hr id="hrline2" />
                    <div id="span-text" className="text-center mb-5">
                      Already have account on CommuterLinks? &nbsp;
                      <Link to="/login">
                        <span style={{ color: "#198754" }}>Login</span>
                      </Link>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
