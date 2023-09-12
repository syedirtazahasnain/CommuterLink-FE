import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const TravelPatners = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);

  // For Travel Data
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [walletAmount, setWalletAmount] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Define a function that contains the code to execute
    const fetchData = () => {
      getTravelData();
      getProfileData();
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 40-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 40000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const onNavigate = () => {
    navigate("/rechargewallet");
  };

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/travel-buddy");
    }
  };

  const getTravelData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/travelbuddy`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const jsonresponse = await response.json();
      if (jsonresponse.data && jsonresponse.data.length > 0) {
        setName(jsonresponse.data[0].name);
        setImage(jsonresponse.data[0].commuter_image);
        setPrice(jsonresponse.data[0].price);
        setDate(jsonresponse.data[0].aggreement_date);
      }
      // else if (jsonresponse.status_code === 100) {
      //   Swal.fire({
      //     position: 'top',
      //     // icon: 'error',
      //     text: `${jsonresponse.message}`,
      //     customClass: {
      //       confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
      //     },
      //   });
      // }
      else if (jsonresponse.status_code === 500) {
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: "bg-success", // Apply custom CSS class to the OK button
          },
        });
      }
      console.log("Travel Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/profile`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setWalletAmount(jsonresponse[0].wallet.wallet_amount);
        setUserType(jsonresponse[0].userlist.vehicle_option);
      }
      console.log("Travel Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="card  mt-3 mb-5">
        <div className="card-header" style={{ backgroundColor: "#1F5F5B" }}>
          <h4 className="text-center fw-bold text-warning m-auto">
            {" "}
            MY TRAVEL PARTNERS{" "}
          </h4>{" "}
        </div>
        <div
          className="card-body"
          style={{
            borderWidth: "0 2px 2px 2px",
            borderStyle: "solid",
            borderColor: "#066539",
          }}
        >
          <div className="card" style={{ backgroundColor: "rgb(214 219 218)" }}>
            <div className="card-body">
              <div className="row">
                <div
                  className="card  border-0 w-100"
                  style={{
                    width: "auto",
                    backgroundColor: "rgb(214 219 218)",
                  }}
                >
                  <div className="row d-flex justify-content-left mb-3">
                    <div className="col-sm-2">
                      {name && image ? (
                        <div
                          className="card"
                          style={{
                            width: "6rem",
                            backgroundColor: "#F2D450",
                          }}
                        >
                          <img
                            src={`${IMAGE_URL}${image}`}
                            className="card-img-top w-80px m-auto py-3 h-80px h-fixed"
                          />
                          <div
                            className="card-title text-dark text-center"
                            style={{ width: "6rem", cursor: "pointer" }}
                            onClick={() => {
                              route();
                            }}
                          > 
                            {name}
                          </div>
                          <img
                            className=""
                            // src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
               
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="card h-100">
                    <div className="card-body-inner green-card">
                      <div className="d-flex flex-column">
                        <div
                          className="card-header text-white"
                          style={{ backgroundColor: "#00917C" }}
                        >
                          <h5 className="text-center text-white m-auto">
                            MY WALLET
                          </h5>
                        </div>
                        <div className="row d-flex justify-content-between px-5 py-3 ">
                          <div className="col-md-3">
                            <i className=" p-3 px-4 fa-solid text-success fa-wallet fs-1"></i>
                          </div>
                          <div className="col-md-3">
                            <div className="card border-0 w-100">
                              {" "}
                              <p className="py-3  fw-bold text-success fs-5">
                                Rs. {walletAmount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row py-5 w-100">
                          <div className="col-md-6 px-1 m-auto ">
                            <div className="w-100">
                              {userType === 0 ?
                                (
                                  <button class="d-block border-0 text-center fs-7 btn-menu-blue-left corner-rounded text-white fw-bold py-4 px-10 w-100 shadow-sm" onClick={onNavigate}><span class="text-uppercase">Recharge</span></button>
                                  // <button className="btn btn_view text-light btn-block bg-success btn-hover-success fs-5" onClick={onNavigate}>
                                  //   Recharge
                                  // </button>
                                ) :
                                (
                                  <button class="d-block border-0 text-center fs-7 btn-menu-blue-left corner-rounded text-white fw-bold py-4 px-10 w-100 shadow-sm" ><span class="text-uppercase">Recharge</span></button>

                                  // <button className="btn btn_view text-light btn-block bg-success btn-hover-success fs-5">
                                  //   Recharge
                                  // </button>
                                )}
                            </div>
                          </div>

                        </div>
                        <div className="row w-100">
                          <div className="col-md-6 px-1 m-auto">
                            <div className="w-100">
                              <button class="d-block border-0 text-center btn-menu-blue-left mb-2 fs-7 corner-rounded text-white fw-bold py-4 px-10 w-100 shadow-sm"><span class="text-uppercase">View Transaction History</span></button>

                              {/* <button className="btn btn_view text-light btn-block bg-success btn-hover-success fs-5">
                                View Transaction History
                              </button> */}
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
                              style={{ backgroundColor: "#00917C" }}
                            >
                              <h5 className="text-center text-white m-auto">
                                COST PER SEAT PER DAY
                              </h5>
                            </div>

                            <div className="row d-flex justify-content-between px-5 py-3 ">
                              <div className="col-md-6">
                              {image ? (
                                    <img
                                      src={`${IMAGE_URL}${image}`}
                                      className="card-img-top w-70px m-auto border border-1 border-success h-70px bg-success"
                                    />
                                  ) : (
                                    <img
                                      src={`${BASE_URL}/assets/images/Vector.png`}
                                      className="card-img-top w-70px m-auto border border-1 h-70px border-success bg-success"
                                    />
                                  )}                              </div>
                              <div className="col-md-6">
                                <p className="fw-bold">{name}</p>
                                  <p className="fw-bold">RS &nbsp; {price}/-</p>
                                  <p className="fw-bold">Start Date: {date}</p>
                              </div>
                            </div>

                            <div className="row d-flex justify-content-between py-5">
                              <div className="card-body  d-flex justify-content-between h-50 fw-bold text-success">
                                <div className="px-4">
                                  <p className="text-dark">
                                    Daily Commuting Cost
                                  </p>
                                </div>

                                <p className="text-dark px-4">RS. 346/-</p>
                              </div>
                              <div className="align-items-center px-5">
                                <ol style={{ listStyleType: "disc" }}>
                                  <li>Distance: 50km</li>
                                  <li>Avg. Fuel consumption: 10km/Ltr</li>
                                  <li>Fuel Price: Rs. 230/Ltr (Rs. 288/-)</li>
                                  <li>Maintenance (10%): Rs.29/-</li>
                                  <li>Wear & Tear (10%): Rs. 29/-</li>
                                </ol>
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
        </div>
      </div>
    </div>
  );
};

export default TravelPatners;
