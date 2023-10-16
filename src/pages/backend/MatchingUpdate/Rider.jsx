import React, { useState, useEffect, useRef } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Box, Breadcrumbs, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, Typography } from '@mui/material'
import { Button } from "@mui/base";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { displayNotification } from '../../../helpers';
import { Autocomplete, GoogleMap, MarkerF } from '@react-google-maps/api';

const Rider = () => {

  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const autocompleteRef = useRef(null);
  const [daysSelected, setDaysSelected] = useState([]);
  const [homeTimeSlots, setHomeTimeSlots] = useState([]);
  const [selectedHomeTime, setSelectedHomeTime] = useState("");
  const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
  const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [startArea, setStartArea] = useState("");
  const [endArea, setEndArea] = useState("");
  const [showfield, setShowField] = useState(false);

  // For Start Point
  const [startBounds, setStartBounds] = useState([]);
  const [autocompleteStartBounds, setAutocompleteStartBounds] = useState(null);
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
  const [endBounds, setEndBounds] = useState([]);
  const [autocompleteEndBounds, setAutocompleteEndBounds] = useState(null);
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
  const [defaultStartCenter, setDefaultStartCenter] = useState({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionStart, setMarkerPositionStart] = useState({ lat: 30.3753, lng: 69.3451 });

  // For End Point
  const [defaultEndCenter, setDefaultEndCenter] = useState({ lat: 30.3753, lng: 69.3451 });
  const [markerPositionEnd, setMarkerPositionEnd] = useState({ lat: 30.3753, lng: 69.3451 });

  // For Modals
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const [addNewStart, setAddNewStart] = useState(false);
  const [addNewStartDropdown, setAddNewStartDropdown] = useState(true);
  const [addNewStartField, setAddNewStartField] = useState(true);
  const [addNewEnd, setAddNewEnd] = useState(false);
  const [addNewEndDropdown, setAddNewEndDropdown] = useState(true);
  const [addNewEndField, setAddNewEndField] = useState(true);

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

  useEffect(() => {
    const fetchCityBounds = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${cityStart}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results.length > 0) {
            const cityBounds = data.results[0].geometry.bounds;
            console.log("City Start Bounds", cityBounds);
            setStartBounds(cityBounds);
          } else {
            console.error('City not found');
          }
        } else {
          console.error('Error fetching city data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (cityStart) {
      fetchCityBounds();
    }
  }, [cityStart]);

  useEffect(() => {
    if (startBounds && startBounds.southwest && startBounds.northeast) {
      // Convert startBounds data into LatLngBounds object
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(startBounds.southwest.lat, startBounds.southwest.lng),
        new window.google.maps.LatLng(startBounds.northeast.lat, startBounds.northeast.lng)
      );

      setAutocompleteStartBounds(bounds);
    }
  }, [startBounds]);

  useEffect(() => {
    const fetchCityBounds = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${cityEnd}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.results.length > 0) {
            const cityBounds = data.results[0].geometry.bounds;
            console.log("City End Bounds", cityBounds);
            setEndBounds(cityBounds);
          } else {
            console.error('City not found');
          }
        } else {
          console.error('Error fetching city data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (cityEnd) {
      fetchCityBounds();
    }
  }, [cityEnd]);

  useEffect(() => {
    if (endBounds && endBounds.southwest && endBounds.northeast) {
      // Convert startBounds data into LatLngBounds object
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(endBounds.southwest.lat, endBounds.southwest.lng),
        new window.google.maps.LatLng(endBounds.northeast.lat, endBounds.northeast.lng)
      );

      setAutocompleteEndBounds(bounds);
    }
  }, [endBounds]);

  const handleProvinceStartChange = (event) => {
    setCityStartId("");
    setLocationStartStringField("");
    setProvinceStartId(event.target.value);
  };

  const handleProvinceEndChange = (event) => {
    setCityEndId("");
    setLocationEndStringField("");
    setProvinceEndId(event.target.value);
  };

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

  const handleLocationStart = (e) => {
    const selectedValue = e.target.value;
    const selectedId = selectedStartCityArea.find((option) => option.id === selectedValue)?.value;
    setLocationStartString(selectedId);
    setLocationStartStringId(selectedValue);
    setAddNewStartField(false);
    handleShowStartModal();
  };

  const handleLocationEnd = (e) => {
    const selectedValue = e.target.value;
    const selectedId = selectedEndCityArea.find((option) => option.id === selectedValue)?.value;
    setLocationEndString(selectedId);
    setLocationEndStringId(selectedValue);
    setAddNewEndField(false);
    handleShowEndModal();
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
        displayNotification("warning", `Please select a place in ${cityStart}.`);
      }
    } else {
      // Handle the case when place is not valid.
      console.error('Invalid place object:', place);
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
        // Swal.fire({
        //   position: 'top',
        //   // // icon: 'warning',
        //   text: `Please select a place in ${cityEnd}.`,
        //   customClass: {
        //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("warning", `Please select a place in ${cityEnd}.`);
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

  const handleMapClickEnd = (event) => {
    console.log(event);
    setMarkerPositionEnd({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

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
    setDropDownStartData(jsonresponse);
    setDropDownEndData(jsonresponse);
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
      setSelectedHomeTime(jsonresponse[0].matches.time_depart_id);
      setSelectedOfficeTime(jsonresponse[0].matches.time_return_id);
      setPreferredGender(jsonresponse[0].contact.preferred_gender);
      setStartArea(jsonresponse[0].location.start_area);
      setEndArea(jsonresponse[0].location.end_area);
      console.log("Update Driver Details Data", jsonresponse);
      const mynewarray = jsonresponse[0].matches.days.split(',');
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

      let nameArrayStart = [markerPositionStart.lat, markerPositionStart.lng];
      const myStringStart = nameArrayStart.toString();
      let nameArrayEnd = [markerPositionEnd.lat, markerPositionEnd.lng];
      const myStringEnd = nameArrayEnd.toString();

      if (daysSelected === "" || selectedHomeTime === "" || selectedOfficeTime === ""
        || preferredGender === "" || cityStartId === ""
        || provinceStartId === "" || locationStartStringId === "" || locationStartString === ""
        || myStringStart === "" || cityEndId === "" || provinceEndId === ""
        || locationEndStringId === "" || locationEndString === "" || myStringEnd === "") {
        displayNotification("error", `Please fill all fields`);
      }
      else {
        const body = {
          days: daysSelected,
          start_time_id: selectedHomeTime,
          return_time_id: selectedOfficeTime,
          prefer_genders: preferredGender,
          change_location: true,
          start_point: {
            city_id: cityStartId,
            province_id: provinceStartId,
            area_id: locationStartStringId,
            area_google: {
              name: locationStartString,
              "place_id": "ChIJGQ_wq43t3zgRel4CwxgjgQs"
            },
            name: myStringStart
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
          },
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
          displayNotification("success", "Matching criteria has been updated successfully");
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
                {showfield === true ? (
                  <>
                    <h3 className="text-success mb-3 text-center">
                      STARTING POINT
                      <Tooltip title={<h6 className="px-2">{"You have the option to choose your starting or pickup location using Google Map, which becomes accessible once you have selected your province, city and area."}</h6>}>
                        <Link
                          // to='/notification'
                          className='mx-1 h-15px d-inline-block'
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fs-4 fa-circle-info icon-tooltip-blue"></i>
                        </Link>
                      </Tooltip>
                    </h3>
                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label" color='success'>Select a Province</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color='success'
                          value={provinceStartId}
                          onChange={handleProvinceStartChange}
                          className="bg-light text-left"
                          label="Select a Province"
                        // required
                        >
                          {dropdownStartdata?.countries[0]?.provinces?.map(
                            (province) => (
                              <MenuItem key={province.id} value={province.id}>
                                {province.value}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label" color='success'>Select a City</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color='success'
                          value={cityStartId}
                          onChange={(e) => {
                            console.log(e.target);
                            const selectedValue = e.target.value;
                            const selectedId = selectedStartProvinceCities.find((option) => option.id === selectedValue)?.value;

                            // Set the ID
                            setCityStartId(selectedValue);

                            // Set the value
                            setCityStart(selectedId);
                            setAddNewStartDropdown(true);
                            setAddNewStart(false);
                            setAddNewStartField(true);
                          }}
                          className="bg-light text-left"
                          label="Select a City"
                        // required
                        >
                          {selectedStartProvinceCities?.map((province) => (
                            <MenuItem
                              key={province.id}
                              value={province.id}
                            >
                              {province.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    {cityStartId && (
                      <>
                        {addNewStartDropdown && (
                          <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                            <div className="d-flex justify-content-end">
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
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label" color='success'>Select Area from Dropdown</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                color='success'
                                value={locationStartStringId}
                                onChange={handleLocationStart}
                                className="bg-light text-left"
                                label="Select Area from Dropdown"
                              // required
                              >
                                {selectedStartCityArea?.map((province) => (
                                  <MenuItem
                                    key={province.id}
                                    value={province.id}
                                  >
                                    {province.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        )}

                        {addNewStart && (
                          <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                onLoad={(autocomplete) =>
                                  (autocompleteRef.current = autocomplete)
                                }
                                onPlaceChanged={handlePlaceSelectStart}
                                restrictions={{ country: "PK" }}
                                bounds={autocompleteStartBounds}
                                options={{ strictBounds: true }}
                              >
                                <TextField
                                  required
                                  fullWidth
                                  size='small'
                                  type="text"
                                  color='success'
                                  className="bg-light text-left"
                                  value={locationStartStringField}
                                  onChange={handleLocationStartField}
                                  placeholder="Enter your area"
                                  id='outlined-basic'
                                  defaultValue=""
                                />
                              </Autocomplete>
                            </FormControl>
                          </Box>
                        )}
                      </>
                    )}

                    <h3 className="text-success mb-3 text-center">
                      DROP-OFF POINT
                      <Tooltip title={<h6 className="px-2">{"You have the option to choose your drop-off location using Google Map, which becomes accessible once you've selected your province, city and area."}</h6>}>
                        <Link
                          // to='/notification'
                          className='mx-1 h-15px d-inline-block'
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fs-4 fa-circle-info icon-tooltip-blue"></i>
                        </Link>
                      </Tooltip>
                    </h3>

                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label" color='success'>Province</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color='success'
                          value={provinceEndId}
                          onChange={handleProvinceEndChange}
                          className="bg-light text-left"
                          label="Select a Province"
                        // required
                        >
                          {dropdownEnddata?.countries[0]?.provinces?.map(
                            (province) => (
                              <MenuItem key={province.id} value={province.id}>
                                {province.value}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label" color='success'>City</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          color='success'
                          value={cityEndId}
                          onChange={(e) => {
                            console.log(e.target);
                            const selectedValue = e.target.value;
                            const selectedId = selectedEndProvinceCities.find((option) => option.id === selectedValue)?.value;

                            // Set the ID
                            setCityEndId(selectedValue);

                            // Set the value
                            setCityEnd(selectedId);
                            setAddNewEndDropdown(true);
                            setAddNewEnd(false);
                            setAddNewEndField(true);
                          }}
                          className="bg-light text-left"
                          label="Select a City"
                        // required
                        >
                          {selectedEndProvinceCities?.map((province) => (
                            <MenuItem
                              key={province.id}
                              value={province.id}
                            >
                              {province.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {cityEndId && (
                      <>
                        {addNewEndDropdown && (
                          <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                            <div className="d-flex justify-content-end">
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
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label" color='success'>Select Area from Dropdown</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                color='success'
                                value={locationEndStringId}
                                onChange={handleLocationEnd}
                                className="bg-light text-left"
                                label="Select Area from Dropdown"
                              // required
                              >
                                {selectedEndCityArea?.map((province) => (
                                  <MenuItem
                                    key={province.id}
                                    value={province.id}
                                  >
                                    {province.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        )}

                        {addNewEnd && (
                          <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                onLoad={(autocomplete) =>
                                  (autocompleteRef.current = autocomplete)
                                }
                                onPlaceChanged={handlePlaceSelectEnd}
                                restrictions={{ country: "PK" }}
                                bounds={autocompleteEndBounds}
                                options={{ strictBounds: true }}
                              >
                                <TextField
                                  required
                                  fullWidth
                                  size='small'
                                  type="text"
                                  color='success'
                                  className="bg-light text-left"
                                  value={locationEndStringField}
                                  onChange={handleLocationEndField}
                                  placeholder="Enter your area"
                                  id='outlined-basic'
                                  defaultValue=""
                                />
                              </Autocomplete>
                            </FormControl>
                          </Box>
                        )}
                      </>
                    )}

                    <Modal show={showStartModal} onHide={handleCloseStartModal}>
                      <Modal.Header className="d-block" >
                        <Modal.Title>Select Starting Location</Modal.Title>
                        <Modal.Title className="text-danger fs-7">To get maximum suggestions/matches please select prominent landmark or community/society gate as a pickup point.</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Container className="d-flex justify-content-center align-items-center mb-3">
                          <Row style={{ height: "100%", width: "100%" }}>
                            <GoogleMap
                              zoom={15}
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
                        <Button variant="contained" className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={handleCloseStartModal}>
                          Select
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Modal show={showEndModal} onHide={handleCloseEndModal}>
                      <Modal.Header className="d-block" >
                        <Modal.Title>Select Drop-off Location</Modal.Title>
                        <Modal.Title className="text-danger fs-7">To get maximum suggestions/matches please select prominent landmark or community/society gate as a pickup point</Modal.Title>
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
                        <Button variant="contained" className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={handleCloseEndModal}>
                          Select
                        </Button>
                      </Modal.Footer>
                    </Modal>

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
                        className="font-custom btn btn-sm fs-6 mr-3 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
                        onClick={sendRequest}
                      >
                        Update
                      </Button>
                      <Button
                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white px-3 py-2 mb-3"
                        onClick={() => {
                          setShowField(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div> </>)
                  : (
                    <>
                      <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                        <TextField
                          fullWidth
                          size='small'
                          type="text"
                          color='success'
                          className="bg-light text-left"
                          value={startArea}
                          onChange={(e) => setStartArea(e.target.value)}
                          label="Start Area"
                          id='outlined-basic'
                          defaultValue=""
                          disabled
                        />
                      </Box>
                      <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                        <TextField
                          fullWidth
                          size='small'
                          type="text"
                          color='success'
                          className="bg-light text-left"
                          value={endArea}
                          onChange={(e) => setEndArea(e.target.value)}
                          label="End Area"
                          id='outlined-basic'
                          defaultValue=""
                          disabled
                        />
                      </Box>
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
                            label="Preferred Gender"
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
                      </Row>
                    </>)}


                {/* <div className="container my-5">
                  <Button
                    className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
                    onClick={sendRequest}
                  >
                    Update
                  </Button>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rider;