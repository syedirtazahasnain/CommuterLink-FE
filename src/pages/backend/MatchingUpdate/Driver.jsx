import React, { useState, useEffect, useRef } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Box, Breadcrumbs, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, Typography } from '@mui/material'
import { setCurrentPage } from "../../../redux/generalSlice";
import { Button } from "@mui/base";
import Rider from './Rider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { displayNotification } from '../../../helpers';
import { Autocomplete, GoogleMap, MarkerF } from '@react-google-maps/api';

const Driver = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userToken = useSelector((s) => s.login.data.token);
    const autocompleteRef = useRef(null);
    const [daysSelected, setDaysSelected] = useState([]);
    const [homeTimeSlots, setHomeTimeSlots] = useState([]);
    const [selectedHomeTime, setSelectedHomeTime] = useState("");
    const [officeTimeSlots, setOfficeTimeSlots] = useState([]);
    const [selectedOfficeTime, setSelectedOfficeTime] = useState("");
    const [preferredGender, setPreferredGender] = useState("");
    const [carBrand, setCarBrand] = useState([]);
    const [selectedCarBrand, setSelectedCarBrand] = useState("");
    const [carCC, setCarCC] = useState([]);
    const [selectedCarCC, setSelectedCarCC] = useState("");
    const [selectedModelName, setSelectedModelName] = useState("");
    const [selectedRegYear, setSelectedRegYear] = useState("");
    const [regYear, setRegYear] = useState([]);
    const [option, setOption] = useState("");
    const [startArea, setStartArea] = useState("");
    const [endArea, setEndArea] = useState("");
    const [showfield, setShowField] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // State to store the selected option
    const [inputBankAccount, setInputBankAccount] = useState(null);
    const [inputEasyPaisa, setInputEasyPaisa] = useState(null);
    const [inputJazzCash, setInputJazzCash] = useState(null);
    const [inputRaastID, setInputRaastID] = useState(null);
    const [paymentOptions, setPaymentOptions] = useState("");
    const [isIBANValid, setIsIBANValid] = useState(true);
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
    const [isValidJazzCash, setIsValidJazzCash] = useState(true);
    const [isValidEasyPaisa, setIsValidEasyPaisa] = useState(true);
    const [isValidRaastID, setIsValidRaastID] = useState(true);
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

            const filteredStartCities = dropdownStartdata?.area?.filter(
                (city) => city.parent_id == cityStartId
            );

            const citystring = selectedStartProvinceCities?.filter(
                (city) => city.id == cityStartId
            );

            setLocationStartString(citystring[0]?.value);
            setSelectedStartCityArea(filteredStartCities ? filteredStartCities : []);
        }
    }, [cityStartId]);

    useEffect(() => {

        if (cityEndId) {

            const filteredEndCities = dropdownEnddata?.area.filter(
                (city) => city.parent_id == cityEndId
            );

            const citystring = selectedEndProvinceCities?.filter(
                (city) => city.id == cityEndId
            );

            setLocationEndString(citystring[0]?.value);
            setSelectedEndCityArea(filteredEndCities ? filteredEndCities : []);
        }
    }, [cityEndId]);

    //console.log(locationEndString);

    useEffect(() => {
        // Function to fetch the geocoding data
        const getGeocodeStartData = async () => {
            try {

                if (locationStartString || locationStartStringField) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationStartString ? locationStartString : locationStartStringField)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
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
                if (locationEndString || locationEndStringField) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationEndString ? locationEndString : locationEndStringField)}&key=AIzaSyCrX4s2Y_jbtM-YZOmUwWK9m-WvlCu7EXA`
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

    useEffect(() => {
        getdropdowndata();
        getProfileData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    useEffect(() => {
        if (inputBankAccount !== null) {
            setSelectedOption("bank_account_number");
        }
    }, [inputBankAccount]);

    useEffect(() => {
        if (inputJazzCash !== null) {
            setSelectedOption("jazz_cash_number");
        }
    }, [inputJazzCash]);

    useEffect(() => {
        if (inputEasyPaisa !== null) {
            setSelectedOption("easy_paisa_number");
        }
    }, [inputEasyPaisa]);

    useEffect(() => {
        if (inputRaastID !== null) {
            setSelectedOption("raast_number");
        }
    }, [inputRaastID]);

    useEffect(() => {
        dispatch(setCurrentPage("matchingupdate"));
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
        setDropDownStartData(jsonresponse);
        setDropDownEndData(jsonresponse);
        setHomeTimeSlots(jsonresponse.time_slots);
        setOfficeTimeSlots(jsonresponse.time_slots);
        setCarBrand(jsonresponse.car_brand);
        setCarCC(jsonresponse.car_cc);
        setRegYear(jsonresponse.car_reg_year);
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
            if (jsonresponse) {
                setOption(jsonresponse[0].userlist.vehicle_option);
            }
            setSelectedHomeTime(jsonresponse[0].matches.time_depart_id);
            setSelectedOfficeTime(jsonresponse[0].matches.time_return_id);
            setPreferredGender(jsonresponse[0].contact.preferred_gender);
            setProvinceStartId(jsonresponse[0].location.start_province_id);
            setCityStart(jsonresponse[0].location.start_city);
            setCityStartId(jsonresponse[0].location.start_city_id);
            setLocationStartStringId(jsonresponse[0].location.start_area_id);
            setLocationStartStringField(jsonresponse[0].location.start_area);
            setProvinceEndId(jsonresponse[0].location.end_province_id);
            setCityEndId(jsonresponse[0].location.end_city_id);
            setCityEnd(jsonresponse[0].location.end_city);
            setLocationEndStringId(jsonresponse[0].location.end_area_id);
            setLocationEndStringField(jsonresponse[0].location.end_area);
            setStartArea(jsonresponse[0].location.start_area);
            setEndArea(jsonresponse[0].location.end_area);
            setInputBankAccount(jsonresponse[0]?.driver_account?.bank_account_number);
            setInputJazzCash(jsonresponse[0]?.driver_account?.jazz_cash_number);
            setInputEasyPaisa(jsonresponse[0]?.driver_account?.easy_paisa_number);
            setInputRaastID(jsonresponse[0]?.driver_account?.raast_number);
            setPaymentOptions(jsonresponse[0]?.driver_account);
            // setDaysSelected(jsonresponse[0].matches.days);
            setSelectedCarBrand(jsonresponse[0]?.vehicle?.car_make);
            setSelectedCarCC(jsonresponse[0]?.vehicle?.car_cc_id);
            setSelectedModelName(jsonresponse[0]?.vehicle?.car_model);
            setSelectedRegYear(jsonresponse[0]?.vehicle?.car_reg_year_id);
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

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value); // Update the selected option
    };

    const handleInputChange = (e) => {
        setInputEasyPaisa(null);
        setInputJazzCash(null);
        setInputRaastID(null);

        let value = e.target.value;

        // Remove any special characters and spaces
        value = value.replace(/[^a-zA-Z0-9]/g, '');

        // Enforce a maximum length of 24 characters
        if (value.length > 24) {
            value = value.slice(0, 24);
        }

        setInputBankAccount(value);

        // Check if the entered value is valid and reset the validation state
        setIsIBANValid(value.length === 24);
    };

    const validateEasyPaisa = (inputEasyPaisa) => {
        setInputJazzCash(null);
        setInputRaastID(null);
        setInputBankAccount(null);
        // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
        const phonePattern = /^03\d{9}$/;
        if (inputEasyPaisa === "" || phonePattern.test(inputEasyPaisa)) {
            setInputEasyPaisa(inputEasyPaisa);
            setIsValidEasyPaisa(true);
        } else {
            setInputEasyPaisa(inputEasyPaisa);
            setIsValidEasyPaisa(false);
        }
    };

    const validateRaastID = (inputRaastID) => {
        setInputJazzCash(null);
        setInputEasyPaisa(null);
        setInputBankAccount(null);
        // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
        const phonePattern = /^03\d{9}$/;
        if (inputRaastID === "" || phonePattern.test(inputRaastID)) {
            setInputRaastID(inputRaastID);
            setIsValidRaastID(true);
        } else {
            setInputRaastID(inputRaastID);
            setIsValidRaastID(false);
        }
    };

    const validateJazzCash = (inputJazzCash) => {
        setInputRaastID(null);
        setInputEasyPaisa(null);
        setInputBankAccount(null);
        // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
        const phonePattern = /^03\d{9}$/;
        if (inputJazzCash === "" || phonePattern.test(inputJazzCash)) {
            setInputJazzCash(inputJazzCash);
            setIsValidJazzCash(true);
        } else {
            setInputJazzCash(inputJazzCash);
            setIsValidJazzCash(false);
        }
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

    const sendRequest = async () => {
        try {

            let nameArrayStart = [markerPositionStart.lat, markerPositionStart.lng];
            const myStringStart = nameArrayStart.toString();
            let nameArrayEnd = [markerPositionEnd.lat, markerPositionEnd.lng];
            const myStringEnd = nameArrayEnd.toString();

            if (daysSelected.length === 0 || selectedHomeTime === "" || selectedOfficeTime === ""
                || preferredGender === "" || selectedCarBrand === "" || selectedCarCC === ""
                || selectedModelName === "" || selectedRegYear === "" || cityStartId === ""
                || provinceStartId === "" || locationStartStringId === "" || locationStartString === ""
                || myStringStart === "" || cityEndId === "" || provinceEndId === ""
                || locationEndStringId === "" || locationEndString === "" || myStringEnd === "") {
                displayNotification("warning", "Please fill all fields!");
            }
            else {
                const body = {
                    days: daysSelected,
                    start_time_id: selectedHomeTime,
                    return_time_id: selectedOfficeTime,
                    prefer_genders: preferredGender,
                    car_make: selectedCarBrand,
                    car_cc: selectedCarCC,
                    car_model: selectedModelName,
                    car_reg_year: selectedRegYear,
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
                    option: 1,
                    drive_option: "Both",
                    bank_account_number: inputBankAccount,
                    easy_paisa_number: inputEasyPaisa,
                    jazz_cash_number: inputJazzCash,
                    raast_number: inputRaastID,
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

                    //window.location.reload();
                } else if (jsonresponse.status_code === 100) {
                    console.log('100');
                    displayNotification("error", `${jsonresponse.message}`);
                }
                else if (jsonresponse.statusCode === 500) {
                    console.log('500');
                    displayNotification("error", `${jsonresponse.message}`);
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            // Handle error appropriately, e.g., display an error message to the user
            displayNotification("warning", "An error occured while sending the request");
        }
    };

    return (
        <div>
            {option === 1 ?
                (
                    <>
                        <div className="card p-4">
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
                                    <div className="container text-center mt-4">
                                        <h2 className="text-success fw-bold mb-4">Update Additional Information</h2>
                                        <Form className="text-center">
                                            {showfield === true ? (
                                                <>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Form.Label className="fs-6 text-success">
                                                            {" "}
                                                            STARTING POINT
                                                        </Form.Label>
                                                        <p
                                                            className="colorplace text-danger"
                                                            style={{
                                                                cursor: "pointer",
                                                                textDecoration: "underline",
                                                            }}
                                                        // onClick={AddNewStart}
                                                        >
                                                            <Tooltip title={<h6 className="px-2">{"You have the option to choose your starting or pickup location using Google Map, which becomes accessible once you have selected your province, city and area."}</h6>}>
                                                                <Link
                                                                    // to='/notification'
                                                                    className='mx-1 h-15px d-inline-block'
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <i className="fa-solid fs-4 fa-circle-info icon-tooltip-blue"></i>
                                                                </Link>
                                                            </Tooltip>

                                                        </p></div>

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
                                                                    // setAddNewStartDropdown(true);
                                                                    // setAddNewStart(false);
                                                                    // setAddNewStartField(true);
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
                                                                    <div className="d-flex justify-content-start">
                                                                        {addNewStartField && (
                                                                            <p
                                                                                className="colorplace text-danger"
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    textDecoration: "underline",
                                                                                }}
                                                                                onClick={AddNewStart}
                                                                            >
                                                                                <a> Click here to change your start area</a>
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    {locationStartStringField && (
                                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                                            <FormControl fullWidth size="small">
                                                                                <TextField
                                                                                    required
                                                                                    fullWidth
                                                                                    size='small'
                                                                                    type="text"
                                                                                    color='success'
                                                                                    className="bg-light text-left"
                                                                                    value={locationStartStringField}
                                                                                    onChange={handleLocationStartField}
                                                                                    placeholder="Start Area"
                                                                                    id='outlined-basic'
                                                                                    defaultValue=""
                                                                                    disabled
                                                                                />

                                                                            </FormControl>
                                                                        </Box>
                                                                    )}
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

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Form.Label className="fs-6 text-success">
                                                            {" "}
                                                            DROP-OFF POINT
                                                        </Form.Label>
                                                        <p
                                                            className="colorplace text-danger"
                                                            style={{
                                                                cursor: "pointer",
                                                                textDecoration: "underline",
                                                            }}
                                                        // onClick={AddNewStart}
                                                        >
                                                            <Tooltip title={<h6 className="px-2">{"You have the option to choose your drop-off location using Google Map, which becomes accessible once you've selected your province, city and area."}</h6>}>
                                                                <Link
                                                                    // to='/notification'
                                                                    className='mx-1 h-15px d-inline-block'
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <i className="fa-solid fs-4 fa-circle-info icon-tooltip-blue"></i>
                                                                </Link>
                                                            </Tooltip>

                                                        </p>
                                                    </div>
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
                                                                    <div className="d-flex justify-content-start">
                                                                        {addNewEndField && (
                                                                            <p
                                                                                className="colorplace text-danger"
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                    textDecoration: "underline",
                                                                                }}
                                                                                onClick={AddNewEnd}
                                                                            >
                                                                                <a> Click here to change your end area</a>
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    {locationEndStringField && (
                                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                                            <FormControl fullWidth size="small">
                                                                                <TextField
                                                                                    required
                                                                                    fullWidth
                                                                                    size='small'
                                                                                    type="text"
                                                                                    color='success'
                                                                                    className="bg-light text-left"
                                                                                    value={locationEndStringField}
                                                                                    onChange={handleLocationEndField}
                                                                                    placeholder="Start Area"
                                                                                    id='outlined-basic'
                                                                                    defaultValue=""
                                                                                    disabled
                                                                                />

                                                                            </FormControl>
                                                                        </Box>
                                                                    )}
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
                                                                label="Preferred Gender"
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
                                                            <Form.Label className="pt-3 text-left">
                                                                I Commute (Select Days)
                                                            </Form.Label>
                                                        </Form.Group>

                                                        <div className="row d-flex">
                                                            <div className="col text-left">
                                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                                                                    <FormControlLabel
                                                                        key={index}
                                                                        control={
                                                                            <Checkbox
                                                                                inline
                                                                                label={day}
                                                                                name="group1"
                                                                                color="success"
                                                                                type="checkbox"
                                                                                value={day}
                                                                                id={`inline-checkbox-${index}`}
                                                                                checked={daysSelected.includes(day)}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                        }
                                                                        label={day}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            size='small'
                                                            type="text"
                                                            color='success'
                                                            className="bg-light text-left"
                                                            value={selectedCarBrand}
                                                            onChange={(e) => setSelectedCarBrand(e.target.value)}
                                                            placeholder="Select Car Brand"
                                                            label="Car Brand"
                                                            id='outlined-basic'
                                                            defaultValue=""
                                                        />
                                                    </Box>
                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id="demo-simple-select-label" color='success'>Car CC</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                label="Select Car CC"
                                                                value={selectedCarCC}
                                                                onChange={(e) => setSelectedCarCC(e.target.value)}
                                                                required

                                                            >
                                                                {carCC?.map((car) => (
                                                                    <MenuItem key={car.id} value={car.id}>
                                                                        {car.car_cc}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <TextField
                                                            fullWidth
                                                            size='small'
                                                            required
                                                            type="text"
                                                            color='success'
                                                            className="bg-light text-left"
                                                            value={selectedModelName}
                                                            onChange={(e) => setSelectedModelName(e.target.value)}
                                                            placeholder="Car Model"
                                                            defaultValue=""
                                                            label="Model Name"
                                                            id="outlined-basic"

                                                        />
                                                    </Box>

                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id="demo-simple-select-label" color='success'>Car Registration Year</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                label="Car Registration Year"
                                                                value={selectedRegYear}
                                                                onChange={(e) => setSelectedRegYear(e.target.value)}
                                                                required

                                                            >
                                                                {regYear?.map((reg) => (
                                                                    <MenuItem key={reg.id} value={reg.id}>
                                                                        {reg.car_year_ranges}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">

                                                            <Form.Group className="mb-2 mt-2 text-left">
                                                                <Form.Label className="text-success fs-6">
                                                                    Select any payment method
                                                                </Form.Label>
                                                                <Form.Select aria-label="Default select example" className="text-secondary" value={selectedOption} onChange={handleOptionChange}>
                                                                    <option value="" hidden>Select an option</option>
                                                                    <option value="bank_account_number">Bank Account</option>
                                                                    <option value="jazz_cash_number">Jazz Cash Account</option>
                                                                    <option value="easy_paisa_number">EasyPaisa Account</option>
                                                                    <option value="raast_number">Raast ID</option>
                                                                </Form.Select>
                                                                {selectedOption === 'bank_account_number' && (
                                                                    <div className="mt-2">
                                                                        {/* Bank Account input field */}
                                                                        <TextField
                                                                            type="text"
                                                                            // className={`form-control mb-2 text-secondary ${isIBANValid ? '' : 'is-invalid'}`}
                                                                            className="form-control"
                                                                            id="bankAccount"
                                                                            size="small"
                                                                            name="bankAccount"
                                                                            color='success'
                                                                            placeholder="Bank Account (IBAN-24 Character)"
                                                                            value={inputBankAccount}
                                                                            onChange={handleInputChange}
                                                                            error={!isIBANValid && inputBankAccount !== ""}
                                                                            helperText={
                                                                                !isIBANValid &&
                                                                                inputBankAccount !== "" &&
                                                                                "Please enter a valid 24-digit IBAN."
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                                {selectedOption === 'jazz_cash_number' && (
                                                                    <div className="mt-2">
                                                                        {/* Jazz Cash Account input field */}
                                                                        <TextField
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="jazzCashAccount"
                                                                            name="jazzCashAccount"
                                                                            size="small"
                                                                            color='success'
                                                                            placeholder="Jazz Cash Account Number"
                                                                            value={inputJazzCash}
                                                                            // onChange={(e) => c(e.target.value)}
                                                                            // required
                                                                            onChange={(e) => {
                                                                                if (/^\d{0,11}$/.test(e.target.value)) {
                                                                                    setInputJazzCash(e.target.value);
                                                                                    validateJazzCash(e.target.value);
                                                                                }

                                                                            }}
                                                                            error={!isValidJazzCash && inputJazzCash !== ""}
                                                                            helperText={
                                                                                !isValidJazzCash &&
                                                                                inputJazzCash !== "" &&
                                                                                "Please enter a valid Account Number starting with '03' and having 11 digits."
                                                                            }

                                                                        />
                                                                    </div>
                                                                )}
                                                                {selectedOption === 'easy_paisa_number' && (
                                                                    <div className="mt-2">
                                                                        {/* EasyPaisa Account input field */}
                                                                        <TextField
                                                                            type="text"
                                                                            className="form-control  text-secondary"
                                                                            id="easypaisaAccount"
                                                                            size="small"
                                                                            color='success'
                                                                            name="easypaisaAccount"
                                                                            placeholder="EasyPaisa Account Number"
                                                                            value={inputEasyPaisa}
                                                                            // onChange={(e) => setInputEasyPaisa(e.target.value)}
                                                                            // required
                                                                            onChange={(e) => {
                                                                                if (/^\d{0,11}$/.test(e.target.value)) {
                                                                                    setInputEasyPaisa(e.target.value);
                                                                                    validateEasyPaisa(e.target.value);
                                                                                }

                                                                            }}
                                                                            error={!isValidEasyPaisa && inputEasyPaisa !== ""}
                                                                            helperText={
                                                                                !isValidEasyPaisa &&
                                                                                inputEasyPaisa !== "" &&
                                                                                "Please enter a valid Account Number starting with '03' and having 11 digits."
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                                {selectedOption === 'raast_number' && (
                                                                    <div className="mt-2">
                                                                        {/* Raast ID input field */}
                                                                        <TextField
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="raastID"
                                                                            size="small"
                                                                            name="raastID"
                                                                            color='success'
                                                                            placeholder="Raast ID"
                                                                            value={inputRaastID}
                                                                            // onChange={(e) => setInputRaastID(e.target.value)}
                                                                            onChange={(e) => {
                                                                                if (/^\d{0,11}$/.test(e.target.value)) {
                                                                                    setInputRaastID(e.target.value);
                                                                                    validateRaastID(e.target.value);
                                                                                }

                                                                            }}
                                                                            error={!isValidRaastID && inputRaastID !== ""}
                                                                            helperText={
                                                                                !isValidRaastID &&
                                                                                inputRaastID !== "" &&
                                                                                "Please enter a valid Account Number starting with '03' and having 11 digits."
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}

                                                            </Form.Group>

                                                        </Box>
                                                        <div className="container my-5">

                                                            <Button
                                                                className="font-custom btn btn-sm fs-6 mr-3 fw-bold btn-dark-green text-white px-3 py-2 mb-3"
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
                                                        </div>
                                                    </Box></>) :
                                                (<>
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
                                                            <Form.Label className="pt-3 text-left" style={{ color: "#00000057" }}>
                                                                I Commute (Select Days)
                                                            </Form.Label>
                                                        </Form.Group>

                                                        <div className="row">
                                                            <div className="col text-left">
                                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                                                                    <FormControlLabel
                                                                        key={index}
                                                                        control={
                                                                            <Checkbox
                                                                                inline
                                                                                label={day}
                                                                                name="group1"
                                                                                color="success"
                                                                                type="checkbox"
                                                                                value={day}
                                                                                id={`inline-checkbox-${index}`}
                                                                                checked={daysSelected.includes(day)}
                                                                                onChange={handleCheckboxChange}
                                                                                disabled
                                                                            />
                                                                        }
                                                                        label={day}
                                                                    />
                                                                ))}


                                                            </div>
                                                        </div>
                                                    </Row>
                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <TextField
                                                            fullWidth
                                                            size='small'
                                                            type="text"
                                                            color='success'
                                                            className="bg-light text-left"
                                                            value={selectedCarBrand}
                                                            onChange={(e) => setSelectedCarBrand(e.target.value)}
                                                            placeholder="Select Car Brand"
                                                            label="Car Brand"
                                                            id='outlined-basic'
                                                            defaultValue=""
                                                            disabled
                                                        />
                                                    </Box>
                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id="demo-simple-select-label" color='success'>Car CC</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                label="Select Car CC"
                                                                value={selectedCarCC}
                                                                onChange={(e) => setSelectedCarCC(e.target.value)}
                                                                disabled
                                                            >
                                                                {carCC?.map((car) => (
                                                                    <MenuItem key={car.id} value={car.id}>
                                                                        {car.car_cc}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <TextField
                                                            fullWidth
                                                            size='small'
                                                            type="text"
                                                            color='success'
                                                            className="bg-light text-left"
                                                            value={selectedModelName}
                                                            onChange={(e) => setSelectedModelName(e.target.value)}
                                                            placeholder="Car Model"
                                                            label="Model Name"
                                                            id='outlined-basic'
                                                            defaultValue=""
                                                            disabled
                                                        />
                                                    </Box>

                                                    <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                        <FormControl fullWidth size="small">
                                                            <InputLabel id="demo-simple-select-label" color='success'>Car Registration Year</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                label="Car Registration Year"
                                                                value={selectedRegYear}
                                                                onChange={(e) => setSelectedRegYear(e.target.value)}
                                                                disabled
                                                            >
                                                                {regYear?.map((reg) => (
                                                                    <MenuItem key={reg.id} value={reg.id}>
                                                                        {reg.car_year_ranges}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    {inputBankAccount !== null && (
                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                            <TextField
                                                                fullWidth
                                                                size='small'
                                                                type="text"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                value={inputBankAccount}
                                                                onChange={(e) => setInputBankAccount(e.target.value)}
                                                                label="Bank Account Number"
                                                                id='outlined-basic'
                                                                defaultValue=""
                                                                disabled
                                                            />
                                                        </Box>
                                                    )}

                                                    {inputJazzCash !== null && (
                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                            <TextField
                                                                fullWidth
                                                                size='small'
                                                                type="text"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                value={inputJazzCash}
                                                                onChange={(e) => setInputJazzCash(e.target.value)}
                                                                label="Jazz Cash Account Number"
                                                                id='outlined-basic'
                                                                defaultValue=""
                                                                disabled
                                                            />
                                                        </Box>
                                                    )}

                                                    {inputEasyPaisa !== null && (
                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                            <TextField
                                                                fullWidth
                                                                size='small'
                                                                type="text"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                value={inputEasyPaisa}
                                                                onChange={(e) => setInputEasyPaisa(e.target.value)}
                                                                label="EasyPaisa Account Number"
                                                                id='outlined-basic'
                                                                defaultValue=""
                                                                disabled
                                                            />
                                                        </Box>
                                                    )}

                                                    {inputRaastID !== null && (
                                                        <Box sx={{ minWidth: 120, color: 'success' }} className="mb-3">
                                                            <TextField
                                                                fullWidth
                                                                size='small'
                                                                type="text"
                                                                color='success'
                                                                className="bg-light text-left"
                                                                value={inputRaastID}
                                                                onChange={(e) => setInputRaastID(e.target.value)}
                                                                label="Raast ID"
                                                                id='outlined-basic'
                                                                defaultValue=""
                                                                disabled
                                                            />
                                                        </Box>
                                                    )}
                                                </>
                                                )}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) :
                (
                    <Rider />
                )}
        </div>
    )
}

export default Driver;