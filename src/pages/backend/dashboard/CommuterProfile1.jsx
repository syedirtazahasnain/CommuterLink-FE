import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs} from '@mui/material'
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { setContactIdState, setIdState } from "../../../redux/generalSlice";

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

const CommuterProfile1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const requestContactId = useSelector((s) => s.general.data.contact_id);
  // For Profile Page Data
  const [option, setOption] = useState(null);
  const [profileType, setProfileType] = useState("");
  const [userType, setUserType] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState([]);
 
  const crumbs = [
    {
      // path: "/portal/document-management",
      label: "Commuter Profile",
      //   path:"/viewprofile",
      active: true,
    },
  ];

  useEffect(() => {
  
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);


  useEffect(() => {
    if (option !== "") {
      // Fetch dashboard data only after getting the user's vehicle_option
      getDashboardData();
    }
  }, [option, userToken]);

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    if (userProfiles.length > 0) {
      // Fetch details for each profile and accumulate them
      const fetchDetailsPromises = userProfiles.map(async (profile) => {
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
  }, [userProfiles]);

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

  // Modify the getDashboardData function to accumulate user details
  const getDashboardData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/matches/office`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const jsonresponse = await response.json();
      let profiles = [];

      if (option === 0) {
        // User is a rider, show driver data
        setProfileType("Rider");
        setUserType("Driver");
        profiles = jsonresponse.drivers;
      } else if (option === 1) {
        // User is a driver, show rider data
        setProfileType("Driver");
        setUserType("Rider");
        profiles = jsonresponse.rider;
      }

      // Set the user profile to display in the state
      setUserProfiles(profiles);
      console.log("Commuter Matches Data:", jsonresponse);
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

  const viewRequest = (contact_id, request_id) => {
    setSubmit(true);

    if (!submitbtn) {
      dispatch(setContactIdState(contact_id));
      dispatch(setIdState(request_id));
      navigate("/beforeapprovalterms");
    }
  };

  const requestViewDriver = (contact_id, request_id) => {
    setSubmit(true);

    if (!submitbtn) {
      dispatch(setContactIdState(contact_id));
      dispatch(setIdState(request_id));
      navigate("/driver-acceptance");
    }
  };

  const sendRequest = (contact_id) => {
    setSubmit(true);

    if (!submitbtn) {
      dispatch(setContactIdState(contact_id));
      navigate("/termscondition1");
    }
  };

  const UserProfile = ({ user, userDetails }) => {
    const {
      contact_id,
      commuter_image,
      name,
      gender,
      age,
      profession,
      preferred_gender,
      origin,
      time_depart,
      destination,
      time_return,
      seats,
      req_stage,
      request_id,
    } = user;

    const {
      days,
      price,
      mobile,
    } = userDetails[0];

    const {
      seats_left,
      reg_no,
      reg_year,
      car_ac,
      car_brand,
      car_cc,
      car_model,
      car_reg_year,
    } = (userDetails[0]?.vehicle?.[0] || {}) || {};

    console.log({ user });
    console.log(userDetails[0]);

    return (
      <div>

        <div className="card p-4 bg-light">
          <div className="card p-4 backgroundColor">
            <div className="row px-3">
              <div className="col-md-1">
                {req_stage === 0 ? (
                  <img className="p-4" src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "100px", backgroundColor: "#ff8a00" }} />
                ) :
                  (
                    <img className="p-4" src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "100px", backgroundColor: "#198754" }} />
                  )}
              </div>
              <div className="col-md-11 px-5">
                <div className="row px-5">
                  <div className="col-md-3">
                    {contact_id !== "" ? (
                      req_stage === 0 ? (
                        <div>
                          <h3 className="fw-bold" style={{ color: "#FF8A00" }}>{contact_id}</h3>
                        </div>
                      ) :
                        (
                          <div>
                            <h3 className="text-success fw-bold">{contact_id}</h3>
                          </div>
                        )
                    ) : (
                      <>
                      </>
                    )}
                  </div>
                  <div className="col-md-9">

                  </div>
                </div>

                <div className="row px-5">
                  <div className="col-md-2">
                    {gender !== "" ? (
                      <>
                        <b className="text-black">Gender:</b>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </div>
                  <div className="col-md-10">{gender}
                  </div>
                  </div>


                  <div className="row px-5 mb-2">
                    <div className="col-md-2">
                      {age !== "" ? (
                        <>
                          <b className="text-black"> Age:</b>
                        </>
                      ) : (
                        <>
                        </>
                      )}
                    </div>
                    <div className="col-md-10">{age} years
                    </div>
                  </div>
                  <div className="row px-5 mb-2">
                    <div className="col-md-2">
                      {profession !== "" ? (
                        <>
                          <b className="text-black">Profession:</b>
                        </>
                      ) : (
                        <>
                        </>
                      )}
                    </div>
                    <div className="col-md-10"> {profession}
                    </div>
                  </div>



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
              </div>
            </div>
            <hr style={{ color: "grey" }} />
            <div className="row">
              <h2 className="text-success py-2 fw-bold">{userType ? userType : "Commuter"} Details</h2>
              <div className="col-md-6">
                <div className="row mb-2">
                  <div className="col-md-4">
                    {preferred_gender !== "" ? (
                      <>
                        <b className="text-black">Seats For: </b>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {preferred_gender}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {origin !== "" ? (
                      <>
                        <b className="text-black">Point of Origin: </b>

                      </>
                    ) : (
                      <>
                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {origin}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {time_depart !== "" ? (
                      <>
                        <b className="text-black">Pickup Timings:</b>
                      </>
                    ) : (
                      <>

                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {time_depart}
                  </div>
                </div>


                <div className="row mb-2">
                  <div className="col-md-4">
                    {destination !== "" ? (
                      <>
                        <b className="text-black">Destination:</b>

                      </>
                    ) : (
                      <>

                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {destination}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {time_return !== "" ? (
                      <>
                        <b className="text-black">Return Timings:</b>
                      </>
                    ) : (
                      <>

                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {time_return}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {days !== "" ? (
                      <>
                        <b className="text-black">Days:</b>
                      </>
                    ) : (
                      <>

                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    {days}
                  </div>
                </div>




              </div>
              <div className="col-md-6">

                <div className="row mb-2">
                  <div className="col-md-4">
                    {seats ? (
                      <>
                        {seats && (
                          <>
                            <b>No.of Seats:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {seats}
                  </div>
                </div>



                <div className="row mb-2">
                  <div className="col-md-4">
                    {seats_left !== "" ? (
                      <>
                        {seats_left && (
                          <>
                            <b>No.of Seats Left:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {seats_left}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {price !== "" ? (
                      <>
                        {price && (
                          <>
                            <b>Payment Terms (per day):</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    Rs. {price}/-
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {car_ac !== "" ? (
                      <>
                        {car_ac && (
                          <>
                            <b>Car have AC:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {car_ac}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {car_brand !== "" ? (
                      <>
                        {car_brand && (
                          <>
                            <b>Car Brand:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {car_brand}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {car_cc !== "" ? (
                      <>
                        {car_cc && (
                          <>
                            <b>Car CC:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {car_cc}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4">
                    {reg_year !== "" ? (
                      <>
                        {reg_year && (
                          <>
                            <b>Registration Year:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {reg_year}
                  </div>
                </div>


                <div className="row mb-2">
                  <div className="col-md-4">
                    {car_reg_year !== "" ? (
                      <>
                        {car_reg_year && (
                          <>
                            <b>Car Registration Year:</b>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-8">
                    {car_reg_year}
                  </div>
                </div>

              </div>
            </div>
            <div className="text-center">
              {req_stage === 1 ? (
                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={() => { viewRequest(contact_id, request_id) }}>
                  View Request
                </Button>
              ) : req_stage === 0 ? (
                <Button className="font-custom btn btn-sm fs-6 fw-bold text-white rounded-4 px-3 py-2 mb-3" style={{ background: "#ff8a00" }}>
                  Request Sent
                </Button>
              ) : req_stage === 2 ? (
                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={() => { requestViewDriver(contact_id, request_id) }}>
                  View Request
                </Button>
              ) : (
                <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={() => { sendRequest(contact_id) }}>
                  Send Request
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
      <div className="card px-4 py-2 text-success my-2 fw-bold">
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
        <h5 className="card p-2  px-4 text-success ">{`The below suggestion is based upon the start point and destination which match yours". Exact details will be shown after both have accepted to share.`}</h5>
      </div>

      <div className="row">
        {userProfiles.length > 0 && userProfileDetails.length > 0 ? (
          userProfiles
            .filter(user => user.contact_id === requestContactId) // Filter profiles by contact_id
            .map((user, index) => {
              return <UserProfile user={user} key={index} userDetails={userProfileDetails[index]} />;
            })
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default CommuterProfile1;
