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

const MyWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(false);

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

  // For second person
  const [contactId1, setContactId1] = useState("");
  const [name1, setName1] = useState("");
  const [image1, setImage1] = useState("");
  const [price1, setPrice1] = useState("");
  const [date1, setDate1] = useState("");

  // For third person
  const [contactId2, setContactId2] = useState("");
  const [name2, setName2] = useState("");
  const [image2, setImage2] = useState("");
  const [price2, setPrice2] = useState("");
  const [date2, setDate2] = useState("");

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
  }, [userToken]);

  useEffect(() => {
    if (cancelDate !== null) {
      setCancelDisabled(true);

    }
  }, [cancelDate]);

  useEffect(() => {
    getSeatCostDetail();
  }, [userType, contactId]);

  const onNavigate = () => {
    navigate("/amountvalidation");
  };
  const viewTrasaction = () => {
    navigate("/transaction-history")
  }

  const route = (contactId) => {

    if (contactId !== "") {
      dispatch(setContactIdState(contactId));
      navigate("/travel-buddy");
    }
    else {
      return;
    }
  };

  const route1 = (contactId1) => {

    if (contactId1 !== "") {
      dispatch(setContactIdState(contactId1));
      navigate("/travel-buddy");
    }
    else {
      return;
    }
  };

  const route2 = (contactId2) => {

    if (contactId2 !== "") {
      dispatch(setContactIdState(contactId2));
      navigate("/travel-buddy");
    }
    else {
      return;
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
      if (jsonresponse?.data[0]) {
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
        setPrice(jsonresponse.data[0].price);
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
        setCarAC(jsonresponse.data[0]?.vehicle[0]?.car_ac);
        setCarBrand(jsonresponse.data[0]?.vehicle[0]?.car_brand);
        setCarCC(jsonresponse.data[0]?.vehicle[0]?.car_cc);
        setCarModel(jsonresponse.data[0]?.vehicle[0]?.car_model);
        setCarRegYear(jsonresponse.data[0]?.vehicle[0]?.car_reg_year);
        setRegNo(jsonresponse.data[0]?.vehicle[0]?.reg_no);
        setRegYear(jsonresponse.data[0]?.vehicle[0]?.reg_year);
        setSeatsLeft(jsonresponse.data[0]?.vehicle[0]?.seats_left);
      }
      if (jsonresponse?.data[1]) {
        setContactId1(jsonresponse.data[1].contact_id);
        setName1(jsonresponse.data[1].name);
        setImage1(jsonresponse.data[1].commuter_image);
        setPrice1(jsonresponse.data[1].price);
        setDate1(jsonresponse.data[1].aggreement_date);
      }
      if (jsonresponse?.data[2]) {
        setContactId2(jsonresponse.data[2].contact_id);
        setName2(jsonresponse.data[2].name);
        setImage2(jsonresponse.data[2].commuter_image);
        setPrice2(jsonresponse.data[2].price);
        setDate2(jsonresponse.data[2].aggreement_date);
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

  return (
    <div>
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
                    <h1>Your Current Balance</h1>
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
                                  <TableCell className="text-white ">{item.date}</TableCell>
                                  <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{item.Description}</TableCell>
                                  <TableCell className="text-white">{`Rs. ${item.wallet_transfer}/-`}</TableCell>
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

export default MyWallet;
