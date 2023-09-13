import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommuterDetails = () => {
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
  }

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/matches/office`,
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
      if (jsonresponse.rider && jsonresponse.rider.length > 0) {
        setContactId(jsonresponse.rider[0].contact_id);
      }
      else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setContactId(jsonresponse.drivers[0].contact_id);
      }
      else {
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
      console.log(jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div >
      <div className="card bg-light-green mt-3 mb-5" >
        <div className="card-header bg-black">
          <h3 className="text-center text-warning m-auto">
            {" "}
            TRAVEL BUDDIES FOR YOUR CAR{" "}
          </h3> </div>
        <div className="card-body" style={{ borderWidth: "0 2px 2px 2px", borderStyle: "solid", borderColor: "#066539" }}>
          <div className="container">
            <div className="card ">
              <div className="card-header bg-dark-green" >
                <h3 className="text-white mt-3 mx-auto">COMMUTERSLINK SUGGESTION</h3>
              </div>

              <div className="card-body card-body-bg">
                <p>Based upon your Profile, We have Following <strong> MATCHES</strong> to Offer
                </p>
                <div className="row">
                  
                  <div className="col-sm-6">
                    <div className="card">
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
                                  <i className=" p-3 fa-solid text-success fa-wallet"></i>
                                  <button className="btn btn_view text-success d-flex justify-contnet-end">
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
                                <div className="row d-flex justify-content-between ">
                              
                                <div className="col-md-6">
                                  <div
                                    className="card text-center border-0 w-100"
                                    style={{
                                      // width: "6rem",
                                      // backgroundColor: "#D9D9D9",
                                    }}
                                  >
                                    {" "}
                                    <p className="py-3 text-center fw-bold text-success">
                                      Rs.00000/
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
          </div>
        </div>
      </div>
      <div className="container page-title">
        <div
          className="card border-0"
          style={{ backgroundColor: "#D9D9D9", borderBlockColor: "#D9D9D9" }}
        >
          <div
            className="card border-1 border-dark"
            style={{
              width: "70rem",
              backgroundColor: "#D9D9D9",
            }}
          >
            <div
              id="kt_app_toolbar_container"
              className="app-container container-fluid d-flex flex-stack"
            ></div>

            <div
              className="card"
              style={{
                border: "1",
                backgroundColor: "#D9D9D9",
              }}
            >
              <div class="card-header bg-dark mb-2">
                <h3 className="text-center text-warning m-auto">
                  {" "}
                  TRAVEL BUDDIES FOR YOUR CAR{" "}
                </h3>
              </div>
              <div className="row d-flex m-auto">
                <div className="col-12">
                  <div className="card rounded-4">
                    <div
                      className="card-header rounded-top-4 "
                      style={{ backgroundColor: "#2a402a" }}
                    >
                      <h4 className="m-auto text-white">
                        COMMUTERSLINK SUGGESTIONS
                      </h4>
                    </div>
                    <div
                      className="card-body border border-1 border-dark py-5"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <p className="card-title text-center">
                        Based upon your Profile, We have Following{" "}
                        <span className="fs-5 fw-bold">Matches </span>
                        to Offer
                      </p>
                      <div
                        className="card m-auto border-0"
                        style={{
                          width: "50rem",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <div class="row d-flex justify-content-center">
                          {contactId !== "" ? (
                            <div className="col-sm-2">
                              <div
                                className="card"
                                style={{ width: "6rem", fontWeight: "bold", backgroundColor: "rgb(32 155 98)" }}
                              >
                                <img
                                  src={`${BASE_URL}/assets/images/Vector.png`}
                                  className="card-img-top w-40px m-auto"
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
                          ) :
                            (
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
                                    style={{ width: "6rem", cursor: "pointer", }}
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
                            )
                          }
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
                                style={{ width: "6rem", cursor: "pointer", }}
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

                      <button className="btn btn_view d-flex justify-content-end">
                        VIEW MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card"
              style={{
                border: "1",
                backgroundColor: "#D9D9D9",
              }}
            >
              <div class="card-header bg-dark  mb-2">
                <h3 className="text-center text-warning m-auto">
                  {" "}
                  GET A SEAT/S IN THEIR CAR{" "}
                </h3>
              </div>
              <div className="row d-flex m-auto ">
                <div className="col-12">
                  <div className="card rounded-4">
                    <div
                      className="card-header rounded-top-4"
                      style={{ backgroundColor: "#2a402a" }}
                    >
                      <h4 className="m-auto text-white">
                        REQUESTS BY MEMBERS
                      </h4>
                    </div>
                    <div
                      className="card-body border border-1 border-dark"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <p className="card-title text-center">
                        Based upon your Profile, We have Following{" "}
                        <span className="fs-5 fw-bold">Requests </span>
                        to Offer
                      </p>
                      <div
                        className="card m-auto border-0"
                        style={{
                          width: "50rem",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <div class="row d-flex justify-content-center">
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
                                style={{ width: "6rem", cursor: "pointer", }}
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

                      <button className="btn btn_view d-flex justify-content-end">
                        VIEW MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{
                border: "1",
                backgroundColor: "#D9D9D9",
              }}
            >
              <div class="card-header bg-dark mb-2">
                <h3 className="text-center text-warning m-auto">
                  {" "}
                  MY TRAVEL PARTNERS{" "}
                </h3>
              </div>
              <div className="row m-auto">
                <div className="col-12">
                  <div
                    className="card rounded-4 border-1"
                    style={{ backgroundColor: "#D9D9D9" }}
                  >
                    <div className="card-body border border-1 border-dark">
                      <div
                        className="card m-auto border-0"
                        style={{
                          width: "50rem",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <div class="row d-flex justify-content-center">
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

                      <button className="btn btn_view d-flex text-success justify-content-end">
                        Change My Partner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div></div>

            <div
              className="card py-2"
              style={{
                border: "1",
                backgroundColor: "#D9D9D9",
              }}
            >
              <div className="row d-flex m-auto ">
                <div className="col-12">
                  <div className="card rounded-4">
                    <div
                      className="card-body border border-1 border-dark"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <div
                        className="card m-auto border-0"
                        style={{
                          width: "50rem",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <div
                          className="card border-0"
                          style={{
                            backgroundColor: "#D9D9D9",
                          }}
                        >
                          <div className="row d-flex justify-content-between">
                            <div className="col-4 mx-2">
                              <div
                                className="card "
                                style={{ width: "22rem" }}
                              >
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
                                    style={{
                                      width: "6rem",
                                      backgroundColor: "#D9D9D9",
                                    }}
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
                                style={{
                                  width: "20rem",
                                  backgroundColor: "#D9D9D9",
                                }}
                              >
                                <div
                                  className="card-header"
                                  style={{
                                    backgroundColor: "#2a402a",
                                  }}
                                >
                                  <h4 className="m-auto  text-white">
                                    Cost Per Seat per day
                                  </h4>
                                </div>
                                <div className="">
                                  <div
                                    className="card-body mx-5"
                                    style={{
                                      width: "15rem",
                                    }}
                                  >
                                    <div class="row d-flex fw-bold text-center text-success justify-content-center">
                                      Rs.0000/-
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
            <div
              className="card"
              style={{
                border: "1",
                backgroundColor: "#D9D9D9",
              }}
            >
              <div class="card-header bg-dark">
                <h3 className="text-center text-warning m-auto">
                  TRAVEL CONFIRMATION
                </h3>
              </div>
              <div className="row d-flex m-auto py-2">
                <div className="col-12">
                  <div className="card rounded-4">
                    <div
                      className="card-body border border-1 border-dark"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <div
                        className="card m-auto border-0"
                        style={{
                          width: "50rem",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <p className="text-success text-center fw-bold">
                          After starting travelling with someone you
                          will be able to confirm your date of travel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
          </div>
        </div>
        {/* <div className="card border-0">
          <div className="card-body border-0 p-0">
            <div clasName="container">
            </div>
          </div>
        </div> */}
      </div>



    </div>
  );
};

export default CommuterDetails;
