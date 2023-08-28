import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../../../constants'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { setCurrentPage } from "../../../redux/generalSlice";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const imageURL = "https://staging.commuterslink.com/uploads/picture/";

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
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
        <h3 className="card p-4 text-success my-2 fw-bold">
          User Profile
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${imageURL}${image}`} style={{ height: "150px", width: "150px" }} className='border border-2 rounded rounded-circle' />
              <p>{name}</p>
              <Form className="text-center">
                <Form.Group
                  className="mt-5 mb-1 text-center"
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
                  className="mt-3 text-center"
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
                  className="mt-3 text-center"
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
                <div className="container my-5">

                  <Link className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                    to={"/editprofile"}
                  >
                    Change Password

                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile;