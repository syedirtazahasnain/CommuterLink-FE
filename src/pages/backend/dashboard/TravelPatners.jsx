import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { setContactIdState } from "../../../redux/generalSlice";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";
import { ThreeCircles } from "react-loader-spinner";
import { Row } from "react-bootstrap";
import { Button } from "@mui/base";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${monthNames[monthIndex]}-${year}`;
}

const TravelPatners = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);

  // For Travel Data
  // const [contactId, setContactId] = useState("");
  // const [name, setName] = useState("");
  // const [image, setImage] = useState("");
  // const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [cancelDate, setCancelDate] = useState(null);
  const [walletAmount, setWalletAmount] = useState("");
  const [userType, setUserType] = useState("");
  const [data, setData] = useState("");

  // For Dashboard Data
  const [requestStage, setRequestStage] = useState("");
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
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  // For Recent Transcations
  const [recentData, setRecentData] = useState([]);

  // Travel Cost Data
  const [distance, setDistance] = useState("");
  const [fuelAverage, setFuelAverage] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [liter, setLiter] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [wearAndTear, setWearAndTear] = useState("");

  useEffect(() => {
    // Fetch status data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/latest-record/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const jsonresponse = await response.json();
        console.log("Recent History:", jsonresponse);
        if (jsonresponse.success === true) {
          setRecentData(jsonresponse.data);

          // Add a delay of 1.5 seconds before removing the loading message
          setTimeout(() => {
            setRecentLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRecentLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Define a function that contains the code to execute
    const fetchData = () => {
      getProfileData();
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 1 minute 20-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 120000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getTravelData();
  }, []);

  useEffect(() => {
    getSeatCostDetail();
  }, [userType, contactId]);

  const onNavigate = () => {
    navigate("/rechargewallet");
  };
  const viewTrasaction = () => {
    navigate("/transaction-history")
  }

  const route = (contactId) => {
    setSubmit(true);

    if (!submitbtn) {
      dispatch(setContactIdState(contactId));
      navigate("/travel-buddy");
    }
  };

  // const getTravelData = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/api/v1/travelbuddy`, {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });

  //     const jsonresponse = await response.json();
  //     if (jsonresponse.data && jsonresponse.data.length > 0) {
  //       setContactId(jsonresponse.data[0].contact_id);
  //       setName(jsonresponse.data[0].name);
  //       setImage(jsonresponse.data[0].commuter_image);
  //       setPrice(jsonresponse.data[0].price);
  //       setDate(jsonresponse.data[0].aggreement_date);
  //     }
  //     else if (jsonresponse.status_code === 100) {
  //       setData(jsonresponse.message);
  //     }
  //     else if (jsonresponse.status_code === 500) {
  //       Swal.fire({
  //         position: 'top',
  //         // icon: 'error',
  //         text: `${jsonresponse.message}`,
  //         customClass: {
  //           confirmButton: "swal-custom",
  //         },
  //       });
  //     }
  //     console.log("Travel Data:", jsonresponse);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

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
      if (jsonresponse.length > 0) {
        setWalletAmount(jsonresponse[0].wallet.wallet_amount);
        setUserType(jsonresponse[0].userlist.vehicle_option);
      }
      console.log("Travel Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // const getProfileData = async () => {
  //   try {
  //     if (profileType === "Driver") {
  //       const response = await fetch(
  //         `${API_URL}/api/v1/commuter/profile/${contactId}/driver`,
  //         {
  //           method: "get",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );

  //       const jsonresponse = await response.json();
  //       if (jsonresponse.data && jsonresponse.data.length > 0) {
  //         setDays(jsonresponse.data[0].days);
  //         setPrice(jsonresponse.data[0].price);
  //         setMobileNo(jsonresponse.data[0].mobile);
  //         setSeatsLeft(jsonresponse.data[0].vehicle[0].seats_left);
  //         setCarAC(jsonresponse.data[0].vehicle[0].car_ac);
  //         setCarBrand(jsonresponse.data[0].vehicle[0].car_brand);
  //         setCarCC(jsonresponse.data[0].vehicle[0].car_cc);
  //         setCarModel(jsonresponse.data[0].vehicle[0].car_model);
  //         setCarRegYear(jsonresponse.data[0].vehicle[0].car_reg_year);
  //         setRegNo(jsonresponse.data[0].vehicle[0].reg_no);
  //         setRegYear(jsonresponse.data[0].vehicle[0].reg_year);
  //       }
  //       console.log("Driver Profile Data:", jsonresponse);
  //     }
  //     else if (profileType === "Rider") {
  //       const response = await fetch(
  //         `${API_URL}/api/v1/commuter/profile/${contactId}/rider`,
  //         {
  //           method: "get",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );

  //       const jsonresponse = await response.json();
  //       if (jsonresponse.data && jsonresponse.data.length > 0) {
  //         setDays(jsonresponse.data[0].days);
  //         setPrice(jsonresponse.data[0].price);
  //         setMobileNo(jsonresponse.data[0].mobile);
  //         setSeatsLeft(jsonresponse.data[0].vehicle[0].seats_left);
  //         setCarAC(jsonresponse.data[0].vehicle[0].car_ac);
  //         setCarBrand(jsonresponse.data[0].vehicle[0].car_brand);
  //         setCarCC(jsonresponse.data[0].vehicle[0].car_cc);
  //         setCarModel(jsonresponse.data[0].vehicle[0].car_model);
  //         setCarRegYear(jsonresponse.data[0].vehicle[0].car_reg_year);
  //         setRegNo(jsonresponse.data[0].vehicle[0].reg_no);
  //         setRegYear(jsonresponse.data[0].vehicle[0].reg_year);
  //       }
  //       console.log("Rider Profile Data:", jsonresponse);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

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
        setContactId(jsonresponse.data[0].contact_id);
        setName(jsonresponse.data[0].name);
        setImage(jsonresponse.data[0].commuter_image);
        setPrice(jsonresponse.data[0].price);
        setDate(jsonresponse.data[0].aggreement_date);
        setCancelDate(jsonresponse.data[0].cancellation_date);
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
        setDropOffAddress(jsonresponse.data[0].dropoff_address);
        setPickupAddress(jsonresponse.data[0].pickup_address);
        setCarAC(jsonresponse.data[0].vehicle[0].car_ac);
        setCarBrand(jsonresponse.data[0].vehicle[0].car_brand);
        setCarCC(jsonresponse.data[0].vehicle[0].car_cc);
        setCarModel(jsonresponse.data[0].vehicle[0].car_model);
        setCarRegYear(jsonresponse.data[0].vehicle[0].car_reg_year);
        setRegNo(jsonresponse.data[0].vehicle[0].reg_no);
        setRegYear(jsonresponse.data[0].vehicle[0].reg_year);
        setSeatsLeft(jsonresponse.data[0].vehicle[0].seats_left);
      }
      else if (jsonresponse.status_code === 100) {
        setData(jsonresponse.message);
      }
      else if (jsonresponse.status_code === 500) {
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: "swal-custom",
          },
        });
      }
      console.log("Travel Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getSeatCostDetail = async () => {
    try {
      if (userType === 1) {
        const response = await fetch(`${API_URL}/api/v1/seat-cost-detail`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const jsonresponse = await response.json();
        if (jsonresponse && jsonresponse.data) {
          setDistance(jsonresponse.data[0]['Distance']);
          setFuelAverage(jsonresponse.data[0]['Fuel Average']);
          setFuelPrice(jsonresponse.data[0]['Fuel-Price']);
          setLiter(jsonresponse.data[0]['Liter']);
          setMaintenance(jsonresponse.data[0]['Maintenance']);
          setWearAndTear(jsonresponse.data[0]['Wear and Tear']);
        }
        console.log("Driver Seat Cost Data", jsonresponse);
      }
      else if (userType === 0 && contactId !== "") {
        const response = await fetch(`${API_URL}/api/v1/seat-cost-detail/${contactId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const jsonresponse = await response.json();
        if (jsonresponse && jsonresponse.data) {
          setDistance(jsonresponse.data[0]['Distance']);
          setFuelAverage(jsonresponse.data[0]['Fuel Average']);
          setFuelPrice(jsonresponse.data[0]['Fuel-Price']);
          setLiter(jsonresponse.data[0]['Liter']);
          setMaintenance(jsonresponse.data[0]['Maintenance']);
          setWearAndTear(jsonresponse.data[0]['Wear and Tear']);
        }
        console.log("Rider Seat Cost Data", jsonresponse);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // useEffect(() => {
  //   if (contactId) {
  //     getProfileData();
  //   }
  // }, [contactId]);

  const calendarPicker = (contactId) => {
    dispatch(setContactIdState(contactId));
    navigate("/partner-cancellation");
  };

  const youSure = () => {
    calendarPicker(contactId);
    // Swal.fire({
    //   position: 'top',
    //   title: 'Are you sure?',
    //   html: `You want to cancel the agreement`,
    //   showCancelButton: true,
    //   cancelButtonColor: 'swal-custom',
    //   customClass: {
    //     confirmButton: 'swal-custom',
    //     cancelButton: 'swal-custom',
    //     htmlContainer: 'text-center',
    //   },
    //   confirmButtonText: 'Yes'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     calendarPicker(contactId);
    //   }
    // })
  }
  const tableCellStyle = {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: '7px',
    paddingTop: '7px',
    fontSize: '13px'
  };

  // Splitting the latitude and longitude
  const dropoffCoords = dropOffAddress.split(',');
  const pickupCoords = pickupAddress.split(',');

  const dropoffLatitude = dropoffCoords[0];
  const dropoffLongitude = dropoffCoords[1];

  const pickupLatitude = pickupCoords[0];
  const pickupLongitude = pickupCoords[1];

  return (
    <div>
      {data !== "" ?
        (
          <></>
        )
        :
        (
          <div className="card  mb-5">
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
              <>
                <div className="card-header" style={{ backgroundColor: "#1F5F5B" }}>
                  <h4 className="text-center fw-bold text-warning m-auto">
                    {" "}
                    AGREEMENT INFORMATION{" "}
                  </h4>{" "}
                </div>
                <div className="card my-4 mx-4" style={{
                  backgroundColor: "#D9D9D9",
                }}>
                  {userType === 0 ? (
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
                            <li className="nav-item me-0" role="presentation">
                              <button className={`nav-link fs-4 custom-button-style rounded-0`}
                                id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"
                              // onClick={openModal}
                              >
                                View On Map</button>
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
                                    <div className="col-md-6">
                                      {seats !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">No.of Seats:</h5>
                                        </>
                                      ) : (
                                        <>

                                        </>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{seats}</h5>
                                    </div>
                                    <div className="col-md-6">
                                      {seatsLeft !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">No.of Seats Left:</h5>
                                        </>
                                      ) : (
                                        <>

                                        </>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{seatsLeft}</h5>
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
                                      {date !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Agreement Date:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{formatDate(date)}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {cancelDate !== null ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Cancel Agreement Date:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{cancelDate ? formatDate(cancelDate) : cancelDate}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carAC !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Car has AC:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{carAC}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carBrand !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Car Brand:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{carBrand}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carCC !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Car CC:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{carCC}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carModel !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Car Model:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{carModel}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {RegNo !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Registration Number:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{RegNo}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {RegYear !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Registration Year:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{RegYear}</h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carRegYear !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">Car Registration Year:</h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">{carRegYear}</h5>
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
                          <div className="text-end px-3 py-3">
                            <Button className="my-auto font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-0 px-3 py-3" onClick={youSure}>
                              Cancel Agreement
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="card-body" style={{ background: "rgb(214 219 218)" }}>
                        <div className="row d-flex flex-column">
                          <div className="card-body-inner green-card">
                            <div className="row d-flex flex-column">

                              <div className="row mb-3 justify-content-between">
                                <div className="col-md-4">
                                  <div className="card rounded-0">
                                    <div className="card-img-top bg-medium-teal rounded-0 text-center py-2">

                                      {image ? (
                                        <img
                                          src={`${IMAGE_URL}${image}`}
                                          className="card-img-top w-100px m-auto h-100px cursor-pointer rounded-circle"
                                        // onClick={() => {
                                        //   route(contactId);
                                        // }}
                                        />
                                      ) : (
                                        <img
                                          src={`${BASE_URL}/assets/images/Vector.png`}
                                          className="card-img-top w-70px h-70 m-auto mt-2 cursor-pointer"
                                        />
                                      )}

                                    </div>

                                    <div className="card-body bg-card-grey">
                                      <div className="card-text">
                                        <div className="row mb-2">
                                          <div className="col-md-6 ">
                                            {name !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Name:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="fw-bold text-secondary">{name}</h5>
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-8">
                                            {price !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Commuting Cost:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-4">
                                            <h5 className="fw-bold text-secondary">Rs. {price}/-</h5>
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-6">
                                            {date && formatDate(date) !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Start Date:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="fw-bold text-secondary">{date && formatDate(date)}</h5>
                                          </div>
                                        </div>
                                        <div className="text-center">
                                          <button className="font-custom btn btn-sm  fs-6 fw-bold btn-dark-green text-white py-2" onClick={() => {
                                            route(contactId);
                                          }}>View Profile</button>
                                        </div>

                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="card rounded-0">
                                    <div className="card-img-top bg-medium-teal rounded-0 text-center py-2">

                                      {image ? (
                                        <img
                                          src={`${BASE_URL}/assets/images/Vector.png`}
                                          className="card-img-top w-100px m-auto h-100px rounded-circle"
                                        // onClick={() => {
                                        //   route(contactId);
                                        // }}
                                        />
                                      ) : (
                                        <img
                                          src={`${BASE_URL}/assets/images/Vector.png`}
                                          className="card-img-top w-70px h-70 m-auto mt-2 cursor-pointer"
                                        />
                                      )}

                                    </div>

                                    <div className="card-body bg-card-grey">
                                      <div className="card-text">
                                        <div className="row mb-2">
                                          <div className="col-md-6 ">
                                            {name !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Name:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            {/* <h5 className="fw-bold text-secondary">{name}</h5> */}
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-8">
                                            {price !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Commuting Cost:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-4">
                                            {/* <h5 className="fw-bold text-secondary">{price}/-</h5> */}
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-6">
                                            {date && formatDate(date) !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Start Date:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            {/* <h5 className="fw-bold text-secondary">{date && formatDate(date)}</h5> */}
                                          </div>
                                        </div>

                                      </div>
                                      <div className="text-center"><button className="font-custom btn btn-sm  fs-6 fw-bold btn-dark-green text-white py-2">View Profile</button></div>
                                    </div>
                                    <div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="card rounded-0">
                                    <div className="card-img-top bg-medium-teal rounded-0 text-center py-2">

                                      {image ? (
                                        <img
                                          src={`${BASE_URL}/assets/images/Vector.png`}
                                          className="card-img-top w-100px m-auto h-100px rounded-circle"
                                        // onClick={() => {
                                        //   route(contactId);
                                        // }}
                                        />
                                      ) : (
                                        <img
                                          src={`${BASE_URL}/assets/images/Vector.png`}
                                          className="card-img-top w-70px h-70 m-auto mt-2 cursor-pointer"
                                        />
                                      )}

                                    </div>

                                    <div className="card-body bg-card-grey">
                                      <div className="card-text">
                                        <div className="row mb-2">
                                          <div className="col-md-6 ">
                                            {name !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Name:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            {/* <h5 className="fw-bold text-secondary">{name}</h5> */}
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-8">
                                            {price !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Commuting Cost:Rs.</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-4">
                                            {/* <h5 className="fw-bold text-secondary">{price}/-</h5> */}
                                          </div>
                                        </div>
                                        <div className="row mb-2">
                                          <div className="col-md-6">
                                            {date && formatDate(date) !== "" ? (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">Start Date:</h5>
                                              </>
                                            ) : (
                                              <>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            {/* <h5 className="fw-bold text-secondary">{date && formatDate(date)}</h5> */}
                                          </div>
                                        </div>

                                      </div>
                                      <div className="text-center"><button className="font-custom btn btn-sm  fs-6 fw-bold btn-dark-green text-white py-2">View Profile</button></div>
                                    </div>
                                    <div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                              </div>
                            </div>
                          </div>
                          <div>
                          </div>
                        </div >
                        {/* <div className="col-md-8">
                            <Table className="bg-dark text-white border-1 rounded-4">
                              <TableBody>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}> <h2 className="text-light">Daily Commute Details
                                  </h2></TableCell>
                                  <TableCell className="text-white" style={tableCellStyle}></TableCell>

                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Distance</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{distance}km</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Avg. Fuel consumption</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{fuelAverage}km/Ltr</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Fuel Price</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>
                                    Rs. {fuelPrice} /-
                                    <br />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Liter Consumed</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>
                                    {liter} Ltr
                                    <br />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Maintenance</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{maintenance}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="text-white" style={tableCellStyle}>Wear & Tear</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{wearAndTear}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div> */}
                      </div >
                    </div>
                  )}
                </div >
              </>
            )}
          </div >
        )}
      <div className="card  mt-3 mb-5">
        <div className="card-header" style={{ backgroundColor: "#1F5F5B" }}>
          <h4 className="text-center fw-bold text-warning m-auto">
            {" "}
            MY WALLET{" "}
          </h4>{" "}
        </div>
        {/* <div className="card mx-4 my-4" style={{ background: "rgb(214 219 218)" }}>
          <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row d-flex justify-content-between">
            <div className="col-md-6 col-sm-12 px-5 py-0 bg-light text-center border-2 rounded-4">
              <div className="text-center">  <i className=" p-3 wallet-margin fa-solid text-success fa-wallet fs-1"></i></div>
          
            <p className="py-3 text-center fw-bold text-success fs-3">
                    Rs. &nbsp; {walletAmount} /-
                  </p>
            </div>
            <div className="col-md-4 col-sm-12 mx-5 py-3"> <img
                        className="d-block img-fluid w-auto h-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      /></div>
            </div>
            
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <i className=" p-3 px-4 fa-solid text-success fa-wallet fs-1"></i>
                </div>
                <div className="col-md-10">

                  <p className="py-3 text-center fw-bold text-success fs-3">
                    Rs. &nbsp; {walletAmount} /-
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 text-center py-4">
              {userType === 0 ?
                (
                  <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white rounded-4 px-4 px-sm-5 py-3 py-sm-3 mb-3" onClick={onNavigate} >
                    Recharge
                  </button>
                ) :
                (
                    <div className="alert alert-info  text-center fw-bold fs-5" role="alert">
                      <i className="fa-solid fa-triangle-exclamation fs-5 text-warning"></i>Your wallet is secure and end to end encrypted.
                    </div>
                )}
              <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white rounded-4 px-4 px-sm-5 py-3 py-sm-3 mb-3" >
                View Transaction History
              </button>
            </div>
          </div>
          </div>
         
        </div> */}
        <div className="card mx-4 my-4 broder-0" style={{ background: "rgb(214 219 218)" }}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 px-4">
                <div className="row  justify-content-between mb-2">
                  <div className="col-md-12 col-sm-12  py-6 background_body text-center border-2 rounded-4">
                    <div className="text-center">  <i className=" p-3 wallet-margin fa-solid fa-wallet fs-1"></i></div>

                    <h1 className="py-4 text-center fw-bold  ">
                      Rs. {walletAmount} /-
                    </h1>
                  </div>
                  {/* <div className="col-md-4 col-sm-12 mx-5 py-3"> <img
                    className="d-block img-fluid w-auto h-auto"
                    src={`${BASE_URL}/assets/images/signup-3.png`}
                    alt="First slide"
                  /></div> */}
                </div>

              </div>
              {/* <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <i className=" p-3 px-4 fa-solid text-success fa-wallet fs-1"></i>
                </div>
                <div className="col-md-10">

                  <p className="py-3 text-center fw-bold text-success fs-3">
                    Rs. &nbsp; {walletAmount} /-
                  </p>
                </div>
              </div>
            </div> */}
              {/* <div className="col-md-4 col-sm-12 text-center py-4">
              {userType === 0 ?
                (
                  <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white rounded-4 px-4 px-sm-5 py-3 py-sm-3 mb-3" onClick={onNavigate} >
                    Recharge
                  </button>
                ) :
                (
                    <div className="alert alert-info  text-center fw-bold fs-5" role="alert">
                      <i className="fa-solid fa-triangle-exclamation fs-5 text-warning"></i>Your wallet is secure and end to end encrypted.
                    </div>
                )}
              <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white rounded-4 px-4 px-sm-5 py-3 py-sm-3 mb-3" >
                View Transaction History
              </button>
            </div> */}
              <div className="col-md-8 col-sm-12">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="">
                      <Table className="bg-dark text-white border-1 rounded-top-4">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}>
                              <h2 className="text-light">Recent Transactions</h2>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table className="bg-dark text-white border-1 rounded-bottom-4">
                        <TableHead>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}>Date</TableCell>
                            <TableCell className="text-white" style={tableCellStyle}>Description</TableCell>
                            <TableCell className="text-white" style={tableCellStyle}>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentLoading ? (
                            <TableRow>
                              <TableCell colSpan={3} className="d-flex align-items-center mx-auto my-auto">
                                <ThreeCircles
                                  height={30}
                                  width={30}
                                  color="#4fa94d"
                                  visible={true}
                                  ariaLabel="three-circles-rotating"
                                  outerCircleColor=""
                                  innerCircleColor=""
                                  middleCircleColor=""
                                />
                              </TableCell>
                            </TableRow>
                          ) : (
                            recentData.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={3} className="text-center text-white fw-bold">
                                  No Data Found
                                </TableCell>
                              </TableRow>
                            ) : (
                              recentData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell className="text-white text-center">{item.date}</TableCell>
                                  <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{item.Description}</TableCell>
                                  <TableCell className="text-white text-center">{`Rs. ${item.wallet_transfer}/-`}</TableCell>
                                </TableRow>
                              ))
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-5 d-flex justify-content-between">
              <div className="col-md-4 d-flex">
                <div className="row d-flex">
                  <div className="col-md-2"><img src={`${BASE_URL}/assets/images/data_security_icon.png`} className="w-50px h-50px" /></div>
                </div>
                <div className="col-md-8 fs-auto fw-bold"> Your wallet is secured  and<br /> end-to-end encrypted.</div>

              </div>
              <div className="col-md-6 col-sm-12">
                <div className="row d-flex justify-content-between">
                  <div className="col-md-6">
                    {userType === 0 ?
                      (
                        <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white px-4 px-sm-5 py-3 py-sm-3 mb-3" onClick={onNavigate} >
                          Recharge
                        </button>
                      ) :
                      (
                        <div
                        //  className="alert alert-info font-custom w-md-100 w-sm-auto me-3  fw-bold fs-auto" role="alert"

                        >
                          {/* <i className="fa-solid fa-triangle-exclamation fs-auto  text-warning"></i>Your wallet is secure and end to end encrypted. */}
                        </div>

                      )}

                  </div>

                  <div className="col-md-6">
                    <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white  px-4 px-sm-5 py-3 py-sm-3 mb-3" onClick={viewTrasaction}>
                      View Transaction History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TravelPatners;
