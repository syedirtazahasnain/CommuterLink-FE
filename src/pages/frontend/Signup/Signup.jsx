import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, Client_Id } from "../../../constants";
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
// import { useLinkedIn } from 'react-linkedin-login-oauth2';
import Form from "react-bootstrap/Form";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { LoginSocialFacebook, LoginSocialLinkedin } from "reactjs-social-login";
import { displayNotification } from "../../../helpers";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// const REDIRECT_URI = "https://staging.commuterslink.com/auth/linkedin/callback";
const REDIRECT_URI = window.location.href;

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

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
    // clientId:
    //   "380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com",
    clientId: Client_Id,
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });

  // const { linkedInLogin } = useLinkedIn({
  //   clientId: '86th1m5dtehgx3',
  //   redirectUri: `${window.location.origin}/linkedin`,
  //   onSuccess: (code) => {
  //     console.log(code);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

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
  const openPopup = () => {
    Swal.fire({
      html: `
        <div>
          <div class="container mt-5 pt-1 align-center fw-bold fs-1 mb-5">
            <span>
              Terms & Services</span>
          </div>
          <div>
            <div class="container">
              <div class="row">
                <div class="col-md-8 m-auto col-lg-12 col-sm-12 mb-5">
                  <div class="bg-light text-left">
                    <ol class="p-4 text-justify">
                      <li>
                      Your car is in good shape and is roadworthy</li>

                      <li>
                      You are committed to providing the car for commuting of partners on all days mentioned by your travel buddy
                      </li>
                 
                  
                    <li>If due to any unforeseen reason you cannot commute on a certain day, no fee will be paid for that day</li>
        
                   <li> You will inform the travel buddy well in advance (at least 12 hours) about your inability to commute on a certain day. In case of any emergency, this can be waived off under exceptional circumstances</li> 
                            
                          <li>
                          You will be paid on weekly basis for the actual number of days that your car is used                      </li>
                      <li>
                      If a commuting partner misses the car and fails to commute due to late arrival/time off, you will still be paid for that day </li>
                         
                           <li>
                           You will wait at least 15 minutes after the agreed time for the commuting partner to join you                                          </li>
                           <li>You will update the scheduler in your dashboard on a daily (as and when required basis)</li>
                           <li>You will receive your share of the fee through CommutersLink, and there will be no direct transaction between you and your commuting partner</li>
                           <li>If you wish to discontinue your partnership with a member due to a reason or other, CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice</li>
                           <li>Any complaints or grievances will be addressed to CommutersLink for resolution.</li>
                           </ol>

                           </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      width: "50%", // Adjust the width as needed
      showCloseButton: true,
      showConfirmButton: false, // Remove confirm button if not needed
    });
  };
  const handleFacebookSuccess = async (response) => {
    try {
      if (response && response.data.accessToken) {
        const facebookuserdata = {
          name: response.data.name,
          email: response.data.email,
          provider: response.provider,
          provider_id: "DasD" + generateRandomOtp(0, 1000000),
          facebooktoken: response.data.accessToken,
          password: "jWaeo@123" + generateRandomPassword(),
          otp: generateRandomOtp(0, 1000000),
          phone: "",
        };

        await signupfacebookdatapost(facebookuserdata);
      } else {
        console.error("Profile request failed with status:", response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const signupfacebookdatapost = async (userData) => {
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
        token: userData.facebooktoken,
      };
      console.log("Signup Data Body:", body);
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
        console.log("Signup Data Response:", jsonresponse);
        navigate("/number-generate");
      } else {
        displayNotification("error", `${jsonresponse.message}`);
      }
    } catch (error) {
      console.log("Signup Error:", error.message);
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
      console.log("Signup Data Body:", body);
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
        console.log("Signup Data Response:", jsonresponse);
        navigate("/number-generate");
      } else {
        // alert("Error: " + jsonresponse.message);
        // Swal.fire({
        //   position: "top",
        //   icon: "",
        //   // text: `${jsonresponse.message}`,
        //   text: "Email Already Exists",
        //   customClass: {
        //     confirmButton: "swal-custom", // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("error", `${jsonresponse.message}`);
      }
    } catch (error) {
      console.log("Signup Error:", error.message);
    }
  };

  const postData = async () => {
    try {
      const phonePattern = /^03\d{9}$/;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (
        fullName === "" ||
        email === "" ||
        phoneNumber === null ||
        password === "" ||
        confirmPassword === ""
      ) {
        displayNotification("warning", "Please Fill All Fields");
      } else if (password !== confirmPassword) {
        displayNotification(
          "warning",
          "Confirm password is not matched with new password!"
        );
      } else if (!phonePattern.test(phoneNumber)) {
        displayNotification(
          "warning",
          "Please follow the correct phone number format"
        );
      } else if (!emailPattern.test(email)) {
        displayNotification(
          "warning",
          "Please follow the correct email format"
        );
      } else if (fullName.length < 3) {
        displayNotification(
          "warning",
          "Full Name should have alteast 3 characters"
        );
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
          if (jsonresponse.statusCode === 200) {
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
              displayNotification("error", `${errors[field][0]}`);
            }
          }
        } else {
          displayNotification("warning", "Please Check Terms of Service");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleFullNameChange = (e) => {
  //   const value = e.target.value.replace(/[^a-z" "]/gi, "");
  //   setFullName(value);

  //   if (!/^[a-zA-Z" "]+$/.test(value) || value.length < 3) {
  //     setFullNameError(
  //       "Full Name must contain only alphabetic characters and be at least 3 characters long"
  //     );
  //   } else {
  //     setFullNameError("");
  //   }
  // };

  const handleFullNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z" "]/gi, "");
    setFullName(value);

    if (value.replace(/ /g, "").length < 3) {
      // setFullNameError(
      //   "Full Name must contain at least 3 alphabetic characters (excluding spaces)"
      // );
      displayNotification("warning", "Full Name must contain at least 3 alphabetic characters (excluding spaces)Please Check Terms of Service");
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
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
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

          style={{ backgroundColor: "#eee", borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
        >
          <div className="container rounded-top">
            <div className="row d-flex">
              <div className="col-md-6  p-4 text-center text-dark fs-5 fw-bold" style={{ backgroundColor: 'white', borderTopLeftRadius: '20px' }}><i className="fa-solid fa-car text-dark"></i>Looking for a car</div>
              <div className="col-md-6  p-4 text-center text-warning fs-5 fw-bold" style={{ backgroundColor: '#3D3E3E', borderTopRightRadius: '20px' }}><i className="fa-regular fa-steering-wheel"></i>Offer Your car</div>
            </div>
            <div className="row">
              {/* <div
                className="col-md-6 d-flex"
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
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Share Actual Cost
                    </h4>
                  </Carousel.Item>

                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Offer Your Car or Get a Seat in Other's Car
                    </h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">
                      Share Ride for School University
                    </h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
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
             
              </div> */}

              <div className="col-12 col-md-12 col-sm-6 mb-2 px-5">
                <h1
                  className="text-center text-custom"
                  style={{
                    color: "#198754",
                    marginBottom: "2px",
                    marginTop: "2px",
                  }}
                >
                  {" "}
                  Sign up
                </h1>{" "}
                {/* <p className="text-center fs-6 text-danger text-custom">
                  {" "}
                  <div
                    className="alert alert-info alert-dismissible fade show"
                    role="alert"
                  >
                    {" "}
                    <h6 className="text-left d-flex">
                      {" "}
                      <i className="fa-solid fa-triangle-exclamation fs-6  text-warning"></i>
                      <li style={{ listStyle: "none" }}>
                        {" "}
                        If you are offering your car, you may proceed with
                        registration, if you are 18 and older and you have a
                        driving license.
                      </li>
                    </h6>
                    <button
                      type=""
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                
                </p> */}
                <Form className="text-center">
                  <Form.Group
                    className="mt-2 mb-1 text-center"
                    controlId="formfullName"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      label="Full Name"
                      type="text"
                      value={fullName}
                      onChange={handleFullNameChange}
                      // required
                      size="small"
                      error={!!fullNameError}
                      helperText={fullNameError}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mt-2 text-center"
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
                      // required
                      size="small"
                      error={!isValidEmail}
                      helperText={!isValidEmail &&
                        displayNotification( "Please enter a valid email")
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-2 text-center"
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
                      // required
                      size="small"
                      error={!isValidPhoneNumber && phoneNumber !== ""}
                      helperText={
                        !isValidPhoneNumber &&
                        phoneNumber !== "" &&  
                        displayNotification("Please enter a valid Phone Number starting with '03' and having 11 digits.")
                       
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-2 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={password}
                      onChange={(e) => validatePassword(e.target.value)}
                      // required
                      size="small"
                      error={!isValidPassword}
                      helperText={
                        !isValidPassword &&
                        displayNotification("Password must have at least 8 characters with mix of letters numbers special characters"
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-2 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type={showPassword1 ? "text" : "password"}
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => checkconfirmPassword(e.target.value)}
                      // required
                      size="small"
                      error={!isValidConfirmPassword}
                      helperText={
                        !isValidConfirmPassword 
                        // &&
                        // "Both passwords must be the same"
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility1}
                              edge="end"
                            >
                              {showPassword1 ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-2 text-center"
                    controlId="formBasicEmail"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="termsService"
                          style={{ borderColor: "#198754" }}
                          // required
                          onChange={(e) => setTermsService(e.target.checked)}
                          size="small"
                        />
                      }
                      label={
                        <div id="span-text" className="mr-5  text-bold">
                          I agree with all statements in
                          <Link
                            // to={"/terms_services"}
                            style={{ textDecoration: "none" }}
                          >
                            <span
                              style={{
                                color: "#198754",
                                textDecoration: "none",
                              }}
                              onClick={openPopup}
                            >
                              &nbsp; Terms of service
                            </span>
                          </Link>
                        </div>
                      }
                    />
                  </Form.Group>
                  <div className="col-md-12   text-center">
                    <Button
                      className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                      onClick={() => postData()}
                    >
                      Sign up
                    </Button>
                    {/* <Button
                      className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold"
                      onClick={() => postData()}
                    >
                      Sign up
                    </Button> */}
                  </div>
                  <div className="container text-center">
                    <div className="row d-flex">
                      <div className="column mr-3">
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
                          <li className="mr-3">
                            <LoginSocialFacebook
                              // appId="264760359845922"
                              appId="832351251716749"
                              onResolve={(response) => {
                                handleFacebookSuccess(response);
                              }}
                              onReject={(error) => {
                                console.log("Error Message:", error);
                              }}
                            >
                              <Tooltip title="Signup With Facebook">
                                <img
                                  src={`${BASE_URL}/assets/images/facebook.png`}
                                  alt=""
                                  style={{
                                    height: "27px",
                                    width: "27px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </LoginSocialFacebook>
                          </li>
                          {/* <li>
                            <LoginSocialLinkedin
                              client_id="86th1m5dtehgx3"
                              client_secret="YY1HZ3JYb4jM5btI"
                              redirect_uri={REDIRECT_URI}
                              onResolve={(response) => {
                                console.log("LinkedIn Response:", response);
                              }}
                              onReject={(error) => {
                                console.log("LinkedIn Error Message:", error);
                              }}
                            >
                              <Tooltip title="Signup With Linkedin">
                                <a>
                                  <img
                                    src={`${BASE_URL}/assets/images/linkedin.png`}
                                    alt=""
                                    style={{
                                      height: "35px",
                                      width: "35px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </a>
                              </Tooltip>
                            </LoginSocialLinkedin>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                    <hr id="hrline2" />
                    <div className="text-center mb-1">
                      Already have account on CommuterLinks? &nbsp;
                      <Link to={"/login"} style={{ textDecoration: "none" }}>
                        <span
                          style={{ color: "#198754", textDecoration: "none" }}
                        >
                          Login
                        </span>
                      </Link>
                    </div>
                  </div>
                </Form>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
