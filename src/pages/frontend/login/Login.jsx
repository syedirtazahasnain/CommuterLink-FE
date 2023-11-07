import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API_URL, BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGoogleLogin } from "@react-oauth/google";
import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoginSocialFacebook, LoginSocialLinkedin } from "reactjs-social-login";

// const REDIRECT_URI = "https://staging.commuterslink.com/auth/linkedin/callback";
const REDIRECT_URI = window.location.href;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [termsService, setTermsService] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const checkUserStatus = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();

      console.log("Profile Response:", jsonresponse);

      if (jsonresponse) {
        if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 2 && jsonresponse[0].approval_status === 1) {
          navigate("/dashboard");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 2 && jsonresponse[0].approval_status === 0) {
          navigate("/verification");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 2 && jsonresponse[0].approval_status === -1) {
          navigate("/rejection");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 3 && jsonresponse[0].approval_status === 1) {
          navigate("/dashboard");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 3 && jsonresponse[0].approval_status === 0) {
          navigate("/verification");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 0 && jsonresponse[0].profile_status === 3 && jsonresponse[0].approval_status === -1) {
          navigate("/rejection");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 1 && jsonresponse[0].profile_status === 5 && jsonresponse[0].approval_status === 1) {
          navigate("/dashboard");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 1 && jsonresponse[0].profile_status === 5 && jsonresponse[0].approval_status === 0) {
          navigate("/verification");
        }
        else if (jsonresponse[0].userlist.vehicle_option === 1 && jsonresponse[0].profile_status === 5 && jsonresponse[0].approval_status === -1) {
          navigate("/rejection");
        }
        else if (jsonresponse[0].profile_status === 1) {
          navigate("/office_school");
        }
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      checkUserStatus();
    }
    else {
      navigate("/login");
    }
  }, [userToken]);

  const googlesignup = useGoogleLogin({
    clientId: "380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com",
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });
  const handleFailure = (response) => {
    console.log("handleFailure", response);
  };

  const handleFacebookSuccess = async (response) => {
    try {
      if (response && response.data.accessToken) {
        const body = {
          email: response.data.email,
          provider: response.provider,
        };

        console.log("Facebook Body:", body);

        const res = await fetch(
          `${API_URL}/api/v1/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const jsonresponse = await res.json();

        if (jsonresponse.statusCode === 200) {
          dispatch(setloginState(jsonresponse.access_token));
        } else {
          displayNotification("error", `${jsonresponse.message}`);
        }
      } else {
        console.error("Profile request failed with status:", response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      displayNotification("warning", "Please Fill All Fields");
    }
    else {
      await postData();
    }
  };

  const postData = async () => {
    try {
      if (termsService) {
        const body = {
          email: email,
          password: password,
        };
        const response = await fetch(
          `${API_URL}/api/v1/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
        const jsonresponse = await response.json();
        //console.log(jsonresponse);

        if (jsonresponse.statusCode === 200) {
          dispatch(setloginState(jsonresponse.access_token));
        } else {
          console.log(jsonresponse);
          displayNotification("error", `${jsonresponse.message}`);
        }
      }

      else {
        displayNotification("warning", "Please Check Terms of Services");
      }

    } catch (error) {
      console.log(error.message);
    }
  };
  const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      setEmail(email);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
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
                  <div class="bg-light text-left text-danger">
                    <ol class="p-4 text-justify">
                      <li class="mb-2">
                      Your car is in good shape and is roadworthy</li>

                      <li class="mb-2">
                      You are committed to providing the car for commuting of partners on all days mentioned by your travel buddy
                      </li>
                 
                  
                    <li class="mb-2">If due to any unforeseen reason you cannot commute on a certain day, no fee will be paid for that day</li>
        
                   <li class="mb-2"> You will inform the travel buddy well in advance (at least 12 hours) about your inability to commute on a certain day. In case of any emergency, this can be waived off under exceptional circumstances</li> 
                            
                          <li class="mb-2">
                          You will be paid on weekly basis for the actual number of days that your car is used                      </li>
                      <li class="mb-2">
                      If a commuting partner misses the car and fails to commute due to late arrival/time off, you will still be paid for that day </li>
                         
                           <li class="mb-2">
                           You will wait at least 15 minutes after the agreed time for the commuting partner to join you                                          </li>
                           <li class="mb-2">You will update the scheduler in your dashboard on a daily (as and when required basis)</li>
                           <li class="mb-2">You will receive your share of the fee through CommutersLink, and there will be no direct transaction between you and your commuting partner</li>
                           <li class="mb-2">If you wish to discontinue your partnership with a member due to a reason or other, CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice</li>
                           <li class="mb-2">Any complaints or grievances will be addressed to CommutersLink for resolution.</li>
                           </ol>

                           </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      width: '50%', // Adjust the width as needed
      showCloseButton: true,
      showConfirmButton: false, // Remove confirm button if not needed
    });
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
          const body = {
            email: userObject.email,
            provider: "google",
          };

          const res = await fetch(
            `${API_URL}/api/v1/auth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          const jsonresponse = await res.json();

          if (jsonresponse.statusCode === 200) {
            dispatch(setloginState(jsonresponse.access_token));
          } else {
            displayNotification("error", `${jsonresponse.message}`);
          }
        } else {
          console.error("Profile request failed with status:", profile.status);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div>
        <section id="sign-up" className="mt-5" style={{ backgroundColor: "#eee" }}>
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex"
                style={{
                  marginTop: "12vh"
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
                  Login
                </h1>{" "}
                <Form className="">
                  <Form.Group
                    className="mb-1 mt-5 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      className="bg-light"
                      variant="outlined"
                      type="email"
                      label="Email"
                      onChange={(e) => validateEmail(e.target.value)}
                      // required
                      error={!isValidEmail}
                      helperText={!isValidEmail && "Please enter a valid email"}
                      size='small'
                      sx={{ width: '100%' }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      className="bg-light"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      size='small'
                      sx={{ width: '100%' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Form.Group>

                  <div className="py-1 text-right">    <Link to={'/forget'} style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        color: "#dc3545",
                        textDecoration: "none",
                      }}
                    >
                      {" "}

                      Forgot Password
                    </span>
                  </Link></div>
                  <div className="col-md-12 text-center mt-3">
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
                        <div id="span-text" className="mr-5 text-bold">
                          I agree with all statements in
                          <Link
                            // to={'/terms_services'}
                            onClick={openPopup}
                            style={{ textDecoration: "none" }}>
                            <span
                              style={{
                                color: "#198754",
                                textDecoration: "none",
                              }}
                            >
                              {" "}
                              &nbsp;
                              Terms of service
                            </span>
                          </Link>
                        </div>
                      }
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      className="btn-custom1 mx-2 text-center border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                      onClick={handleLogin}
                    >
                      Login
                    </Button></div>



                  <div className="container">
                    <div className="row d-flex justify-content-center">
                      <div className="column mt-2">
                        <p className=" text-muted text-center" id="text2">
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
                            <Tooltip title="Login With Google">
                              <a onClick={googlesignup}>
                                <img
                                  src={`${BASE_URL}/assets/images/google.png`}
                                  alt=""
                                  style={{ height: "25px", width: "25px", cursor: "pointer" }}
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
                                console.log("Facebook Error Message:", error);
                              }}
                            >
                              <Tooltip title="Signup With Facebook">
                                <img
                                  src={`${BASE_URL}/assets/images/facebook.png`}
                                  alt=""
                                  style={{ height: "27px", width: "27px", cursor: "pointer" }}
                                />
                              </Tooltip>
                            </LoginSocialFacebook>
                          </li>
                          <li>
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
                              <Tooltip title="Login With Linkedin">
                                <img
                                  src={`${BASE_URL}/assets/images/linkedin.png`}
                                  alt=""
                                  style={{ height: "35px", width: "35px", cursor: "pointer" }}
                                />
                              </Tooltip>
                            </LoginSocialLinkedin>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr id="hrline2" />
                    <div id="span-text" className="text-center mb-5">
                      Not have account on CommutersLink? &nbsp;
                      <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <span className="reg-text" style={{ textDecoration: 'none' }}>Signup</span>
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

export default Login;
