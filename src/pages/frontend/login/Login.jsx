import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGoogleLogin } from "@react-oauth/google";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { Button } from "@mui/base";

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
        "https://staging.commuterslink.com/api/v1/rejectedStatus",
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
          else{
            navigate("/verification");
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
      alert("Please Fill All Fields!");
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
          "https://staging.commuterslink.com/api/v1/auth",
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
          alert("Error: " + jsonresponse.message);
        }
      }
      else {
        alert("please check Terms of Service");
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
            "https://staging.commuterslink.com/api/v1/auth",
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
            alert("Error: " + jsonresponse.message);
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
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-6.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                {/* </div> */}
              </div>

              <div className="col-md-5 mb-2 px-5">
                <h3
                  className="text-center text-custom  mb-2"
                  style={{
                    color: "#198754",
                    marginBottom: "5px",
                    marginTop: "10vh",
                  }}
                >
                  {" "}
                  Login
                </h3>{" "}
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
                               {" "} Terms of service
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
                            <a onClick={() => googlesignup()}>
                              <img
                                src={`${BASE_URL}/assets/images/google.png`}
                                alt=""
                                style={{ height: "25px", width: "25px" }}
                              />
                            </a>
                          </li>
                          <li className="mr-3">
                            <a href="https://www.facebook.com/Sysreforms">
                              <img
                               src={`${BASE_URL}/assets/images/facebook.png`}
                                alt=""
                                style={{ height: "27px", width: "27px" }}
                              />
                            </a>
                          </li>
                          <li>
                            <a href="https://instagram.com/sysreforms_international?igshid=YmMyMTA2M2Y= ">
                              <img
                                src={`${BASE_URL}/assets/images/twitter.png`}
                                alt=""
                                style={{ height: "27px", width: "27px" }}
                              />
                            </a>
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
              <div className="col-md-1"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;