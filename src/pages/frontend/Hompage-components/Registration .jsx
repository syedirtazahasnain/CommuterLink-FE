import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Row } from 'react-bootstrap';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Registration = () => {
  
  const navigate = useNavigate();
  const[locationString, setLocationString] = useState("");
  const [validated, setValidated] = useState(false);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  // For Start Point
  const [dropdownStartdata, setDropDownStartData] = useState();
  const [provinceStartId, setProvinceStartId] = useState("");
  const [selectedStartProvinceCities, setSelectedStartProvinceCities] = useState([]);
  const [cityStartId, setCityStartId] = useState("");
  const [selectedStartCityArea, setSelectedStartCityArea] = useState([]);
  // For End Point
  const [dropdownEnddata, setDropDownEndData] = useState();
  const [provinceEndId, setProvinceEndId] = useState("");
  const [selectedEndProvinceCities, setSelectedEndProvinceCities] = useState([]);
  const [cityEndId, setCityEndId] = useState("");
  const [selectedEndCityArea, setSelectedEndCityArea] = useState([]);
  
  const [defaultCenter, setDefaultCenter] = useState ({
    lat: 40.712776,
    lng: -74.005974,
  });

  const nextPage = () => {
    navigate("/registration/driving-form");
  }

  useEffect(() => {
    getdropdownStartdata();
  }, []);

  useEffect(() => {
    if (provinceStartId) {
      const selectedStartProvince = dropdownStartdata?.countries[0]?.provinces.find(
        (province) => province.id == provinceStartId
      );
      setSelectedStartProvinceCities(
        selectedStartProvince ? selectedStartProvince.cities : []
      );
    }
    if (provinceEndId) {
      const selectedEndProvince = dropdownEnddata?.countries[0]?.provinces.find(
        (province) => province.id == provinceEndId
      );
      setSelectedEndProvinceCities(
        selectedEndProvince ? selectedEndProvince.cities : []
      );
    }
  }, [provinceStartId, provinceEndId]);

  useEffect(() => {
    
    if (cityStartId ) {
      const filteredStartCities = dropdownStartdata.area.filter(
        (city) => city.parent_id == cityStartId
      );
      console.log("filteredCities", filteredStartCities);
      setSelectedStartCityArea(filteredStartCities ? filteredStartCities : []);
      setLocationString(filteredStartCities[0].value)
    }

    if (cityEndId) {
      const filteredEndCities = dropdownEnddata.area.filter(
        (city) => city.parent_id == cityEndId
      );
      console.log("filteredCities", filteredEndCities);
      setSelectedEndCityArea(filteredEndCities ? filteredEndCities : []);
      setLocationString(filteredEndCities[0].value)
    }
  }, [cityStartId, cityEndId]);

  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationString)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );

        const data = await response.json(); // Parse the response as JSON
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setDefaultCenter({ lat, lng });
        } else {
          console.error('Geocoding API response error');
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    getGeocodeData();
  }, [locationString]);

  const getdropdownStartdata = async () => {
    const response = await fetch(
      "https://staging.commuterslink.com/api/v1/list/data",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonresponse = await response.json();
    setDropDownStartData(jsonresponse);
    setDropDownEndData(jsonresponse);
    setHomeTimeSlots(jsonresponse.time_slots);
    setOfficeTimeSlots(jsonresponse.time_slots);
    console.log(jsonresponse);
  };

  const handleProvinceStartChange = (event) => {
    setProvinceStartId(event.target.value);
  };

  const handleProvinceEndChange = (event) => {
    setProvinceEndId(event.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#eee" }}>
        <div className="containter p-5">
          <div className="row justify-content-center">
            <div className="col-md-8 bg-white  mt-5 mb-5">
              <h1
                className="text-center mb-4"
                style={{
                  color: "#198754",
                  marginBottom: "5vh",
                  marginTop: "5vh",
                }}
              >
                Registration
              </h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}  md={cityStartId ? '4' : '6'} controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Starting Point
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={provinceStartId}
                      onChange={handleProvinceStartChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select a Starting Point
                      </option>
                      {dropdownStartdata?.countries[0]?.provinces?.map(
                        (province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={cityStartId ? '4' : '6'} controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Select City
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={cityStartId}
                      onChange={(e) => setCityStartId(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                        Select a city
                      </option>
                      {selectedStartProvinceCities?.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {cityStartId && (
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label style={{ color: "#198754" }}>
                        Select Area from Dropdown
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                        required
                      >
                        <option value="" disabled hidden>
                          Select Area from Dropdown
                        </option>
                        {selectedStartCityArea?.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>
                      <LoadScript googleMapsApiKey={""}>
                        <GoogleMap
                           
                          zoom={10}
                          center={defaultCenter}
                        >
                          <spain>
                            Can't find your area?
                            <a  >
                              Add Another
                            </a>
                          </spain>
                        </GoogleMap>
                      </LoadScript>
                    </Form.Group>
                  )}
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md={cityEndId ? '4' : '6'} controlId="validationCustom01">
                    <Form.Label 
                      style={{ color: "#198754" }}
                    >
                      Drop Off
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={provinceEndId}
                      onChange={handleProvinceEndChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select a Drop Off Point
                      </option>
                      {dropdownEnddata?.countries[0]?.provinces?.map(
                        (province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={cityEndId ? '4' : '6'} controlId="validationCustom02">
                    <Form.Label 
                      style={{ color: "#198754" }} 
                      value={cityEndId}
                      onChange={(e) => setCityEndId(e.target.value)}
                      >
                      Select City
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={cityEndId}
                      onChange={(e) => setCityEndId(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                        Select a city
                      </option>
                      {selectedEndProvinceCities?.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {cityEndId && (
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label style={{ color: "#198754" }}>
                        Select Area from Dropdown
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                        required
                      >
                        <option value="" disabled hidden>
                          Select Area from Dropdown
                        </option>
                        {selectedEndCityArea?.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>
                      <LoadScript googleMapsApiKey={""}>
                        <GoogleMap
                           
                          zoom={10}
                          center={defaultCenter}
                        >
                          <spain>
                            Can't find your area?
                            <a  >
                              Add Another
                            </a>
                          </spain>
                        </GoogleMap>
                      </LoadScript>
                    </Form.Group>
                  )}
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Timings (+/- 15 Minutes)
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={selectedHomeTime}
                      onChange={(e) => setSelectedHomeTime(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                            Home to Office
                        </option>
                        {homeTimeSlots?.map((time) => (
                          <option key={time.id} value={time.time_string}>
                            {time.time_string}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Drop-off Time
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={selectedOfficeTime}
                      onChange={(e) => setSelectedOfficeTime(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>
                            Office to Home
                        </option>
                        {officeTimeSlots?.map((time) => (
                          <option key={time.id} value={time.time_string}>
                            {time.time_string}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      I commute (Select Days)
                    </Form.Label>
                  </Form.Group>

                    <div className="row d-flex mt-2">
                      <div className="col">
                        {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 d-flex flex-wrap">
                            <Form.Check
                            inline
                            label="Monday"
                            name="group1"
                            type={type}
                            id={`inline-${type}-0`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Tuesday"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Wednesday"
                            type={type}
                            id={`inline-${type}-3`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Thursday"
                            type={type}
                            id={`inline-${type}-3`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Friday"
                            type={type}
                            id={`inline-${type}-3`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Saturday"
                            type={type}
                            id={`inline-${type}-3`}
                            required
                            />
                            <Form.Check
                            inline
                            label="Sunday"
                            type={type}
                            id={`inline-${type}-3`}
                            required
                            />
                        </div>
                        ))}
                    </div>
                  </div>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>Gender</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden> Gender </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Preferred Gender
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Year of Birth
                    </Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx="w">
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                           label={
                            <span style={{ color: "#198754" }}>
                              MM/DD/YY
                            </span>
                          }
                          sx={{ width: "100%" }}
                          inputProps={{ style: { color: '#198754' } }}
                          size={""}
                          required
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Martial Status
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Martial Status</option>
                      <option value="1">Married</option>
                      <option value="2">Single</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Education
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Education</option>
                      <option value="Phd">Phd</option>
                      <option value="Master">Master</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="BA">BA</option>
                      <option value="BSC">BSC</option>
                      <option value="FSC">FSC</option>
                      <option value="FA">FA</option>
                      <option value="I.Com">I.Com</option>
                      <option value="Matric">Matric</option>
                      <option value="Middle">Middle</option>
                      <option value="Primary">Primary</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Profession
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className="colorplace"
                      placeholder="Profession (Engineer, Doctor, etc)"
                      defaultValue=""
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>CNIC</Form.Label>

                    <Form.Control
                      required
                      type="number"
                      className="colorplace"
                      placeholder="xxxxxxxxxxxxx"
                      defaultValue=""
                      maxLength={13}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="6"
                    className="mb-3"
                  >
                    <Form.Label style={{ color: "#198754" }}>
                      {" "}
                      Upload CNIC (Front)
                    </Form.Label>
                    <Form.Control type="file" required />
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="6"
                    className="mb-3"
                  >
                    <Form.Label style={{ color: "#198754" }}>
                      {" "}
                      Upload CNIC (back)
                    </Form.Label>
                    <Form.Control type="file" required />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="12"
                    className="mb-3"
                  >
                    <Form.Label style={{ color: "#198754" }}>
                      Upload your picture
                    </Form.Label>
                    <Form.Control type="file" required/>
                    <Form.Text className="" style={{ color: "#198754" }}>
                      The picture will only be shown to members with whom you
                      agree to commute
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Stack
                  direction="row"
                  className="mb-4"
                  spacing={2}
                  style={{ justifyContent: "right" }}
                >
                  <Button variant="outlined" size="large" className="btnregistration" onClick={nextPage}>
                    Next
                  </Button>
                </Stack>
              </Form>
             
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
