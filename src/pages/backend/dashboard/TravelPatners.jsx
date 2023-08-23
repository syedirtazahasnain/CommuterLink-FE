import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TravelPatners = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);

  // For Dashboard Data
  const [contactId, setContactId] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/matches/office",
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
      if (jsonresponse.rider && jsonresponse.rider.length > 0) {
        setContactId(jsonresponse.rider[0].contact_id);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setContactId(jsonresponse.drivers[0].contact_id);
      } else {
        setContactId("");
      }
      console.log("Dashboard Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
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
      console.log(jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="card bg-light-green mt-3 mb-5">
        <div className="card-header bg-black">
          <h3 className="text-center text-warning m-auto">
            {" "}
            MY TRAVEL PARTNERS{" "}
          </h3>{" "}
        </div>
        <div
          className="card-body"
          style={{
            borderWidth: "0 2px 2px 2px",
            borderStyle: "solid",
            borderColor: "#066539",
          }}
        >
            <div className="card" style={{ backgroundColor: "#D9D9D9" }}>
              <div className="card-body">
           
                <div className="row">
                  <div
                    className="card  border-0 w-100"
                    style={{
                      width: "auto",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    <div class="row d-flex justify-content-center">
                      {contactId !== "" ? (
                        <div className="col-sm-2">
                          <div
                            className="card"
                            style={{
                              width: "6rem",
                              fontWeight: "bold",
                              backgroundColor: "rgb(32 155 98)",
                            }}
                          >
                            <img
                              src={`${BASE_URL}/assets/images/Vector.png`}
                              className="card-img-top w-40px m-auto mt-3"
                            />
                            <div
                              className="card-title text-light text-center"
                              style={{ width: "6rem", cursor: "pointer" }}
                              onClick={() => {
                                route();
                              }}
                            >
                              {contactId}
                            </div>
                            <img
                              className=""
                              src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="col-sm-2">
                          <div
                            className="card bg-success"
                            style={{ width: "6rem", cursor: "pointer" }}
                          >
                            <img
                              src={`${BASE_URL}/assets/images/Vector.png`}
                              className="card-img-top w-40px m-auto mt-3"
                            />

                            <div
                              className="card-title text-center text-light"
                              style={{ width: "6rem", cursor: "pointer" }}
                              onClick={() => {
                                route();
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
                      )}
                      <div className="col-sm-2">
                        <div
                          className="card bg-success"
                          style={{ width: "6rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto mt-3"
                          />

                          <div
                            className="card-title text-center text-light"
                            style={{
                              width: "6rem",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              route();
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
                      <div className="col-sm-2">
                        <div
                          className="card bg-success"
                          style={{ width: "6rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto mt-3"
                          />

                          <div
                            className="card-title text-center text-light"
                            style={{ width: "6rem", cursor: "pointer" }}
                            onClick={() => {
                              route();
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
                      <div class="col-sm-2">
                        <div
                          className="card bg-success"
                          style={{ width: "6rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto mt-3"
                          />

                          <div
                            className="card-title text-center text-light"
                            style={{ width: "6rem" }}
                          >
                            Member ID
                          </div>
                          <img
                            className=""
                            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      </div>
                      <div class="col-sm-2">
                        <div
                          className="card bg-success"
                          style={{ width: "6rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto mt-3"
                          />

                          <div
                            className="card-title text-center text-light"
                            style={{ width: "6rem" }}
                          >
                            Member ID
                          </div>
                          <img
                            className=""
                            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      </div>
                      <div class="col-sm-2">
                        <div
                          className="card bg-success"
                          style={{ width: "6rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto mt-3"
                          />

                          <div
                            className="card-title text-center text-light"
                            style={{ width: "6rem" }}
                          >
                            Member ID
                          </div>
                          <img
                            className=""
                            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn_view d-flex justify-content-end me-5">
                    VIEW MORE
                  </button>
                </div>
                <div className="row">
                  
                  <div className="col-sm-6">
                    <div className="card h-100">
                      <div className="card-body-inner green-card">
                        <div className="d-flex flex-column">
                        <div
                                  className="card-header text-white"
                                  style={{
                                    backgroundColor: "#2a402a",
                                  }}
                                >
                                  <h4 className="text-center text-white m-auto">
                                    MY WALLET
                                  </h4>
                                </div>
                                <div className="row d-flex justify-content-between ">
                                <div className="col-md-3">
                                  <i className=" p-3 fa-solid text-success fa-wallet fs-2"></i>
                                  <button className="btn btn_view text-success d-flex justify-contnet-baseline fs-2 py-5">
                                    Recharge
                                  </button>
                                </div>
                                <div className="col-md-3">
                                  <div
                                    className="card border-0 w-100"
                                    style={{
                                      // width: "6rem",
                                      // backgroundColor: "#D9D9D9",
                                    }}
                                  >
                                    {" "}
                                    <p className="py-3 text-center fw-bold text-success fs-2">
                                      Rs.0/
                                    </p>
                                    <button className="btn btn_view text-success d-flex justify-content-end fs-2 py-5">
                                      View Transaction History
                                    </button>
                                  </div>
                                </div>
                              </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body-inner green-card">
                        <div className="d-flex flex-column">
                        <div className="card-body-inner green-card">
                        <div className="d-flex flex-column">
                        <div
                                  className="card-header text-white"
                                  style={{
                                    backgroundColor: "#2a402a",
                                  }}
                                >
                                  <h4 className="text-center text-white m-auto">
                                    COST PER SEAT PER DAY
                                  </h4>
                                </div>
                                <div className="row">
                              
                                <div className="col-md-6 m-auto">
                                  
                                    {" "}
                                    <div className="card-body  d-flex justify-content-between h-50 fw-bold text-success">
                                    <div
                          className="card bg-success"
                          style={{ width: "4rem" }}
                        >
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            className="card-img-top w-40px m-auto"
                          />

                         
                        
                        </div>
                        <h3 className="py-2">RS. 354/-</h3>
                                    </div>
                                    <div className="card-body  d-flex justify-content-between h-50 fw-bold text-success">
                                    <div
                         
                         
                        >
                          
<p className="text-dark">Daily Commuting Cost</p>
                         
                        
                        </div>
                        <p className="text-dark">RS. 346/-</p>
                                    </div>
                                    <div className="align-items-center">
                                      <ol style={{ listStyleType: "disc"}}>
                                        <li>Distance: 50km</li>
                                        <li>Avg. Fuel consumption: 10km/Ltr</li>
                                        <li>Fuel Price: Rs. 230/Ltr (Rs. 288/-)</li>
                                        <li>Maintenance (10%): Rs.29/-</li>
                                         <li>Wear & Tear (10%): Rs. 29/-</li>
                                      </ol>
                                      <div className="card-body  d-flex justify-content-between h-50 fw-bold ">
                                    <div
                         
                         
                        >
                          
<p className="text-dark">Add Services Charges(2.5%):</p>
<p className="text-dark">Daily Received per seat:</p>               
                        
                        </div>
                        <div><p className="text-dark">RS. 9/-</p>
                        <p className="text-dark">RS. 335/-</p></div>
                        
                                    </div>
                                    </div>
                                </div>
                              </div>
                        </div>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          {/* <div className="container">
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TravelPatners;