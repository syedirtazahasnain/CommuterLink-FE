import React, { useEffect, useState } from "react";
import { Nav, Tab, Container, Row, Col } from 'react-bootstrap';
import { TextField, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import DatePicker from '@mui/lab/DatePicker';
import { ThreeCircles } from "react-loader-spinner";
import { displayNotification } from "../../../helpers";


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

const TravelBuddyProfile = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const [requestStage, setRequestStage] = useState("");
  const [loading, setLoading] = useState(true);


  const route = async () => {
    if (requestedAs === "rider") {
      navigate("/termscondition1");
    }
    else if (requestedAs === "driver") {
      navigate("/beforeapprovalterms");
    }
  };

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

  // For Dashboard Data
  const [profileType, setProfileType] = useState("");
  const [contactId, setContactId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [id, setId] = useState("");
  const [requestedAs, setRequestedAs] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState("");
  const [timeDepart, setTimeDepart] = useState("");
  const [timeReturn, setTimeReturn] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [seatsLeft, setSeatsLeft] = useState("");
  const [carAC, setCarAC] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carCC, setCarCC] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carRegYear, setCarRegYear] = useState("");
  const [RegNo, setRegNo] = useState("");
  const [RegYear, setRegYear] = useState("");

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/matches/office`,
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
        setProfileType("Rider");
        setContactId(jsonresponse.rider[0].contact_id);
        setName(jsonresponse.rider[0].name);
        setImage(jsonresponse.rider[0].commuter_image);
        setGender(jsonresponse.rider[0].gender);
        setAge(jsonresponse.rider[0].age);
        setProfession(jsonresponse.rider[0].profession);
        setRequestStage(jsonresponse.rider[0].req_stage);
        setPreferredGender(jsonresponse.rider[0].preferred_gender);
        setSeats(jsonresponse.rider[0].seats);
        setOrigin(jsonresponse.rider[0].origin);
        setDestination(jsonresponse.rider[0].destination);
        setTimeDepart(jsonresponse.rider[0].time_depart);
        setTimeReturn(jsonresponse.rider[0].time_return);
        setDays(jsonresponse.rider[0].days);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setProfileType("Driver");
        setContactId(jsonresponse.drivers[0].contact_id);
        setName(jsonresponse.drivers[0].name);
        setImage(jsonresponse.drivers[0].commuter_image);
        setGender(jsonresponse.drivers[0].gender);
        setAge(jsonresponse.drivers[0].age);
        setRequestStage(jsonresponse.drivers[0].req_stage);
        setProfession(jsonresponse.drivers[0].profession);
        setPreferredGender(jsonresponse.drivers[0].preferred_gender);
        setSeats(jsonresponse.drivers[0].seats);
        setOrigin(jsonresponse.drivers[0].origin);
        setDestination(jsonresponse.drivers[0].destination);
        setTimeDepart(jsonresponse.drivers[0].time_depart);
        setTimeReturn(jsonresponse.drivers[0].time_return);
      }
      console.log("Commuter Profile Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProfileData = async () => {
    try {
      if (profileType === "Driver") {
        const response = await fetch(
          `${API_URL}/api/v1/commuter/profile/${contactId}/driver`,
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
          setDays(jsonresponse.data[0].days);
          setPrice(jsonresponse.data[0].price);
          setMobileNo(jsonresponse.data[0].mobile);
          setSeatsLeft(jsonresponse.data[0].vehicle[0].seats_left);
          setCarAC(jsonresponse.data[0].vehicle[0].car_ac);
          setCarBrand(jsonresponse.data[0].vehicle[0].car_brand);
          setCarCC(jsonresponse.data[0].vehicle[0].car_cc);
          setCarModel(jsonresponse.data[0].vehicle[0].car_model);
          setCarRegYear(jsonresponse.data[0].vehicle[0].car_reg_year);
          setRegNo(jsonresponse.data[0].vehicle[0].reg_no);
          setRegYear(jsonresponse.data[0].vehicle[0].reg_year);
        }
        console.log("Driver Profile Data:", jsonresponse);
      }
      else if (profileType === "Rider") {
        const response = await fetch(
          `${API_URL}/api/v1/commuter/profile/${contactId}/rider`,
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
          setDays(jsonresponse.data[0].days);
          setPrice(jsonresponse.data[0].price);
          setMobileNo(jsonresponse.data[0].mobile);
          setSeatsLeft(jsonresponse.data[0].vehicle[0].seats_left);
          setCarAC(jsonresponse.data[0].vehicle[0].car_ac);
          setCarBrand(jsonresponse.data[0].vehicle[0].car_brand);
          setCarCC(jsonresponse.data[0].vehicle[0].car_cc);
          setCarModel(jsonresponse.data[0].vehicle[0].car_model);
          setCarRegYear(jsonresponse.data[0].vehicle[0].car_reg_year);
          setRegNo(jsonresponse.data[0].vehicle[0].reg_no);
          setRegYear(jsonresponse.data[0].vehicle[0].reg_year);
        }
        console.log("Rider Profile Data:", jsonresponse);
      }
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
        setProfileType("Rider");
        setMemberId(jsonresponse.data[0].contact_id);
        setId(jsonresponse.data[0].id);
        setRequestedAs(jsonresponse.data[0].requested_as);
        setName(jsonresponse.data[0].user[0].name);
        setImage(jsonresponse.data[0].user[0].commuter_image);
        setGender(jsonresponse.data[0].user[0].gender);
        setAge(jsonresponse.data[0].user[0].age);
        setProfession(jsonresponse.data[0].user[0].profession);
        setOrigin(jsonresponse.data[0].user[0].origin);
        setDestination(jsonresponse.data[0].user[0].destination);
        setTimeDepart(jsonresponse.data[0].user[0].time_depart);
        setTimeReturn(jsonresponse.data[0].user[0].time_return);
        setDays(jsonresponse.data[0].user[0].days);
      }
      console.log("Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getTravelData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/travelbuddy`,
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
        setProfileType(jsonresponse.data[0].type);
        setName(jsonresponse.data[0].name);
        setImage(jsonresponse.data[0].commuter_image);
        setGender(jsonresponse.data[0].gender);
        setPrice(jsonresponse.data[0].price)
        setAge(jsonresponse.data[0].age);
        setMobileNo(jsonresponse.data[0].mobile);
        setDays(jsonresponse.data[0].days);
        setRequestStage(jsonresponse.data[0].req_stage);
        setProfession(jsonresponse.data[0].profession);
        setPreferredGender(jsonresponse.data[0].preferred_gender);
        setSeats(jsonresponse.data[0].seats);
        setOrigin(jsonresponse.data[0].origin);
        setDestination(jsonresponse.data[0].destination);
        setTimeDepart(jsonresponse.data[0].time_depart);
        setTimeReturn(jsonresponse.data[0].time_return);
      }
      else if (jsonresponse.status_code === 100) {
        // Swal.fire({
        //   position: 'top',
        //   text: `${jsonresponse.message}`,
        //   customClass: {
        //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("error", `${jsonresponse.message}`);
      }
      if (jsonresponse.status_code === 500) {
        // Swal.fire({
        //   position: 'top',

        //   text: `${jsonresponse.message}`,
        //   customClass: {
        //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("error", `${jsonresponse.message}`);
      }
      console.log("Travel Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (contactId) {
      getProfileData();
    }
  }, [contactId]);

  useEffect(() => {
    getTravelData();
  }, []);

  const GoBack = () => {
    navigate(-1);
  };


  const calendarPicker = () => {
    navigate("/partner-cancellation");

  };
  const youSure = () => {
    Swal.fire({
      position: 'top',
      title: 'Are you sure?',
      text: "You want to cancel the agreement",
      showCancelButton: true,
      cancelButtonColor: 'swal-custom',
      customClass: {
        confirmButton: 'swal-custom',
        cancelButton:'swal-custom',
      },
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        calendarPicker();
      }
    })
  }

  const sendRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/termscondition1");
    }
  };

  const activeTabKey = "first";

  return (
    <div>
      <div className="page-title">
        <div className="card bg-medium-teal rounded-0 p-2 px-4 text-success my-2 fw-bold border-0 d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-dark-green my-2 fw-bold m-0">TRAVEL BUDDY PROFILE</h3>
            <Link
              to={"/dashboard"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div> </div>
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
        <div className="card p-4 bg-white rounded-0" >
          <div className="row">
            <div className="col-md-4">
              <div className="card rounded-0">
                <div className="card-img-top bg-medium-teal rounded-0 text-center py-5">
                  <img className="rounded-circle bg-white" src={`${IMAGE_URL}${image}`} alt="Card image cap" style={{ width: "200px", height: "200px" }} />
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
                    <div className="row mb-2">
                      <div className="col-md-6">
                        {mobileNo !== "" ? (
                          <>
                            <h5 className="text-dark-green fw-bold text-end font-custom">Contact No:</h5>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-md-6">
                        <h5 className="fw-bold text-secondary">{mobileNo}</h5>
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
                    id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{profileType === "rider" ? ("Traveller Details") : ("Car Offerer Details")}</button>
                </li>
                <li class="nav-item me-0" role="presentation">
                  <button className={`nav-link fs-4 custom-button-style rounded-0`}
                    id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Additional Info</button>
                </li>
                <li class="nav-item me-0" role="presentation">
                  <button className={`nav-link fs-4 custom-button-style rounded-0`}
                    id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">View On Map</button>
                </li>
              </ul>
              <div class="tab-content flex-grow-1" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                  <div className="row ">

                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-12">
                          {name !== "" ? (
                            <div className="mt-0">
                              <h1 className="text-dark fw-bold">{name}</h1>
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
                          {preferredGender !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Preffered Gender:</h5>
                            </>
                          ) : (
                            <>
                            </>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{preferredGender}</h5>
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
                          {timeDepart !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Pickup Timings:</h5>
                            </>
                          ) : (
                            <>

                            </>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{timeDepart}</h5>
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
                          {timeReturn !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Return Timings:</h5>
                            </>
                          ) : (
                            <>

                            </>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{timeReturn}</h5>
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
                          {name !== "" ? (
                            <div className="mt-0">
                              <h1 className="text-dark fw-bold">{name}</h1>
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
                          {seats !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">No.of Seats:</h5>
                            </>
                          ) : (
                            <>

                            </>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{seats}</h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4">
                          {price !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Payment Terms (per day):</h5>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">Rs. {price}/-</h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4">
                          {carAC !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Car have AC:</h5>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{carAC}</h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4">
                          {carBrand !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Car Brand:</h5>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{carBrand}</h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4">
                          {carCC !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Car CC:</h5>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{carCC}</h5>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-md-4">
                          {carModel !== "" ? (
                            <>
                              <h5 className="text-dark-green fw-bold font-custom">Car Model:</h5>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="col-md-8">
                          <h5 className="fw-bold text-secondary">{carModel}</h5>
                          {carModel}
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4">
                            {RegNo !== "" ? (
                              <>
                                <h5 className="text-dark-green fw-bold font-custom">Registration Number:</h5>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-secondary">{RegNo}</h5>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4">
                            {RegYear !== "" ? (
                              <>
                                <h5 className="text-dark-green fw-bold font-custom">Registration Year:</h5>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-secondary">{RegYear}</h5>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-4">
                            {carRegYear !== "" ? (
                              <>
                                <h5 className="text-dark-green fw-bold font-custom">Car Registration Year:</h5>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-8">
                            <h5 className="fw-bold text-secondary">{carRegYear}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">MAPPPPP</div>
              </div>
              <div className="text-end px-3 py-3">
                <Button className="my-auto font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-0 px-3 py-3" onClick={youSure}>
                  Cancel Agreement
                </Button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default TravelBuddyProfile;
