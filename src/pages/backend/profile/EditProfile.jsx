import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import { Form } from "react-bootstrap";
import { Button } from "@mui/base";
import {
  Breadcrumbs,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";
import Rider from '../MatchingUpdate/Rider';
const EditProfile = () => {
  const { id } = useParams();
  const userToken = useSelector((s) => s.login.data.token);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);
  const crumbs = [
    {
      path: "/viewprofile",
      label: "View Profile",
      active: false,
    },
    {
      label: id == undefined ? "Edit Profile" : "",
      active: true,
    },
  ];

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

  useEffect(() => {
    getProfileData();
  }, []);

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
        setEmail(jsonresponse[0].email);
      }
      else {
        setEmail("");
      }

      if (jsonresponse.statusCode === 500) {
        Swal.fire({
          position: 'top',

          text: `${jsonresponse.message}`
        })
      }

      console.log("Edit Profile Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const ResetPassword = async () => {
    try {
      if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
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
                  color: crumb.active ? "black" : "green",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  pointerEvents: crumb.path ? "auto" : "none",
                  textDecoration: "none",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </h3>
      </div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">EDIT PROFILE</h3>
            <Link
              to={"/viewprofile"}
              style={{
                borderRadius: "0%",
                marginLeft: "0%",
                marginRight: "0%",
              }}
            >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-4  p-2">
        <div className="card bg-light">
          <div className="card-body text-dark">
            <div className="container text-center">
              <h2 className="text-success fw-bold">Change Password</h2>
              <Form className="text-center">
                <Form.Group
                  className=" mt-4 text-center"
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
                  className=" mt-4 text-center"
                  controlId="formBasicEmail"
                >
                  <FormControl
                    color="success"
                    className="bg-light"
                    size="small"
                    sx={{ width: "100%" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password" style={{color:'#000000'}}>
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
                  className="mt-4 text-center"
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
                <div className="container my-5">
                  <Button
                    className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-4 py-2 mb-3"
                    onClick={ResetPassword}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Rider />
    </div>
  );
};

export default EditProfile;
