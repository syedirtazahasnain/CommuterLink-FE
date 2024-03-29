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
  const [cancelDisabled, setCancelDisabled] = useState(false);
  const [cancelDisabled2, setCancelDisabled2] = useState(false);

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
  const [universityAddress, setUniversityAddress] = useState("");
  const [universityName, setUniversityName] = useState("");
//35
  // For Traveler partner 2
  // const [requestStage, setRequestStage] = useState("");
  // const [profileType, setProfileType] = useState("");
  // const [memberId, setMemberId] = useState("");
  // const [id, setId] = useState("");
  // const [requestedAs, setRequestedAs] = useState("");
  const [driverDate2, setDriverDate2] = useState(""); 
  const [driverCancelDate2, setDriverCancelDate2] = useState(null);
  const [driverData2, setDriverData2] = useState("");
  const [driverContactId2, setDriverContactId2] = useState(null);
  const [driverName2, setDriverName2] = useState("");
  const [driverImage2, setDriverImage2] = useState("");
  const [driverGender2, setDriverGender2] = useState("");
  const [driverAge2, setDriverAge2] = useState("");
  const [driverProfession2, setDriverProfession2] = useState("");
  const [driverPreferredGender2, setDriverPreferredGender2] = useState("");
  const [driverOrigin2, setDriverOrigin2] = useState("");
  const [driverDestination2, setDriverDestination2] = useState("");
  const [driverSeats2, setDriverSeats2] = useState("");
  const [driverTimeDepart2, setDriverTimeDepart2] = useState("");
  const [driverTimeReturn2, setDriverTimeReturn2] = useState("");
  const [driverDays2, setDriverDays2] = useState("");
  const [driverPrice2, setDriverPrice2] = useState("");
  const [driverMobileNo2, setDriverMobileNo2] = useState("");
  const [driverSeatsLeft2, setDriverSeatsLeft2] = useState("");
  const [driverCarAC2, setDriverCarAc] = useState("");
  const [driverCarBrand2, setDriverCarBrand] = useState("");
  const [driverCarCc2, setDriverCarCc2] = useState("");
  const [driverCarModel2, setDriverCarModel2] = useState("");
  const [driverCarRegYear2, setDriverCarRegYear2] = useState("");
  const [driverRegNo2, setDriverRegNo2] = useState("");
  const [driverRegYear2, setDriverRegYear2] = useState("");
  const [driverDropOffAddress2, setDiverDropOffAddress2] = useState("");
  const [driverPickupAddress2, setDriverPickupAddress2] = useState("");
  const [driverUniversityAddress2, setDriverUniversityAddress2] = useState("");
  const [driverUniversityName2, setDriverUniversityName2] = useState("");

  // For second person
  const [contactId1, setContactId1] = useState("");
  const [name1, setName1] = useState("");
  const [image1, setImage1] = useState("");
  const [price1, setPrice1] = useState("");
  const [date1, setDate1] = useState("");
  const [cancelDate1, setCancelDate1] = useState(null);

  // For third person
  const [contactId2, setContactId2] = useState("");
  const [name2, setName2] = useState("");
  const [image2, setImage2] = useState("");
  const [price2, setPrice2] = useState("");
  const [date2, setDate2] = useState("");
  const [cancelDate2, setCancelDate2] = useState(null);

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
    if (cancelDate !== null) {
      setCancelDisabled(true);

    }
  }, [cancelDate]);

  useEffect(() => {
    if (driverCancelDate2 !== null) {
      setCancelDisabled2(true);

    }
  }, [driverCancelDate2]);

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
      // console.log('irtaza_json', jsonresponse);
      if (jsonresponse.data[0] || jsonresponse.data[1]) {
        setContactId(jsonresponse.data[0].contact_id);
        setName(jsonresponse.data[0].name);
        setImage(jsonresponse.data[0].commuter_image);
        setPrice(jsonresponse.data[0].price);
        setDate(jsonresponse.data[0].aggreement_date);
        setCancelDate(jsonresponse.data[0].cancellation_date);
        setProfileType(jsonresponse.data[0].type);
        setName(jsonresponse.data[0].name);
        setGender(jsonresponse.data[0].gender);
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
        setUniversityName(jsonresponse.data[0].university_name);
        setUniversityAddress(jsonresponse.data[0].university_address);
        setCarAC(jsonresponse.data[0]?.vehicle[0]?.car_ac);
        setCarBrand(jsonresponse.data[0]?.vehicle[0]?.car_brand);
        setCarCC(jsonresponse.data[0]?.vehicle[0]?.car_cc);
        setCarModel(jsonresponse.data[0]?.vehicle[0]?.car_model);
        setCarRegYear(jsonresponse.data[0]?.vehicle[0]?.car_reg_year);
        setRegNo(jsonresponse.data[0]?.vehicle[0]?.reg_no);
        setRegYear(jsonresponse.data[0]?.vehicle[0]?.reg_year);
        setSeatsLeft(jsonresponse.data[0]?.vehicle[0]?.seats_left);


        setDriverDate2(jsonresponse.data[1]?.aggreement_date); 
        setDriverCancelDate2(jsonresponse.data[1]?.cancellation_date);
        // setDriverData2(jsonresponse.data[1]?.driverData2);
        setDriverContactId2(jsonresponse.data[1]?.contact_id);
        setDriverName2(jsonresponse.data[1]?.name);
        setDriverImage2(jsonresponse.data[1]?.commuter_image);
        setDriverGender2(jsonresponse.data[1]?.gender);
        setDriverAge2(jsonresponse.data[1]?.age);
        setDriverMobileNo2(jsonresponse.data[1].mobile);
        setDriverProfession2(jsonresponse.data[1]?.profession);
        setDriverPreferredGender2(jsonresponse.data[1]?.preferred_gender);
        setDriverOrigin2(jsonresponse.data[1]?.origin);
        setDriverDestination2(jsonresponse.data[1]?.destination);
        setDriverSeats2(jsonresponse.data[1]?.seats);
        setDriverTimeDepart2(jsonresponse.data[1]?.time_depart);
        setDriverTimeReturn2(jsonresponse.data[1]?.time_return);
        setDriverDays2(jsonresponse.data[1]?.days);
        setDriverPrice2(jsonresponse.data[1]?.price);
        setDriverSeatsLeft2(jsonresponse.data[1]?.seats_left);
        setDriverCarAc(jsonresponse.data[1]?.car_ac);
        setDriverCarBrand(jsonresponse.data[1]?.car_brand);
        setDriverCarCc2(jsonresponse.data[1]?.car_cc);
        setDriverCarModel2(jsonresponse.data[1]?.car_model);
        setDriverCarRegYear2(jsonresponse.data[1]?.car_reg_year);
        setDriverRegNo2(jsonresponse.data[1]?.reg_no);
        setDriverRegYear2(jsonresponse.data[1]?.reg_year);
        setDiverDropOffAddress2(jsonresponse.data[1]?.dropoff_address);
        setDriverPickupAddress2(jsonresponse.data[1]?.pickup_address);
        setDriverUniversityAddress2(jsonresponse.data[1]?.university_address);
        setDriverUniversityName2(jsonresponse.data[1]?.university_name);
      
      }
      if (jsonresponse.data[1]) {
        setContactId1(jsonresponse.data[1].contact_id);
        setName1(jsonresponse.data[1].name);
        setImage1(jsonresponse.data[1].commuter_image);
        setPrice1(jsonresponse.data[1].price);
        setDate1(jsonresponse.data[1].aggreement_date);
        setCancelDate1(jsonresponse.data[1].cancellation_date);
      }
      if (jsonresponse.data[2]) {
        setContactId2(jsonresponse.data[2].contact_id);
        setName2(jsonresponse.data[2].name);
        setImage2(jsonresponse.data[2].commuter_image);
        setPrice2(jsonresponse.data[2].price);
        setDate2(jsonresponse.data[2].aggreement_date);
        setCancelDate2(jsonresponse.data[2].cancellation_date);
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

  // Calculate the center point
  const centerLatitude = (parseFloat(pickupLatitude) + parseFloat(dropoffLatitude)) / 2;
  const centerLongitude = (parseFloat(pickupLongitude) + parseFloat(dropoffLongitude)) / 2;

  // Splitting the latitude and longitude
  const dropoffCoords2 = driverDropOffAddress2.split(',');
  const pickupCoords2 = driverPickupAddress2.split(',');

  const dropoffLatitude2 = dropoffCoords2[0];
  const dropoffLongitude2 = dropoffCoords2[1];

  const pickupLatitude2 = pickupCoords2[0];
  const pickupLongitude2 = pickupCoords2[1];

  // Calculate the center point
  const centerLatitude2 = (parseFloat(pickupLatitude2) + parseFloat(dropoffLatitude2)) / 2;
  const centerLongitude2 = (parseFloat(pickupLongitude2) + parseFloat(dropoffLongitude2)) / 2;

  if(driverContactId2 === undefined){
    setDriverContactId2(null);
  }

  return (
    <div>
      {data !== "" ? (
        <></>
      ) : (
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
              <div
                className="card-header"
                style={{ backgroundColor: "#1F5F5B" }}
              >
                <h4 className="text-center fw-bold text-warning m-auto">
                  {" "}
                  YOUR TRAVEL PARTNERS{" "}
                </h4>{" "}
              </div>
              <div
                className="card my-4 mx-4"
                style={{
                  backgroundColor: "#D9D9D9",
                }}
              >
                {userType === 0 ? (
                  <>
                    <div className="card p-4 bg-white rounded-0">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="card rounded-0">
                            <div className="card-img-top bg-medium-teal rounded-0 text-center py-5">
                              <img
                                className="rounded-circle bg-white"
                                src={`${IMAGE_URL}${image}`}
                                alt="Card image cap"
                                style={{ width: "200px", height: "200px" }}
                              />
                            </div>
                            <div className="card-body bg-card-grey">
                              <div className="card-text">
                                <div className="row px-5 mb-2">
                                  <div className="col-md-6 ">
                                    {gender !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          Gender:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {gender}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {age !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          {" "}
                                          Age:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {age} years
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {profession !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          Profession:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {profession}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {mobileNo !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          Contact No:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {mobileNo}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {date !== null && (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          Start Date:
                                        </h5>
                                      </>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {date && formatDate(date)}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {cancelDate !== null && (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          Cancellation Date:
                                        </h5>
                                      </>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {cancelDate && formatDate(cancelDate)}
                                    </h5>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {universityName && universityName !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          University Name:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {universityName}
                                    </h5>
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-md-6">
                                    {universityAddress &&
                                    universityAddress !== "" ? (
                                      <>
                                        <h5 className="text-dark-green fw-bold text-end font-custom">
                                          University Address:
                                        </h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <h5 className="fw-bold text-secondary">
                                      {universityAddress}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8 d-flex flex-column">
                          <ul
                            class="nav nav-pills mb-3 nav-justified"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li class="nav-item me-0" role="presentation">
                              <button
                                className={`nav-link fs-4 custom-button-style active rounded-0`}
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                              >
                                {userType === 0
                                  ? "Car Offeror Details"
                                  : "Traveller Details"}
                              </button>
                            </li>
                            <li class="nav-item me-0" role="presentation">
                              <button
                                className={`nav-link fs-4 custom-button-style rounded-0`}
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                              >
                                Additional Info
                              </button>
                            </li>
                            <li className="nav-item me-0" role="presentation">
                              <button
                                className={`nav-link fs-4 custom-button-style rounded-0`}
                                id="pills-contact-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-contact"
                                type="button"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                                // onClick={openModal}
                              >
                                View On Map
                              </button>
                            </li>
                          </ul>
                          <div
                            class="tab-content flex-grow-1"
                            id="pills-tabContent"
                          >
                            <div
                              class="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                            >
                              <div className="row ">
                                <div className="col-md-11">
                                  <div className="row">
                                    <div className="col-md-12">
                                      {name !== "" ? (
                                        <div className="mt-0">
                                          <h1 className="text-dark fw-bold">
                                            {name}
                                          </h1>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-9">
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {preferredGender !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Preffered Gender:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {preferredGender}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {price !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Payment Terms (per day):
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        Rs. {price}/-
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {origin !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Point of Origin:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {origin}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {timeDepart !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Pickup Timings:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {timeDepart}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {destination !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Destination:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {destination}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {timeReturn !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Return Timings:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {timeReturn}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-5">
                                      {days !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Days:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {days}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="tab-pane fade"
                              id="pills-profile"
                              role="tabpanel"
                              aria-labelledby="pills-profile-tab"
                            >
                              <div className="row ">
                                <div className="col-md-11">
                                  <div className="row">
                                    <div className="col-md-12">
                                      {name !== "" ? (
                                        <div className="mt-0">
                                          <h1 className="text-dark fw-bold">
                                            {name}
                                          </h1>
                                        </div>
                                      ) : (
                                        <></>
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
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            No.of Seats Requested:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {seats}
                                      </h5>
                                    </div>
                                    <div className="col-md-6">
                                      {seatsLeft !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            No.of Seats Left:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {seatsLeft}
                                      </h5>
                                    </div>
                                  </div>
                                  {date && (
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {date !== "" && (
                                          <>
                                            <h5 className="text-dark-green fw-bold font-custom">
                                              Agreement Date:
                                            </h5>
                                          </>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {date && formatDate(date)}
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                  {cancelDate && (
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {cancelDate !== null && (
                                          <>
                                            <h5 className="text-dark-green fw-bold font-custom">
                                              Cancel Agreement Date:
                                            </h5>
                                          </>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {cancelDate
                                            ? formatDate(cancelDate)
                                            : cancelDate}
                                        </h5>
                                      </div>
                                    </div>
                                  )}
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carAC !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Car has AC:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {carAC}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carBrand !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Car Brand:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {carBrand}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carCC !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Car CC:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {carCC}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carModel !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Car Model:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {carModel}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {RegNo !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Registration Number:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {RegNo}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {RegYear !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Registration Year:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {RegYear}
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-md-6">
                                      {carRegYear !== "" ? (
                                        <>
                                          <h5 className="text-dark-green fw-bold font-custom">
                                            Car Registration Year:
                                          </h5>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      <h5 className="fw-bold text-secondary">
                                        {carRegYear}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="pills-contact"
                              role="tabpanel"
                              aria-labelledby="pills-contact-tab"
                            >
                              <div className=" row d-flex justify-content-center align-items-center">
                                <Row style={{ height: "275px", width: "100%" }}>
                                  <GoogleMap
                                    zoom={11}
                                    center={{
                                      lat: centerLatitude,
                                      lng: centerLongitude,
                                    }}
                                    mapContainerStyle={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                    options={{
                                      types: ["(regions)"],
                                      componentRestrictions: { country: "PK" },
                                    }}
                                  >
                                    <MarkerF
                                      position={{
                                        lat: parseFloat(pickupLatitude),
                                        lng: parseFloat(pickupLongitude),
                                      }}
                                      icon={{
                                        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                      }}
                                    />
                                    <MarkerF
                                      position={{
                                        lat: parseFloat(dropoffLatitude),
                                        lng: parseFloat(dropoffLongitude),
                                      }}
                                      icon={{
                                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                      }}
                                    />
                                    {/* <PolylineF
                                      path={[
                                        { lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) },
                                        { lat: parseFloat(dropoffLatitude), lng: parseFloat(dropoffLongitude) },
                                      ]}
                                      options={{
                                        strokeColor: "#FF0000",
                                        strokeOpacity: 1.0,
                                        strokeWeight: 3,
                                      }}
                                    /> */}
                                  </GoogleMap>
                                </Row>
                                <div className="row justify-content-end">
                                  <div className="col-md-12 text-end">
                                    <div className="row justify-content-end">
                                      <div className="col-md-3 text-end">
                                        <i
                                          className="fa-solid fa-location-dot text-primary"
                                          style={{ fontSize: "1.5rem" }}
                                        ></i>
                                        <span
                                          className="font-custom fw-bold"
                                          style={{ fontSize: "18px" }}
                                        >
                                          Start Point
                                        </span>
                                      </div>
                                      <div className="col-md-3 text-end">
                                        <i
                                          className="fa-solid fa-location-dot text-danger"
                                          style={{ fontSize: "1.5rem" }}
                                        ></i>
                                        <span
                                          className="font-custom fw-bold"
                                          style={{ fontSize: "18px" }}
                                        >
                                          Drop-off Point
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end px-3 py-3">
                            <Button
                              className={`my-auto font-custom btn btn-sm fs-6 fw-bold rounded-0 px-3 py-3 ${
                                cancelDisabled === true
                                  ? "btn-secondary text-white"
                                  : "btn-dark-green text-white"
                              }`}
                              onClick={youSure}
                              disabled={cancelDisabled === true}
                            >
                              Cancel Agreement
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {driverContactId2 !== null && (
                        <div className="card p-4 bg-white rounded-0">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="card rounded-0">
                                <div className="card-img-top bg-medium-teal rounded-0 text-center py-5">
                                  <img
                                    className="rounded-circle bg-white"
                                    src={`${IMAGE_URL}${driverImage2}`}
                                    alt="Card image cap"
                                    style={{ width: "200px", height: "200px" }}
                                  />
                                </div>
                                <div className="card-body bg-card-grey">
                                  <div className="card-text">
                                    <div className="row px-5 mb-2">
                                      <div className="col-md-6 ">
                                        {driverGender2 !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              Gender:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverGender2}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {age !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              {" "}
                                              Age:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverAge2} years
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverProfession2 !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              Profession:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverProfession2}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverMobileNo2 !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              Contact No:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverMobileNo2}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverDate2 !== null && (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              Start Date:
                                            </h5>
                                          </>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverDate2 && formatDate(driverDate2)}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverCancelDate2 !== null && (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              Cancellation Date:
                                            </h5>
                                          </>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverCancelDate2 && formatDate(driverCancelDate2)}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverUniversityName2 &&
                                        driverUniversityName2 !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              University Name:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverUniversityName2}
                                        </h5>
                                      </div>
                                    </div>

                                    <div className="row mb-2">
                                      <div className="col-md-6">
                                        {driverUniversityAddress2 &&
                                        driverUniversityAddress2 !== "" ? (
                                          <>
                                            <h5 className="text-dark-green fw-bold text-end font-custom">
                                              University Address:
                                            </h5>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <h5 className="fw-bold text-secondary">
                                          {driverUniversityAddress2}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-8 d-flex flex-column">
                              <ul
                                class="nav nav-pills mb-3 nav-justified"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li class="nav-item me-0" role="presentation">
                                  <button
                                    className={`nav-link fs-4 custom-button-style active rounded-0`}
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                  >
                                    {userType === 0
                                      ? "Car Offeror Details"
                                      : "Traveller Details"}
                                  </button>
                                </li>
                                <li class="nav-item me-0" role="presentation">
                                  <button
                                    className={`nav-link fs-4 custom-button-style rounded-0`}
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                  >
                                    Additional Info
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-0"
                                  role="presentation"
                                >
                                  <button
                                    className={`nav-link fs-4 custom-button-style rounded-0`}
                                    id="pills-contact-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-contact"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false"
                                    // onClick={openModal}
                                  >
                                    View On Map
                                  </button>
                                </li>
                              </ul>
                              <div
                                class="tab-content flex-grow-1"
                                id="pills-tabContent"
                              >
                                <div
                                  class="tab-pane fade show active"
                                  id="pills-home"
                                  role="tabpanel"
                                  aria-labelledby="pills-home-tab"
                                >
                                  <div className="row ">
                                    <div className="col-md-11">
                                      <div className="row">
                                        <div className="col-md-12">
                                          {driverName2 !== "" ? (
                                            <div className="mt-0">
                                              <h1 className="text-dark fw-bold">
                                                {driverName2}
                                              </h1>
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col-md-9">
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverPreferredGender2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Preffered Gender:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverPreferredGender2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverPrice2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Payment Terms (per day):
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            Rs. {driverPrice2}/-
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverOrigin2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Point of Origin:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverOrigin2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverTimeDepart2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Pickup Timings:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverTimeDepart2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverDestination2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Destination:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverDestination2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverTimeReturn2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Return Timings:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverTimeReturn2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-5">
                                          {driverDays2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Days:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverDays2}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="tab-pane fade"
                                  id="pills-profile"
                                  role="tabpanel"
                                  aria-labelledby="pills-profile-tab"
                                >
                                  <div className="row ">
                                    <div className="col-md-11">
                                      <div className="row">
                                        <div className="col-md-12">
                                          {driverName2 !== "" ? (
                                            <div className="mt-0">
                                              <h1 className="text-dark fw-bold">
                                                {driverName2}
                                              </h1>
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col-md-9">
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverSeats2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                No.of Seats Requested:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverSeats2}
                                          </h5>
                                        </div>
                                        <div className="col-md-6">
                                          {driverSeatsLeft2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                No.of Seats Left:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverSeatsLeft2}
                                          </h5>
                                        </div>
                                      </div>
                                      {driverDate2 && (
                                        <div className="row mb-2">
                                          <div className="col-md-6">
                                            {driverDate2 !== "" && (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">
                                                  Agreement Date:
                                                </h5>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="fw-bold text-secondary">
                                              {driverDate2 && formatDate(driverDate2)}
                                            </h5>
                                          </div>
                                        </div>
                                      )}
                                      {driverCancelDate2 && (
                                        <div className="row mb-2">
                                          <div className="col-md-6">
                                            {driverCancelDate2 !== null && (
                                              <>
                                                <h5 className="text-dark-green fw-bold font-custom">
                                                  Cancel Agreement Date:
                                                </h5>
                                              </>
                                            )}
                                          </div>
                                          <div className="col-md-6">
                                            <h5 className="fw-bold text-secondary">
                                              {driverCancelDate2
                                                ? formatDate(driverCancelDate2)
                                                : driverCancelDate2}
                                            </h5>
                                          </div>
                                        </div>
                                      )}
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverCarAC2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Car has AC:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverCarAC2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverCarBrand2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Car Brand:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverCarBrand2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverCarCc2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Car CC:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverCarCc2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverCarModel2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Car Model:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverCarModel2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverRegNo2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Registration Number:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverRegNo2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverRegYear2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Registration Year:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverRegYear2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {driverCarRegYear2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Car Registration Year:
                                              </h5>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {driverCarRegYear2}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="pills-contact"
                                  role="tabpanel"
                                  aria-labelledby="pills-contact-tab"
                                >
                                  <div className=" row d-flex justify-content-center align-items-center">
                                    <Row
                                      style={{ height: "275px", width: "100%" }}
                                    >
                                      <GoogleMap
                                        zoom={11}
                                        center={{
                                          lat: centerLatitude2,
                                          lng: centerLongitude2,
                                        }}
                                        mapContainerStyle={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                        options={{
                                          types: ["(regions)"],
                                          componentRestrictions: {
                                            country: "PK",
                                          },
                                        }}
                                      >
                                        <MarkerF
                                          position={{
                                            lat: parseFloat(pickupLatitude2),
                                            lng: parseFloat(pickupLongitude2),
                                          }}
                                          icon={{
                                            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                          }}
                                        />
                                        <MarkerF
                                          position={{
                                            lat: parseFloat(dropoffLatitude2),
                                            lng: parseFloat(dropoffLongitude2),
                                          }}
                                          icon={{
                                            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                          }}
                                        />
                                        {/* <PolylineF
                                      path={[
                                        { lat: parseFloat(pickupLatitude), lng: parseFloat(pickupLongitude) },
                                        { lat: parseFloat(dropoffLatitude), lng: parseFloat(dropoffLongitude) },
                                      ]}
                                      options={{
                                        strokeColor: "#FF0000",
                                        strokeOpacity: 1.0,
                                        strokeWeight: 3,
                                      }}
                                    /> */}
                                      </GoogleMap>
                                    </Row>
                                    <div className="row justify-content-end">
                                      <div className="col-md-12 text-end">
                                        <div className="row justify-content-end">
                                          <div className="col-md-3 text-end">
                                            <i
                                              className="fa-solid fa-location-dot text-primary"
                                              style={{ fontSize: "1.5rem" }}
                                            ></i>
                                            <span
                                              className="font-custom fw-bold"
                                              style={{ fontSize: "18px" }}
                                            >
                                              Start Point
                                            </span>
                                          </div>
                                          <div className="col-md-3 text-end">
                                            <i
                                              className="fa-solid fa-location-dot text-danger"
                                              style={{ fontSize: "1.5rem" }}
                                            ></i>
                                            <span
                                              className="font-custom fw-bold"
                                              style={{ fontSize: "18px" }}
                                            >
                                              Drop-off Point
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-end px-3 py-3">
                                <Button
                                  className={`my-auto font-custom btn btn-sm fs-6 fw-bold rounded-0 px-3 py-3 ${
                                    cancelDisabled2 === true
                                      ? "btn-secondary text-white"
                                      : "btn-dark-green text-white"
                                  }`}
                                  onClick={youSure}
                                  disabled={cancelDisabled2 === true}
                                >
                                  Cancel Agreement
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  <div className="row">
                    <div
                      className="card-body"
                      style={{ background: "rgb(214 219 218)" }}
                    >
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
                                      />
                                    ) : (
                                      <img
                                        src={`${BASE_URL}/assets/images/Vector.png`}
                                        className="card-img-top w-100px m-auto h-100px"
                                      />
                                    )}
                                  </div>

                                  <div className="card-body bg-card-grey">
                                    <div className="card-text">
                                      <div className="row mb-2">
                                        <div className="col-md-6 ">
                                          {name !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {name}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {price !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {price && `Rs. ${price}/-`}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {date !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {date && formatDate(date)}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {cancelDate !== null && (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Cancellation Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {cancelDate &&
                                              formatDate(cancelDate)}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white py-2"
                                        onClick={() => {
                                          route1(contactId);
                                        }}
                                      >
                                        View Profile
                                      </button>
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="card rounded-0">
                                  <div className="card-img-top bg-medium-teal rounded-0 text-center py-2">
                                    {image1 ? (
                                      <img
                                        src={`${IMAGE_URL}${image1}`}
                                        className="card-img-top w-100px m-auto h-100px cursor-pointer rounded-circle"
                                      />
                                    ) : (
                                      <img
                                        src={`${BASE_URL}/assets/images/Vector.png`}
                                        className="card-img-top w-100px m-auto h-100px"
                                      />
                                    )}
                                  </div>

                                  <div className="card-body bg-card-grey">
                                    <div className="card-text">
                                      <div className="row mb-2">
                                        <div className="col-md-6 ">
                                          {name1 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {name1}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {price1 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {price1 && `Rs. ${price1}/-`}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {date1 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {date1 && formatDate(date1)}
                                          </h5>
                                        </div>
                                      </div>

                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {cancelDate1 !== null && (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Cancellation Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {cancelDate1 &&
                                              formatDate(cancelDate1)}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white py-2"
                                        onClick={() => {
                                          route1(contactId1);
                                        }}
                                      >
                                        View Profile
                                      </button>
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="card rounded-0">
                                  <div className="card-img-top bg-medium-teal rounded-0 text-center py-2">
                                    {image2 ? (
                                      <img
                                        src={`${IMAGE_URL}${image2}`}
                                        className="card-img-top w-100px m-auto h-100px cursor-pointer rounded-circle"
                                      />
                                    ) : (
                                      <img
                                        src={`${BASE_URL}/assets/images/Vector.png`}
                                        className="card-img-top w-100px m-auto h-100px"
                                      />
                                    )}
                                  </div>

                                  <div className="card-body bg-card-grey">
                                    <div className="card-text">
                                      <div className="row mb-2">
                                        <div className="col-md-6 ">
                                          {name2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Name:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {name2 && name2}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {price2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Commuting Cost:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-4">
                                          <h5 className="fw-bold text-secondary">
                                            {price2 && `Rs. ${price2}/-`}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {date2 !== "" ? (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          ) : (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Start Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {date2 && formatDate(date2)}
                                          </h5>
                                        </div>
                                      </div>

                                      <div className="row mb-2">
                                        <div className="col-md-6">
                                          {cancelDate2 !== null && (
                                            <>
                                              <h5 className="text-dark-green fw-bold font-custom">
                                                Cancellation Date:
                                              </h5>
                                            </>
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          <h5 className="fw-bold text-secondary">
                                            {cancelDate2 &&
                                              formatDate(cancelDate2)}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center">
                                      <button
                                        className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white py-2"
                                        onClick={() => {
                                          route2(contactId2);
                                        }}
                                      >
                                        View Profile
                                      </button>
                                    </div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </div>
                        <div></div>
                      </div>
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
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelPatners;
