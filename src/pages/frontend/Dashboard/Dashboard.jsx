import React, { useState, useEffect } from "react";
// import Navbar from "../Hompage-components/Navbar";
// import Footer from "../Hompage-components/Footer";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { Button } from "@mui/base";
import { setsignupState } from "../../../redux/signupSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn , setSubmit] = useState(false);

  // For getting current date
  const currentDate = new Date();

  // Define arrays for days and months
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format the date
  const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${monthsOfYear[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  // For Dashboard Data
  const [contactId , setContactId] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  const route = () => {
    setSubmit(true);
    
    if(!submitbtn){
      navigate("/commuter-profile");
    }
  }

  const logout = () => {
    dispatch(setloginState(""));
    dispatch(setsignupState(""));
    navigate("/login");
  }

  const getDashboardData = async () => {
    const response = await fetch(
      "https://staging.commuterslink.com/api/v1/matches/office",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const jsonresponse = await response.json();
    setContactId(jsonresponse.rider[0].contact_id);
    //console.log("Rider Data:", jsonresponse.rider);
  };

  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    // Set the desired height of the background area
  };
  const backgroundStyle1 = {
    backgroundImage: `url(${BASE_URL}/assets/images/Sysreformslogo2.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
  };
  const backgroundMember = {
    backgroundImage: `url(${BASE_URL}/assets/images/Group 40.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    backgroundColor: "#198754",
  };

  return (
    <div className="card bg-light w-100 ">
      <div className="card-body P-0">
        <div className="row">
          <div
            className="col-lg-12 col-md-6 col-sm-4 d-flex p-0 "
            style={{ backgroundColor: "rgb(162 229 198)", border: "0" }}
          >
            <div className="col-lg-3 p-0">
              <div
                className="card d-flex bg-success d-flex justify-content-left"
                style={{ width: "23rem" }}
              >
                <div
                  className="bg-light w-100 mt-1 p-5"
                  style={backgroundStyle}
                ></div>

                <div className="d-flex align-items-center mt-3 me-5 me-xl-13">
                  {/*begin::Symbol*/}
                  <div className="symbol symbol-50px symbol-circle me-3">
                    <img
                      src={`${BASE_URL}/assets/images/pic.png`}
                      className
                      alt
                    />
                  </div>
                  {/*end::Symbol*/}
                  {/*begin::Info*/}
                  <div className="m-0">
                    <span className="fw-semibold text-white d-block fs-5">
                        Yasir Abbas Mirza
                    </span>
                    <button
                      href="/"
                      className="btn-success fw-bold text-white text-hover-success fs-6"
                    >
                      Profile
                    </button>
                  </div>
                  {/*end::Info*/}
                </div>
                <div
                  className="card"
                  style={{
                    width: "23rem",
                    backgroundColor: "rgb(32 155 98)",
                    border: "0",
                  }}
                >
                  <div className="card-body menu">
                    <ul>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white ">
                            DASHBOARD
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">MATCHES</li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">REQUESTS</li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            NOTIFICATIONS
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            PARTNER DETAILS
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            MY COMPUTER RECORDS
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            MY WALLET
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            COST CALCULATIONS
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            <br />
                          </li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">FAQS</li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">TERMS</li>
                        </a>
                      </div>
                      <div className="item">
                        <a href="">
                          <li className="border-bottom text-white">
                            CONTACT US
                          </li>
                        </a>
                      </div>
                    </ul>
                  </div>
                  <div
                    className="bg-dark w-100 mt-1"
                    style={backgroundStyle1}
                  ></div>
                </div>
              </div>{" "}
            </div>
            <div className="col-lg-9 px-5">
              <div
                className="card d-flex  d-flex justify-content-left"
                style={{
                  width: "60.5rem",
                  backgroundColor: "rgba(157,233,222,0.75)",
                }}
              >
                <div
                  id="kt_app_toolbar_container"
                  className="app-container container-fluid d-flex flex-stack"
                >
                  {/*begin::Page title*/}
                  <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    {/*begin::Title*/}
                    <span className="justify-content-center text-success">
                      {formattedDate}
                    </span>
                    <h2 className="page-heading d-flex  text-success  fw-bold fs-3 flex-column justify-content-center my-0">
                      Welcome to Yasir Abbas Mirza
                    </h2>
                  </div>

                  <div className="d-flex align-items-center gap-2 gap-lg-3">
                    <i
                      className="fas fa-bell text-success"
                      style={{ fontSize: "2rem" }}
                    ></i>

                    <Button
                      className="btn btn-sm fw-bold btn-success"
                      onClick={logout}
                    >
                      LOG OUT
                    </Button>
                  </div>
                </div>
                <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
                  <div className="border border-bottom border-success justify-content-center ml-3"></div>
                  <p className="justify-content-center px-3">
                    You are looking for travel buddles to ride your car, others
                    who want to share their car and to connect with members with
                    whom you can take{" "}
                  </p>
                </div>

                <div className="card" style={{ border: "1" }}>
                  <div class="card-header bg-dark text-warning mb-2">
                    <h3 className="text-center m-auto">
                      {" "}
                      TRAVEL BUDDIES FOR YOUR CAR{" "}
                    </h3>
                  </div>
                  <div className="row d-flex m-auto">
                    <div className="col-12">
                      <div className="card rounded-4">
                        <div
                          className="card-header rounded-top-4  text-white"
                          style={{ backgroundColor: "#2a402a" }}
                        >
                          <h4 className="m-auto">COMMUTERSLINK SUGGESTIONS</h4>
                        </div>
                        <div className="card-body">
                          <p className="card-title text-center">
                            Based upon your Profile, We have Following Matches
                            to Offer
                          </p>
                          <div
                            className="card m-auto border-0"
                            style={{ width: "50rem" }}
                          >
                            <div class="row d-flex justify-content-center">
                              <div className="col-sm-2">
                                <div
                                  className="card bg-success"
                                  style={{ width: "6rem" }}
                                >
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto "
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
                              <div className="col-sm-2">
                                <div
                                  className="card bg-success"
                                  style={{ width: "6rem" }}
                                >
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto "
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
                              <div className="col-sm-2">
                                <div
                                  className="card bg-success"
                                  style={{ width: "6rem" }}
                                >
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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

                          <button className="btn btn_view d-flex justify-content-end">
                            VIEW MORE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card" style={{ border: "1" }}>
                  <div class="card-header bg-dark text-warning mb-2">
                    <h3 className="text-center m-auto">
                      {" "}
                      GET A SEAT/S IN THEIR CAR{" "}
                    </h3>
                  </div>
                  <div className="row d-flex m-auto ">
                    <div className="col-12">
                      <div className="card rounded-4">
                        <div
                          className="card-header rounded-top-4  text-white"
                          style={{ backgroundColor: "#2a402a" }}
                        >
                          <h4 className="m-auto">REQUESTS BY MEMBERS</h4>
                        </div>
                        <div className="card-body">
                          <p className="card-title text-center">
                            Based upon your Profile, We have Following Matches
                            to Offer
                          </p>
                          <div
                            className="card m-auto border-0"
                            style={{ width: "50rem" }}
                          >
                            <div class="row d-flex justify-content-center">
                              <div className="col-sm-2">
                                <div
                                  className="card bg-success"
                                  style={{ width: "6rem" }}
                                >
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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

                          <button className="btn btn_view d-flex justify-content-end">
                            VIEW MORE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ border: "1" }}>
                  <div class="card-header bg-dark text-warning mb-2">
                    <h3 className="text-center m-auto"> MY TRAVEL PARTNERS </h3>
                  </div>
                  <div className="row m-auto ">
                    <div className="col-12">
                      <div className="card rounded-4 border-1">
                        <div className="card-body">
                          <div
                            className="card m-auto border-0"
                            style={{ width: "50rem" }}
                          >
                            <div class="row d-flex justify-content-center">
                              <div className="col-sm-2">
                                <div
                                  className="card bg-success"
                                  style={{ width: "6rem" }}
                                >
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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
                                    className="card-img-top w-40px m-auto "
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

                          <button className="btn btn_view d-flex text-success justify-content-end">
                            Change My Partner
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>

                <div className="card" style={{ border: "1" }}>
                  <div className="row d-flex m-auto ">
                    <div className="col-12">
                      <div className="card rounded-4">
                        <div className="card-body">
                          <div
                            className="card m-auto border-0"
                            style={{ width: "50rem" }}
                          >
                            <div className="card border-0">
                              <div className="row d-flex justify-content-between">
                                <div className="col-4 mx-2">
                                  <div
                                    className="card "
                                    style={{ width: "22rem" }}
                                  >
                                    <div
                                      className="card-header text-white"
                                      style={{ backgroundColor: "#2a402a" }}
                                    >
                                      <h4 className="text-center">MY WALLET</h4>
                                    </div>
                                  </div>
                                  <div className="row d-flex justify-content-between ">
                                    <div className="col-md-2">
                                      <i className=" p-3 fa-solid text-success fa-wallet"></i>
                                      <button className="btn btn_view text-success d-flex justify-contnet-end">
                                        Recharge
                                      </button>
                                    </div>
                                    <div className="col-md-2">
                                      <div
                                        className="card border-0"
                                        style={{ width: "6rem" }}
                                      >
                                        {" "}
                                        <p className="py-3 text-center fw-bold text-success">
                                          Rs.0/
                                        </p>
                                        <button className="btn btn_view text-success d-flex justify-content-end">
                                          View Transaction History
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div
                                    className="card mx-3"
                                    style={{ width: "20rem" }}
                                  >
                                    <div
                                      className="card-header   text-white"
                                      style={{ backgroundColor: "#2a402a" }}
                                    >
                                      <h4 className="">
                                        Cost Per Seat per day
                                      </h4>
                                    </div>
                                    <div className="">
                                      <div
                                        className="card"
                                        style={{ width: "15rem" }}
                                      >
                                        <div class="row d-flex justify-content-center"></div>
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
                <div className="card" style={{ border: "1" }}>
                  <div class="card-header bg-dark text-warning mb-2">
                    <h3 className="text-center m-auto">TRAVEL CONFIRMATION</h3>
                  </div>
                  <div className="row d-flex m-auto ">
                    <div className="col-12">
                      <div className="card rounded-4">
                        <div className="card-body">
                          <div
                            className="card m-auto border-0"
                            style={{ width: "50rem" }}
                          >
                            <p className="text-success text-center">
                              After starting travelling with someone you will be
                              able to confirm your date of travel
                            </p>
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

export default Dashboard;
