import React, { useState, useEffect } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Box, Breadcrumbs, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { setCurrentPage } from "../../../redux/generalSlice";

const Rider = () => {
  const [day, setDay] = React.useState('');
  const [starttime, setStartTime] = React.useState('');
  const [returntime, setReturnTime] = React.useState('');
  const [preferedgender, setPreferedGender] = React.useState('');

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  const handleChange1 = (event) => {
    setStartTime(event.target.value);
  };

  const handleChange2 = (event) => {
    setReturnTime(event.target.value);
  };

  const handleChange3 = (event) => {
    setPreferedGender(event.target.value);
  };

  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);


  //   const crumbs = [
  //     {
  //       // path: "/portal/document-management",
  //       label: "View Profile",
  //       //   path:"/viewprofile",
  //       active: true,
  //     },
  //   ];

  useEffect(() => {
    // dispatch(setCurrentPage("profile"));
    // getProfileData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);






  return (
    <div>
      <div className="page-title">

        {/* <Breadcrumbs aria-label="breadcrumb">
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
          </Breadcrumbs> */}

      </div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Update Matching Criteria
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center">

              <Form className="text-center">

                {/* <Box sx={{ minWidth: 120, color:'success'}} className="mb-3">
      <FormControl fullWidth  size="small">
        <InputLabel id="demo-simple-select-label" color='success'>Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          color='success'
          value={day}
          className="bg-light text-left"
          label="Day"
          onChange={handleChange}
        >
          <MenuItem value={1}>Monday</MenuItem>
          <MenuItem value={2}>Tuesday</MenuItem>
          <MenuItem value={3}>Wednesday</MenuItem>
          <MenuItem value={4}>Thursday</MenuItem>
          <MenuItem value={5}>Friday</MenuItem>
          <MenuItem value={6}>Saturday</MenuItem>
          <MenuItem value={7}>Sunday</MenuItem>
          

        </Select>
      </FormControl>
    </Box> */}

                <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label" color='success'>Pickup Timings</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color='success'
                      value={starttime}
                      className="bg-light text-left"
                      label="Pickup Timings"
                      onChange={handleChange1}
                    >
                      <MenuItem value={1}>00:00</MenuItem>
                      <MenuItem value={2}>01:00</MenuItem>
                      <MenuItem value={3}>02:00</MenuItem>
                      <MenuItem value={4}>03:00</MenuItem>
                      <MenuItem value={5}>04:00</MenuItem>
                      <MenuItem value={6}>05:00</MenuItem>
                      <MenuItem value={7}>06:00</MenuItem>


                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label" color='success'>Drop-off Timings</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color='success'
                      value={returntime}
                      className="bg-light text-left"
                      label="Drop-off Timings"
                      onChange={handleChange2}
                    >
                      <MenuItem value={1}>00:00</MenuItem>
                      <MenuItem value={2}>01:00</MenuItem>
                      <MenuItem value={3}>02:00</MenuItem>
                      <MenuItem value={4}>03:00</MenuItem>
                      <MenuItem value={5}>04:00</MenuItem>
                      <MenuItem value={6}>05:00</MenuItem>
                      <MenuItem value={7}>06:00</MenuItem>


                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label" color='success'>Preferred Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color='success'
                      value={returntime}
                      className="bg-light text-left"
                      label="Preferred Gender"
                      onChange={handleChange3}
                    >
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                      <MenuItem value={3}>Both</MenuItem>



                    </Select>
                  </FormControl>
                </Box>
                <Row className="my-3 mx-0 px-1" style={{ border: '1px solid #cddbd9' }}>
                  <Form.Group as={Col} md="12" className="text-left  " controlId="validationCustom01">
                    <Form.Label style={{ color: "#000" }} className="pt-3 text-left">
                      I Commute (Select Days)
                    </Form.Label>
                  </Form.Group>

                  <div className="row d-flex">
                    <div className="col">

                      <div className="mb-3 d-flex flex-wrap">
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Monday"
                              color="success"

                            />
                          }
                          label="Monday"
                        />


                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Tuesday"
                              color="success"

                            />
                          }
                          label="Tuesday"
                        />


                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Wednesday"
                              color="success"

                            />
                          }
                          label="Wednesday"
                        />


                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Thursday"
                              color="success"

                            />
                          }
                          label="Thursday"
                        />


                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Friday"
                              color="success"

                            />
                          }
                          label="Friday"
                        />



                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Saturday"
                              color="success"

                            />
                          }
                          label="Saturday"
                        />


                        <FormControlLabel
                          control={
                            <Checkbox
                              name="group1"
                              value="Sunday"
                              color="success"

                            />
                          }
                          label="Sunday"
                        />

                      </div>

                    </div>
                  </div>
                </Row>

                <div className="container my-5">

                  <Link className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                    to={"/editprofile"}
                  >
                    Update

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

export default Rider;