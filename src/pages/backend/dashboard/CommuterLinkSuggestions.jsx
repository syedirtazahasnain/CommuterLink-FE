import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommuterLinkSuggestions = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);

  // For Dashboard Data
  const [option, setOption] = useState("");
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Define a function that contains the code to execute
    const fetchData = () => {
      getProfileData();
      getMemberData();
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 40-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 40000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Define a function that contains the code to execute
    const fetchData = () => {
      if (option !== "") {
        // Fetch dashboard data only after getting the user's vehicle_option
        getDashboardData();
      }
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 40-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 40000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [option, userToken]);

  const requestRoute = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/request-commuter-profile");
    }
  };

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
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
      console.log("Dashboard Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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

      if (option === 0) {
        // User is a rider, show driver data
        setUserType("rider");
        setUserData(jsonresponse.drivers);
      } else if (option === 1) {
        // User is a driver, show rider data
        setUserType("driver");
        setUserData(jsonresponse.rider);
      }

      console.log("Dashboard Data:", jsonresponse);
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
        setRequests(jsonresponse.data);
      }
      console.log("Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const RiderCard = ({ user }) => {
    // Extract relevant data from the user object
    const { commuter_image, name, contact_id, req_stage, req_status } = user;
  
    return (
      <div className="col-sm-2">
        <div
          className="card"
          style={{
            width: "6rem",
            backgroundColor: req_stage === 1 ? "#5ab387" : req_stage === 0 ? "#F8A175" : "#5ab387",
          }}
        >
          {req_stage === 1 || req_stage === 2 ? (
            <img src={`${IMAGE_URL}${commuter_image}`} className="card-img-top w-40px m-auto mt-3" />
          ) : (
            <img  src={`${BASE_URL}/assets/images/Vector.png`} className="card-img-top w-40px m-auto mt-3" />
          )}
          <div
            className="card-title text-light text-center"
            style={{ width: "6rem", cursor: "pointer" }}
            onClick={() => {
              route();
            }}
          >
            {req_stage === 1 || req_stage === 2 ? name : contact_id}
          </div>
          <img className="" src={`${BASE_URL}/assets/images/downlineofmembericon.png`} />
        </div>
      </div>
    );
  };
  
  const DriverCard = ({ user }) => {
    // Extract relevant data from the user object
    const { commuter_image, name, contact_id, req_stage, req_status } = user;
  
    return (
      <div className="col-sm-2">
        <div
          className="card"
          style={{
            width: "6rem",
            backgroundColor: req_stage === 1 ? "#5ab387" : req_stage === 0 ? "#F8A175" : "#5ab387",
          }}
        >
          {req_stage === 1 || req_stage === 2  ? (
            <img src={`${IMAGE_URL}${commuter_image}`} className="card-img-top w-40px m-auto mt-3" />
          ) : (
            <img  src={`${BASE_URL}/assets/images/Vector.png`} className="card-img-top w-40px m-auto mt-3" />
          )}
          <div
            className="card-title text-center text-light"
            style={{ width: "6rem", cursor: "pointer" }}
            onClick={() => {
              route();
            }}
          >
            {req_stage === 1 || req_stage === 2 ? name : contact_id}
          </div>
          <img
            className=""
            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
          />
        </div>
      </div>
    );
  };  
  

  const DefaultCard = () => {
    // Render a default card when user type is not recognized
    return (
      <div className="col-sm-2">
        <div
          className="card"
          style={{ width: "6rem", backgroundColor: "#5ab387" }}
        >
          <img
            src={`${BASE_URL}/assets/images/Vector.png`}
            className="card-img-top w-40px m-auto mt-3"
          />

          <div
            className="card-title text-center text-light"
            style={{
              width: "6rem",
            }}
          >
            Member ID
          </div>
          <img
            className=""
            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
          />
        </div>
      </div>
    );
  };

  const RequestCard = ({ request }) => {
    // Extract relevant data from the request object
    const { commuter_image, name, contact_id, request_stage } = request;
  
    return (
      <div className="col-sm-2">
        <div
          className="card"
          style={{
            width: "6rem",
            backgroundColor:
              request_stage === 1 || request_stage === 2 ? "#f9f0c1" : "#5ab387",
          }}
        >
           {request_stage === 1 || request_stage === 2 ? (
            <img src={`${IMAGE_URL}${commuter_image}`} className="card-img-top w-40px m-auto mt-3" />
          ) : (
            <img  src={`${BASE_URL}/assets/images/Vector.png`} className="card-img-top w-40px m-auto mt-3" />
          )}
          <div
            className="card-title text-light text-center"
            style={{ width: "6rem", cursor: "pointer" }}
            onClick={() => {
              requestRoute();
            }}
          >
            {request_stage === 1 || request_stage === 2 ? name : contact_id}
          </div>
          <img
            className=""
            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
          />
        </div>
      </div>
    );
  }

  const RequestDefaultCard = () => {
    // Render a default card when user type is not recognized
    return (
      <div className="col-sm-2">
        <div
          className="card"
          style={{ width: "6rem", backgroundColor: "#5ab387" }}
        >
          <img
            src={`${BASE_URL}/assets/images/Vector.png`}
            className="card-img-top w-40px m-auto mt-3"
          />

          <div
            className="card-title text-center text-light"
            style={{
              width: "6rem",
            }}
          >
            Member ID
          </div>
          <img
            className=""
            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="card  mt-3 mb-5">
        <div className="card-header" style={{ backgroundColor: "#1F5F5B", padding: "5px 0", margin: "0" }}>
          <h4 className="text-center text-warning m-auto" style={{ lineHeight: "1" }}>
            {option === 1 ? "TRAVEL BUDDIES FOR YOUR CAR" : "GET A SEAT/S IN THEIR CAR"}
          </h4>
        </div>

        <div
          className="card-body"
        >
          <div className="card" style={{ backgroundColor: "#D9D9D9" }}>
            <div
              className="card-header"
              // style={{ backgroundColor: "#2a402a" }}
              style={{ backgroundColor: '#00917C' }}
            >
              <h5 className="text-white mt-4 mx-auto">
                COMMUTERSLINK SUGGESTION
              </h5>
            </div>

            <div className="card-body" style={{ background: "rgb(191, 216, 210)" }}>
              <p>
                Based upon your Profile, We have Following{" "}
                <strong> MATCHES</strong> to Offer
              </p>
              <div className="row">
                {userData.map((user, index) => {
                  if (userType === "rider" && user.vehicle_option === 1 && user.req_stage !== 3) {
                    // Show rider card only for riders and when req_stage is not 3
                    return <RiderCard user={user} key={index} />;
                  } else if (userType === "driver" && user.vehicle_option === 0) {
                    // Show driver card only for drivers
                    return <DriverCard user={user} key={index} />;
                  } else if (user.req_stage !== 3) {
                    // Show a default card for other cases when req_stage is not 3
                    return <DefaultCard key={index} />;
                  } else {
                    // Return null for cases where req_stage is 3 to hide the card
                    return null;
                  }
                })}
                {/* Add default cards to reach a total of 6 if necessary */}
                {userData.length < 6 && Array.from({ length: 6 - userData.length }, (_, i) => (
                  <DefaultCard key={`default-${i}`} />
                ))}
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className="card mt-5" style={{ backgroundColor: "#D9D9D9" }}>
            <div
              className="card-header "
              style={{ backgroundColor: '#00917C' }}
            >
              <h5 className="text-white mt-4 mx-auto">
                REQUESTS BY MEMBERS
              </h5>
            </div>

            <div className="card-body" style={{ background: "rgb(191, 216, 210)" }}>
              <p>
                Based upon your Profile, We have Following{" "}
                <strong>Requests</strong> to Offer
              </p>
              <div className="row">
                {requests.map((request, index) => (
                  <RequestCard key={index} request={request} />
                ))}
                 {/* Add default cards to reach a total of 6 if necessary */}
                 {requests.length < 6 && Array.from({ length: 6 - requests.length }, (_, i) => (
                  <RequestDefaultCard key={`default-${i}`} />
                ))}
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuterLinkSuggestions;
