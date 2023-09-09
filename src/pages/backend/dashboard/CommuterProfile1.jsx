import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";

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
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  // For Profile Page Data
  const [option, setOption] = useState(null);
  const [profileType, setProfileType] = useState("");
  const [userType, setUserType] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const [userProfileDetails, setUserProfileDetails] = useState([]);

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

        // Set the profiles in the state
        setUserProfiles(profiles);
      } else if (option === 1) {
        // User is a driver, show rider data
        setProfileType("Driver");
        setUserType("Rider");
        profiles = jsonresponse.rider;
        
        // Set the profiles in the state
        setUserProfiles(profiles);
      }
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

  const viewRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/beforeapprovalterms");
    }
  };

  const requestViewDriver = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/driver-acceptance");
    }
  };

  const sendRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/termscondition1");
    }
  };

  const UserProfile = ({ user, userDetails }) => {
    const {
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
      <div className="card p-4 bg-light p-2">
        <div className="card p-4" style={{ backgroundColor: '#e5f8f3' }}>
          <div className="row">
            <div className="col-md-1 mt-1">
              <img src={`${IMAGE_URL}${commuter_image}`} style={{ height: "115px", width: "115px" }} />
            </div>
            <div className="col-md-11 px-5">
              <div className="col-md-5 px-5">
                {name !== "" ? (
                  <div>
                    <h3 className="text-success fw-bold">{name}</h3>
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
                {mobile ? (
                  <>
                    {mobile && (
                      <>
                        <b className="text-black">Cell:</b> {mobile}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <hr style={{ color: "grey" }} />
          <div className="row">
            <h2 className="text-success py-2 fw-bold">{userType ? userType : "Commuter"} Details</h2>
            <div className="col-md-6">
              <p>
                {preferred_gender !== "" ? (
                  <>
                    <b className="text-black">Preferred Gender: </b> {preferred_gender}
                  </>
                ) : (
                  <>
                  </>
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
                {mobile ? (
                  <>
                    {mobile && (
                      <>
                        <b className="text-black">Contact No:</b> {mobile}
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
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
                {reg_year !=="" ? (
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
          <div className="text-center">
            {req_stage === 1 ? (
              <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={viewRequest}>
                View Request
              </Button>
            ) : (
              req_stage === 2 ? (
                <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={requestViewDriver}>
                  View Request
                </Button>
              ) : (
                <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={sendRequest}>
                  Send Request
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="page-title">
        <p className="card p-4 text-dark my-2 fw-bold fs-6">
        "The below suggestion is based upon the start point and destination which match yours". Exact details will be shown after both have accepted to share.
        </p>
      </div>

      <div className="row">
        {userProfiles.length > 0 && userProfileDetails.length > 0 ? (
          userProfiles.map((user, index) => {
            // Find the corresponding userDetails
            return (
              <UserProfile user={user} key={index} userDetails={userProfileDetails[index]} />
            );
          })
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default CommuterProfile1;
