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
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Row } from 'react-bootstrap';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleMap, LoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";
import ibn from '../../../Images/iban.png';
import easypaisa from '../../../Images/ep.png';
import jazzcash from '../../../Images/jazz.png';
import raast from '../../../Images/raast.png';

const Registration = () => {

  const navigate = useNavigate();
  const [addNewStart, setAddNewStart] = useState(false);
  const [addNewEnd, setAddNewEnd] = useState(false);
  const mapLibraries = ["places"];

  const pakistanBounds = {
    north: 37.271879,
    south: 23.634499,
    west: 60.872972,
    east: 77.84085,
  };

  const route = () => {
    navigate("/verification");
  
  };

  const AddNewStart = () => {
    setAddNewStart(true);
  };

  const AddNewEnd = () => {
    setAddNewEnd(true);
  };


  // For Registration
  const [validated, setValidated] = useState(false);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  
  // For Start Point
  const[locationStartString, setLocationStartString] = useState("");
  const[locationStartStringField, setLocationStartStringField] = useState(locationStartString);
  const [dropdownStartdata, setDropDownStartData] = useState();
  const [provinceStartId, setProvinceStartId] = useState("");
  const [selectedStartProvinceCities, setSelectedStartProvinceCities] = useState([]);
  const [cityStartId, setCityStartId] = useState("");
  const [selectedStartCityArea, setSelectedStartCityArea] = useState([]);
  
  // For End Point
  const[locationEndString, setLocationEndString] = useState("");
  const[locationEndStringField, setLocationEndStringField] = useState(locationEndString);
  const [dropdownEnddata, setDropDownEndData] = useState();
  const [provinceEndId, setProvinceEndId] = useState("");
  const [selectedEndProvinceCities, setSelectedEndProvinceCities] = useState([]);
  const [cityEndId, setCityEndId] = useState("");
  const [selectedEndCityArea, setSelectedEndCityArea] = useState([]);


  // For Start Point
  const [defaultStartCenter, setDefaultStartCenter] = useState ({ lat: 0, lng: 0 });
  const [markerPositionStart, setMarkerPositionStart] = useState({ lat: 0, lng: 0 });
  const [isMarkerSelectedStart, setIsMarkerSelectedStart] = useState(false);

  // For End Point
  const [defaultEndCenter, setDefaultEndCenter] = useState ({ lat: 0, lng: 0 });
  const [markerPositionEnd, setMarkerPositionEnd] = useState({ lat: 0, lng: 0 });
  const [isMarkerSelectedEnd, setIsMarkerSelectedEnd] = useState(false);

  // For Driver's
  const [carBrand, setCarBrand] = useState([]);
  const [selectedCarBrand, setSelectedCarBrand] = useState("");
  const [selectedModelName, setSelectedModelName] = useState("");
  const [manYear, setManYear] = useState([]);
  const [selectedManYear, setSelectedManYear] = useState("");
  const [regYear, setRegYear] = useState([]);
  const [selectedRegYear, setSelectedRegYear] = useState("");
  const [selectedRegNumber, setSelectedRegNumber] = useState("");
  const [selectedCarAC, setSelectedCarAC] = useState("");
  const [selectedCarImage, setSelectedCarImage] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [selectedSeatGender, setSelectedSeatGender] = useState("");
  const [selectedRoutePartner, setSelectedRoutePartner] = useState("");

  // For Driver Form
  const [showDriverForm, setShowDriverForm]=useState(false);
  const [showmyself, setshowmyself] = useState(false);
  const [showmydriver, setshowmydriver] = useState(false);
  const [showboth, setshowboth]=useState(false);

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
    
    if (cityStartId) {
      
      const filteredStartCities = dropdownStartdata.area.filter(
        (city) => city.parent_id == cityStartId
      );

      const citystring= selectedStartProvinceCities.filter(
        (city) => city.id == cityStartId
      );
      
      setLocationStartString(citystring[0].value);
      setSelectedStartCityArea(filteredStartCities ? filteredStartCities : []);
    }

    if (cityEndId) {
      
      const filteredEndCities = dropdownEnddata.area.filter(
        (city) => city.parent_id == cityEndId
      );
      
      const citystring= selectedEndProvinceCities.filter(
        (city) => city.id == cityEndId
      );
      
      setLocationEndString(citystring[0].value);
      setSelectedEndCityArea(filteredEndCities ? filteredEndCities : []);
    }
  }, [cityStartId, cityEndId]);

  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeStartData = async () => {
      try {

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationStartString)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );
        
        const data = await response.json(); // Parse the response as JSON
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setDefaultStartCenter({ lat, lng });
          setMarkerPositionStart({ lat, lng });
        } else {
          console.error('Geocoding API response error');
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    getGeocodeStartData();
  }, [locationStartString]);

  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeEndData = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationEndString)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );

        const data = await response.json(); // Parse the response as JSON
        if (data.status === 'OK' && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setDefaultEndCenter({ lat, lng });
          setMarkerPositionEnd({ lat, lng });
        } else {
          console.error('Geocoding API response error');
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    };

    getGeocodeEndData();
  }, [locationEndString]);

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
    setCarBrand(jsonresponse.car_brand);
    setManYear(jsonresponse.car_reg_year);
    setRegYear(jsonresponse.car_reg_year);
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

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationStartField = (e) => {
    setLocationStartStringField(e.target.value);
    setLocationStartString(e.target.value);
  };

  const handleLocationEndField = (e) => {
    setLocationEndStringField(e.target.value);
    setLocationEndString(e.target.value);
  };

  const handleMarkerClickStart = () => {
    setIsMarkerSelectedStart(true);
    alert(locationStartString);
  };

  const handleMarkerClickEnd = () => {
    setIsMarkerSelectedEnd(true);
    alert(locationEndString);
  };

  let place=[];

  const handlePlaceSelect = (place) => {
   console.log(place);
  };
  
  // console.log(locationStartString);

  // console.log(defaultStartCenter);


  
  return (
    <>
      <Navbar />
      {!showDriverForm && (
        <>
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
                        <option value="" hidden>
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
                          value={locationStartString}
                          onChange={(e) => setLocationStartString(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Area from Dropdown
                          </option>
                          {selectedStartCityArea?.map((province) => (
                            <option key={province.id} value={province.value}>
                              {province.value}
                            </option>
                          ))}
                        </Form.Select>

                        {!isMarkerSelectedStart && (
                          <div className="mt-3">
                            <span className="colorplace" style={{ cursor: 'pointer', textDecoration: 'underline'}} onClick={AddNewStart}>
                                Can't find your area?
                                <a  >
                                {" "} Add Here
                                </a>
                            </span>
                          </div>
                        )}

                        {addNewStart && (
                          <Row className="mb-3 mt-4">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                              <Autocomplete
                                //onLoad={onLoad}
                                // onLoad={onSBLoad}
                                //onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                //onPlaceChanged={(e) => handlePlaceSelect(e.getPlace())}
                                //onPlaceChanged={(e) => console.log(e)}
                                //onPlaceChanged={(e) => setLocationStartString(e)}
                                restrictions={{ country: 'PK' }}
                                options={{ strictBounds: true }}
                              >
                                <Form.Control
                                  autoComplete="on"
                                  required
                                  type="text"
                                  value={locationStartStringField}
                                  onChange={handleLocationStartField}
                                  className="colorplace"
                                  placeholder="Enter your area"
                                  autocomplete="on"
                                  defaultValue=""
                                />
                              </Autocomplete>
                            </Form.Group>
                          </Row> 
                        )}
                      </Form.Group>
                    )}
                  </Row>
                  
                  {/* {locationStartStringField}
                  {locationStartString} */}
                  
                  {cityStartId && !isMarkerSelectedStart &&
                    <Container
                      className="d-flex justify-content-center align-items-center mb-3">
                      <Row style={{ height: "80%", width: "80%" }}>
                        <LoadScript googleMapsApiKey={"AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA"} libraries={mapLibraries} >
                          <GoogleMap 
                            zoom={14} 
                            center={defaultStartCenter} 
                            mapContainerStyle={{  width: "100%" ,height: "50vh"}}
                            options={{ 
                              types: ['(regions)'],
                              componentRestrictions: {country: "PK"} 
                            }}  
                          >
                          <MarkerF position={markerPositionStart} onClick={handleMarkerClickStart} />
                          </GoogleMap>
                        </LoadScript>
                      </Row>
                    </Container>
                  }

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
                    <Form.Label style={{ color: "#198754" }}>
                        Select City
                    </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                        value={cityEndId}
                        onChange={(e) => setCityEndId(e.target.value)}
                        required
                      >
                        <option value="" hidden>
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
                          value={locationEndString}
                          onChange={(e) => setLocationEndString(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Area from Dropdown
                          </option>
                          {selectedEndCityArea?.map((province) => (
                            <option key={province.id} value={province.value}>
                              {province.value}
                            </option>
                          ))}
                        </Form.Select>
                        
                        <div className="mt-3">
                            <span className="colorplace" style={{ cursor: 'pointer', textDecoration: 'underline'}} onClick={AddNewEnd}>
                                Can't find your area?
                                <a  >
                                {" "} Add Here
                                </a>
                            </span>
                        </div>

                        {addNewEnd &&  (
                          <Row className="mb-3 mt-4">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                              <Autocomplete
                                //onLoad={onLoad}
                                // onLoad={onSBLoad}
                                //onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                //onPlaceChanged={(e) => handlePlaceSelect(e.getPlace())}
                                //onPlaceChanged={(e) => console.log(e)}
                                //onPlaceChanged={(e) => setLocationStartString(e)}
                                restrictions={{ country: 'PK' }}
                                options={{ strictBounds: true }}
                              >
                                <Form.Control
                                  required
                                  type="text"
                                  value={locationEndStringField}
                                  onChange={handleLocationEndField}
                                  className="colorplace"
                                  placeholder="Enter your area"
                                  defaultValue=""
                                />
                              </Autocomplete>
                            </Form.Group>
                          </Row> 
                        )}
                      </Form.Group>
                    )}
                  </Row>

                  {cityEndId && !isMarkerSelectedEnd &&
                    <Container
                      className="d-flex justify-content-center align-items-center mb-3">
                      <Row style={{ height: "80%", width: "80%" }}>
                        <LoadScript googleMapsApiKey={"AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA"}>
                          <GoogleMap 
                            zoom={14} 
                            center={defaultEndCenter} 
                            mapContainerStyle={{  width: "100%" ,height: "50vh"}}
                          >
                            <MarkerF position={markerPositionEnd} onClick={handleMarkerClickEnd} />
                          </GoogleMap>
                        </LoadScript>
                      </Row>
                    </Container>
                  }

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
                        <option value="" hidden>
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
                              value={type}
                              id={`inline-${type}-0`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Tuesday"
                              name="group1"
                              type={type}
                              value={type}
                              id={`inline-${type}-2`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Wednesday"
                              type={type}
                              value={type}
                              id={`inline-${type}-3`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Thursday"
                              type={type}
                              value={type}
                              id={`inline-${type}-3`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Friday"
                              type={type}
                              value={type}
                              id={`inline-${type}-3`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Saturday"
                              type={type}
                              value={type}
                              id={`inline-${type}-3`}
                              required
                              />
                              <Form.Check
                              inline
                              label="Sunday"
                              type={type}
                              value={type}
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
                    <Button 
                      variant="outlined" 
                      size="large" 
                      className="btnregistration" 
                      onClick={() => {
                            setShowDriverForm(true);
                          
                      }}>
                      Next
                    </Button>
                  </Stack>
                </Form>
              
              </div>
            </div>
          </div>
        </div>

        </>
      )}

      {showDriverForm && (
          <>
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
                    {" "}
                    Driver's Registration Form
                  </h1>{" "}
                  <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#198754" }}>
                          Car Brand
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedCarBrand}
                          onChange={(e) => setSelectedCarBrand(e.target.value)}
                          required
                        >
                          <option value="" hidden>Car Brand</option>

                          {carBrand?.map((car) => (
                            <option key={car.id} value={car.brand_name}>
                              {car.brand_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#198754" }}>
                          Model Name
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className="colorplace"
                          value={selectedModelName}
                          onChange={(e) => setSelectedModelName(e.target.value)}
                          placeholder="Car Model"
                          defaultValue=""
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#198754" }}>
                          Manufacturing Year
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedManYear}
                          onChange={(e) => setSelectedManYear(e.target.value)}
                          required
                        >
                          <option value="" hidden>Manufacturing Year</option>
                          {manYear?.map((man) => (
                            <option key={man.id} value={man.car_year_ranges}>
                              {man.car_year_ranges}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#198754" }}>
                          Registration Year
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedRegYear}
                          onChange={(e) => setSelectedRegYear(e.target.value)}
                          required
                        >
                          <option value="" hidden>Registration Year</option>
                          {regYear?.map((reg) => (
                            <option key={reg.id} value={reg.car_year_ranges}>
                              {reg.car_year_ranges}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row className="mb-0">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#198754" }}>
                          Registeration Number
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className="colorplace"
                          value={selectedRegNumber}
                          onChange={(e) => setSelectedRegNumber(e.target.value)}
                          placeholder="Registeration Number"
                          defaultValue=""
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#198754" }}>
                          My Car has AC
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedCarAC}
                          onChange={(e) => setSelectedCarAC(e.target.value)}
                          required
                        >
                          <option value="" hidden>AC</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        controlId="formFile"
                        as={Col}
                        md="12"
                        className="mb-3"
                      >
                        <Form.Label className="mt-3" style={{ color: "#198754" }}>
                          Upload Car Image with visible number plate
                        </Form.Label>
                        <Form.Control 
                          type="file"
                          accept="image/*"  
                          onChange={handleImageSelect}
                          required 
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#198754" }}>
                          Seats Available
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedSeat}
                          onChange={(e) => setSelectedSeat(e.target.value)}
                          required
                        >
                          <option value="" hidden>Seats Available</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#198754" }}>
                          Seats Available for (Male, Female, Both)
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedSeatGender}
                          onChange={(e) => setSelectedSeatGender(e.target.value)}
                          required
                        >
                          <option value="" hidden>Seats Available</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#198754" }}>
                          I also accept mid-route partner
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#198754" }}
                          value={selectedRoutePartner}
                          onChange={(e) => setSelectedRoutePartner(e.target.value)}
                          required
                        >
                          <option value="" hidden>I also accept mid-route partner</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <div className="tab">
                        <div className="container">
                          <div className="row justify-content-center mt-5">
                            <div className="col-lg-12">
                              <div className="card text-center" >
                                <div className="card-body">
                                  <h5 className="card-title">Bank/Payment Details</h5>
                                  <p className="small-text text-center">Please provide details to receive payment through Bank Account, Jazz Cash, EasyPaisa or Raast ID. Atleast one field must be filled. </p>
                                    <div class="container">
                                    <img src={ibn} alt=""/> <img src={easypaisa} alt=""/> <img src={jazzcash} alt=""/> <img src={raast} alt=""/>
                                    </div>
                                    <form id="paymentForm">
                                    <div className="mt-4">
                                      <input type="text" className="form-control mb-2 colorplace" id="bankAccount" name="bankAccount" placeholder="Bank Account (IBAN)" required=""/>
                                    </div>
                                    <div>
                                      <input type="text" className="form-control mb-2 colorplace" id="jazzCashAccount" name="jazzCashAccount" placeholder="Jazz Cash Account Number" required=""/>
                                    </div>
                                    <div>
                                      <input type="text" className="form-control mb-2 colorplace" id="easypaisaAccount" name="easypaisaAccount" placeholder="EasyPaisa Account Number" required=""/>
                                    </div>
                                    <div>
                                      <input type="text" className="form-control mb-2 colorplace" id="raastID" name="raastID" placeholder="Raast ID"/>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>    
                      </div>
                    <div className="row">
                      <div className="col">
                        <div className="container text-center d-flex justify-content-center pt-2 flex-wrap">
                          <Button
                            variant="outlined"
                            className={`btn ${showmyself === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                            onClick={() => {
                              setshowmyself(true);
                              setshowmydriver(false);
                              setshowboth(false);
                            }}
                            data-toggle="buttons"
                          >
                            I Driver MySelf
                          </Button>
                          <Button
                            variant="outlined"
                            className={`btn ${showmydriver === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                            onClick={() => {
                              setshowmyself(false);
                              setshowmydriver(true);
                              setshowboth(false);
                            }}
                            data-toggle="buttons"
                          >
                            My Driver Drives
                          </Button>
                          <Button
                            variant="outlined"
                            className={`btn ${showboth === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                            onClick={() => {
                              setshowmydriver(false);
                              setshowmyself(false);
                              setshowboth(true);
                            }}
                            data-toggle="buttons"
                          >
                            Both
                          </Button>
                        </div>
                      </div>
                    </div>

                    {showmyself && (
                      <>
                        <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Driving Licence No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="License No."
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Valid Upto
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                        </Row>
                      </>
                    )}

                    {showmydriver && (
                      <>
                        <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Name"
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              CNIC
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="CNIC: xxxxxxxxxxxxx"
                              defaultValue=""
                              maxLength={13}
                            />
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload CNIC (front)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload CNIC (back)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Driving Licence No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="License No."
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Valid Upto
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                        </Row>
                      </>
                    )}
                    {showboth && (<>
                        <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Name"
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              CNIC
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="CNIC: xxxxxxxxxxxxx"
                              defaultValue=""
                              maxLength={13}
                            />
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload CNIC (front)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload CNIC (back)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Driving Licence No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="License No."
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Valid Upto
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#198754" }}>
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" required />
                          </Form.Group>
                        </Row>

                    </>)
                    }
                    <Stack
                      direction="row"
                      className="mb-4 mt-3"
                      spacing={2}
                      style={{ justifyContent: "right" }}
                    >
                      <Button 
                        variant="" 
                        className="btnregistration"  
                        onClick={() => {
                          setShowDriverForm(false);
                          
                        }}
                      >
                        Previous
                      </Button>
                      <Button variant="" className="btnregistration" onClick={route}>
                        Submit
                      </Button>
                    </Stack>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </> 
      )}

      <Footer />
    </>
  );
};

export default Registration;