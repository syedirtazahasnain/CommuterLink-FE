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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [termsService, setTermsService] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);

  const checkUserStatus = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/rejectedStatus`,
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

        console.log(jsonresponse);

        if(jsonresponse.statusCode === 200){
          if(jsonresponse.data[0] === 1){
            navigate("/dashboard");
          }
          else if(jsonresponse.data[0] === 0){
            navigate("/verification");
          }
          else if(jsonresponse.data[0] === -1){
            navigate("/rejection");
          }
        }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if(userToken)
    {
      checkUserStatus();
    }
    else{
      navigate("/login");
    }
  }, [userToken]);

  const googlesignup = useGoogleLogin({
    clientId:"380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com",
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });
  const handleFailure = (response) => {
    console.log("handleFailure", response);
  };
  
  const handleLogin = async () => {
    if(email === "" || password === ""){
      Swal.fire({
        position:'top',
        icon: 'warning',
       text: 'Please Fill All Fields',
       customClass: {
        confirmButton: 'bg-success' ,
      },
    }
      )
    }
    else {
      await postData();
    }
  };

  const postData = async () => {
    try {
      if(termsService){
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
          // alert("Error: " + jsonresponse.message);
          Swal.fire({
            position:'top',
            icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' ,
          },
        }
          )
        }
        }
      
      else {
        Swal.fire({
          position:'top',
          icon: 'warning',
         text: 'Please Check Terms of Services',
         customClass: {
          confirmButton: 'bg-success' ,
        },
      }
        )
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
            // alert("Error: " + jsonresponse.message);
            Swal.fire({
              position:'top',
              icon: 'error',
             text: `${jsonresponse.message}`,
             customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          }
            )
          
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
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
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
                <Form className="text-center">
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
                      required
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
                      type="password"
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      size='small'
                      sx={{ width: '100%' }}
                    />
                  </Form.Group>
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
                          <div id="span-text" className="mr-5 small">
                            I agree with all statements in
                            <a href="" style={{ textDecoration: "none" }}>
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
                            </a>
                          </div>
                        }
                      />
                    </div>
                  <Button className="btn-custom mx-2 px-4 py-2 rounded rounded-5 text-custom fw-bold" onClick={handleLogin}>
                    Login
                  </Button>
                  <div className="container">
                    <div className="row d-flex justify-content-center">
                      <div className="column mt-2">
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
                          <Tooltip title="Login With Facebook">
                            <a href="https://www.facebook.com/Sysreforms">
                              <img
                               src={`${BASE_URL}/assets/images/facebook.png`}
                                alt=""
                                style={{ height: "27px", width: "27px" }}
                              />
                            </a>
                                </Tooltip>
                          </li>
                          <li>
                          <Tooltip title="Login With Linkedin">
                            <a href="https://www.linkedin.com/company/sysreforms-international/mycompany/">
                              <img
                                src={`${BASE_URL}/assets/images/linkedin.png`}
                                alt=""
                                style={{ height: "35px", width: "35px" }}
                              />
                            </a>
                            </Tooltip>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr id="hrline2" />
                    <div id="span-text" className="text-center mb-5">
                      Not have account on CommutersLink? &nbsp;
                      <Link to="/signup">
                        <span className="reg-text">Signup</span>
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
