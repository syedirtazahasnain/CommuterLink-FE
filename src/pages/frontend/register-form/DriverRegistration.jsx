import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Container, Row, Modal } from 'react-bootstrap';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { GoogleMap, LoadScript, Autocomplete, MarkerF, } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";

const eighteenYearsAgo = dayjs().subtract(18, "years");

const DriverRegistration = () => {

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


  const route = () => {
    navigate("/seatcostverification");

  };

  const handleCarBrandChange = (e) => {
    const value = e.target.value;
    setSelectedCarBrand(value);
    setIsCarBrandValid(value !== ''); // Set validation based on whether a value is selected or not
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
  const [cnic, setCnic] = useState('');
  const [isValidCnic, setIsValidCnic] = useState(true);
  const [cnicFront, setCnicFront] = useState("");
  const [cnicFrontExt, setCnicFrontExt] = useState("");
  const [cnicBack, setCnicBack] = useState("");
  const [cnicBackExt, setCnicBackExt] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureExt, setPictureExt] = useState("");
  const [profession, setProfession] = useState('');
  const [isValidProfession, setIsValidProfession] = useState(true);
  const [isCarBrandValid, setIsCarBrandValid] = useState(true);
  // For Start Point
  const [locationStartString, setLocationStartString] = useState("");
  const [locationStartStringId, setLocationStartStringId] = useState("");
  const [locationStartStringField, setLocationStartStringField] = useState(locationStartString);
  const [dropdownStartdata, setDropDownStartData] = useState();
  const [provinceStartId, setProvinceStartId] = useState("");
  const [selectedStartProvinceCities, setSelectedStartProvinceCities] = useState([]);
  const [cityStartId, setCityStartId] = useState("");
  const [selectedStartCityArea, setSelectedStartCityArea] = useState([]);

  // For End Point
  const [locationEndString, setLocationEndString] = useState("");
  const [locationEndStringId, setLocationEndStringId] = useState("");
  const [locationEndStringField, setLocationEndStringField] = useState(locationEndString);
  const [dropdownEnddata, setDropDownEndData] = useState();
  const [provinceEndId, setProvinceEndId] = useState("");
  const [selectedEndProvinceCities, setSelectedEndProvinceCities] = useState([]);
  const [cityEndId, setCityEndId] = useState("");
  const [selectedEndCityArea, setSelectedEndCityArea] = useState([]);


  // For Start Point
  const [defaultStartCenter, setDefaultStartCenter] = useState({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionStart, setMarkerPositionStart] = useState({ lat: 30.3753, lng: 69.3451 });

  // For End Point
  const [defaultEndCenter, setDefaultEndCenter] = useState({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionEnd, setMarkerPositionEnd] = useState({ lat: 30.3753, lng: 69.3451 });

  // For Modals
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  // For Driver's
  const [carBrand, setCarBrand] = useState([]);
  const [selectedCarBrand, setSelectedCarBrand] = useState("");
  const [selectedModelName, setSelectedModelName] = useState("");
  const [manYear, setManYear] = useState([]);
  const [selectedManYear, setSelectedManYear] = useState("");
  const [regYear, setRegYear] = useState([]);
  const [selectedRegYear, setSelectedRegYear] = useState("");
  const [carYearRanges, setCarYearRanges] = useState([]);
  const [selectedCarYearRanges, setSelectedCarYearRanges] = useState("");
  const [selectedRegNumber, setSelectedRegNumber] = useState("");
  const [selectedCarAC, setSelectedCarAC] = useState("");
  const [selectedCarImage, setSelectedCarImage] = useState("");
  const [selectedCarImageExt, setSelectedCarImageExt] = useState("");
  const [carCC, setCarCC] = useState([]);
  const [selectedCarCC, setSelectedCarCC] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [selectedSeatGender, setSelectedSeatGender] = useState("");
  const [selectedMidRoutePartner, setSelectedMidRoutePartner] = useState("");
  const [selectedOneRoutePartner, setSelectedOneRoutePartner] = useState("");
  const [inputBankAccount, setInputBankAccount] = useState("");
  const [inputEasyPaisa, setInputEasyPaisa] = useState("");
  const [inputJazzCash, setInputJazzCash] = useState("");
  const [inputRaastID, setInputRaastID] = useState("");

  // For Driver Type
  const [inputDriverType, setInputDriverType] = useState("");

  // I Drive Myself Fields
  const [inputDrivingLicenseMySelf, setInputDrivingLicenseMySelf] = useState("");
  const [inputValidUptoMySelf, setInputValidUptoMySelf] = useState(null);
  const inputValidUptoMySelfFormat = inputValidUptoMySelf ? inputValidUptoMySelf.format('DD-MM-YYYY') : '';
  const [inputPlaceIssueMySelf, setInputPlaceIssueMySelf] = useState("");

  // For Driver & Both Fields
  const [inputDriverName, setInputDriverName] = useState("");
  const [inputDriverCnicNumber, setInputDriverCnicNumber] = useState("");
  const [inputDriverCnicFront, setInputDriverCnicFront] = useState("");
  const [inputDriverCnicFrontExt, setInputDriverCnicFrontExt] = useState("");
  const [inputDriverCnicBack, setInputDriverCnicBack] = useState("");
  const [inputDriverCnicBackExt, setInputDriverCnicBackExt] = useState("");
  const [inputDriverLicenseNumber, setInputDriverLicenseNumber] = useState("");
  const [inputDriverValidUpto, setInputDriverValidUpto] = useState(null);
  const inputDriverValidUptoFormat = inputDriverValidUpto ? inputDriverValidUpto.format('DD-MM-YYYY') : '';

  // For License Fields
  const [selectedImageLicenseFront, setSelectedImageLicenseFront] = useState("");
  const [selectedImageLicenseFrontExt, setSelectedImageLicenseFrontExt] = useState("");
  const [selectedImageLicenseBack, setSelectedImageLicenseBack] = useState("");
  const [selectedImageLicenseBackExt, setSelectedImageLicenseBackExt] = useState("");

  // For Driver Form
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showmyself, setshowmyself] = useState(false);
  const [showmydriver, setshowmydriver] = useState(false);
  const [showboth, setshowboth] = useState(false);

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
        console.error('Error fetching geocoding data:', error);
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
        console.error('Error fetching geocoding data:', error);
      }
    };
    getGeocodeEndData();
  }, [locationEndString, locationEndStringField]);

  const getdropdownStartdata = async () => {
    const response = await fetch(
      `${API_URL}/api/v1/list/data`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    const jsonresponse = await response.json();
    setDropDownStartData(jsonresponse);
    setDropDownEndData(jsonresponse);
    setHomeTimeSlots(jsonresponse.time_slots);
    setOfficeTimeSlots(jsonresponse.time_slots);
    setCarBrand(jsonresponse.car_brand);
    setManYear(jsonresponse.car_reg_year);
    setRegYear(jsonresponse.car_reg_year);
    setCarYearRanges(jsonresponse.car_reg_year);
    setCarCC(jsonresponse.car_cc);
    console.log(jsonresponse);
  };

  const handleProvinceStartChange = (event) => {
    setProvinceStartId(event.target.value);
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
    setAddNewStartField(false);
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
    setAddNewEndField(false);
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

  const handleMapClickEnd = (event) => {
    console.log(event);
    setMarkerPositionEnd({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
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

  const handleDateChange = (newDate) => {
    if (newDate) {
      const newDateObject = dayjs(newDate);
      setSelectedDate(newDateObject);
    }
  };

  const handleValidChange = (newDate) => {
    if (newDate) {
      const newDateObject = dayjs(newDate);
      setInputValidUptoMySelf(newDateObject);
    }
  };

  const handleValidDriverChange = (newDate) => {
    if (newDate) {
      const newDateObject = dayjs(newDate);
      setInputDriverValidUpto(newDateObject);
    }
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
  const handleCnicFront = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCnicFront(reader.result.split(",")[1]);
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
        setCnicBack(reader.result.split(",")[1]);
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
        setPicture(reader.result.split(",")[1]);
        setPictureExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log("Picture:", picture);
  // console.log("Picture Extension:", pictureExt);

  const handleCnicFrontDriver = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputDriverCnicFront(reader.result.split(",")[1]);
        setInputDriverCnicFrontExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCnicBackDriver = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputDriverCnicBack(reader.result.split(",")[1]);
        setInputDriverCnicBackExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseFrontDriver = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageLicenseFront(reader.result.split(",")[1]);
        setSelectedImageLicenseFrontExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseBackDriver = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageLicenseBackExt(reader.result.split(",")[1]);
        setSelectedImageLicenseBackExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCarImage(reader.result.split(",")[1]);
        setSelectedCarImageExt(file.name.split('.').pop());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDriverTypeForm = () => {

    if (inputDriverType === "I Drive Myself") {
      setInputDriverName("");
      setInputDriverCnicNumber("");
      setInputDriverCnicFront("");
      setInputDriverCnicBack("");
      setInputDriverLicenseNumber("");
      setInputDriverValidUpto("");
      setSelectedImageLicenseFront("");
      setSelectedImageLicenseFrontExt("");
      setSelectedImageLicenseBack("");
      setSelectedImageLicenseBackExt("");
    }

    if (inputDriverType === "Driver") {
      setInputDriverName("");
      setInputDriverCnicNumber("");
      setInputDriverCnicFront("");
      setInputDriverCnicBack("");
      setInputDriverLicenseNumber("");
      setInputDriverValidUpto("");
      setInputDrivingLicenseMySelf("");
      setInputValidUptoMySelf("");
      setInputPlaceIssueMySelf("");
      setSelectedImageLicenseFront("");
      setSelectedImageLicenseFrontExt("");
      setSelectedImageLicenseBack("");
      setSelectedImageLicenseBackExt("");
    }

    if (inputDriverType === "Both") {
      setInputDriverName("");
      setInputDriverCnicNumber("");
      setInputDriverCnicFront("");
      setInputDriverCnicBack("");
      setInputDriverLicenseNumber("");
      setInputDriverValidUpto("");
      setInputDrivingLicenseMySelf("");
      setInputValidUptoMySelf("");
      setInputPlaceIssueMySelf("");
      setSelectedImageLicenseFront("");
      setSelectedImageLicenseFrontExt("");
      setSelectedImageLicenseBack("");
      setSelectedImageLicenseBackExt("");
    }

  };


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


  const requiredFieldsLogin = [
    cityStartId, provinceStartId,
    locationStartString, markerPositionStart,
    cityEndId, provinceEndId,
    locationEndString, markerPositionEnd,
    selectedHomeTime, selectedOfficeTime, daysSelected,
    martialStatus, cnic, selectedDateFormat,
    gender, preferredGender, profession,
    education, cnicFrontExt, cnicFront,
    cnicBackExt, cnicBack, pictureExt, picture
  ];

  const requiredFieldsDriver = [
    selectedCarBrand, selectedCarCC,
    selectedModelName, selectedRegYear, selectedRegNumber,
    selectedManYear, selectedCarAC, selectedCarImage,
    selectedCarImageExt, selectedSeat, selectedSeatGender,
    selectedMidRoutePartner, inputDrivingLicenseMySelf,
    inputValidUptoMySelf, inputPlaceIssueMySelf
  ];

  const handleLogin = async () => {
    if (
      requiredFieldsLogin.every(
        (field) => field !== "" && field !== null && field !== undefined
      )
    ) {
      setIsLoading(true); // Start loading

      try {
        await LocationForm();
        await PersonalForm();
        await ImagesFormCnicFront();
        await ImagesFormCnicBack();
        await ImagesFormPicture();
        setIsLoading(false);
        setShowDriverForm(true);
      } catch (error) {
        setIsLoading(false);
        // Handle the error appropriately, e.g., show an error message
        console.error('API call error:', error);
      }
    } else {
      setIsLoading(false);
      // alert("Please Fill All Fields!");
      Swal.fire({
        position: 'top',
        // // icon: 'warning',
        text: 'Please Fill All Fields!',
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      }
      )
    }
  };


  const handleDriver = async () => {
    if (requiredFieldsDriver.every(field => field !== "" && field !== null && field !== undefined)) {
      setIsLoading(true); // Start loading
      try {
        await DriverForm();
        await PaymentForm();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // Handle the error appropriately, e.g., show an error message
        console.error('API call error:', error);
      }
    } else {
      setIsLoading(false);
      // alert("Please Fill All Driver Form Fields!");
      Swal.fire({
        position: 'top',
        // icon: 'warning',
        text: 'Please Fill All Driver Form Fields!',
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      }
      )
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
        veh_option: 1,
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
            place_id: "ChIJGQ_wq43t3zgRel4CwxgjgQs"
          },
          name: myStringEnd,
          //  "land_mark" : "Clock Tower"
        },
        time: {
          start_time_id: selectedHomeTime,
          return_time_id: selectedOfficeTime,
        },
        days: daysSelected,
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/location`,
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

      if (jsonresponse.statusCode === 200) {
        console.log("Location Form Response:", jsonresponse);
      }
      else if (jsonresponse.statusCode === 500) {
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
        user_type: 299
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/personal`,
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

      if (jsonresponse.statusCode === 200) {
        console.log("Personal Form Response:", jsonresponse);
      }
      else if (jsonresponse.statusCode === 500) {
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
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/cnic_front`,
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

      if (jsonresponse.statusCode === 200) {
        console.log("Images Form Response Cnic Front:", jsonresponse);
      }
      else if (jsonresponse.statusCode === 500) {
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
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/cnic_back`,
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

      if (jsonresponse.statusCode === 200) {
        console.log("Images Form Response Cnic Back:", jsonresponse);
      }
      else if (jsonresponse.statusCode === 500) {
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
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/store-images/picture`,
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
      const registrationSuccessful = () => {
        Swal.fire({
          position: 'top',
          title: 'Congratulations!',
          text: 'Registration Form Submited Successfully',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        });
      };

      const jsonresponse = await response.json();

      if (jsonresponse.statusCode === 200) {
        console.log("Images Form Response Picture:", jsonresponse);
        registrationSuccessful();
      }
      else if (jsonresponse.statusCode === 500) {
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

  const DriverForm = async () => {
    try {
      const body = {
        option: 1,
        car_brand: selectedCarBrand,
        car_cc: selectedCarCC,
        car_year_ranges: selectedRegYear,
        car_model: selectedModelName,
        reg_year: selectedRegYear,
        reg_no: selectedRegNumber,
        manufac_year: selectedManYear,
        car_ac: selectedCarAC,
        car_image: selectedCarImage,
        car_image_ext: selectedCarImageExt,
        seats_available: selectedSeat,
        seats_for: selectedSeatGender,
        mid_route: selectedMidRoutePartner,
        //one_side: selectedOneRoutePartner,
        drive_option: "Driver",
        license_no: inputDrivingLicenseMySelf,
        valid_upto: inputValidUptoMySelfFormat,
        place_issue: inputPlaceIssueMySelf,
        driver_name: inputDriverName,
        driver_cnic: inputDriverCnicNumber,
        driver_license_no: inputDriverLicenseNumber,
        driver_license_validity: inputDriverValidUptoFormat,
        driver_cnic_front_image: inputDriverCnicFront,
        driver_cnic_back_image: inputDriverCnicBack,
        driver_cnic_front_ext: inputDriverCnicFrontExt,
        driver_cnic_back_ext: inputDriverCnicBackExt,
        license_front_image: selectedImageLicenseFront,
        license_back_image: selectedImageLicenseBack,
        license_front_image_ext: selectedImageLicenseFrontExt,
        license_back_image_ext: selectedImageLicenseBackExt
      }
      const response = await fetch(
        `${API_URL}/api/v1/registration/vehicle`,
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

      console.log("Driver Form Body:", body);

      const jsonresponse = await response.json();

      if (jsonresponse.statusCode === 200) {
        console.log("Driver Form Response:", jsonresponse);
      }
      else if (jsonresponse.statusCode === 500) {
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'bg-success',
          },
        }
        )
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const PaymentForm = async () => {
    try {
      if (inputBankAccount || inputEasyPaisa || inputJazzCash || inputRaastID) {
        const body = {
          option: 1,
          drive_option: "Driver",
          bank_account_number: inputBankAccount,
          easy_paisa_number: inputEasyPaisa,
          jazz_cash_number: inputJazzCash,
          raast_number: inputRaastID
        }
        const response = await fetch(
          `${API_URL}/api/v1/registration/driver`,
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

        console.log("Payment Form Body:", body);

        const jsonresponse = await response.json();

        if (jsonresponse.statusCode === 200) {
          console.log("Payment Form Response:", jsonresponse);
          Swal.fire({
            position: 'top',
            title: 'Congratulations!',
            text: 'Driver Form Submited Successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'bg-success',
            },
          });
          route();
        }
        else if (jsonresponse.statusCode === 500) {
          // alert("Error: " + jsonresponse.message);
          Swal.fire({
            position: 'top',
            // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success',
            },
          }
          )
        }
      }
      else {
        Swal.fire({
          position: 'top',
          // icon: 'warning',
          text: 'Please Enter Payment Details!',
          customClass: {
            confirmButton: 'bg-success',
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
      {!showDriverForm && (
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
              <div className="row justify-content-center">
                <div className="col-md-6 bg-white mt-5 mb-5">
                  <div
                    className="row shadow"
                    style={{ backgroundColor: '#1F5F5B' }}
                  >
                    <h1 className="text-center text-white py-4">
                      Registration Form
                    </h1></div>
                  <Form className="p-3" noValidate validated={validated} onSubmit={handleSubmit}>

                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3"
                        style={{ backgroundColor: "#cddbd9" }}
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
                            <option value="" disabled hidden>
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
                        <Form.Group
                          as={Col}
                          md={cityStartId ? "12" : "12"}
                          controlId="validationCustom02"
                          className="mb-2"
                        >
                          <Form.Label className="text-black fs-6">City</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={cityStartId}
                            onChange={(e) => setCityStartId(e.target.value)}
                            required
                          >
                            <option value="" hidden>
                              Select a City
                            </option>
                            {selectedStartProvinceCities?.map((province) => (
                              <option key={province.id} value={province.id}>
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
                                controlId="validationCustom02"
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="mt-2 text-dark fs-6 fw-bold">Select Area from Dropdown</p>
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
                                  <option value="" disabled>
                                    Select Area from Dropdown
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
                                controlId="validationCustom02"
                              >
                              </Form.Group>
                            )} */}

                            {addNewStart && (
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom01"
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
                        className="col-md-12 px-2 py-3"
                        style={{ backgroundColor: "#cddbd9" }}
                      >
                        <h2 className="text-success mb-3 text-center">
                          DROP-OFF POINT
                        </h2>
                        <Form.Group
                          as={Col}
                          md={cityEndId ? "12" : "12"}
                          controlId="validationCustom04"
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
                            <option value="" disabled hidden>
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
                        <Form.Group
                          as={Col}
                          md={cityEndId ? "12" : "12"}
                          controlId="validationCustom05"
                          className="mb-2"
                        >
                          <Form.Label style={{ color: "#000" }}>City</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={cityEndId}
                            onChange={(e) => setCityEndId(e.target.value)}
                            required
                          >
                            <option value="" hidden>
                              Select a City
                            </option>
                            {selectedEndProvinceCities?.map((province) => (
                              <option key={province.id} value={province.id}>
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
                                controlId="validationCustom06"
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="mt-2 text-dark fs-6 fw-bold">Select Area from Dropdown</p>
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
                                  <option value="" disabled>
                                    Select Area from Dropdown
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

                            {/* {addNewEndField && (
                              <Form.Group
                                as={Col}
                                md="12"
                                className="mt-3"
                                controlId="validationCustom07"
                              >
                                <span
                                  className="colorplace text-danger"
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }}
                                  onClick={AddNewEnd}
                                >
                                  Can't find your area?
                                  <a> Add Here</a>
                                </span>
                              </Form.Group>
                            )} */}

                            {addNewEnd && (
                              <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationCustom08"
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
                        <Modal.Header closeButton>
                          <Modal.Title>Select Starting Location</Modal.Title>
                          <Modal.Title className="text-danger fs-7">If you do not want to give your exact location please choose your nearest landmark</Modal.Title>
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
                            Submit
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <Modal show={showEndModal} onHide={handleCloseEndModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Select Drop-off Location</Modal.Title>
                          <Modal.Title className="text-danger fs-7">If you do not want to give your exact location please choose your nearest landmark</Modal.Title>
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
                            Submit
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </LoadScript>

                    {/* <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          Timings (+/- 15 Minutes)
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

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
                        <Form.Label style={{ color: "#000" }}>
                          Drop-off Time
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

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
                    </Row> */}
                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3"
                        style={{ backgroundColor: "#cddbd9" }}
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
                            Return Time (From destination to start point +/- 30 Minutes)
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
                    <Row className="my-3" style={{ border: '1px solid #cddbd9', backgroundColor: "#cddbd9" }}>
                      <Form.Group as={Col} md="12" controlId="validationCustom10">
                        <Form.Label className="pt-3 px-3 text-black">
                          I Commute (Select Days)
                        </Form.Label>
                      </Form.Group>

                      <div className="row d-flex px-4" >
                        <div className="col">
                          {["checkbox"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3 d-flex flex-wrap">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Monday"
                                    color="success"
                                    checked={daysSelected.includes("Monday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  />
                                }
                                label="Monday"
                              />

                              {/* <Form.Check
                                inline
                                label="Monday"
                                name="group1"
                                type={type}
                                value="Monday"
                                id={`inline-${type}-0`}
                                checked={daysSelected.includes("Monday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Tuesday"
                                    color="success"
                                    checked={daysSelected.includes("Tuesday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  />
                                }
                                label="Tuesday"
                              />
                              {/* <Form.Check
                                inline
                                label="Tuesday"
                                name="group1"
                                type={type}
                                value="Tuesday"
                                id={`inline-${type}-2`}
                                checked={daysSelected.includes("Tuesday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Wednesday"
                                    color="success"
                                    checked={daysSelected.includes("Wednesday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  />
                                }
                                label="Wednesday"
                              />
                              {/* <Form.Check
                                inline
                                label="Wednesday"
                                type={type}
                                value="Wednesday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Wednesday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Thursday"
                                    color="success"
                                    checked={daysSelected.includes("Thursday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  />
                                }
                                label="Thursday"
                              />
                              {/* <Form.Check
                                inline
                                label="Thursday"
                                type={type}
                                value="Thursday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Thursday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Friday"
                                    color="success"
                                    checked={daysSelected.includes("Friday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  />
                                }
                                label="Friday"
                              />
                              {/* <Form.Check
                                inline
                                label="Friday"
                                type={type}
                                value="Friday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Friday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}


                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Saturday"
                                    color="success"
                                    checked={daysSelected.includes("Saturday")}
                                    onChange={handleCheckboxChange}
                                  // //required
                                  />
                                }
                                label="Saturday"
                              />
                              {/* <Form.Check
                                inline
                                label="Saturday"
                                type={type}
                                value="Saturday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Saturday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="group1"
                                    value="Sunday"
                                    color="success"
                                    checked={daysSelected.includes("Sunday")}
                                    onChange={handleCheckboxChange}
                                  // required
                                  // disabled
                                  />
                                }
                                label="Sunday"
                              />
                              {/* <Form.Check
                                inline
                                label="Sunday"
                                type={type}
                                value="Sunday"
                                id={`inline-${type}-3`}
                                checked={daysSelected.includes("Sunday")}
                                onChange={handleCheckboxChange}
                                required
                              /> */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Row>

                    {/* {daysSelected} */}

                    <Row className="mb-3 py-3 shadow shadow-sm form-body">
                      <Form.Group as={Col} md="12" controlId="validationCustom11" className="mb-2">
                        <Form.Label className="fs-6 text-black">My Gender</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className="text-secondary"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="" hidden> Gender </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="12" controlId="validationCustom12" className="mb-2">
                        <Form.Label className="fs-6 text-black">
                          Preferred gender of travel partner
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className="text-secondary"
                          value={preferredGender}
                          onChange={(e) => setPreferredGender(e.target.value)}
                          required
                        >
                          <option value="" hidden>Preferred Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 py-3 shadow shadow-sm form-body">
                      <Form.Group as={Col} md="12" controlId="validationCustom13" className="mb-2">
                        <Form.Label className="fs-6 text-black">
                          Year of Birth
                        </Form.Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                          <DatePicker label={
                            "MM/DD/YY"
                          }
                            className="bg-white"
                            slotProps={{ textField: { size: "small", color: "success" } }}
                            sx={{ width: "100%" }}
                            value={selectedDate}
                            onChange={handleDateChange}
                            maxDate={eighteenYearsAgo}
                            disableFuture
                          />
                        </LocalizationProvider>
                      </Form.Group>

                      {/* {selectedDate} */}

                      <Form.Group as={Col} md="12" controlId="validationCustom14" className="mb-2">
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
                          <option value="" hidden>Martial Status</option>
                          <option value="Married">Married</option>
                          <option value="Single">Single</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="12" controlId="validationCustom15" className="mb-2">
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
                      <Form.Group as={Col} md="12" controlId="validationCustom16" className="mb-2">
                        <Form.Label className="fs-6 text-black">
                          Profession
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`${isValidProfession ? '' : 'is-invalid'}`}
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
                    {/* 
                    <Row className="mb-3">
                    </Row> */}
                    <Row className="mb-3 py-3 shadow shadow-sm form-body">

                      <Form.Group as={Col} md="12" controlId="validationCustom17" className="mb-2">
                        <Form.Label className="fs-6 text-black">CNIC</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`${isValidCnic ? '' : 'is-invalid'}`}
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
                        <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicFront} />
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
                          Upload CNIC (back)
                        </Form.Label>
                        <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicBack} />
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
                        <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handlePicture} />
                        <Form.Text className="text-danger" style={{ color: "#000" }}>
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
                          handleLogin();
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>
                            <i className="fa fa-spinner fa-spin" /> Submitting...
                          </span>
                        ) : (
                          'Next'
                        )}
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
              <div className="row justify-content-center">
                <div className="col-md-6 bg-white  mt-5 mb-5">
                  <div
                    className="row shadow"
                    style={{ backgroundColor: '#1F5F5B' }}
                  >
                    <h1
                      className="text-center text-white py-4"

                    >
                      {" "}
                      Driver's Registration Form
                    </h1>{" "}
                  </div>

                  <Form
                    className=" p-3"
                  >
                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3 form-body"
                      >
                        <h2 className="text-success mb-3 text-center">
                          Car Details
                        </h2>
                        <Form.Group as={Col} md="12" controlId="validationCustom18" className="mb-2">
                          <Form.Label className="text-dark fs-6">Car Brand</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedCarBrand}
                            onChange={handleCarBrandChange}
                            required
                          // isValid={isCarBrandValid}
                          // isInvalid={!isCarBrandValid}
                          >
                            <option value="" hidden>Car Brand</option>
                            {carBrand?.map((car) => (
                              <option key={car.id} value={car.brand_name}>
                                {car.brand_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom19" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Model Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            className="text-secondary"
                            value={selectedModelName}
                            onChange={(e) => setSelectedModelName(e.target.value)}
                            placeholder="Model Name (Civic, City etc)"
                            defaultValue=""
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom20" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Manufacturing Year
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
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
                        <Form.Group as={Col} md="12" controlId="validationCustom21" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            My Car has AC
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedCarAC}
                            onChange={(e) => setSelectedCarAC(e.target.value)}
                            required
                          >
                            <option value="" hidden>AC</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="validationCustom22" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Car CC
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedCarCC}
                            onChange={(e) => setSelectedCarCC(e.target.value)}
                            required
                          >
                            <option value="" hidden>Select Car CC</option>
                            {carCC?.map((car) => (
                              <option key={car.id} value={car.car_cc}>
                                {car.car_cc}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFile" as={Col} md="12"
                        >
                          <Form.Label className="text-dark fs-6">
                            Upload Car Image with visible number plate
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleImageSelect}
                            required
                          />
                          <Form.Text className="text-danger" style={{ color: "#000" }}>
                            The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                          </Form.Text>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3 form-body"
                      >
                        <h2 className="text-success mb-3 text-center">
                          Car Registration
                        </h2>
                        <Form.Group as={Col} md="12" controlId="validationCustom23" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Registration Year
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
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
                        {/* <Form.Group as={Col} md="12" controlId="validationCustom24" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Registration Car Year Ranges
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedCarYearRanges}
                            onChange={(e) => setSelectedCarYearRanges(e.target.value)}
                            required
                          >
                            <option value="" hidden>Select Car Year Ranges</option>
                            {carYearRanges?.map((man) => (
                              <option key={man.id} value={man.car_year_ranges}>
                                {man.car_year_ranges}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group> */}
                        <Form.Group as={Col} md="12" controlId="validationCustom25" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Registeration Number
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            className="text-secondary"
                            value={selectedRegNumber}
                            onChange={(e) => setSelectedRegNumber(e.target.value)}
                            placeholder="Registeration Number"
                            defaultValue=""
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3"
                        style={{ backgroundColor: "#cddbd9" }}
                      >
                        <h2 className="text-success mb-3 text-center">
                          Available Seats
                        </h2>
                        <Form.Group as={Col} md="12" controlId="validationCustom26" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Seats Available
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
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
                        <Form.Group as={Col} md="12" controlId="validationCustom27" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            Seats Available for (Male, Female, Both)
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
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
                      </div></div>

                    <div className="row mb-3 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3"
                        style={{ backgroundColor: "#cddbd9" }}
                      >
                        <h2 className="text-success mb-3 text-center">
                          Route Partner
                        </h2>
                        {/* <Form.Group as={Col} md="12" controlId="validationCustom28" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            I accept one-route partner
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedOneRoutePartner}
                            onChange={(e) => setSelectedOneRoutePartner(e.target.value)}
                            required
                          >
                            <option value="" hidden>I accept one-route partner</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Select>
                        </Form.Group> */}

                        <Form.Group as={Col} md="12" controlId="validationCustom29" className="mb-2">
                          <Form.Label className="text-dark fs-6">
                            I also accept mid-route partner
                          </Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            className="text-secondary"
                            value={selectedMidRoutePartner}
                            onChange={(e) => setSelectedMidRoutePartner(e.target.value)}
                            required
                          >
                            <option value="" hidden>I also accept mid-route partner</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Select>
                        </Form.Group>
                      </div></div>


                   
                    <Row >
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>Car Brand</Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedCarBrand}
                          onChange={handleCarBrandChange}
                          required
                          isValid={isCarBrandValid}
                          isInvalid={!isCarBrandValid}
                        >
                          <option value="" hidden>Car Brand</option>
                          {carBrand?.map((car) => (
                            <option key={car.id} value={car.brand_name}>
                              {car.brand_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group> */}


                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          Car Brand
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#000" }}
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
                      </Form.Group> */}
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#000" }}>
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
                      </Form.Group> */}
                    </Row>
                    <Row >
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          Manufacturing Year
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

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
                      </Form.Group> */}
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#000" }}>
                          Registration Year
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          style={{ color: "#000" }}
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
                      </Form.Group> */}
                    </Row>

                    <Row >
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          Registration Car Year Ranges
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedCarYearRanges}
                          onChange={(e) => setSelectedCarYearRanges(e.target.value)}
                          required
                        >
                          <option value="" hidden>Select Car Year Ranges</option>
                          {carYearRanges?.map((man) => (
                            <option key={man.id} value={man.car_year_ranges}>
                              {man.car_year_ranges}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group> */}
                    </Row>

                    {/* {selectedCarYearRanges} */}

                    <Row >
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
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
                      </Form.Group> */}
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#000" }}>
                          My Car has AC
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedCarAC}
                          onChange={(e) => setSelectedCarAC(e.target.value)}
                          required
                        >
                          <option value="" hidden>AC</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group> */}
                    </Row>
                    <Row >
                      {/* <Form.Group
                        controlId="formFile"
                        as={Col}
                        md="6"
                      >
                        <Form.Label className="mt-3" style={{ color: "#000" }}>
                          Upload Car Image with visible number plate
                        </Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleImageSelect}
                          required
                        />
                      </Form.Group> */}
                      {/* <Form.Group as={Col} md="6" className="mb-3" controlId="validationCustom02">
                        <Form.Label className="mt-3" style={{ color: "#000" }}>
                          Car CC
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedCarCC}
                          onChange={(e) => setSelectedCarCC(e.target.value)}
                          required
                        >
                          <option value="" hidden>Select Car CC</option>
                          {carCC?.map((car) => (
                            <option key={car.id} value={car.car_cc}>
                              {car.car_cc}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group> */}
                    </Row>

                    {/* {selectedCarCC} */}

                    <Row >
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          Seats Available
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

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
                      </Form.Group> */}
                      {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label style={{ color: "#000" }}>
                          Seats Available for (Male, Female, Both)
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedSeatGender}
                          onChange={(e) => setSelectedSeatGender(e.target.value)}
                          required
                        >
                          <option value="" hidden>Seats Available</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                        </Form.Select>
                      </Form.Group> */}
                    </Row>
                    <Row >

                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          I accept one-route partner
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedOneRoutePartner}
                          onChange={(e) => setSelectedOneRoutePartner(e.target.value)}
                          required
                        >
                          <option value="" hidden>I accept one-route partner</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group> */}

                      {/* <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label style={{ color: "#000" }}>
                          I also accept mid-route partner
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"

                          value={selectedMidRoutePartner}
                          onChange={(e) => setSelectedMidRoutePartner(e.target.value)}
                          required
                        >
                          <option value="" hidden>I also accept mid-route partner</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>
                      </Form.Group> */}

                    </Row>
                    {/* <div className="tab">
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-lg-12">
                            <div className="card text-center" >
                              <div className="card-body">
                                <h5 className="card-title">Bank/Payment Details</h5>
                                <p className="small-text text-center">Please provide details to receive payment through Bank Account, Jazz Cash, EasyPaisa or Raast ID. Atleast one field must be filled. </p>
                                <div class="container">
                                  <img src={`${BASE_URL}/assets/images/iban.png`} alt="" />{" "}
                                  <img src={`${BASE_URL}/assets/images/ep.png`} alt="" />{" "}
                                  <img src={`${BASE_URL}/assets/images/jazz.png`} alt="" />{" "}
                                  <img src={`${BASE_URL}/assets/images/raast.png`} alt="" />
                                </div>
                                <form id="paymentForm">
                                  <div className="mt-4">
                                    <input
                                      type="text"
                                      className="form-control mb-2 colorplace"
                                      id="bankAccount"
                                      name="bankAccount"
                                      placeholder="Bank Account (IBAN)"
                                      value={inputBankAccount}
                                      onChange={(e) => setInputBankAccount(e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control mb-2 colorplace"
                                      id="jazzCashAccount"
                                      name="jazzCashAccount"
                                      placeholder="Jazz Cash Account Number"
                                      value={inputJazzCash}
                                      onChange={(e) => setInputJazzCash(e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control mb-2 colorplace"
                                      id="easypaisaAccount"
                                      name="easypaisaAccount"
                                      placeholder="EasyPaisa Account Number"
                                      value={inputEasyPaisa}
                                      onChange={(e) => setInputEasyPaisa(e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control mb-2 colorplace"
                                      id="raastID"
                                      name="raastID"
                                      placeholder="Raast ID"
                                      value={inputRaastID}
                                      onChange={(e) => setInputRaastID(e.target.value)}
                                    />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="row" style={{ border: "1px solid #cddbd9" }}>
                      <div className="col">
                        <div className="container text-center d-flex justify-content-center  flex-wrap py-2">
                          <Button
                            variant="outlined"
                            className={`btn ${showmyself === true ? "btnDriver" : "btnWhite"} py-2 btn-toogle  mx-2 mt-1 fw-bold`}
                            onClick={() => {
                              setshowmyself(true);
                              setshowmydriver(false);
                              setshowboth(false);
                              setInputDriverType("I Driver MySelf");
                              handleDriverTypeForm();
                            }}
                            data-toggle="buttons"
                          >
                            I Drive MySelf
                          </Button>
                          <Button
                            variant="outlined"
                            className={`btn ${showmydriver === true ? "btnDriver" : "btnWhite"}  btn-toogle py-2 mx-2 mt-1 fw-bold`}
                            onClick={() => {
                              setshowmyself(false);
                              setshowmydriver(true);
                              setshowboth(false);
                              setInputDriverType("Driver");
                              handleDriverTypeForm();
                            }}
                            data-toggle="buttons"
                          >
                            My Driver Drives
                          </Button>
                          <Button
                            variant="outlined"
                            className={`btn ${showboth === true ? "btnDriver" : "btnWhite"}  btn-toogle py-2 mx-2 mt-1 fw-bold`}
                            onClick={() => {
                              setshowmydriver(false);
                              setshowmyself(false);
                              setshowboth(true);
                              setInputDriverType("Both");
                              handleDriverTypeForm();
                            }}
                            data-toggle="buttons"
                          >
                            Both
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* {inputDriverType} */}

                    {showmyself && (
                      <>
                        <div className="row mb-3 mt-2 shadow shadow-sm">
                          <div
                            className="col-md-12 px-2 py-3 form-body"
                          >
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom30"
                              className="mb-2"
                            >
                              <h2 className="text-success mb-3 text-center">
                                Driving License Details
                              </h2>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom31"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Driving License No.
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="License No."
                                value={inputDrivingLicenseMySelf}
                                onChange={(e) => setInputDrivingLicenseMySelf(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom32"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Valid Upto
                              </Form.Label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label={"MM/DD/YY"}
                                  className="bg-white"
                                  slotProps={{
                                    textField: { size: "small", color: "success" },
                                  }}
                                  sx={{ width: "100%" }}
                                  value={inputValidUptoMySelf}
                                  onChange={handleValidChange}
                                  disablePast
                                />
                              </LocalizationProvider>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom33"
                              className="mb-2"
                            >
                              <Form.Label text-dark fs-6>
                                Place of Issue
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Place of issue"
                                value={inputPlaceIssueMySelf}
                                onChange={(e) => setInputPlaceIssueMySelf(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom34"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Upload License (front)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseFrontDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom35"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Upload License (back)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseBackDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                          </div></div>
                        {/* <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Driving Licence No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="License No."
                              value={inputDrivingLicenseMySelf}
                              onChange={(e) => setInputDrivingLicenseMySelf(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row> */}
                        {/* <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Valid Upto
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              value={inputValidUptoMySelf}
                              onChange={(e) => setInputValidUptoMySelf(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row> */}
                        {/* <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Place Issued
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              value={inputPlaceIssueMySelf}
                              onChange={(e) => setInputPlaceIssueMySelf(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                        </Row> */}

                        {/* <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleLicenseFrontDriver} />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleLicenseBackDriver} />
                          </Form.Group>
                        </Row> */}

                      </>
                    )}

                    {showmydriver && (
                      <>

                        <div className="row mb-3 mt-2 shadow shadow-sm">
                          <div
                            className="col-md-12 px-2 py-3 form-body"
                          >
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom36"
                              className="mb-2"
                            >
                              <h2 className="text-success mb-3 text-center">
                                Driver's Details
                              </h2>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom37"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Name
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Name"
                                value={inputDriverName}
                                onChange={(e) => setInputDriverName(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom38"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                CNIC
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="CNIC: xxxxxxxxxxxxx"
                                value={inputDriverCnicNumber}
                                onChange={(e) => setInputDriverCnicNumber(e.target.value)}
                                defaultValue=""
                                maxLength={13}
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom39"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Upload CNIC (front)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicFrontDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom40"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark">
                                Upload CNIC (back)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicBackDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                          </div></div>

                        <div className="row mb-3 mt-2 shadow shadow-sm">
                          <div
                            className="col-md-12 px-2 py-3 form-body"
                          >
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom41"
                              className="mb-2"
                            >
                              <h2 className="text-success mb-3 text-center">
                                License Details
                              </h2>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom42"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Driving License No.
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="License No."
                                value={inputDriverLicenseNumber}
                                onChange={(e) => setInputDriverLicenseNumber(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom43"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Valid Upto
                              </Form.Label>
                              <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                  label={"MM/DD/YY"}
                                  className="bg-white"
                                  slotProps={{
                                    textField: { size: "small", color: "success" },
                                  }}
                                  sx={{ width: "100%" }}
                                  value={inputDriverValidUpto}
                                  onChange={handleValidDriverChange}
                                  disablePast
                                />
                              </LocalizationProvider>
                              {/* <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Enter Here"
                                value={inputDriverValidUpto}
                                onChange={(e) => setInputDriverValidUpto(e.target.value)}
                                defaultValue=""
                              /> */}
                            </Form.Group>
                            {/* <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom33"
                              className="mb-2"
                            >
                              <Form.Label text-dark fs-6>
                                Place of Issue
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Place of issue"
                                value={inputPlaceIssueMySelf}
                                onChange={(e) => setInputPlaceIssueMySelf(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group> */}
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom44"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Upload License (front)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseFrontDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom45"
                              className="mb-2"
                            >
                              <Form.Label className="text-dark fs-6">
                                Upload License (back)
                              </Form.Label>
                              <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseBackDriver} />
                              <Form.Text className="text-danger" style={{ color: "#000" }}>
                                The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                              </Form.Text>
                            </Form.Group>
                          </div></div>
                        {/* <Row className="mb-3 mt-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="Name"
                              value={inputDriverName}
                              onChange={(e) => setInputDriverName(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              CNIC
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="CNIC: xxxxxxxxxxxxx"
                              value={inputDriverCnicNumber}
                              onChange={(e) => setInputDriverCnicNumber(e.target.value)}
                              defaultValue=""
                              maxLength={13}
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload CNIC (front)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleCnicFrontDriver} />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark">
                              Upload CNIC (back)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleCnicBackDriver} />
                          </Form.Group>
                        </Row> */}

                        <Row className="">
                          {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload CNIC (front)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleCnicFrontDriver} />
                          </Form.Group> */}
                          {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload CNIC (back)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleCnicBackDriver} />
                          </Form.Group> */}
                        </Row>
                        <Row className="">
                          {/* <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Driving Licence No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="License No."
                              value={inputDriverLicenseNumber}
                              onChange={(e) => setInputDriverLicenseNumber(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group> */}
                        </Row>
                        <Row className="">
                          {/* <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Valid Upto
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="colorplace"
                              placeholder="Enter Here"
                              value={inputDriverValidUpto}
                              onChange={(e) => setInputDriverValidUpto(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group> */}
                        </Row>
                        <Row className="">
                          {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleLicenseFrontDriver} />
                          </Form.Group> */}
                          {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label style={{ color: "#000" }}>
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" required onChange={handleLicenseBackDriver} />
                          </Form.Group> */}
                        </Row>
                      </>
                    )}
                    {showboth && (<>

                      {/* <div className="row mb-3 mt-2 shadow shadow-sm">
                        <div
                          className="col-md-12 px-2 py-3 form-body"
                        >
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom50"
                            className="mb-2"
                          >
                            <h2 className="text-success mb-3 text-center">
                              My Driver Details
                            </h2>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom51"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Driving License No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="License No."
                              value={inputDriverLicenseNumber}
                              onChange={(e) => setInputDriverLicenseNumber(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom52"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Valid Upto
                            </Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                  label={"MM/DD/YY"}
                                  className="bg-white"
                                  slotProps={{
                                    textField: { size: "small", color: "success" },
                                  }}
                                  sx={{ width: "100%" }}
                                  value={inputDriverValidUpto}
                                  onChange={handleValidDriverChange}
                                  disablePast
                                />
                              </LocalizationProvider>
                        
                          </Form.Group>
                          <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom33"
                              className="mb-2"
                            >
                              <Form.Label text-dark fs-6>
                                Place of Issue
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Place of issue"
                                value={inputPlaceIssueMySelf}
                                onChange={(e) => setInputPlaceIssueMySelf(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom53"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseFrontDriver} />
                            <Form.Text className="text-danger" style={{ color: "#000" }}>
                            The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                        </Form.Text>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom54"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseBackDriver} />
                          </Form.Group>
                        </div></div> */}

                      <div className="row mb-3 mt-2 shadow shadow-sm">
                        <div
                          className="col-md-12 px-2 py-3 form-body"
                        >
                          <h2 className="text-success mb-3 text-center">
                            Driver's Details
                          </h2>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom46"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="Name"
                              value={inputDriverName}
                              onChange={(e) => setInputDriverName(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom47"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              CNIC
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="CNIC: xxxxxxxxxxxxx"
                              value={inputDriverCnicNumber}
                              onChange={(e) => setInputDriverCnicNumber(e.target.value)}
                              defaultValue=""
                              maxLength={13}
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom48"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload CNIC (front)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicFrontDriver} />
                            <Form.Text className="text-danger" style={{ color: "#000" }}>
                              The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                            </Form.Text>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom49"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark">
                              Upload CNIC (back)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleCnicBackDriver} />
                            <Form.Text className="text-danger" style={{ color: "#000" }}>
                              The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                            </Form.Text>
                          </Form.Group>
                        </div></div>
                      {/* <Row className="mb-3 mt-3">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label style={{ color: "#000" }}>
                            Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            className="colorplace"
                            placeholder="Name"
                            value={inputDriverName}
                            onChange={(e) => setInputDriverName(e.target.value)}
                            defaultValue=""
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label style={{ color: "#000" }}>
                            CNIC
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            className="colorplace"
                            placeholder="CNIC: xxxxxxxxxxxxx"
                            value={inputDriverCnicNumber}
                            onChange={(e) => setInputDriverCnicNumber(e.target.value)}
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
                          <Form.Label style={{ color: "#000" }}>
                            Upload CNIC (front)
                          </Form.Label>
                          <Form.Control type="file" required onChange={handleCnicFrontDriver} />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label style={{ color: "#000" }}>
                            Upload CNIC (back)
                          </Form.Label>
                          <Form.Control type="file" required onChange={handleCnicBackDriver} />
                        </Form.Group>
                      </Row> */}

                      <div className="row mb-3 mt-2 shadow shadow-sm">
                        <div
                          className="col-md-12 px-2 py-3 form-body"
                        >
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom50"
                            className="mb-2"
                          >
                            <h2 className="text-success mb-3 text-center">
                              Driver's License Details
                            </h2>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom51"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Driving License No.
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="License No."
                              value={inputDriverLicenseNumber}
                              onChange={(e) => setInputDriverLicenseNumber(e.target.value)}
                              defaultValue=""
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom52"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Valid Upto
                            </Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                              <DatePicker
                                label={"MM/DD/YY"}
                                className="bg-white"
                                slotProps={{
                                  textField: { size: "small", color: "success" },
                                }}
                                sx={{ width: "100%" }}
                                value={inputDriverValidUpto}
                                onChange={handleValidDriverChange}
                                disablePast
                              />
                            </LocalizationProvider>
                            {/* <Form.Control
                              required
                              type="text"
                              className="text-secondary"
                              placeholder="Enter Here"
                              value={inputDriverValidUpto}
                              onChange={(e) => setInputDriverValidUpto(e.target.value)}
                              defaultValue=""
                            /> */}
                          </Form.Group>
                          {/* <Form.Group
                              as={Col}
                              md="12"
                              controlId="validationCustom33"
                              className="mb-2"
                            >
                              <Form.Label text-dark fs-6>
                                Place of Issue
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                className="text-secondary"
                                placeholder="Place of issue"
                                value={inputPlaceIssueMySelf}
                                onChange={(e) => setInputPlaceIssueMySelf(e.target.value)}
                                defaultValue=""
                              />
                            </Form.Group> */}
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom53"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload License (front)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseFrontDriver} />
                            <Form.Text className="text-danger" style={{ color: "#000" }}>
                              The picture must be of type: jpg, png, jpeg, heic (max size: 10MB).
                            </Form.Text>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom54"
                            className="mb-2"
                          >
                            <Form.Label className="text-dark fs-6">
                              Upload License (back)
                            </Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" required onChange={handleLicenseBackDriver} />
                          </Form.Group>
                        </div></div>
                         


                    </>)
                    }
                     <div className="row mb-3 mt-2 shadow shadow-sm">
                      <div
                        className="col-md-12 px-2 py-3 form-body"
                      >
                        <h2 className="text-success mb-3 text-center">
                          Bank/Payment Details
                        </h2>
                        <p className="small-text text-center">Please provide details to receive payment through Bank Account, Jazz Cash, EasyPaisa or Raast ID. Atleast one field must be filled. </p>
                        <div class="container text-center">
                          <img className="mx-2" src={`${BASE_URL}/assets/images/iban.png`} alt="" />{" "}
                          <img className="mx-2" src={`${BASE_URL}/assets/images/ep.png`} alt="" />{" "}
                          <img className="mx-2" src={`${BASE_URL}/assets/images/jazz.png`} alt="" />{" "}
                          <img className="mx-2" src={`${BASE_URL}/assets/images/raast.png`} alt="" />
                        </div>
                        <form id="paymentForm">
                          <div className="mt-4 px-3">
                            <input
                              type="text"
                              className="form-control mb-2 text-secondary"
                              id="bankAccount"
                              name="bankAccount"
                              placeholder="Bank Account (IBAN)"
                              value={inputBankAccount}
                              onChange={(e) => setInputBankAccount(e.target.value)}
                              required
                            />
                          </div>
                          <div className="px-3">
                            <input
                              type="text"
                              className="form-control mb-2 text-secondary "
                              id="jazzCashAccount"
                              name="jazzCashAccount"
                              placeholder="Jazz Cash Account Number"
                              value={inputJazzCash}
                              onChange={(e) => setInputJazzCash(e.target.value)}
                              required
                            />
                          </div>
                          <div className="px-3">
                            <input
                              type="text"
                              className="form-control mb-2 text-secondary"
                              id="easypaisaAccount"
                              name="easypaisaAccount"
                              placeholder="EasyPaisa Account Number"
                              value={inputEasyPaisa}
                              onChange={(e) => setInputEasyPaisa(e.target.value)}
                              required
                            />
                          </div>
                          <div className="px-3">
                            <input
                              type="text"
                              className="form-control mb-2 text-secondary"
                              id="raastID"
                              name="raastID"
                              placeholder="Raast ID"
                              value={inputRaastID}
                              onChange={(e) => setInputRaastID(e.target.value)}
                            />
                          </div>
                        </form>
                      </div></div>
                    <Stack
                      direction="row"
                      className="mb-4 mt-3"
                      spacing={2}
                      style={{ justifyContent: "right" }}
                    >
                      <Button variant="" className="btnregistration" onClick={handleDriver} disabled={isLoading}>
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
      )}
    </>
  );
};

export default DriverRegistration;