import React, { useState, useEffect } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Box, Breadcrumbs, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Button } from "@mui/base";
import { useNavigate } from 'react-router-dom';

const Rider = () => {

  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);

  const [daysSelected, setDaysSelected] = useState([]);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  const [preferredGender, setPreferredGender] = useState("");

  useEffect(() => {
    getdropdowndata();
  }, []);

  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  const getdropdowndata = async () => {
    const response = await fetch(
      `${API_URL}/api/v1/list/data`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonresponse = await response.json();
    setHomeTimeSlots(jsonresponse.time_slots);
    setOfficeTimeSlots(jsonresponse.time_slots);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    // Check if the day is already selected or not
    if (daysSelected.includes(value)) {
      // Day is already selected, remove it from the array
      setDaysSelected((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== value)
      );
    } else {
      // Day is not selected, add it to the array
      setDaysSelected((prevSelectedDays) => [...prevSelectedDays, value]);
    }
  };

  const sendRequest = async () => {
    try {

      const body = {
        days: daysSelected,
        start_time_id: selectedHomeTime,
        return_time_id: selectedOfficeTime,
        prefer_genders: preferredGender,
      }
      console.log("sendRequest Body:", body);

      const response = await fetch(
        `${API_URL}/api/v1/update-matching-principles`,
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

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonresponse = await response.json();
      console.log("sendRequest API Response", jsonresponse);

      if (jsonresponse.statusCode === 200) {
        navigate("/dashboard");
      } else {
        alert("Resend Error: " + jsonresponse.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      alert("An error occurred while sending the request.");
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Update Matching Criteria
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center mt-4">

              <Form className="text-center">
                <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label" color='success'>Pickup Timings</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      color='success'
                      value={selectedHomeTime}
                      onChange={(e) => setSelectedHomeTime(e.target.value)}
                      className="bg-light text-left"
                      label="Pickup Timings"
                      required
                    >
                      {homeTimeSlots?.map((time) => (
                        <MenuItem key={time.id} value={time.id}>
                          {time.time_string}
                        </MenuItem>

                      ))}
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
                      className="bg-light text-left"
                      label="Drop-off Timings"
                      value={selectedOfficeTime}
                      onChange={(e) => setSelectedOfficeTime(e.target.value)}
                      required
                    >
                      {officeTimeSlots?.map((time) => (
                        <MenuItem key={time.id} value={time.id}>
                          {time.time_string}
                        </MenuItem>
                      ))}


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
                      className="bg-light text-left"
                      label="Prefer Gender"
                      value={preferredGender}
                      onChange={(e) => setPreferredGender(e.target.value)}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
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
                      {["checkbox"].map((type) => (
                        <div
                          key={`inline-${type}`}
                          className="mb-3 d-flex flex-wrap"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Monday"
                                name="group1"
                                color="success"
                                type={type}
                                value="Monday"
                                id={`inline-${type}-0`}
                                checked={daysSelected.includes("Monday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Monday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Tuesday"
                                name="group1"
                                color="success"
                                type={type}
                                value="Tuesday"
                                id={`inline-${type}-1`}
                                checked={daysSelected.includes("Tuesday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Tuesday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Wednesday"
                                name="group1"
                                color="success"
                                type={type}
                                value="Wednesday"
                                id={`inline-${type}-2`}
                                checked={daysSelected.includes("Wednesday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Wednesday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Thursday"
                                name="group1"
                                color="success"
                                type={type}
                                value="Thursday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Thursday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Thursday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Friday"
                                name="group1"
                                color="success"
                                type={type}
                                value="Friday"
                                id={`inline-${type}-4`}
                                checked={daysSelected.includes("Friday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Friday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Saturday"
                                name="group1"
                                type={type}
                                value="Saturday"
                                color="success"
                                id={`inline-${type}-5`}
                                checked={daysSelected.includes("Saturday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Saturday"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                inline
                                label="Sunday"
                                name="group1"
                                type={type}
                                value="Sunday"
                                color="success"
                                id={`inline-${type}-6`}
                                checked={daysSelected.includes("Sunday")}
                                onChange={handleCheckboxChange}
                              // required
                              />
                            }
                            label="Sunday"
                          />
                        </div>
                      ))}

                    </div>
                  </div>
                </Row>

                <div className="container my-5">
                  <Button
                    className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                    onClick={sendRequest}
                  >
                    Update
                  </Button>
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