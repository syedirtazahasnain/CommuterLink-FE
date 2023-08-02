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
import { Link } from "react-router-dom";
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
  const [validated, setValidated] = useState(false);
  const [dropdowndata, setDropDownData] = useState();
  const [startingProvinceId, setStartingProvinceId] = useState("");
  const [startingSelectedProvinceCities, setstartingSelectedProvinceCities] = useState([]);
  const [startingCityId, setStartingCityId] = useState("");
  const [StartingSelectedCityArea, setStartingSelectedCityArea] = useState([]);
  const [dropOffProvinceId, setDropOffProvinceId] = useState("");
  const [dropOffSelectedProvinceCities, setDropOffSelectedProvinceCities] = useState([]);
  const [dropOffCityId, setDropOffCityId] = useState("");
  const [dropOffSelectedCityArea, setDropOffSelectedCityArea] = useState([]);

  const [defaultCenter, setDefaultCenter] = useState({ lat: 0, lng: 0 });
  const [locationString , setLocationString] = useState("Islamabad")

  useEffect(() => {
    getdropdowndata();
  }, []);

  useEffect(() => {
    if (startingProvinceId) {
      const selectedProvince = dropdowndata?.countries[0]?.provinces.find(
        (province) => province.id == startingProvinceId
      );
      setstartingSelectedProvinceCities(
        selectedProvince ? selectedProvince.cities : []
      );
    }
  }, [startingProvinceId]);

  useEffect(() => {
    if (startingCityId) {
      const filteredCities = dropdowndata.area.filter(
        (city) => city.parent_id == startingCityId
      );
      const citystring= startingSelectedProvinceCities.filter(
        (city) => city.id == startingCityId
      );
     
      setLocationString(citystring[0].value)
      setStartingSelectedCityArea(filteredCities ? filteredCities : []);
    }
  }, [startingCityId]);

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

  const getdropdowndata = async () => {
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
    setDropDownData(jsonresponse);
    console.log("jsonresponse", jsonresponse);
  };

  const handleProvinceChange = (event) => {
    setStartingProvinceId(event.target.value);
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
        <div className="containter">
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
                {" "}
                Registration
              </h1>{" "}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}  md={startingCityId ? '4' : '6'} controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Starting Point
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={startingProvinceId}
                      onChange={handleProvinceChange}
                    >
                      <option value="" disabled hidden>
                        Select a Starting Point
                      </option>
                      {dropdowndata?.countries[0]?.provinces?.map(
                        (province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={startingCityId ? '4' : '6'} controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Select City
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      value={startingCityId}
                      onChange={(e) => setStartingCityId(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select a city
                      </option>
                      {startingSelectedProvinceCities?.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {startingCityId && (
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label style={{ color: "#198754" }}>
                        Select Area from Dropdown
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                      >
                        <option value="" disabled hidden>
                          Select Area from Dropdown
                        </option>
                        {StartingSelectedCityArea?.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>

                      <spain>
                        Can't find your area?
                        <a>Add Another</a>
                      </spain>
                    </Form.Group>
                  )}
                </Row>
                {startingCityId &&  <Container
                  className="d-flex justify-content-center align-items-center">
                  <Row style={{ height: "80%", width: "80%" }}>
                    <LoadScript googleMapsApiKey={"AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA"}>
                      <GoogleMap zoom={10} center={defaultCenter} mapContainerStyle={{  width: "100%" ,height: "50vh"}}>
                        Map
                      </GoogleMap>
                    </LoadScript>
                  </Row>
                </Container>}
                
                <Row className="mb-3">
                  <Form.Group as={Col} md={dropOffCityId ? '4' : '6'} controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Drop Off
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                    >
                      <option value="0">Province</option>
                      <option value="1">Punjab</option>
                      <option value="2">Sindh</option>
                      <option value="3">KPK</option>
                      <option value="3">Balochistan</option>
                      <option value="3">AJK</option>
                      <option value="3">Gilgit Baltistan</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={dropOffCityId ? '4' : '6'} controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Select City
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                    >
                      <option value="0">Choose City</option>
                      <option value="1">AJK</option>
                      <option value="2">Balochistan</option>
                      <option value="3">Gilgit Baltistan</option>
                      <option value="3">KPK</option>
                      <option value="3">Punjab</option>
                      <option value="3">Sindh</option>
                    </Form.Select>
                  </Form.Group>
                  {dropOffCityId && (
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label style={{ color: "#198754" }}>
                        Select Area from Dropdown
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                      >
                        <option value="" disabled hidden>
                          Select Area from Dropdown
                        </option>
                        {StartingSelectedCityArea?.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>

                      <spain>
                        Can't find your area?
                        <a>Add Another</a>
                      </spain>
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
                    >
                      <option value="0">Home to Office</option>

                      <option value="9:00 AM">00:00 AM</option>
                      <option value="10:00 AM">00:15 AM</option>
                      <option value="11:00 AM">00:30 AM</option>
                      <option value="12:00 PM">00:45 AM</option>
                      <option value="1:00 PM">01:00 AM</option>
                      <option value="2:00 PM">01:15 AM</option>
                      <option value="3:00 PM">01:30 AM</option>
                      <option value="4:00 PM">01:45 AM</option>
                      <option value="5:00 PM">02:00 AM</option>
                      <option value="6:00 PM">02:30 AM</option>
                      <option value="6:00 PM">02:45 AM</option>
                      <option value="6:00 PM">03:00 AM</option>
                      <option value="6:00 PM">03:15 AM</option>
                      <option value="6:00 PM">03:30 AM</option>
                      <option value="6:00 PM">03:45 AM</option>
                      <option value="6:00 PM">04:00 AM</option>
                      <option value="6:00 PM">04:15 AM</option>
                      <option value="6:00 PM">04:30 AM</option>
                      <option value="6:00 PM">04:45 AM</option>
                      <option value="6:00 PM">05:00 AM</option>
                      <option value="6:00 PM">05:15 AM</option>
                      <option value="6:00 PM">05:30 AM</option>
                      <option value="6:00 PM">05:45 AM</option>
                      <option value="6:00 PM">06:00 AM</option>
                      <option value="6:00 PM">06:15 AM</option>
                      <option value="6:00 PM">06:30 AM</option>
                      <option value="6:00 PM">06:45 AM</option>
                      <option value="6:00 PM">07:00 AM</option>
                      <option value="6:00 PM">07:15 AM</option>
                      <option value="6:00 PM">07:30 AM</option>
                      <option value="6:00 PM">07:45 AM</option>
                      <option value="6:00 PM">08:00 AM</option>
                      <option value="6:00 PM">08:15 AM</option>
                      <option value="6:00 PM">08:30 AM</option>
                      <option value="6:00 PM">08:45 AM</option>
                      <option value="6:00 PM">09:00 AM</option>
                      <option value="6:00 PM">09:15 AM</option>
                      <option value="6:00 PM">09:30 AM</option>
                      <option value="6:00 PM">09:45 AM</option>
                      <option value="6:00 PM">10:00 AM</option>
                      <option value="6:00 PM">10:15 AM</option>
                      <option value="6:00 PM">10:30 AM</option>
                      <option value="6:00 PM">10:45 AM</option>
                      <option value="6:00 PM">11:00 AM</option>
                      <option value="6:00 PM">11:15 AM</option>
                      <option value="6:00 PM">11:30 AM</option>
                      <option value="6:00 PM">11:45 AM</option>
                      <option value="6:00 PM">12:00 PM</option>
                      <option value="6:00 PM">12:15 PM</option>
                      <option value="6:00 PM">12:30 PM</option>
                      <option value="6:00 PM">12:45 PM</option>
                      <option value="6:00 PM">01:00 PM</option>
                      <option value="2:00 PM">01:15 PM</option>
                      <option value="3:00 PM">01:30 PM</option>
                      <option value="4:00 PM">01:45 PM</option>
                      <option value="5:00 PM">02:00 PM</option>
                      <option value="6:00 PM">02:30 PM</option>
                      <option value="6:00 PM">02:45 PM</option>
                      <option value="6:00 PM">03:00 PM</option>
                      <option value="6:00 PM">03:15 PM</option>
                      <option value="6:00 PM">03:30 PM</option>
                      <option value="6:00 PM">03:45 PM</option>
                      <option value="6:00 PM">04:00 PM</option>
                      <option value="6:00 PM">04:15 PM</option>
                      <option value="6:00 PM">04:30 PM</option>
                      <option value="6:00 PM">04:45 PM</option>
                      <option value="6:00 PM">05:00 PM</option>
                      <option value="6:00 PM">05:15 PM</option>
                      <option value="6:00 PM">05:30 PM</option>
                      <option value="6:00 PM">05:45 PM</option>
                      <option value="6:00 PM">06:00 PM</option>
                      <option value="6:00 PM">06:15 PM</option>
                      <option value="6:00 PM">06:30 PM</option>
                      <option value="6:00 PM">06:45 PM</option>
                      <option value="6:00 PM">07:00 PM</option>
                      <option value="6:00 PM">07:15 PM</option>
                      <option value="6:00 PM">07:30 PM</option>
                      <option value="6:00 PM">07:45 PM</option>
                      <option value="6:00 PM">08:00 PM</option>
                      <option value="6:00 PM">08:15 PM</option>
                      <option value="6:00 PM">08:30 PM</option>
                      <option value="6:00 PM">08:45 PM</option>
                      <option value="6:00 PM">09:00 PM</option>
                      <option value="6:00 PM">09:15 PM</option>
                      <option value="6:00 PM">09:30 PM</option>
                      <option value="6:00 PM">09:45 PM</option>
                      <option value="6:00 PM">10:00 PM</option>
                      <option value="6:00 PM">10:15 PM</option>
                      <option value="6:00 PM">10:30 PM</option>
                      <option value="6:00 PM">10:45 PM</option>
                      <option value="6:00 PM">11:00 PM</option>
                      <option value="6:00 PM">11:15 PM</option>
                      <option value="6:00 PM">11:30 PM</option>
                      <option value="6:00 PM">11:45 PM</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Drop-off Time
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                    >
                      <option value="0">Office to Home</option>

                      <option value="9:00 AM">00:00 AM</option>
                      <option value="10:00 AM">00:15 AM</option>
                      <option value="11:00 AM">00:30 AM</option>
                      <option value="12:00 PM">00:45 AM</option>
                      <option value="1:00 PM">01:00 AM</option>
                      <option value="2:00 PM">01:15 AM</option>
                      <option value="3:00 PM">01:30 AM</option>
                      <option value="4:00 PM">01:45 AM</option>
                      <option value="5:00 PM">02:00 AM</option>
                      <option value="6:00 PM">02:30 AM</option>
                      <option value="6:00 PM">02:45 AM</option>
                      <option value="6:00 PM">03:00 AM</option>
                      <option value="6:00 PM">03:15 AM</option>
                      <option value="6:00 PM">03:30 AM</option>
                      <option value="6:00 PM">03:45 AM</option>
                      <option value="6:00 PM">04:00 AM</option>
                      <option value="6:00 PM">04:15 AM</option>
                      <option value="6:00 PM">04:30 AM</option>
                      <option value="6:00 PM">04:45 AM</option>
                      <option value="6:00 PM">05:00 AM</option>
                      <option value="6:00 PM">05:15 AM</option>
                      <option value="6:00 PM">05:30 AM</option>
                      <option value="6:00 PM">05:45 AM</option>
                      <option value="6:00 PM">06:00 AM</option>
                      <option value="6:00 PM">06:15 AM</option>
                      <option value="6:00 PM">06:30 AM</option>
                      <option value="6:00 PM">06:45 AM</option>
                      <option value="6:00 PM">07:00 AM</option>
                      <option value="6:00 PM">07:15 AM</option>
                      <option value="6:00 PM">07:30 AM</option>
                      <option value="6:00 PM">07:45 AM</option>
                      <option value="6:00 PM">08:00 AM</option>
                      <option value="6:00 PM">08:15 AM</option>
                      <option value="6:00 PM">08:30 AM</option>
                      <option value="6:00 PM">08:45 AM</option>
                      <option value="6:00 PM">09:00 AM</option>
                      <option value="6:00 PM">09:15 AM</option>
                      <option value="6:00 PM">09:30 AM</option>
                      <option value="6:00 PM">09:45 AM</option>
                      <option value="6:00 PM">10:00 AM</option>
                      <option value="6:00 PM">10:15 AM</option>
                      <option value="6:00 PM">10:30 AM</option>
                      <option value="6:00 PM">10:45 AM</option>
                      <option value="6:00 PM">11:00 AM</option>
                      <option value="6:00 PM">11:15 AM</option>
                      <option value="6:00 PM">11:30 AM</option>
                      <option value="6:00 PM">11:45 AM</option>
                      <option value="6:00 PM">12:00 PM</option>
                      <option value="6:00 PM">12:15 PM</option>
                      <option value="6:00 PM">12:30 PM</option>
                      <option value="6:00 PM">12:45 PM</option>
                      <option value="6:00 PM">01:00 PM</option>
                      <option value="2:00 PM">01:15 PM</option>
                      <option value="3:00 PM">01:30 PM</option>
                      <option value="4:00 PM">01:45 PM</option>
                      <option value="5:00 PM">02:00 PM</option>
                      <option value="6:00 PM">02:30 PM</option>
                      <option value="6:00 PM">02:45 PM</option>
                      <option value="6:00 PM">03:00 PM</option>
                      <option value="6:00 PM">03:15 PM</option>
                      <option value="6:00 PM">03:30 PM</option>
                      <option value="6:00 PM">03:45 PM</option>
                      <option value="6:00 PM">04:00 PM</option>
                      <option value="6:00 PM">04:15 PM</option>
                      <option value="6:00 PM">04:30 PM</option>
                      <option value="6:00 PM">04:45 PM</option>
                      <option value="6:00 PM">05:00 PM</option>
                      <option value="6:00 PM">05:15 PM</option>
                      <option value="6:00 PM">05:30 PM</option>
                      <option value="6:00 PM">05:45 PM</option>
                      <option value="6:00 PM">06:00 PM</option>
                      <option value="6:00 PM">06:15 PM</option>
                      <option value="6:00 PM">06:30 PM</option>
                      <option value="6:00 PM">06:45 PM</option>
                      <option value="6:00 PM">07:00 PM</option>
                      <option value="6:00 PM">07:15 PM</option>
                      <option value="6:00 PM">07:30 PM</option>
                      <option value="6:00 PM">07:45 PM</option>
                      <option value="6:00 PM">08:00 PM</option>
                      <option value="6:00 PM">08:15 PM</option>
                      <option value="6:00 PM">08:30 PM</option>
                      <option value="6:00 PM">08:45 PM</option>
                      <option value="6:00 PM">09:00 PM</option>
                      <option value="6:00 PM">09:15 PM</option>
                      <option value="6:00 PM">09:30 PM</option>
                      <option value="6:00 PM">09:45 PM</option>
                      <option value="6:00 PM">10:00 PM</option>
                      <option value="6:00 PM">10:15 PM</option>
                      <option value="6:00 PM">10:30 PM</option>
                      <option value="6:00 PM">10:45 PM</option>
                      <option value="6:00 PM">11:00 PM</option>
                      <option value="6:00 PM">11:15 PM</option>
                      <option value="6:00 PM">11:30 PM</option>
                      <option value="6:00 PM">11:45 PM</option>
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
                    <div className="col-md-6 col-sm-4">
                      {["checkbox"].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 d-flex">
                          <Form.Check
                            inline
                            label="Monday"
                            name="group1"
                            type={type}
                            id={`inline-${type}-0`}
                          />
                          <Form.Check
                            inline
                            label="Tuesday"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                          />
                          <Form.Check
                            inline
                            label="Wednesday"
                            type={type}
                            id={`inline-${type}-3`}
                          />
                          <Form.Check
                            inline
                            label="Thursday"
                            type={type}
                            id={`inline-${type}-3`}
                          />
                          <Form.Check
                            inline
                            label="Friday"
                            type={type}
                            id={`inline-${type}-3`}
                          />
                          <Form.Check
                            inline
                            label="Saturday"
                            type={type}
                            id={`inline-${type}-3`}
                          />
                          <Form.Check
                            inline
                            label="Sunday"
                            type={type}
                            id={`inline-${type}-3`}
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
                    >
                      <option value="0">Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Preferred Gender
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Both</option>
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
                          label="MM/DD/YY"
                          sx={{ width: "100%" }}
                          size={""}
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
                    >
                      <option value="">Martial Status</option>
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
                    >
                      <option value="0">Education</option>
                      <option value="1">Phd</option>
                      <option value="2">Master</option>
                      <option value="3">Bachelor</option>
                      <option value="4">BA</option>
                      <option value="5">BSC</option>
                      <option value="6">FSC</option>
                      <option value="7">FA</option>
                      <option value="8">I.Com</option>
                      <option value="9">Matric</option>
                      <option value="10">Middle</option>
                      <option value="11">Primary</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Profession
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
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
                    <Form.Control type="file" />
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
                    <Form.Control type="file" />
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
                    <Form.Control type="file" />
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
                  <Button variant="" className="btnregistration">
                    Previous
                  </Button>
                  <Button variant="" className="btnregistration">
                    Next
                  </Button>{" "}
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
