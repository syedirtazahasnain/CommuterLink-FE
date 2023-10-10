import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API_URL, BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { Button as btnresubmit } from "@mui/base";
import { Button, Input, Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";
import { ThreeCircles } from "react-loader-spinner";

const Resubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [loading, setLoading] = useState(true);
  const [rejectedData, setRejectedData] = useState([]);
  const [selectedImageCnicFront, setSelectedImageCnicFront] = useState(null);
  const [selectedImageCnicFrontBase64, setSelectedImageCnicFrontBase64] = useState(null);
  const [selectedImageCnicFrontBase64Ext, setSelectedImageCnicFrontBase64Ext] = useState("");
  const [selectedImageCnicBack, setSelectedImageCnicBack] = useState(null);
  const [selectedImageCnicBackBase64, setSelectedImageCnicBackBase64] = useState(null);
  const [selectedImageCnicBackBase64Ext, setSelectedImageCnicBackBase64Ext] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [selectedImageBase64Ext, setSelectedImageBase64Ext] = useState("");

  useEffect(() => {
    getRejectedStatus();
  }, []);

  const getRejectedStatus = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/rejectedStatus/`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data (${response.status})`);
      }

      const jsonresponse = await response.json();
      console.log("Rejected Status:", jsonresponse);

      // Check if the response indicates a rejected status
      if (jsonresponse.success && jsonresponse.data.length > 0) {
        setRejectedData(jsonresponse.data[1]);
      }
      else {
        setRejectedData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rejected status:", error);
      // Handle the error, e.g., display an error message or take appropriate action.
      setLoading(false);
    }
  };

  const handleImageCnicFrontChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageCnicFront(file);
        setSelectedImageCnicFrontBase64(reader.result.split(",")[1]);
        setSelectedImageCnicFrontBase64Ext(file.name.split(".").pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCnicBackChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageCnicBack(file);
        setSelectedImageCnicBackBase64(reader.result.split(",")[1]);
        setSelectedImageCnicBackBase64Ext(file.name.split(".").pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(file);
        setSelectedImageBase64(reader.result.split(",")[1]);
        setSelectedImageBase64Ext(file.name.split(".").pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const requiredFields = [
    selectedImageCnicFrontBase64,
    selectedImageCnicFrontBase64Ext,
    selectedImageCnicBackBase64,
    selectedImageCnicBackBase64Ext,
    selectedImageBase64,
    selectedImageBase64Ext
  ];

  const SubmitForm = async () => {
    try {
      if (rejectedData && rejectedData.length === 1) {
        if (rejectedData.includes('Cnic Back Image')) {
          if (selectedImageCnicBackBase64 !== null && selectedImageCnicBackBase64Ext !== "") {
            const body = {
              "cnic_back_image": selectedImageCnicBackBase64,
              "cnic_back_image_ext": selectedImageCnicBackBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);
            
            if(jsonresponse.statusCode === 200){
              setSelectedImageCnicBack(null);
              setSelectedImageCnicBackBase64(null);
              setSelectedImageCnicBackBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }
          } else {
            displayNotification("warning", "Please provide your Cnic Back Image");
          }
        }
        else if (rejectedData.includes('Cnic Front Image')) {
          if (selectedImageCnicFrontBase64 !== null && selectedImageCnicFrontBase64Ext !== "") {
            const body = {
              "cnic_front_image": selectedImageCnicFrontBase64,
              "cnic_front_image_ext": selectedImageCnicFrontBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);

            if(jsonresponse.statusCode === 200){
              setSelectedImageCnicFront(null);
              setSelectedImageCnicFrontBase64(null);
              setSelectedImageCnicFrontBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }
          } else {
            displayNotification("warning", "Please provide your valid Cnic Front Image");
          }
        }
        else if (rejectedData.includes('Commuters Image')) {
          if (selectedImageBase64 !== null && selectedImageBase64Ext !== "") {
            const body = {
              "picture": selectedImageBase64,
              "picture_image_ext": selectedImageBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);

            if(jsonresponse.statusCode === 200){
              setSelectedImage(null);
              setSelectedImageBase64(null);
              setSelectedImageBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }
          } else {
            displayNotification("warning", "Please provide your Profile Image");
          }
        }
      }
      else if (rejectedData && rejectedData.length === 2) {
        if (rejectedData.includes('Cnic Front Image') && rejectedData.includes('Cnic Back Image')) {
          if (selectedImageCnicFrontBase64 !== null && selectedImageCnicFrontBase64Ext !== "" 
              && selectedImageCnicBackBase64 !== null && selectedImageCnicBackBase64Ext !== "") {
            const body = {
              "cnic_front_image": selectedImageCnicFrontBase64,
              "cnic_front_image_ext": selectedImageCnicFrontBase64Ext,
              "cnic_back_image": selectedImageCnicBackBase64,
              "cnic_back_image_ext": selectedImageCnicBackBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);

            if(jsonresponse.statusCode === 200){
              setSelectedImageCnicFront(null);
              setSelectedImageCnicFrontBase64(null);
              setSelectedImageCnicFrontBase64Ext("");
              setSelectedImageCnicBack(null);
              setSelectedImageCnicBackBase64(null);
              setSelectedImageCnicBackBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }
          } else {
            displayNotification("warning", "Please provide your Cnic Front Image and Cnic Back Image");
          }
        }
        else if (rejectedData.includes('Cnic Back Image') && rejectedData.includes('Commuters Image')) {
          if (selectedImageCnicBackBase64 !== null && selectedImageCnicBackBase64Ext !== "" 
              && selectedImageBase64 !== null && selectedImageBase64Ext !== "") {
            const body = {
              "cnic_back_image": selectedImageCnicBackBase64,
              "cnic_back_image_ext": selectedImageCnicBackBase64Ext,
              "picture": selectedImageBase64,
              "picture_image_ext": selectedImageBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);

            if(jsonresponse.statusCode === 200){
              setSelectedImageCnicBack(null);
              setSelectedImageCnicBackBase64(null);
              setSelectedImageCnicBackBase64Ext("");
              setSelectedImage(null);
              setSelectedImageBase64(null);
              setSelectedImageBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }
          } else {
            displayNotification("warning", "Please provide your Cnic Back Image and Profile Image");
          }
        }
        else if (rejectedData.includes('Cnic Front Image') && rejectedData.includes('Commuters Image')) {
          if (selectedImageCnicFrontBase64 !== null && selectedImageCnicFrontBase64Ext !== ""
              && selectedImageBase64 !== null && selectedImageBase64Ext !== "") {
            const body = {
              "cnic_front_image": selectedImageCnicFrontBase64,
              "cnic_front_image_ext": selectedImageCnicFrontBase64Ext,
              "picture": selectedImageBase64,
              "picture_image_ext": selectedImageBase64Ext,
            }
            const response = await fetch(
              `${API_URL}/api/v1/upload-rejected-documents-test`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify(body),
              }
            );
      
            console.log("Submitted Form Body:", body);
      
            const jsonresponse = await response.json();
      
            console.log("API Response:", jsonresponse);

            if(jsonresponse.statusCode === 200){
              setSelectedImageCnicFront(null);
              setSelectedImageCnicFrontBase64(null);
              setSelectedImageCnicFrontBase64Ext("");
              setSelectedImage(null);
              setSelectedImageBase64(null);
              setSelectedImageBase64Ext("");
              dispatch(setloginState(""));
              navigate("/");
            }

          } else {
            displayNotification("warning", "Please provide your Cnic Front Image and Profile Image");
          }
        }
      }
      else if (rejectedData && rejectedData.length === 3) {
        if (requiredFields.every(
          (field) => field !== "" && field !== null && field !== undefined
        )) {
          const body = {
            "cnic_front_image": selectedImageCnicFrontBase64,
            "cnic_front_image_ext": selectedImageCnicFrontBase64Ext,
            "cnic_back_image": selectedImageCnicBackBase64,
            "cnic_back_image_ext": selectedImageCnicBackBase64Ext,
            "picture": selectedImageBase64,
            "picture_image_ext": selectedImageBase64Ext,
          }
          const response = await fetch(
            `${API_URL}/api/v1/upload-rejected-documents-test`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify(body),
            }
          );

          console.log("Submitted Form Body:", body);

          const jsonresponse = await response.json();

          console.log("API Response:", jsonresponse);

          if(jsonresponse.statusCode === 200){
            setSelectedImageCnicFront(null);
            setSelectedImageCnicFrontBase64(null);
            setSelectedImageCnicFrontBase64Ext("");
            setSelectedImageCnicBack(null);
            setSelectedImageCnicBackBase64(null);
            setSelectedImageCnicBackBase64Ext("");
            setSelectedImage(null);
            setSelectedImageBase64(null);
            setSelectedImageBase64Ext("");
            dispatch(setloginState(""));
            navigate("/");
          }
        }
        else {
          displayNotification("warning", "Please submit all your details");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };  

  return (
    <div>
      <div>
        <section
          id="resubmit"
          className="mt-5 main-bg" >
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex py-4"
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
                      alt="first slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                  </Carousel.Item>

                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="second slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="third slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="fourth slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride For Office</h4>
                  </Carousel.Item>
                </Carousel>
                {/* </div> */}
              </div>

              <div className="col-md-5 py-5 px-5 ">
                <h1
                  className="text-center text-custom  mb-2"
                  style={{
                    color: "#198754",
                    marginBottom: "5px",
                    marginTop: "10vh",
                  }}
                >
                  {" "}
                  Resubmit
                </h1>
                {loading ? (
                  <div className="text-center">
                    {/* Render CircularProgress while loading */}
                    <div className="d-flex justify-content-center align-items-center vh-10">
                      <ThreeCircles
                        height={50}
                        width={50}
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                      />
                    </div>
                  </div>
                ) : (
                    <Form className="text-center">
                      {rejectedData && rejectedData.length === 1 && (
                        (rejectedData.includes('Cnic Front Image') && (
                          <Box className="mt-4 text-center">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-cnic-front"
                              type="file"
                              color="light"
                              onChange={handleImageCnicFrontChange}
                            />
                            <label htmlFor="image-upload-cnic-front" className="w-100 bg-light text-success">
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
                            {selectedImageCnicFront && (
                              <div>
                                <Typography variant="body1" fullWidth>
                                  Front Side CNIC Image:
                                </Typography>
                                <img
                                  className="mt-1"
                                  src={URL.createObjectURL(selectedImageCnicFront)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 1 && (
                        (rejectedData.includes('Cnic Back Image') && (
                          <Box className="mt-4 text-center">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-cnic-back"
                              type="file"
                              color="light"
                              onChange={handleImageCnicBackChange}
                            />
                            <label htmlFor="image-upload-cnic-back" className="w-100 bg-light text-success">
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
                            {selectedImageCnicBack && (
                              <div>
                                <Typography variant="body1" fullWidth>
                                  Back Side CNIC Image:
                                </Typography>
                                <img
                                  className="mt-1"
                                  src={URL.createObjectURL(selectedImageCnicBack)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 1 && (
                        (rejectedData.includes('Commuters Image') && (
                          <Box className="mt-4 text-center">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-profile"
                              type="file"
                              color="light"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload-profile" className="w-100 bg-light text-success">
                              <Button
                                variant="contained"
                                color="success"
                                p-3
                                component="span"
                                startIcon={<CloudUpload />}
                                className="w-100 bg-light text-success"
                              >
                                Profile Picture
                              </Button>
                            </label>
                            {selectedImage && (
                              <div>
                                <Typography variant="body1" fullWidth>
                                  Profile Picture:
                                </Typography>
                                <img
                                  className="mt-1"
                                  src={URL.createObjectURL(selectedImage)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 2 && (
                        (rejectedData.includes('Cnic Front Image') && rejectedData.includes('Cnic Back Image') && (
                          <>
                            <Box className="mt-4 text-center">
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-cnic-front"
                                type="file"
                                color="light"
                                onChange={handleImageCnicFrontChange}
                              />

                              <label htmlFor="image-upload-cnic-front" className="w-100 bg-light text-success">
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
                              {selectedImageCnicFront && (
                                <div >
                                  <Typography
                                    variant="body1"
                                    fullWidth
                                  >
                                    Front Side CNIC Image:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImageCnicFront)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                            <Box className="mt-4 text-center"  >
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-cnic-back"
                                type="file"
                                color="light"
                                onChange={handleImageCnicBackChange}
                              />


                              <label htmlFor="image-upload-cnic-back" className="w-100 bg-light text-success">
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
                              {selectedImageCnicBack && (
                                <div >
                                  <Typography
                                    variant="body1"
                                    fullWidth
                                  >
                                    Back Side CNIC Image:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImageCnicBack)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                          </>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 2 && (
                        (rejectedData.includes('Cnic Back Image') && rejectedData.includes('Commuters Image') && (
                          <>
                            <Box className="mt-4 text-center"  >
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-cnic-back"
                                type="file"
                                color="light"
                                onChange={handleImageCnicBackChange}
                              />

                              <label htmlFor="image-upload-cnic-back" className="w-100 bg-light text-success">
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
                              {selectedImageCnicBack && (
                                <div >
                                  <Typography
                                    variant="body1"
                                    fullWidth
                                  >
                                    Back Side CNIC Image:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImageCnicBack)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                            <Box className="mt-4 text-center">
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-profile"
                                type="file"
                                color="light"
                                onChange={handleImageChange}
                              />
                              <label htmlFor="image-upload-profile" className="w-100 bg-light text-success">
                                <Button
                                  variant="contained"
                                  color="success"
                                  p-3
                                  component="span"
                                  startIcon={<CloudUpload />}
                                  className="w-100 bg-light text-success"
                                >
                                  Profile Picture
                                </Button>
                              </label>
                              {selectedImage && (
                                <div>
                                  <Typography variant="body1" fullWidth>
                                    Profile Picture:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                          </>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 2 && (
                        (rejectedData.includes('Cnic Front Image') && rejectedData.includes('Commuters Image') && (
                          <>
                            <Box className="mt-4 text-center">
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-cnic-front"
                                type="file"
                                color="light"
                                onChange={handleImageCnicFrontChange}
                              />

                              <label htmlFor="image-upload-cnic-front" className="w-100 bg-light text-success">
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
                              {selectedImageCnicFront && (
                                <div >
                                  <Typography
                                    variant="body1"
                                    fullWidth
                                  >
                                    Front Side CNIC Image:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImageCnicFront)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                            <Box className="mt-4 text-center">
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image-upload-profile"
                                type="file"
                                color="light"
                                onChange={handleImageChange}
                              />
                              <label htmlFor="image-upload-profile" className="w-100 bg-light text-success">
                                <Button
                                  variant="contained"
                                  color="success"
                                  p-3
                                  component="span"
                                  startIcon={<CloudUpload />}
                                  className="w-100 bg-light text-success"
                                >
                                  Profile Picture
                                </Button>
                              </label>
                              {selectedImage && (
                                <div>
                                  <Typography variant="body1" fullWidth>
                                    Profile Picture:
                                  </Typography>
                                  <img
                                    className="mt-1"
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                  />
                                </div>
                              )}
                            </Box>
                          </>
                        ))
                      )}

                      {rejectedData && rejectedData.length === 3 && (
                        <>
                          <Box className="mt-4 text-center">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-cnic-front"
                              type="file"
                              color="light"
                              onChange={handleImageCnicFrontChange}
                            />

                            <label htmlFor="image-upload-cnic-front" className="w-100 bg-light text-success">
                              <Button
                                variant="contained"
                                color="success"
                                p-3
                                component="span"
                                startIcon={<CloudUpload />}
                                className="w-100 bg-light text-success"
                              >
                                Upload a clear image of your CNIC Front Side
                              </Button>
                            </label>
                            {selectedImageCnicFront && (
                              <div >
                                <Typography
                                  variant="body1"
                                  fullWidth
                                >
                                  Upload a clear image of your CNIC Front Side
                                </Typography>
                                <img
                                  className="mt-1 w-50 h-50 overflow-hidden text-center"
                                  src={URL.createObjectURL(selectedImageCnicFront)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                          <Box className="mt-4 text-center"  >
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-cnic-back"
                              type="file"
                              color="light"
                              onChange={handleImageCnicBackChange}
                            />


                            <label htmlFor="image-upload-cnic-back" className="w-100 bg-light text-success">
                              <Button
                                variant="contained"
                                color="success"
                                p-3
                                component="span"
                                startIcon={<CloudUpload />}
                                className="w-100 bg-light text-success"
                              >
                                 Upload a clear image of your CNIC Back Side
                              </Button>
                            </label>
                            {selectedImageCnicBack && (
                              <div >
                                <Typography
                                  variant="body1"
                                  fullWidth
                                >
                               Upload a clear image of your CNIC Back Side
                                </Typography>
                                <img
                                  className="mt-1 w-50 h-50 overflow-hidden text-center"
                                  src={URL.createObjectURL(selectedImageCnicBack)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                          <Box className="mt-4 text-center">
                            <input
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-profile"
                              type="file"
                              color="light"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload-profile" className="w-100 bg-light text-success">
                              <Button
                                variant="contained"
                                color="success"
                                p-3
                                component="span"
                                startIcon={<CloudUpload />}
                                className="w-100 bg-light text-success"
                              >
                               Upload a clear Profile Picture
                              </Button>
                            </label>
                            {selectedImage && (
                              <div>
                                <Typography variant="body1" fullWidth>
                                Upload a clear Profile Picture
                                </Typography>
                                <img
                                  className="mt-1 w-50 h-50 overflow-hidden text-center"
                                  src={URL.createObjectURL(selectedImage)}
                                  alt="Selected"
                                />
                              </div>
                            )}
                          </Box>
                        </>
                      )}
                    <div className="py-4">
                      <btnresubmit className="btn-custom1 mx-2 text-center border-0 px-4 py-2 rounded rounded-2 text-white fw-bold cursor-pointer" onClick={SubmitForm}>
                        Resubmit
                      </btnresubmit>
                    </div>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resubmit;