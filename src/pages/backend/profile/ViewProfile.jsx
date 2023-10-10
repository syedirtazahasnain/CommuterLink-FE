import React, { useState, useEffect } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { setCurrentPage } from "../../../redux/generalSlice";
import { Button } from '@mui/base';
import Rider from '../MatchingUpdate/Rider';
import Driver from '../MatchingUpdate/Driver';
import { displayNotification } from '../../../helpers';

const ViewProfile = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showfield, setShowField] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);
  const crumbs = [
    {
      // path: "/portal/document-management",
      label: "View Profile",
      //   path:"/viewprofile",
      active: true,
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage("profile"));
    getProfileData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);


  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const validatePassword = (password) => {
    // Regular expression pattern for validating passwords
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (newPassword === '' || passwordPattern.test(password)) {
      setNewPassword(password);
      setIsValidPassword(true);
    } else {
      setNewPassword(password);
      setIsValidPassword(false);
    }
  };

  const checkconfirmPassword = (cpassword) => {
    if (newPassword === cpassword) {
      setConfirmPassword(cpassword);
      setisValidConfirmPassword(true);
    } else {
      setConfirmPassword(cpassword);
      setisValidConfirmPassword(false);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setName(jsonresponse[0].name);
        setEmail(jsonresponse[0].email);
        setMobileNo(jsonresponse[0].mobile);
        setImage(jsonresponse[0].contact.commuter_image);
      }
      else {
        setName("");
        setEmail("");
        setMobileNo("");
        setImage("");
      }
      console.log("Profile Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    try {
      if (name === "" || email === "" || mobileNo === "" || currentPassword === "" || newPassword === "" || confirmPassword === "") {
        // alert("Please Fill All Fields!");
        // Swal.fire({
        //   position:'top',

        //  text: 'Please Fill All Fields!',
        //  customClass: {
        //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
        // },}
        // )
        displayNotification("warning", "Please Fill All Fields");
      }
      else if (newPassword !== confirmPassword) {
        // alert("Confirm password is not matched with new password!")
        // Swal.fire({
        //   position:'top',

        //  text: 'Confirm password is not matched with new password!',
        //  customClass: {
        //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
        // },}
        // )
        displayNotification("warning", "Confirm password is not matched with new password!");
      }
      else {
        const body = {
          email: email,
          old_password: currentPassword,
          new_password: newPassword,
        }
        console.log("Reset Password Body", body);

        const response = await fetch(
          `${API_URL}/api/v1/reset-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        const jsonresponse = await response.json();

        if (jsonresponse.message === "Password updated successfully") {
          // alert(jsonresponse.message);
          // Swal.fire({
          //   position:'top',

          //  text: `${jsonresponse.message}`,
          //  customClass: {
          //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
          // },}
          // )
          displayNotification("error", `${jsonresponse.message}`);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          // alert("Error: " + jsonresponse.message);
          // Swal.fire({
          //   position:'top',

          //   text: `${jsonresponse.message}`
          // })
          displayNotification("error", `${jsonresponse.message}`);
        }

        if (jsonresponse.statusCode === 500) {
          // Swal.fire({
          //   position:'top',

          //   text: `${jsonresponse.message}`
          // })
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card px-4 py-2 text-success my-2 fw-bold">
          <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map((crumb, index) => (
              <Link
                key={index}
                to={crumb.path || ""}
                style={{
                  color: crumb.active ? "black" : "#ff4815",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  pointerEvents: crumb.path ? "auto" : "none",
                  textDecoration: "none"

                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </h3>
      </div>
      <div className="page-title">
        <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-dark-green my-2 fw-bold m-0">USER PROFILE</h3>
            <Link
              to={"/dashboard"} >

              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-4  p-2">
        <div className="card bg-light" >
          <div className="row text-right pt-2 px-2">

            <Link
              to={""} >
              <Button variant=""
                className="btn font-custom btn align-end btn-dark-green rounded-0 text-white fs-6 lh-1"

                onClick={() => {
                  setShowField(true);
                }}
              >
                <i className="fa-solid fa-pen text-white" />
                Edit
              </Button>
            </Link>

          </div>
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${IMAGE_URL}${image}`} style={{ height: "150px", width: "150px" }} className='border border-2 rounded rounded-circle' />
              <p>{name}</p>

              <Form className="text-center">
                {showfield === true ? (
                  <>
                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formfullName"
                    >
                      <TextField
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        label="Full Name"
                        value={name}
                        required
                        size="small"
                        onChange={(e) => setName(e.target.value)}
                        disabled

                      />
                    </Form.Group>

                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        type="email"
                        label="Email"
                        value={email}
                        required
                        size="small"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        value={mobileNo}
                        label="Mobile Number (03xxxxxxxxx)"
                        required
                        size="small"
                        disabled
                      />
                    </Form.Group>
                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formBasicEmail"
                    >
                      <FormControl
                        color="success"
                        className="bg-light"
                        size="small"
                        sx={{ width: "100%" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Current Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Current Password"
                        />
                      </FormControl>
                    </Form.Group>
                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formBasicEmail"
                    >
                      <FormControl
                        color="success"
                        className="bg-light"
                        size="small"
                        sx={{ width: "100%" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          New Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword1 ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => validatePassword(e.target.value)}
                          required
                          size="small"
                          error={!isValidPassword}
                          helperText={
                            !isValidPassword &&
                            "Password must have at least 8 characters with mix of letters numbers special  characters"
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}
                                edge="end"
                              >
                                {showPassword1 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="New Password"
                        />
                      </FormControl>
                    </Form.Group>
                    <Form.Group
                      className="mt-2 mb-1 text-center"
                      controlId="formBasicEmail"
                    >
                      <FormControl
                        color="success"
                        className="bg-light"
                        size="small"
                        sx={{ width: "100%" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword2 ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => checkconfirmPassword(e.target.value)}
                          required
                          size="small"
                          error={!isValidConfirmPassword}
                          helperText={
                            !isValidConfirmPassword &&
                            "Both passwords must be the same"
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                              >
                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Confirm Password"
                        />
                      </FormControl>
                    </Form.Group>
                    <div className="container  my-4">

                      <Button
                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white mr-3 px-3 py-2"
                        onClick={sendRequest}
                      >
                        Update
                      </Button>
                      <Button
                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2"
                        onClick={() => {
                          setShowField(false);
                        }}
                      >
                       Cancel
                      </Button>
                    </div>
                  </>
                ) :
                  (
                    <>
                      <Form.Group
                        className="mt-2 mb-1 text-center"
                        controlId="formfullName"
                      >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          className="bg-light"
                          color='success'
                          variant="outlined"
                          label="Full Name"
                          value={name}
                          required
                          size="small"
                          disabled

                        />
                      </Form.Group>

                      <Form.Group
                        className="mt-2 mb-1 text-center"
                        controlId="formBasicEmail"
                      >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          className="bg-light"
                          color='success'
                          variant="outlined"
                          type="email"
                          label="Email"
                          value={email}
                          required
                          size="small"
                          disabled
                        />
                      </Form.Group>
                      <Form.Group
                        className="mt-2 mb-1 text-center"
                        controlId="formBasicEmail"
                      >
                        <TextField
                          fullWidth
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                            },
                          }}
                          className="bg-light"
                          color='success'
                          variant="outlined"
                          value={mobileNo}
                          label="Mobile Number (03xxxxxxxxx)"
                          required
                          size="small"
                          disabled
                        />
                      </Form.Group>
                    </>
                  )
                }
                <div className="container my-5">

                  {/* <Link className="font-custom text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white px-3 py-3 mb-3"
                    to={"/editprofile"}
                  >
                    Change Password

                  </Link> */}

                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Driver />
    </div>
  )
}

export default ViewProfile;