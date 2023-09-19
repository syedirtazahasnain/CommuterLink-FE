import React, { useState, useEffect, useRef } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Row, Modal } from "react-bootstrap";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {Button} from "@mui/base";
import Stack from "@mui/material/Stack";
import { ThreeCircles } from 'react-loader-spinner'
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
// import moment from "moment/moment";

const eighteenYearsAgo = dayjs().subtract(18, "years");

const RiderRegistration = () => {

  // const option0 = useSelector((s) => s.general.data.option0);
  // console.log(option0);
  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    // Set the desired height of the background area
  };

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const userToken = useSelector((s) => s.login.data.token);
  const [addNewStart, setAddNewStart] = useState(false);
  const [addNewStartDropdown, setAddNewStartDropdown] = useState(true);
  const [addNewStartField, setAddNewStartField] = useState(true);
  const [addNewEnd, setAddNewEnd] = useState(false);
  const [addNewEndDropdown, setAddNewEndDropdown] = useState(true);
  const [addNewEndField, setAddNewEndField] = useState(true);
  const [daysSelected, setDaysSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mapLibraries = ["places"];

  const [isValidProfession, setIsValidProfession] = useState(true);

  const route = () => {
    navigate("/verification");
  };

  const AddNewStart = () => {
    setAddNewStart(true);
    setAddNewStartDropdown(false);
    setAddNewStartField(false);
  };

  const AddNewEnd = () => {
    setAddNewEnd(true);
    setAddNewEndDropdown(false);
    setAddNewEndField(false);
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
    const inputCnic = event.target.value.replace(/\D/g, "");

    if (inputCnic.length <= 13) {
      const formattedCnic = inputCnic.replace(
        /^(\d{5})(\d{7})(\d{1})$/,
        "$1-$2-$3"
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
  const selectedDateFormat = selectedDate ? selectedDate.format("DD-MM-YYYY") : "";
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
  const [locationStartString, setLocationStartString] = useState("");
  const [locationStartStringId, setLocationStartStringId] = useState("");
  const [locationStartStringField, setLocationStartStringField] = useState(locationStartString);
  const [dropdownStartdata, setDropDownStartData] = useState();
  const [provinceStartId, setProvinceStartId] = useState("");
  const [selectedStartProvinceCities, setSelectedStartProvinceCities] = useState([]);
  const [cityStart, setCityStart] = useState("");
  const [cityStartId, setCityStartId] = useState("");
  const [selectedStartCityArea, setSelectedStartCityArea] = useState([]);

  // For End Point
  const [locationEndString, setLocationEndString] = useState("");
  const [locationEndStringId, setLocationEndStringId] = useState("");
  const [locationEndStringField, setLocationEndStringField] = useState(locationEndString);
  const [dropdownEnddata, setDropDownEndData] = useState();
  const [provinceEndId, setProvinceEndId] = useState("");
  const [selectedEndProvinceCities, setSelectedEndProvinceCities] = useState([]);
  const [cityEnd, setCityEnd] = useState("");
  const [cityEndId, setCityEndId] = useState("");
  const [selectedEndCityArea, setSelectedEndCityArea] = useState([]);

  // For Start Point
  const [defaultStartCenter, setDefaultStartCenter] = useState({
    lat: 30.3753,
    lng: 69.3451,
  });
  const [markerPositionStart, setMarkerPositionStart] = useState({
    lat: 30.3753,
    lng: 69.3451,
  });

  // For End Point
  const [defaultEndCenter, setDefaultEndCenter] = useState({
    lat: 30.3753,
    lng: 69.3451,
  });
  const [markerPositionEnd, setMarkerPositionEnd] = useState({
    lat: 30.3753,
    lng: 69.3451,
  });

  // For Modals
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  useEffect(() => {
    getdropdownStartdata();
  }, []);

  useEffect(() => {
    if (provinceStartId) {
      const selectedStartProvince =
        dropdownStartdata?.countries[0]?.provinces.find(
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

      const citystring = selectedStartProvinceCities.filter(
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

      const citystring = selectedEndProvinceCities.filter(
        (city) => city.id == cityEndId
      );

      setLocationEndString(citystring[0].value);
      setSelectedEndCityArea(filteredEndCities ? filteredEndCities : []);
    }
  }, [cityEndId]);

  //console.log(locationEndString);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  
  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeStartData = async () => {
      try {

        if (locationStartString) {
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
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    };
    getGeocodeStartData();
  }, [locationStartString, locationStartStringField]);

  useEffect(() => {
    // Function to fetch the geocoding data
    const getGeocodeEndData = async () => {
      try {

        if (locationEndString) {
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
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    };
    getGeocodeEndData();
  }, [locationEndString, locationEndStringField]);

  const getdropdownStartdata = async () => {
    try {
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
      setDropDownStartData(jsonresponse);
      setDropDownEndData(jsonresponse);
      setHomeTimeSlots(jsonresponse.time_slots);
      setOfficeTimeSlots(jsonresponse.time_slots);
      //console.log(jsonresponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProvinceStartChange = (event) => {
    setCityStartId("");
    setProvinceStartId(event.target.value);
  };

  const handleProvinceEndChange = (event) => {
    setCityEndId("");
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
    setAddNewStartField(false);
    handleShowStartModal();
  };

  const handleLocationStartField = (e) => {
    setLocationStartStringField(e.target.value);
    setLocationStartString(e.target.value);
  };

  const handlePlaceSelectStart = () => {
    const place = autocompleteRef.current.getPlace();

    // Check if place is defined and has address_components.
    if (place && place.address_components) {
      const isIslamabad =
        place.address_components.some((component) =>
          component.types.includes("locality") &&
          component.long_name.toLowerCase() === cityStart.toLowerCase()
        );

      if (isIslamabad) {
        // The selected place is in Islamabad.
        if (place.geometry && place.geometry.location) {
          setMarkerPositionStart({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          setLocationStartStringField(place.formatted_address);
          setLocationStartString(place.formatted_address);
          handleShowStartModal();
        }
      } else if (!isIslamabad) {
        Swal.fire({
          position: 'top',
          // // icon: 'warning',
          text: `Please select a place in ${cityStart}.`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        });
      }
    } else {
      // Handle the case when place is not valid.
      console.error('Invalid place object:', place);
    }
  };

  const handleLocationEnd = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedId = selectedOption.getAttribute("data-id");
    setLocationEndString(selectedValue);
    setLocationEndStringId(selectedId);
    setAddNewEndField(false);
    handleShowEndModal();
  };

  const handleLocationEndField = (e) => {
    setLocationEndStringField(e.target.value);
    setLocationEndString(e.target.value);
  };

  const handlePlaceSelectEnd = () => {
    const place = autocompleteRef.current.getPlace();

    // Check if place is defined and has address_components.
    if (place && place.address_components) {
      const isIslamabad =
        place.address_components.some((component) =>
          component.types.includes("locality") &&
          component.long_name.toLowerCase() === cityEnd.toLowerCase()
        );

      if (isIslamabad) {
        // The selected place is in Islamabad.
        if (place.geometry && place.geometry.location) {
          setMarkerPositionEnd({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          setLocationEndStringField(place.formatted_address);
          setLocationEndString(place.formatted_address);
          handleShowEndModal();
        }
      } else if (!isIslamabad) {
        Swal.fire({
          position: 'top',
          // // icon: 'warning',
          text: `Please select a place in ${cityEnd}.`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        });
      }
    } else {
      // Handle the case when place is not valid.
      console.error('Invalid place object:', place);
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
        setCnicFront(reader.result.split(",")[1]);
        setCnicFrontExt(file.name.split(".").pop());
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
        setCnicBack(reader.result.split(",")[1]);
        setCnicBackExt(file.name.split(".").pop());
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
        setPicture(reader.result.split(",")[1]);
        setPictureExt(file.name.split(".").pop());
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

  const PersonalFormFields = [
    martialStatus,
    cnic,
    selectedDateFormat,
    gender,
    preferredGender,
    profession,
    education,
  ];

  const requiredFields = [
    cityStartId,
    provinceStartId,
    locationStartString,
    markerPositionStart,
    cityEndId,
    provinceEndId,
    locationEndString,
    markerPositionEnd,
    selectedHomeTime,
    selectedOfficeTime,
    daysSelected,
    martialStatus,
    cnic,
    selectedDateFormat,
    gender,
    preferredGender,
    profession,
    education,
    cnicFrontExt,
    cnicFront,
    cnicBackExt,
    cnicBack,
    pictureExt,
    picture,
  ];

  console.log({ requiredFields });
  console.log({PersonalFormFields});

  const handleLogin = async () => {
    if (
      requiredFields.every(
        (field) => field !== "" && field !== null && field !== undefined
      )
    ) {
      setIsLoading(true); // Start loading

      try {
        if (PersonalFormFields.every(
          (field) => field !== "" && field !== null && field !== undefined
        )) {
          await PersonalForm();
        }
      } catch (error) {
        setIsLoading(false);
        // Handle the error appropriately, e.g., show an error message
        console.error('API call error:', error);
      }
    } else {
      setIsLoading(false);
      Swal.fire({
        position: 'top',
        // icon: 'warning',
        text: 'Please Fill All Fields!',
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      }
      )
    }
  };

  const PersonalForm = async () => {
    try {
      const body = {
        marital_status: martialStatus,
        cnic: cnic,
        birth_year: selectedDateFormat,
        gender: gender,
        preferred_gender: preferredGender,
        profession: profession,
        education: education,
        interests: null,
        university_address: null,
        university_name: null,
        user_type: 299,
      };
      const response = await fetch(
        `${API_URL}/api/v1/registration/personal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      console.log("Personal Form Body:", body);

      const jsonresponse = await response.json();

      if (jsonresponse.statusCode == 200) {
        console.log("Personal Form Response:", jsonresponse);
        await LocationForm();
        await ImagesFormCnicFront();
        await ImagesFormCnicBack();
        await ImagesFormPicture();

        setIsLoading(false);
      } else if (jsonresponse.statusCode === 422) {
        console.log("Personal Form CNIC Issue Response:", jsonresponse);
        const errors = jsonresponse.errors;
        for (const field of Object.keys(errors)) {
          Swal.fire({
            position: "top",
            // icon: "error",
            // text: `${jsonresponse.message}`,
            text: `${errors[field][0]}`,
            customClass: {
              confirmButton: "bg-success",
              // Apply custom CSS class to the OK button
            },
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const LocationForm = async () => {
    try {
      let nameArrayStart = [markerPositionStart.lat, markerPositionStart.lng];
      const myStringStart = nameArrayStart.toString();
      let nameArrayEnd = [markerPositionEnd.lat, markerPositionEnd.lng];
      const myStringEnd = nameArrayEnd.toString();
      const body = {
        option: 0,
        user_type: 299,
        university_name: null,
        university_address: null,
        veh_option: 0,
        start_point: {
          city_id: cityStartId,
          province_id: provinceStartId,
          area_id: locationStartStringId,
          area_google: {
            name: locationStartString,
            place_id: "ddChIJGQ_wq43t3zgRel4CwxgjgQs",
          },

          name: myStringStart,
          // "land_mark" : "Eagle Chowk"
        },
        end_point: {
          city_id: cityEndId,
          province_id: provinceEndId,
          area_id: locationEndStringId,
          area_google: {
            name: locationEndString,
            place_id: "ChIJGQ_wq43t3zgRel4CwxgjgQs",
          },
          name: myStringEnd,
          //  "land_mark" : "Clock Tower"
        },
        time: {
          start_time_id: selectedHomeTime,
          return_time_id: selectedOfficeTime,
        },
        days: daysSelected,
      };
      const response = await fetch(
        `${API_URL}/api/v1/registration/location`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        }
        )
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
      };
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/cnic_front`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        }
        )
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
      };
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/cnic_back`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        }
        )
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
      };
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/picture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      console.log("Images Form Picture Body:", body);


      const registrationSuccessful = () => {
        // Swal.fire({
        //   position: 'top',
        //   // title: 'Congratulations!',
        //   text: 'Registration Form Submitted Successfully',
        //   icon: 'success',
        //   showCancelButton: false,
        //   confirmButtonText: 'OK',
        //   customClass: {
        //     confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        //   },
        // });
      };

      const jsonresponse = await response.json();

      if (jsonresponse.statusCode === 200) {
        console.log("Images Form Response Picture:", jsonresponse);
        registrationSuccessful();
        route();
      } else {
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        }
        )
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="main-bg">
        <div className="containter p-5 position-relative">
          <div className="area" >
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div >
          <div className="row justify-content-center ">
            <div className="col-md-6 shadow bg-white  mt-5 mb-5">
              <div
                className="row shadow form-color-header"
                // style={{ backgroundColor: '#1F5F5B' }}
              >
                <h1 className="text-center text-white py-4">
                  Registration Form
                </h1>
              </div>

              <Form
                className=" p-3"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <div className="row mb-3 shadow shadow-sm">
                  <div
                    className="col-md-12 px-2 py-3 form-color-field"
                    // style={{ backgroundColor: "#cddbd9" }}
                  >
                    <h2 className="text-success mb-3 text-center">
                      STARTING POINT
                    </h2>
                    <Form.Group
                      as={Col}
                      md={cityStartId ? "12" : "12"}
                      controlId="validationCustom01"
                      className="mb-2"
                    >
                      <Form.Label className="text-black fs-6">
                        Province
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"
                        value={provinceStartId}
                        onChange={handleProvinceStartChange}
                        required
                      >
                        <option value="" hidden>
                          Select a Province
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
                    <Form.Group as={Col} md={cityStartId ? "12" : "12"} controlId="validationCustom02" className="mb-2">
                      <Form.Label className="text-black fs-6">City</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"
                        value={cityStartId}
                        onChange={(e) => {
                          const selectedOption = e.target.options[e.target.selectedIndex];
                          const selectedValue = selectedOption.value;
                          const selectedId = selectedOption.getAttribute("data-id");

                          // Set the ID
                          setCityStartId(selectedValue);

                          // Set the value
                          setCityStart(selectedId);
                          setAddNewStartDropdown(true);
                          setAddNewStart(false);
                          setAddNewStartField(true);
                        }}
                        required
                      >
                        <option value="" hidden>
                          Select a City
                        </option>
                        {selectedStartProvinceCities?.map((province) => (
                          <option
                            key={province.id}
                            value={province.id}
                            data-id={province.value}
                          >
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {cityStartId && (
                      <>
                        {addNewStartDropdown && (
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mt-2 text-dark fs-6 fw-bold">Select Area From Dropdown</p>
                              {addNewStartField && (
                                <p
                                  className="colorplace text-danger"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }}
                                  onClick={AddNewStart}
                                >
                                  Can't find your area?
                                  <a> Add Here</a>
                                </p>
                              )}
                            </div>
                            <Form.Select
                              aria-label="Default select example"
                              className="text-secondary"
                              value={locationStartString}
                              onChange={handleLocationStart}
                              required
                            >
                              <option value="" hidden>
                                Select Area From Dropdown
                              </option>
                              {selectedStartCityArea?.map((province) => (
                                <option
                                  key={province.id}
                                  value={province.value}
                                  data-id={province.id}
                                >
                                  {province.value}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        )}

                        {/* {addNewStartField && (
                          <Form.Group
                            as={Col}
                            md="12"
                            className="mt-3"
                            controlId="validationCustom04"
                          >
                            <span
                              className="colorplace text-danger"
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={AddNewStart}
                            >
                              Can't find your area?
                              <a> Add Here</a>
                            </span>
                          </Form.Group>
                        )} */}

                        {addNewStart && (
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom05"
                          >
                            <Form.Label className="text-black">
                              Area
                            </Form.Label>
                            <Autocomplete
                              onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                              }
                              onPlaceChanged={handlePlaceSelectStart}
                              restrictions={{ country: "PK" }}
                              options={{ strictBounds: true }}
                            >
                              <Form.Control
                                autoComplete="on"
                                required
                                type="text"
                                value={locationStartStringField}
                                onChange={handleLocationStartField}
                                className="text-dark mt-1"
                                placeholder="Enter your area"
                                autocomplete="on"
                                defaultValue=""
                              />
                            </Autocomplete>
                          </Form.Group>
                        )}
                      </>
                    )}
                  
                  </div>
                </div>
                <div className="row mb-3 shadow shadow-sm">
                  <div
                    className="col-md-12 px-2 py-3 form-color-field"
                    // style={{ backgroundColor: "#cddbd9" }}
                  >
                    <h2 className="text-success mb-3 text-center">
                      DROP-OFF POINT
                    </h2>
                    <Form.Group
                      as={Col}
                      md={cityEndId ? "12" : "12"}
                      controlId="validationCustom07"
                      className="mb-2"
                    >
                      <Form.Label className="text-black fs-6">
                        Province
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"
                        value={provinceEndId}
                        onChange={handleProvinceEndChange}
                        required
                      >
                        <option value="" hidden>
                          Select a Province
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
                    <Form.Group as={Col} md={cityEndId ? "12" : "12"} controlId="validationCustom02" className="mb-2">
                      <Form.Label className="text-black fs-6">City</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"
                        value={cityEndId}
                        onChange={(e) => {
                          const selectedOption = e.target.options[e.target.selectedIndex];
                          const selectedValue = selectedOption.value;
                          const selectedId = selectedOption.getAttribute("data-id");

                          // Set the ID
                          setCityEndId(selectedValue);

                          // Set the value
                          setCityEnd(selectedId);
                          setAddNewEndDropdown(true);
                          setAddNewEnd(false);
                          setAddNewEndField(true);
                        }}
                        required
                      >
                        <option value="" hidden>
                          Select a City
                        </option>
                        {selectedEndProvinceCities?.map((province) => (
                          <option
                            key={province.id}
                            value={province.id}
                            data-id={province.value}
                          >
                            {province.value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {cityEndId && (
                      <>
                        {addNewEndDropdown && (
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom09"
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mt-2 text-dark fs-6 fw-bold">Select Area From Dropdown</p>
                              {addNewEndField && (
                                <p
                                  className="colorplace text-danger"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }}
                                  onClick={AddNewEnd}
                                >
                                  Can't find your area?
                                  <a> Add Here</a>
                                </p>
                              )}
                            </div>
                            <Form.Select
                              aria-label="Default select example"
                              className="text-secondary"
                              value={locationEndString}
                              onChange={handleLocationEnd}
                              required
                            >
                              <option value="" hidden>
                                Select Area From Dropdown
                              </option>
                              {selectedEndCityArea?.map((province) => (
                                <option
                                  key={province.id}
                                  value={province.value}
                                  data-id={province.id}
                                >
                                  {province.value}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        )}

                        {addNewEnd && (
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom11"
                          >
                            <Form.Label className="text-black">
                              Area
                            </Form.Label>
                            <Autocomplete
                              onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                              }
                              onPlaceChanged={handlePlaceSelectEnd}
                              restrictions={{ country: "PK" }}
                              options={{ strictBounds: true }}
                            >
                              <Form.Control
                                autoComplete="on"
                                required
                                type="text"
                                value={locationEndStringField}
                                onChange={handleLocationEndField}
                                className="text-dark mt-1"
                                placeholder="Enter your area"
                                autocomplete="on"
                                defaultValue=""
                              />
                            </Autocomplete>
                          </Form.Group>
                        )}
                      </>
                    )}
                 
                  </div>
                </div>

                <LoadScript
                  googleMapsApiKey="AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA"
                  libraries={mapLibraries}
                >
                  <Modal show={showStartModal} onHide={handleCloseStartModal}>
                    <Modal.Header className="d-block" >
                      <Modal.Title>Select Starting Location</Modal.Title>
                      <Modal.Title className="text-danger fs-7">If you do not want to give your exact location please choose your nearest landmark?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <Container className="d-flex justify-content-center align-items-center mb-3">
                        <Row style={{ height: "100%", width: "100%" }}>
                          <GoogleMap
                            zoom={15}
                            center={defaultStartCenter}
                            mapContainerStyle={{
                              width: "100%",
                              height: "50vh",
                            }}
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
                      <Button
                        variant="contained"
                        onClick={handleCloseStartModal}
                        className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                      >
                        Select
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal show={showEndModal} onHide={handleCloseEndModal}>

                    <Modal.Header className="d-block">
                      <Modal.Title>Select Drop-off Location</Modal.Title>
                      <Modal.Title className="text-danger fs-7">If you do not want to give your exact location please choose your nearest landmark?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Container className="d-flex justify-content-center align-items-center mb-3">
                        <Row style={{ height: "100%", width: "100%" }}>
                          <GoogleMap
                            zoom={15}
                            // center={
                            //  defaultStartCenter ? defaultStartCenter : defaultEndCenter
                            // }
                            center={defaultEndCenter}
                            mapContainerStyle={{
                              width: "100%",
                              height: "50vh",
                            }}
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
                      <Button variant="contained" onClick={handleCloseEndModal}
                      className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold">
                        Select
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </LoadScript>
                <div className="row mb-3 shadow shadow-sm">
                  <div
                    className="col-md-12 px-2 py-3 form-color-field"
                    // style={{ backgroundColor: "#cddbd9" }}
                  >
                    <h2 className="text-success mb-3 text-center">
                      Timing
                    </h2>

                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustomtime1"
                      className="mb-2 mt-3"
                    >
                      <Form.Label className="text-black fs-6">
                        Start Time (From start point to destination +/- 30 Minutes)
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"

                        value={selectedHomeTime}
                        onChange={(e) => setSelectedHomeTime(e.target.value)}
                        required
                      >
                        <option value="" hidden>
                          Start Time
                        </option>
                        {homeTimeSlots?.map((time) => (
                          <option key={time.id} value={time.id}>
                            {time.time_string}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustomtime2"
                      className="mb-2 mt-3"
                    >
                      <Form.Label className="text-black fs-6">
                        Return  Time (From destination to start point +/- 30 Minutes)
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-secondary"
                        value={selectedOfficeTime}
                        onChange={(e) => setSelectedOfficeTime(e.target.value)}
                        required
                      >
                        <option value="" hidden>
                          Return Time
                        </option>
                        {officeTimeSlots?.map((time) => (
                          <option key={time.id} value={time.id}>
                            {time.time_string}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
                <Row className="mb-3 form-color-field"
                //  style={{ border: "1px solid #cddbd9", backgroundColor: '#cddbd9' }}
                
                >
                  <Form.Group as={Col} md="12" controlId="validationCustom20">
                    <Form.Label style={{ color: "#000" }} className="pt-3 px-3">
                      I Commute (Select Days)
                    </Form.Label>
                  </Form.Group>

                  <div className="row d-flex px-4">
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
                              // disabled
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
                              // disabled
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

                <Row
                  className="mb-3 py-3 shadow shadow-sm form-color-field"
                  // style={{ backgroundColor: " #cddbd9" }}
                >
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom13"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">My Gender</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="text-secondary"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="" hidden>
                        {" "}
                        Gender{" "}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom14"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      Preferred Gender Of Travel Partner
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="text-secondary"
                      value={preferredGender}
                      onChange={(e) => setPreferredGender(e.target.value)}
                      required
                    >
                      <option value="" hidden>
                        Preferred Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row
                  className="mb-3 py-3 shadow shadow-sm form-color-field"
                  // style={{ backgroundColor: " #cddbd9" }}
                >
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom15"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      Year of Birth
                    </Form.Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"MM/DD/YY"}
                        className="bg-white"
                        slotProps={{
                          textField: { size: "small", color: "success" },
                        }}
                        sx={{ width: "100%" }}
                        value={selectedDate}
                        onChange={handleDateChange}
                        maxDate={eighteenYearsAgo}
                        disableFuture
                      />
                    </LocalizationProvider>
                  </Form.Group>

                  {/* {selectedDate} */}

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom16"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      Martial Status
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="text-secondary"
                      value={martialStatus}
                      onChange={(e) => setMartialStatus(e.target.value)}
                      required
                    >
                      <option value="" hidden>
                        Martial Status
                      </option>
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom17"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      Education
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className="text-secondary"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      required
                    >
                      <option value="" hidden>
                        Education
                      </option>
                      <option value="Phd">Phd</option>
                      <option value="Master">Master</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="BA">BA</option>
                      <option value="BSC">BSC</option>
                      <option value="FSC">Intermediate</option>
                      <option value="Matric">Matric</option>
                      <option value="Middle">Middle</option>
                      <option value="Primary">Primary</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom18"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      Profession
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className={`${isValidProfession ? "" : "is-invalid"}`}
                      placeholder="Profession (Engineer, Doctor, etc)"
                      value={profession}
                      onChange={handleProfessionChange}
                    />
                    {!isValidProfession && (
                      <div className="invalid-feedback">
                        Please Enter a Valid Profession.
                      </div>
                    )}
                  </Form.Group>
                </Row>
                <Row
                  className="mb-3 py-3 shadow shadow-sm form-color-field"
                  // style={{ backgroundColor: " #cddbd9" }}
                >
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustom19"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">CNIC</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className={`${isValidCnic ? "" : "is-invalid"}`}
                      placeholder="12345-1234567-1"
                      value={cnic}
                      onChange={handleCnicChange}
                    />
                    {!isValidCnic && (
                      <div className="invalid-feedback">
                        Please Enter a Valid CNIC in the Format 12345-1234567-1.
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="12"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      {" "}
                      Upload CNIC (Front)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg"
                      required
                      onChange={handleCnicFront}
                    />
                    <Form.Text className="text-danger" style={{ color: "#000" }}>
                      The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="12"
                    className="mb-2"
                  >
                    <Form.Label className="fs-6 text-black">
                      {" "}
                      Upload CNIC (Back)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg"
                      required
                      onChange={handleCnicBack}
                    />
                    <Form.Text className="text-danger" style={{ color: "#000" }}>
                      The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="12"
                    className="mb-3"
                  >
                    <Form.Label className="fs-6 text-black">
                      Upload Your Picture
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg"
                      required
                      onChange={handlePicture}
                    />
                    <Form.Text
                      className="text-danger"
                      style={{ color: "#000" }}
                    >
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
                    className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <i className="fa fa-spinner fa-spin" /> Submitting...
                      </span>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </Stack>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiderRegistration;
