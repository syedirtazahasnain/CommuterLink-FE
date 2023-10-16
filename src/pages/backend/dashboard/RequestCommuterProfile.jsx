import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs } from '@mui/material'
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { setContactIdState, setIdState, setRequestAsState } from "../../../redux/generalSlice";
import { ThreeCircles } from "react-loader-spinner";
import { Row } from "react-bootstrap";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#ff4815",
            contrastText: "white",
        },
    },
});

const backgroundLogo = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
};

const RequestCommuterProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userToken = useSelector((s) => s.login.data.token);
    const requestContactId = useSelector((s) => s.general.data.contact_id);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState(null);
    const [submitbtn, setSubmit] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [userProfileDetails, setUserProfileDetails] = useState([]);

    const crumbs = [
        {
            label: "Home",
            active: true,
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        document.getElementById("root").classList.remove("w-100");
        document.getElementById("root").classList.add("d-flex");
        document.getElementById("root").classList.add("flex-grow-1");
        window.KTToggle.init();
        window.KTScroll.init();
    }, []);

    useEffect(() => {
        getMemberData();
        getProfileData();
    }, []);

    useEffect(() => {
        if (profiles.length > 0) {
            // Fetch details for each profile and accumulate them
            const fetchDetailsPromises = profiles.map(async (profile) => {
                return await getCommuterProfileData(profile);
            });

            Promise.all(fetchDetailsPromises)
                .then((details) => {
                    // Set the profiles and details in the state
                    setUserProfileDetails(details);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    }, [profiles]);

    const route = async (requested_as, id, contact_id) => {
        if (requested_as === "rider") {
            dispatch(setRequestAsState(requested_as));
            dispatch(setIdState(id));
            dispatch(setContactIdState(contact_id));
            navigate("/termscondition1");
        }
        else if (requested_as === "driver") {
            dispatch(setRequestAsState(requested_as));
            dispatch(setIdState(id));
            dispatch(setContactIdState(contact_id));
            navigate("/beforeapprovalterms");
        }
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
            console.log("Commuter Profile Data", jsonresponse);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const getMemberData = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/v1/requests`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            const jsonresponse = await response.json();
            if (jsonresponse.data && jsonresponse.data.length > 0) {
                setProfiles(jsonresponse.data);
            }
            console.log("Request Member Data:", jsonresponse);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const getCommuterProfileData = async (profile) => {
        try {
            if (option === 0) {
                const response = await fetch(
                    `${API_URL}/api/v1/commuter/profile/${profile.contact_id}/driver`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                const jsonresponse = await response.json();
                if (jsonresponse.data && jsonresponse.data.length > 0) {
                    return jsonresponse.data;
                }
                console.log("Driver Profile Data:", jsonresponse);
            } else if (option === 1) {
                const response = await fetch(
                    `${API_URL}/api/v1/commuter/profile/${profile.contact_id}/rider`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                const jsonresponse = await response.json();
                if (jsonresponse.data && jsonresponse.data.length > 0) {
                    return jsonresponse.data;
                }
                console.log("Rider Profile Data:", jsonresponse);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return null;
        }
    };

    const requestAccepeted = () => {
        Swal.fire({
            position: 'top',
            text: 'Request is waiting for response!',
            customClass: {
                confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
            },
        }
        )
    };

    const UserProfileCard = ({ profile, userDetails }) => {
        const {
            contact_id,
            id,
            requested_as,
            request_stage,
            dropoff_address,
            pickup_address,
            vehicle,
        } = profile;

        const {
            name,
            preferred_gender,
            seats,
            commuter_image,
            gender,
            age,
            profession,
            origin,
            destination,
            time_depart,
            time_return,
        } = profile.user[0];

        const {
            days,
            price,
            mobile,
        } = (userDetails && userDetails[0]) || {};

        const {
            seats_left,
            reg_no,
            reg_year,
            car_ac,
            car_brand,
            car_cc,
            car_model,
            car_reg_year,
        } = (userDetails && userDetails[0]?.vehicle?.[0]) || {};

        console.log({ profile });
        //console.log(userDetails[0]);
        // setLocationStartString(origin);
        // setLocationEndString(destination);

        // Splitting the latitude and longitude
        const dropoffCoords = dropoff_address.split(',');
        const pickupCoords = pickup_address.split(',');

        const dropoffLatitude = dropoffCoords[0];
        const dropoffLongitude = dropoffCoords[1];

        const pickupLatitude = pickupCoords[0];
        const pickupLongitude = pickupCoords[1];

        console.log({ profile });
        // console.log(userDetails[0]);

        return (
            <div>
                <div className="card p-4 bg-white rounded-0" >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card rounded-0">
                                <div className="card-img-top bg-medium-teal rounded-0 text-center py-5">

                                    <img className="p-4" src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "100px", backgroundColor: "#0A6155" }} />

                                </div>
                                <div className="card-body bg-card-grey">
                                    <div className="card-text">
                                        <div className="row px-5 mb-2">
                                            <div className="col-md-6 ">
                                                {gender !== "" ? (
                                                    <>
                                                        <h5 className="text-dark-green fw-bold text-end font-custom">Gender:</h5>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="fw-bold text-secondary">{gender}</h5>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                {age !== "" ? (
                                                    <>
                                                        <h5 className="text-dark-green fw-bold text-end font-custom"> Age:</h5>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="fw-bold text-secondary">{age} years</h5>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6">
                                                {profession !== "" ? (
                                                    <>
                                                        <h5 className="text-dark-green fw-bold text-end font-custom">Profession:</h5>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="fw-bold text-secondary">{profession}</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 d-flex flex-column">
                            <ul class="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
                                <li class="nav-item me-0" role="presentation">
                                    <button className={`nav-link fs-4 custom-button-style active rounded-0`}
                                        id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{option === 0 ? ("Car Offerer Details") : ("Traveller Details")}</button>
                                </li>
                                <li class="nav-item me-0" role="presentation">
                                    <button className={`nav-link fs-4 custom-button-style rounded-0`}
                                        id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Additional Info</button>
                                </li>
                                <li className="nav-item me-0" role="presentation">
                                    <button className={`nav-link fs-4 custom-button-style rounded-0`}
                                        id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"
                                    // onClick={openModal}
                                    >
                                        View On Map</button>
                                </li>
                            </ul>
                            <div className="tab-content flex-grow-1" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className="row ">

                                        <div className="col-md-11">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    {contact_id !== "" ? (

                                                        <div className="row d-flex">
                                                            <h3 className="text-success fw-bold">{contact_id}</h3>
                                                        </div>

                                                    ) : (
                                                        <>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-9">
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {gender !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Gender:</h5>
                                                        </>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{gender}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {origin !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Point of Origin:</h5>
                                                        </>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{origin}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {time_depart !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Pickup Timings:</h5>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{time_depart}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {destination !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Destination:</h5>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{destination}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {time_return !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Return Timings:</h5>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{time_return}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    {days !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Days:</h5>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-8">
                                                    <h5 className="fw-bold text-secondary">{days}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className="row ">

                                        <div className="col-md-11">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {contact_id !== "" ? (

                                                        (
                                                            <div className="row d-flex">
                                                                <h3 className="text-success fw-bold">{contact_id}</h3>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-9">
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {seats_left !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">No.of Seats Left:</h5>
                                                        </>
                                                    ) : (
                                                        <>

                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{seats_left}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {price !== "" ? (
                                                        <>
                                                            <h5 className="text-dark-green fw-bold font-custom">Payment Terms (per day):</h5>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">

                                                    <h5 className="fw-bold text-secondary">Rs. {price}/-</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {car_ac !== "" ? (
                                                        <>
                                                            {car_ac && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Car has AC:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{car_ac}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {car_brand !== "" ? (
                                                        <>
                                                            {car_brand && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Car Brand:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{car_brand}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {car_cc !== "" ? (
                                                        <>
                                                            {car_cc && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Car CC:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{car_cc}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {car_model !== "" ? (
                                                        <>
                                                            {car_model && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Car Model:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{car_model}</h5>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {reg_no !== "" ? (
                                                        <>
                                                            {reg_no && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Registration Number:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{reg_no}</h5>

                                                </div>

                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {reg_year !== "" ? (
                                                        <>
                                                            {reg_year && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Registration Year:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{reg_year}</h5>

                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    {car_reg_year !== "" ? (
                                                        <>
                                                            {car_reg_year && (
                                                                <>
                                                                    <h5 className="text-dark-green fw-bold font-custom">Car Registration Year:</h5>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-secondary">{car_reg_year}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <div className=" row d-flex justify-content-center align-items-center">
                                        <Row style={{ height: "275px", width: "100%" }}>
                                            <GoogleMap
                                                zoom={10}
                                                center={{ lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) }}
                                                mapContainerStyle={{
                                                    width: "100%",
                                                    height: '100%',
                                                }}
                                                options={{
                                                    types: ["(regions)"],
                                                    componentRestrictions: { country: "PK" },
                                                }}
                                            >
                                                <MarkerF
                                                    position={{ lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) }}
                                                    icon={{
                                                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                                    }}
                                                />
                                                <MarkerF
                                                    position={{ lat: parseFloat(dropoffLatitude), lng: parseFloat(dropoffLongitude) }}
                                                    icon={{
                                                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                                    }}
                                                />
                                                <PolylineF
                                                    path={[
                                                        { lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) },
                                                        { lat: parseFloat(dropoffLatitude), lng: parseFloat(dropoffLongitude) },
                                                    ]}
                                                    options={{
                                                        strokeColor: "#FF0000",
                                                        strokeOpacity: 1.0,
                                                        strokeWeight: 3,
                                                    }}
                                                />
                                            </GoogleMap>
                                        </Row>
                                        <div className="row justify-content-end">
                                            <div className="col-md-12 text-end">
                                                <div className="row justify-content-end">
                                                    <div className="col-md-3 text-end"><i className="fa-solid fa-location-dot text-primary"></i><span className="font-custom">Start Point</span></div>
                                                    <div className="col-md-3 text-end"><i className="fa-solid fa-location-dot text-danger"></i><span className="font-custom">Drop-off Point</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-end px-3 py-4">
                            {request_stage === 1 || request_stage === 2 ? (
                                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={requestAccepeted} style={{ background: "#ff8a00" }}>
                                    Request Accepted
                                </Button>
                            ) : (
                                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3" onClick={() => { route(requested_as, id, contact_id) }}>
                                    Accept Request
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>

            <div className="page-title">
                <div className="px-4 py-2 text-success my-2 fw-bold">
                    <Breadcrumbs aria-label="breadcrumb">
                        {crumbs.map((crumb, index) => (
                            <Link
                                key={index}
                                to={crumb.path || ""}
                                style={{
                                    color: crumb.active ? "black" : "#ff4815",
                                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                                    pointerEvents: crumb.path ? "auto" : "none",
                                    textDecoration: "none"

                                }}
                            >
                                {crumb.label}
                            </Link>
                        ))}
                    </Breadcrumbs>
                </div>
                <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
                    <div className="d-flex justify-content-between align-items-xl-baseline">
                        <h3 className="text-dark-green my-2 fw-bold m-0">COMMUTER'S PROFILE</h3>
                        <Link
                            to={"/dashboard"} >
                            <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                                <i className="fas fa-angle-left text-white" />
                                Back
                            </button>
                        </Link>
                    </div>

                </div>
                <h5 className="card p-2  px-4 text-dark-green">{`The below request has been initiated by the member based upon the start point and destination which match yours. Exact details will be shown after both have accepted to share. Further details will be shown to you after you accept the request.`}
                </h5>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center">
                    <ThreeCircles
                        height={50}
                        width={50}
                        color="#4fa94d"
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
            ) : (
                <div className="row">
                    {profiles.length > 0 && userProfileDetails.length > 0 ? (
                        profiles
                            .filter(profile => profile.contact_id === requestContactId) // Filter profiles by contact_id
                            .map((profile, index) => (
                                <UserProfileCard key={index} profile={profile} userDetails={userProfileDetails[index]} />
                            ))
                    ) : (
                        null
                    )}
                </div>
            )}
        </div>
    );
};

export default RequestCommuterProfile;