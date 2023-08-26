import React from "react";
import { BASE_URL } from "../../../constants";
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

const EditProfile = () => {
  const { id } = useParams();
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <h3 className=" m-0">Edit Profile</h3>
            <Link
              to={"/viewprofile"}
              style={{
                borderRadius: "0%",
                marginLeft: "0%",
                marginRight: "0%",
              }}
            >
              <button className="btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center">
              <img
                src={`${BASE_URL}/assets/images/Vector.png`}
                style={{ height: "160px", width: "160px" }}
                className="border border-2 rounded rounded-circle"
              />
              {/* <p>Name</p> */}
              <Form className="text-center">
                <Form.Group
                  className=" mt-5 text-center"
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
                      label="New Password"
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
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
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
                      type={showPassword ? "text" : "password"}
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
                      label="New Password"
                    />
                  </FormControl>
                </Form.Group>
                <div className="container my-5">
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-4 py-2 mb-3">
                    Save{" "}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
