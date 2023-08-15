import React, { useEffect, useRef } from "react";
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
// import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Row,  Modal } from 'react-bootstrap';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleMap, LoadScript, Autocomplete, MarkerF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RiderRegistration = () => {

  // const option0 = useSelector((s) => s.general.data.option0);
  // console.log(option0);

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const userToken = useSelector((s) => s.login.data.token);
  const [addNewStart, setAddNewStart] = useState(false);
  const [addNewEnd, setAddNewEnd] = useState(false);
  const [daysSelected, setDaysSelected] = useState([]);
  const mapLibraries = ["places"];

  const [isValidProfession, setIsValidProfession] = useState(true);

  const route = () => {
    navigate("/verification");
  
  };

  const AddNewStart = () => {
    setAddNewStart(true);
  };

  const AddNewEnd = () => {
    setAddNewEnd(true);
  };
  function validateProfession(profession) {
    // A simple regular expression to match alphabetic characters and spaces
    const professionPattern = /^[A-Za-z\s]+$/;
  
    return professionPattern.test(profession);
  }
  const handleProfessionChange = (e) => {
    const newProfession = e.target.value;
    setProfession(newProfession);
    setIsValidProfession(validateProfession(newProfession));
  };

  function validateCnic(cnic) {
    // Regular expression pattern for validating Pakistani CNIC (12345-1234567-1)
    const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  
    return cnicPattern.test(cnic);
  }
  const handleCnicChange = (event) => {
    const inputCnic = event.target.value.replace(/\D/g, '');

    if (inputCnic.length <= 13) {
      const formattedCnic = inputCnic.replace(
        /^(\d{5})(\d{7})(\d{1})$/,
        '$1-$2-$3'
      );
      setCnic(formattedCnic);
      setIsValidCnic(validateCnic(formattedCnic));
    } else {
      setIsValidCnic(false);
    }
  };
  // For Registration
  const [validated, setValidated] = useState(false);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  const [gender, setGender] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedDateFormat = selectedDate ? selectedDate.format('DD-MM-YYYY') : '';
  const [martialStatus, setMartialStatus] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [cnic, setCnic] = useState("");
  const [isValidCnic, setIsValidCnic] = useState(true);
  const [cnicFront, setCnicFront] = useState("");
  const [cnicFrontExt, setCnicFrontExt] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [cnicBackExt, setCnicBackExt] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureExt, setPictureExt] = useState("");
  
  // For Start Point
  const[locationStartString, setLocationStartString] = useState("");
  const[locationStartStringId, setLocationStartStringId] = useState("");
  const[locationStartStringField, setLocationStartStringField] = useState(locationStartString);
  const [dropdownStartdata, setDropDownStartData] = useState();
  const [provinceStartId, setProvinceStartId] = useState("");
  const [selectedStartProvinceCities, setSelectedStartProvinceCities] = useState([]);
  const [cityStartId, setCityStartId] = useState("");
  const [selectedStartCityArea, setSelectedStartCityArea] = useState([]);
  
  // For End Point
  const[locationEndString, setLocationEndString] = useState("");
  const[locationEndStringId, setLocationEndStringId] = useState("");
  const[locationEndStringField, setLocationEndStringField] = useState(locationEndString);
  const [dropdownEnddata, setDropDownEndData] = useState();
  const [provinceEndId, setProvinceEndId] = useState("");
  const [selectedEndProvinceCities, setSelectedEndProvinceCities] = useState([]);
  const [cityEndId, setCityEndId] = useState("");
  const [selectedEndCityArea, setSelectedEndCityArea] = useState([]);


  // For Start Point
  const [defaultStartCenter, setDefaultStartCenter] = useState ({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionStart, setMarkerPositionStart] = useState({ lat: 30.3753, lng: 69.3451 });

  // For End Point
  const [defaultEndCenter, setDefaultEndCenter] = useState ({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionEnd, setMarkerPositionEnd] = useState({ lat: 30.3753, lng: 69.3451 });

  // For Modals
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);


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
  }, [provinceStartId]);


  useEffect(() => {

    if (provinceEndId) {
      const selectedEndProvince = dropdownEnddata?.countries[0]?.provinces.find(
        (province) => province.id == provinceEndId
      );
      setSelectedEndProvinceCities(
        selectedEndProvince ? selectedEndProvince.cities : []
      );
    }
  }, [provinceEndId]);

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
  }, [cityStartId]);

  useEffect(() => {

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
  }, [cityEndId]);

  //console.log(locationEndString);

  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeStartData = async () => {
      try {

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationStartString)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );
        
        const data = await response.json(); // Parse the response as JSON
        console.log(data);
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
    //console.log(jsonresponse);
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

  const handleLocationStart = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedId = selectedOption.getAttribute("data-id");
    setLocationStartString(selectedValue);
    setLocationStartStringId(selectedId);
    handleShowStartModal();
  };

  const handleLocationStartField = (e) => {
    setLocationStartStringField(e.target.value);
    setLocationStartString(e.target.value);
  };

  const handlePlaceSelectStart = () => {
    
    const place = autocompleteRef.current.getPlace();
    // Handle the selected place here, you can update the state with the selected place value.
    if (place && place.geometry && place.geometry.location) {
    setMarkerPositionStart({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setLocationStartStringField(place.formatted_address);
    setLocationStartString(place.formatted_address);
    handleShowStartModal();
    }
  };

  const handleLocationEnd = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedId = selectedOption.getAttribute("data-id");
    setLocationEndString(selectedValue);
    setLocationEndStringId(selectedId);
    handleShowEndModal();
  };

  const handleLocationEndField = (e) => {
    setLocationEndStringField(e.target.value);
    setLocationEndString(e.target.value);
  };

  const handlePlaceSelectEnd = () => {
    
    const place = autocompleteRef.current.getPlace();
    // Handle the selected place here, you can update the state with the selected place value.
    if (place && place.geometry && place.geometry.location) {
      setMarkerPositionEnd({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setLocationEndStringField(place.formatted_address);
      setLocationEndString(place.formatted_address);
      handleShowEndModal();
    }
  };

  const handleMapClickStart = (event) => {
    console.log(event);
    setMarkerPositionStart({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  console.log("Start Marker:", markerPositionStart);

  const handleMapClickEnd = (event) => {
    console.log(event);
    setMarkerPositionEnd({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  console.log("End Marker:", markerPositionEnd);

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

  const handleDateChange = (newDate) => {
    if (newDate) {
      const newDateObject = dayjs(newDate);
      setSelectedDate(newDateObject);
    }
  };


  const handleCnicFront = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCnicFront(reader.result);
        setCnicFrontExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log("Front Image:", cnicFront);
  // console.log("Front Image Extension:", cnicFrontExt);

  const handleCnicBack = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCnicBack(reader.result);
        setCnicBackExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  //console.log("Back Image:", cnicBack);
  //console.log("Back Image Extension:", cnicBackExt);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPicture(reader.result);
        setPictureExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log("Picture:", picture);
  // console.log("Picture Extension:", pictureExt);
  
  // For Modal Open & Close Functionality

  const handleShowStartModal = () => {
    setShowStartModal(true);
  };
  
  const handleCloseStartModal = () => {
    setShowStartModal(false);
  };
  
  const handleShowEndModal = () => {
    setShowEndModal(true);
  };
  
  const handleCloseEndModal = () => {
    setShowEndModal(false);
  };
  

  const handleLogin = async () => {
    await LocationForm();
    await PersonalForm();
    await ImagesFormCnicFront();
    await ImagesFormCnicBack();
    await ImagesFormPicture();
  };

  const LocationForm = async () => {
    try {
      let nameArrayStart = [markerPositionStart.lat, markerPositionStart.lng];
      const myStringStart = nameArrayStart.toString();
      let nameArrayEnd = [markerPositionEnd.lat, markerPositionEnd.lng];
      const myStringEnd = nameArrayEnd.toString();
      const body = {
        option : 0,
        user_type : 299,
        university_name : null,
        university_address : null,
        veh_option : 0 ,
        start_point : {
          city_id : cityStartId,
          province_id : provinceStartId,
          area_id: locationStartStringId,
          area_google : {
              name : locationStartString,
              place_id : "ddChIJGQ_wq43t3zgRel4CwxgjgQs",
          },

          name : myStringStart,
          // "land_mark" : "Eagle Chowk"
       },
       end_point: {
           city_id : cityEndId,
           province_id : provinceEndId,
           area_id: locationEndStringId,
           area_google :{
           name : locationEndString,
           place_id : "ChIJGQ_wq43t3zgRel4CwxgjgQs"
           },
           name : myStringEnd,
          //  "land_mark" : "Clock Tower"
       },
       time:{
           start_time_id : selectedHomeTime,
           return_time_id: selectedOfficeTime,
       },
       days: daysSelected,
  }
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/registration/location",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Location Form Body:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log("Location Form Response:", jsonresponse);
        } else {
          alert("Error: " + jsonresponse.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const PersonalForm = async () => {
    try {
      const body = {
        marital_status : martialStatus,
        cnic: cnic,
        birth_year : selectedDateFormat,
        gender : gender,
        preferred_gender : preferredGender,
        profession : profession,
        education : education,
        interests : null,
        university_address : null,
        university_name : null,
        user_type : 299
    }
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/registration/personal",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Personal Form Body:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log("Personal Form Response:", jsonresponse);
        } else {
          alert("Error: " + jsonresponse.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ImagesFormCnicFront = async () => {
    try {
      const body = {
        cnic_front_image_ext: cnicFrontExt,
        cnic_front_image: cnicFront,
    }
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/registration/store-images/cnic_front",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Images Form Body Cnic Front:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log("Images Form Response Cnic Front:", jsonresponse);
        } else {
          alert("Error: " + jsonresponse.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ImagesFormCnicBack = async () => {
    try {
      const body = {
        cnic_back_image_ext: cnicBackExt,
        cnic_back_image: cnicBack,
    }
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/registration/store-images/cnic_back",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Images Form Body Cnic Back:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log("Images Form Response Cnic Back:", jsonresponse);
        } else {
          alert("Error: " + jsonresponse.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ImagesFormPicture = async () => {
    try {
      const body = {
        picture_image_ext: pictureExt,
        picture: picture,
    }
        const response = await fetch(
          "https://staging.commuterslink.com/api/v1/registration/store-images/picture",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Images Form Picture Body:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode == 200) {
          console.log("Images Form Response Picture:", jsonresponse);
          alert("Registration Form Submitted Successfully");
          route();
        } else {
          alert("Error: " + jsonresponse.message);
        }
    } catch (error) {
      console.log(error.message);
    }
  };

  //console.log("Days Selected:", daysSelected);

 
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
                <Form className="px-3" noValidate validated={validated} onSubmit={handleSubmit}>
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
                          onChange={handleLocationStart}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Area from Dropdown
                          </option>
                          {selectedStartCityArea?.map((province) => (
                            <option key={province.id} value={province.value} data-id={province.id}>
                              {province.value}
                            </option>
                          ))}
                        </Form.Select>

                        <div className="mt-3">
                          <span className="colorplace" style={{ cursor: 'pointer', textDecoration: 'underline'}} onClick={AddNewStart}>
                              Can't find your area?
                              <a  >
                              {" "} Add Here
                              </a>
                          </span>
                        </div>

                        {addNewStart && (
                          <Row className="mb-3 mt-4">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                              <Autocomplete
                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceSelectStart}
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
                          onChange={handleLocationEnd}
                          required
                        >
                          <option value="" disabled hidden>
                            Select Area from Dropdown
                          </option>
                          {selectedEndCityArea?.map((province) => (
                            <option key={province.id} value={province.value} data-id={province.id}>
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
                               onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                               onPlaceChanged={handlePlaceSelectEnd}
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

                  <LoadScript
                      googleMapsApiKey="AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA"
                      libraries={mapLibraries}
                  >
                        <Modal show={showStartModal} onHide={handleCloseStartModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select Starting Location</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Container className="d-flex justify-content-center align-items-center mb-3">
                            <Row style={{ height: "100%", width: "100%" }}>
                              <GoogleMap
                                  zoom={12}
                                  center={defaultStartCenter}
                                  mapContainerStyle={{ width: "100%", height: "50vh" }}
                                  onClick={handleMapClickStart}
                                  options={{
                                      types: ["(regions)"],
                                      componentRestrictions: { country: "PK" },
                                  }}
                              >
                                <MarkerF
                                      position={markerPositionStart}
                                      icon={{
                                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                      }}
                                />
                            </GoogleMap>
                            </Row>
                          </Container>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="contained" onClick={handleCloseStartModal}>
                              Close
                          </Button>
                        </Modal.Footer>
                        </Modal>

                        <Modal show={showEndModal} onHide={handleCloseEndModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>Select Drop-off Location</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <Container className="d-flex justify-content-center align-items-center mb-3">
                            <Row style={{ height: "100%", width: "100%" }}>
                                <GoogleMap
                                  zoom={12}
                                  // center={
                                  //  defaultStartCenter ? defaultStartCenter : defaultEndCenter
                                  // }
                                  center={defaultEndCenter}
                                  mapContainerStyle={{ width: "100%", height: "50vh" }}
                                  onClick={handleMapClickEnd}
                                  options={{
                                      types: ["(regions)"],
                                      componentRestrictions: { country: "PK" },
                                  }}
                              >
                                
                                <MarkerF
                                  position={markerPositionEnd}
                                  icon={{
                                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                  }}
                                />

                            </GoogleMap>
                            </Row>
                        </Container>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="contained" onClick={handleCloseEndModal}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                </LoadScript>

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
                            <option key={time.id} value={time.id}>
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
                            <option key={time.id} value={time.id}>
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
                              value="Monday"
                              id={`inline-${type}-0`}
                              checked={daysSelected.includes("Monday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Tuesday"
                              name="group1"
                              type={type}
                              value="Tuesday"
                              id={`inline-${type}-2`}
                              checked={daysSelected.includes("Tuesday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Wednesday"
                              type={type}
                              value="Wednesday"
                              id={`inline-${type}-3`}
                              checked={daysSelected.includes("Wednesday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Thursday"
                              type={type}
                              value="Thursday"
                              id={`inline-${type}-3`}
                              checked={daysSelected.includes("Thursday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Friday"
                              type={type}
                              value="Friday"
                              id={`inline-${type}-3`}
                              checked={daysSelected.includes("Friday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Saturday"
                              type={type}
                              value="Saturday"
                              id={`inline-${type}-3`}
                              checked={daysSelected.includes("Saturday")}
                              onChange={handleCheckboxChange}
                              required
                              />
                              <Form.Check
                              inline
                              label="Sunday"
                              type={type}
                              value="Sunday"
                              id={`inline-${type}-3`}
                              checked={daysSelected.includes("Sunday")}
                              onChange={handleCheckboxChange}
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
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
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
                        value={preferredGender}
                        onChange={(e) => setPreferredGender(e.target.value)}
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
                            value={selectedDate}
                            onChange={handleDateChange}
                            sx={{ width: "100%" }}
                            inputProps={{ style: { color: '#198754' } }}
                            required
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Form.Group>

                    {/* {selectedDateFormat} */}

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label style={{ color: "#198754" }}>
                        Martial Status
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ color: "#198754" }}
                        value={martialStatus}
                        onChange={(e) => setMartialStatus(e.target.value)}
                        required
                      >
                        <option value="" hidden>Martial Status</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
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
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
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
                   className={`colorplace ${isValidProfession ? '' : 'is-invalid'}`}
          placeholder="Profession (Engineer, Doctor, etc)"
          value={profession}
          onChange={handleProfessionChange}
        />
        {!isValidProfession && (
          <div className="invalid-feedback">
            Please enter a valid profession.
          </div>
        )}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label style={{ color: "#198754" }}>CNIC</Form.Label>

                      <Form.Control
                        required
                        type="text"
                       className={`colorplace ${isValidCnic ? '' : 'is-invalid'}`}
            placeholder="12345-1234567-1"
            value={cnic}
            onChange={handleCnicChange}
          />
          {!isValidCnic && (
            <div className="invalid-feedback">
              Please enter a valid CNIC in the format 12345-1234567-1.
            </div>
          )}
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
                      <Form.Control type="file" required onChange={handleCnicFront} />
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
                      <Form.Control type="file" required onChange={handleCnicBack} />
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
                      <Form.Control type="file" required onChange={handlePicture} />
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
                      onClick={handleLogin}
                      >
                      Submit
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

export default RiderRegistration;