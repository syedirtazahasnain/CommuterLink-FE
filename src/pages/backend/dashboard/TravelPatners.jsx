import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { setContactIdState } from "../../../redux/generalSlice";

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

  // For Travel Data
  const [contactId, setContactId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [walletAmount, setWalletAmount] = useState("");
  const [userType, setUserType] = useState("");
  const [data, setData] = useState("");

  // Travel Cost Data
  const [distance, setDistance] = useState("");
  const [fuelAverage, setFuelAverage] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [liter, setLiter] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [wearAndTear, setWearAndTear] = useState("");

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
    getSeatCostDetail();
  }, []);

  const onNavigate = () => {
    navigate("/rechargewallet");
  };

  const route = (contactId) => {
    setSubmit(true);

    if (!submitbtn) {
      dispatch(setContactIdState(contactId));
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
        setContactId(jsonresponse.data[0].contact_id);
        setName(jsonresponse.data[0].name);
        setImage(jsonresponse.data[0].commuter_image);
        setPrice(jsonresponse.data[0].price);
        setDate(jsonresponse.data[0].aggreement_date);
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
      if (jsonresponse.length > 0) {
        setWalletAmount(jsonresponse[0].wallet.wallet_amount);
        setUserType(jsonresponse[0].userlist.vehicle_option);
      }
      console.log("Travel Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getSeatCostDetail = async () => {
    try {
      if(userType === 1){
        const response = await fetch(`${API_URL}/api/v1/seat-cost-detail`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        const jsonresponse = await response.json();
        if (jsonresponse) {
          setDistance(jsonresponse.data[0].Distance);
          setFuelAverage(jsonresponse.data[0]['Fuel Average']);
          setFuelPrice(jsonresponse.data[0]['Fuel-Price']);
          setLiter(jsonresponse.data[0]['Liter']);
          setMaintenance(jsonresponse.data[0]['Maintenance']);
          setWearAndTear(jsonresponse.data[0]['Wear and Tear']);
        }
        console.log("Driver Seat Cost Data", jsonresponse);
      }
      else if (userType === 0){
        const response = await fetch(`${API_URL}/api/v1/seat-cost-detail/${contactId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        const jsonresponse = await response.json();
        if (jsonresponse) {
          setDistance(jsonresponse.data[0].Distance);
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

  const tableCellStyle = {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: '7px',
    paddingTop: '7px',
    fontSize: '13px'
  };

  return (
    <div>
      {data !== "" ?
        (
          <></>
        )
        :
        (
          <div className="card mb-5">
            <div className="card-header" style={{ backgroundColor: "#1F5F5B" }}>
              <h4 className="text-center fw-bold text-warning m-auto">
                {" "}
                AGREEMENT INFORMATION{" "}
              </h4>{" "}
            </div>
            <div className="card my-4 mx-4" style={{
              backgroundColor: "#D9D9D9",

            }}>

              <div className="card-body" style={{ background: "rgb(214 219 218)" }}>
                <div className="d-flex flex-column">
                  <div className="card-body-inner green-card">
                    <div className="d-flex flex-column">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4">
                              <div
                                className="card"
                                style={{ width: "10rem", height: "10rem", backgroundColor: "grey" }}
                              >
                                {image ? (
                                  <img
                                    src={`${IMAGE_URL}${image}`}
                                    className="card-img-top w-100px m-auto h-100px cursor-pointer"
                                    onClick={() => {
                                      route(contactId);
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-70px h-70 m-auto mt-3 cursor-pointer"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-md-8">
                              <p className="fw-bold fs-6">Name: {name}</p>
                              <p className="fw-bold fs-6">Daily Commuting Cost: Rs. &nbsp; {price}/-</p>
                              <p className="fw-bold fs-6">Start Date: {date && formatDate(date)}</p>
                            </div>

                          </div>
                        </div>
                        {/* <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <div
                            className="card"
                            style={{ width: "10rem", height: "10rem", backgroundColor: "grey" }}
                          >
                            {image ? (
                              <img
                                src={`${IMAGE_URL}${image}`}
                                className="card-img-top w-100px m-auto h-100px cursor-pointer"
                                onClick={() => {
                                  route();
                                }}
                              />
                            ) : (
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-70px h-70 m-auto mt-3 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <p className="fw-bold fs-6">Name: {name}</p>
                          <p className="fw-bold fs-6">Daily Commuting Cost:  Rs. &nbsp; {price}/-</p>
                          <p className="fw-bold fs-6">Start Date: {date}</p>
                        </div>

                      </div>
                    </div> */}
                      </div>
                      <div className="row">
                        {/* <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <div
                            className="card"
                            style={{ width: "10rem", height: "10rem", backgroundColor: "grey" }}
                          >
                            {image ? (
                              <img
                                src={`${IMAGE_URL}${image}`}
                                className="card-img-top w-100px m-auto h-100px cursor-pointer"
                                onClick={() => {
                                  route();
                                }}
                              />
                            ) : (
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-70px h-70 m-auto mt-3 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <p className="fw-bold fs-6">Name: {name}</p>
                          <p className="fw-bold fs-6">Daily Commuting Cost:  Rs. &nbsp; {price}/-</p>
                          <p className="fw-bold fs-6">Start Date: {date}</p>
                        </div>
                      </div>
                    </div> */}
                        {/* <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-4">
                          <div
                            className="card"
                            style={{ width: "10rem", height: "10rem", backgroundColor: "grey" }}
                          >
                            {image ? (
                              <img
                                src={`${IMAGE_URL}${image}`}
                                className="card-img-top w-100px m-auto h-100px cursor-pointer"
                                onClick={() => {
                                  route();
                                }}
                              />
                            ) : (
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-70px h-70 m-auto mt-3 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <p className="fw-bold fs-6">Name: {name}</p>
                          <p className="fw-bold fs-6">Daily Commuting Cost:  Rs. &nbsp; {price}/-</p>
                          <p className="fw-bold fs-6">Start Date: {date}</p>
                        </div>
                      </div>
                    </div> */}
                      </div>

                      <div className="row d-flex justify-content-between pt-5">
                        <TableContainer component={Paper} style={{ backgroundColor: "#ECF8F9", border: '1px solid gray' }}>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell style={tableCellStyle}>Distance</TableCell>
                                <TableCell style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{distance}km</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={tableCellStyle}>Avg. Fuel consumption</TableCell>
                                <TableCell style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{fuelAverage}km/Ltr</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={tableCellStyle}>Fuel Price</TableCell>
                                <TableCell style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>
                                  Rs. {fuelPrice}/Ltr
                                  <br />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={tableCellStyle}>Maintenance</TableCell>
                                <TableCell style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{maintenance}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={tableCellStyle}>Wear & Tear</TableCell>
                                <TableCell style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{wearAndTear}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        )}
      <div className="card  mt-3 mb-5">
        <div className="card-header" style={{ backgroundColor: "#1F5F5B" }}>
          <h4 className="text-center fw-bold text-warning m-auto">
            {" "}
            MY WALLET{" "}
          </h4>{" "}
        </div>
        <div className="card mx-4 my-4" style={{ background: "rgb(214 219 218)" }}>
          <div className="row py-3">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-2">
                  <i className=" p-3 px-4 fa-solid text-success fa-wallet fs-1"></i>
                </div>
                <div className="col-md-10">

                  <p className="py-3 fw-bold text-success fs-3">
                    Rs. &nbsp; {walletAmount} /-
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-end mt-3">
              {userType === 0 ?
                (
                  <button className="font-custom me-4 btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-5 py-3 mb-3" onClick={onNavigate} >
                    Recharge
                  </button>
                ) :
                (
                  <button className="font-custom btn me-4 btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-5 py-3 mb-3" >
                    Recharge
                  </button>
                )}
              <button className="font-custom btn btn-sm me-3 fs-6 fw-bold btn-dark-green text-white rounded-4 px-5 py-3 mb-3" >
                View Transaction History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPatners;
