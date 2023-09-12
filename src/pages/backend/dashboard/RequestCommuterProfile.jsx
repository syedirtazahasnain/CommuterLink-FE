import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { setContactIdState, setIdState, setRequestAsState } from "../../../redux/generalSlice";

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
    const [option, setOption] = useState(null);
    const [submitbtn, setSubmit] = useState(false);
    const userToken = useSelector((s) => s.login.data.token);
    const [profiles, setProfiles] = useState([]);
    const [userProfileDetails, setUserProfileDetails] = useState([]);

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
            // // icon: 'warning',
            text: 'Request is waiting for response!',
            customClass: {
                confirmButton: 'bg-success', // Apply custom CSS class to the OK button
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
          } = (userDetails && userDetails[0]?.vehicle?.[0])|| {};

        console.log({ profile });
        //console.log(userDetails[0]);

        return (
            
            <div className="col-md-12">
                <div className="card p-4 bg-light p-2">
                    <div className="card p-4 backgroundColor">
                        {/* Render profile details here */}
                        {/* You can use the extracted properties to display the profile data */}
                        <div className="row">
                            <div className="col-md-1 mt-1">
                                <img className="p-4" src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "100px", backgroundColor: "#ff8a00" }} />
                            </div>
                            <div className="col-md-11 px-5">
                                <div className="col-md-5 px-5">
                                    {contact_id !== "" ? (
                                        <div>
                                            <h3 className="text-success fw-bold">{contact_id}</h3>
                                        </div>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                </div>
                                <p className="px-5">
                                    {gender !== "" ? (
                                        <>
                                            <b className="text-black">Gender:</b> {gender}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <br />
                                    {age !== "" ? (
                                        <>
                                            <b className="text-black"> Age:</b> {age}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <br />
                                    {profession !== "" ? (
                                        <>
                                            <b className="text-black">Profession:</b> {profession}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <br />
                                    {/* {mobile ? (
                                        <>
                                            {mobile && (
                                                <>
                                                    <b className="text-black">Cell:</b> {mobile}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )} */}
                                </p>
                            </div>
                        </div>
                        <hr style={{ color: "grey" }} />
                        <div className="row">
                            <h2 className="text-success py-2 fw-bold">{"Commuter"} Details</h2>
                            <div className="col-md-6">
                                <p>
                                    {preferred_gender !== "" ? (
                                        <>
                                            {preferred_gender && (
                                                <>
                                                    <b className="text-black">Seats For: </b> {preferred_gender}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {origin !== "" ? (
                                        <>
                                            <b className="text-black">Point of Origin: </b>
                                            {origin}
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}
                                    <br />
                                    {time_depart !== "" ? (
                                        <>
                                            <b className="text-black">Pickup Timings:</b> {time_depart}
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                    <br />
                                    {destination !== "" ? (
                                        <>
                                            <b className="text-black">Destination:</b>
                                            {destination}
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                    <br />
                                    {time_return !== "" ? (
                                        <>
                                            <b className="text-black">Return Timings:</b> {time_return}
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                    <br />
                                    {days !== "" ? (
                                        <>
                                            <b className="text-black">Days:</b> {days}
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                    <br />
                                    {/* {mobile ? (
                                        <>
                                            {mobile && (
                                                <>
                                                    <b className="text-black">Contact No:</b> {mobile}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )} */}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p>
                                    {seats ? (
                                        <>
                                            {seats && (
                                                <>
                                                    <b>No.of Seats:</b> {seats}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {seats_left !== "" ? (
                                        <>
                                            {seats_left && (
                                                <>
                                                    <b>No.of Seats Left:</b> {seats_left}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {price !== "" ? (
                                        <>
                                            {price && (
                                                <>
                                                    <b>Payment Terms (perDay):</b> {price}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {car_ac !== "" ? (
                                        <>
                                            {car_ac && (
                                                <>
                                                    <b>Car have AC:</b> {car_ac}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {car_brand !== "" ? (
                                        <>
                                            {car_brand && (
                                                <>
                                                    <b>Car Brand:</b> {car_brand}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {car_cc !== "" ? (
                                        <>
                                            {car_cc && (
                                                <>
                                                    <b>Car CC:</b> {car_cc}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {car_model !== "" ? (
                                        <>
                                            {car_model && (
                                                <>
                                                    <b>Car Model:</b> {car_model}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {reg_no !== "" ? (
                                        <>
                                            {reg_no && (
                                                <>
                                                    <b>Registration Number:</b> {reg_no}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {reg_year !== "" ? (
                                        <>
                                            {reg_year && (
                                                <>
                                                    <b>Registration Year:</b> {reg_year}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <br />
                                    {car_reg_year !== "" ? (
                                        <>
                                            {car_reg_year && (
                                                <>
                                                    <b>Car Registration Year:</b> {car_reg_year}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </p>
                            </div>
                        </div>
                        {/* Render action buttons based on the request stage */}
                        <div className="text-center">
                            {request_stage === 1 || request_stage === 2 ? (
                                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-warning text-gray rounded-4 px-3 py-2 mb-3" onClick={requestAccepeted} style={{background:"#ff8a00"}}>
                                    Request Accepted
                                </Button>
                            ) : (
                                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={() => { route(requested_as, id, contact_id) }}>
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
      
      <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
        <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-success my-2 fw-bold m-0">COMMUTER'S PROFILE</h3>
          <Link
            to={"/dashboard"} >
            <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
              <i className="fas fa-angle-left text-white" />
              Back
            </button>
          </Link>
        </div>
       
      </div>
      <h5 className="card p-2  px-4 text-success ">{`The below suggestion is based upon the start point and destination which match yours. Exact details will be shown after both have accepted to share.`}</h5>
    </div>
            {/* <div className="page-title">
                <p className="card p-4 text-dark my-2 fw-bold fs-6">
                    The below suggestion is based upon the start point and destination which match yours. Exact details will be shown after both have accepted to share.
                </p>
            </div> */}

            <div className="row">
                {profiles.map((profile, index) => (
                    <UserProfileCard key={index} profile={profile} userDetails={userProfileDetails[index]} />
                ))}
            </div>
        </div>
    );
};

export default RequestCommuterProfile;
