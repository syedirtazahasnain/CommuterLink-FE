import React, { useState, useEffect } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Box, Breadcrumbs, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Button } from "@mui/base";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { displayNotification } from '../../../helpers';

const Rider = () => {

  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);

  const [daysSelected, setDaysSelected] = useState([]);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [showfield, setShowField] = useState(false);

  useEffect(() => {
    getdropdowndata();
    getProfileData();
  }, []);

  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

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
        setSelectedHomeTime(jsonresponse[0].matches.time_depart);
        setSelectedOfficeTime(jsonresponse[0].matches.time_return);
        setPreferredGender(jsonresponse[0].contact.preferred_gender);
        console.log("Update Driver Details Data", jsonresponse);
        const mynewarray=jsonresponse[0].matches.days.split(',');
        setDaysSelected(mynewarray.map(day => day.trim())); 
    } catch (error) {
        console.error("An error occurred:", error);
    }
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

      if (daysSelected === "" || selectedHomeTime === "" || selectedOfficeTime === "" || preferredGender === "") {
        displayNotification("error", `Please fill all fields`);
      }
      else {
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

        if (jsonresponse.status_code === 200) {
          console.log('200');
          displayNotification("success","Matching criteria has been updated successfully");
          navigate("/dashboard");
        } else if (jsonresponse.status_code === 100) {
          console.log('100');
          displayNotification("error", `${jsonresponse.message}`);
        }
        else if (jsonresponse.status_code === 500) {
          console.log('500');
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      displayNotification("error", "An error occured white sending the request");
    }
  };

  return (
    <div>
      <div className="page-title py-2">
        {/* <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">UPDATE MATCHING CRITERIA</h3>
            <Link
              to={"/dashboard"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div> */}
      </div>
      <div className="card p-4  p-2">
        <div className="card bg-light">
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
            <div className="container text-center mt-2">
            <h2 className="text-success fw-bold mb-4">Update Additional Information</h2>
              <Form className="text-center">
                {showfield ===true ?(
                <> 
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
                <Row className="my-3 mx-0 px-1" style={{ border: '1px solid grey' }}>
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
                </Row>  <div className="container my-5">
                  <Button
                    className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
                    onClick={sendRequest}
                  >
                    Update
                  </Button>
                </div> </>):
                (<>  <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
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
                    disabled
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
                    disabled
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
                    disabled
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Both">Both</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Row className="my-3 mx-0 px-1" style={{ border: '1px solid grey' }}>
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
                            />
                          }
                          label="Sunday"
                        />
                      </div>
                    ))}

                  </div>
                </div>
              </Row> </>)}
              

                <div className="container my-5">
                  {/* <Button
                    className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
                    onClick={sendRequest}
                  >
                    Update
                  </Button> */}
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