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
import   {Button as btnresubmit} from "@mui/base";
import { Button, Input, Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
const Resubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [termsService, setTermsService] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
    // You can perform the upload logic here, e.g., using an API call.
    console.log("Uploading image:", selectedImage);
  };
  const checkUserStatus = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/rejectedStatus",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();

      console.log(jsonresponse);

      if (jsonresponse.statusCode === 200) {
        if (jsonresponse.data[0] === 1) {
          navigate("/dashboard");
        } else {
          navigate("/verification");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  //   useEffect(() => {
  //     if(userToken)
  //     {
  //       checkUserStatus();
  //     }
  //     else{
  //       navigate("/login");
  //     }
  //   }, [userToken]);

  const googlesignup = useGoogleLogin({
    clientId:
      "380385507444-lr0o69cgjb9l3jf35sm2h87ffuv650m6.apps.googleusercontent.com",
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });
  const handleFailure = (response) => {
    console.log("handleFailure", response);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please Fill All Fields!");
    } else {
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
          "https://staging.commuterslink.com/api/v1/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
      } else {
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
        <section
          id="resubmit"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex py-4"
                style={{
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

              <div className="col-md-5 py-5 px-5">
                <h1
                  className="text-center text-custom  mb-2"
                  style={{
                    color: "#198754",
                    marginBottom: "5px",
                    marginTop: "10vh",
                  }}
                >
                  {" "}
                  ReSubmit
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
                      type="text"
                      label="CNIC"
                      color="success"
                      placeholder="XXXXX-XXXXXXX-X"
                      //   onChange={(e) => validateEmail(e.target.value)}
                      //   required
                      //   error={!isValidEmail}
                      //   helperText={!isValidEmail && "Please enter a valid email"}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </Form.Group>

                  <Box className="mt-4 text-center"  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      type="file"
                      color="light"
                      onChange={handleImageChange}
                    />
                    

                    <label htmlFor="image-upload" className="w-100 bg-light text-success">
                      <Button
                        variant="contained"
                        color="success"
                        p-3
                        component="span"
                        startIcon={<CloudUpload />}
                        className="w-100 bg-light text-success"
                      >
                        Front Side of Your CNIC
                      </Button>
                    </label>
                    {selectedImage && (
                      <div >
                        <Typography
                          variant="body1"
                          fullWidth
                        >
                          Selected Image:
                        </Typography>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                        />
                        <Button
                          variant="contained"
                          
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </div>
                    )}
                  </Box>
                  
                  <Box className="mt-4 text-center"  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      type="file"
                      color="light"
                      onChange={handleImageChange}
                    />
                    

                    <label htmlFor="image-upload" className="w-100 bg-light text-success">
                      <Button
                        variant="contained"
                        color="success"
                        p-3
                        component="span"
                        startIcon={<CloudUpload />}
                        className="w-100 bg-light text-success"
                      >
                        Back Side of Your CNIC
                      </Button>
                    </label>
                    {selectedImage && (
                      <div >
                        <Typography
                          variant="body1"
                          fullWidth
                        >
                          Selected Image:
                        </Typography>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected"
                        />
                        <Button
                          variant="contained"
                          
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </div>
                    )}
                  </Box>
                 <div className="py-5">
                 <btnresubmit className="btn-custom mx-2  px-4 py-2 rounded rounded-5 text-custom fw-bold">
                    Resubmit
                  </btnresubmit>
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

export default Resubmit;
