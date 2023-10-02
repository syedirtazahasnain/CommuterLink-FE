import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { setContactIdState } from "../../../redux/generalSlice";
import PaymentRide from "./PaymentRide";

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
    getTravelData();
  }, []);

  useEffect(() => {
    getSeatCostDetail();
  }, [userType, contactId]);

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
  }, [userType]);

  const onNavigate = () => {
    navigate("/rechargewallet");
  };
  const viewTrasaction=()=>{
    navigate("/transaction-history")
  }

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
            confirmButton: "swal-custom",
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
        if (jsonresponse) {
          setDistance(jsonresponse.data[0]['Distance']);
          setFuelAverage(jsonresponse.data[0]['Fuel Average']);
          setFuelPrice(jsonresponse.data[0]['Fuel-Price']);
          setLiter(jsonresponse.data[0]['Liter']);
          setMaintenance(jsonresponse.data[0]['Maintenance']);
          setWearAndTear(jsonresponse.data[0]['Wear and Tear']);
        }
        console.log("Driver Seat Cost Data", jsonresponse);
      }
      else {
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
          <div className="card  mb-5">
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
                                  className="card-img-top w-100px m-auto h-100px cursor-pointer"
                                  onClick={() => {
                                    route(contactId);
                                  }}
                                />
                              ) : (
                                <img
                                  src={`${BASE_URL}/assets/images/Vector.png`}
                                  className="card-img-top w-70px h-70 m-auto mt-2 cursor-pointer"
                                />
                              )}

                            </div>
                            <div className="card p-2 border-0 rounded-0 bg-card-grey overflow-y-hidden px-4 py-4">

                              <div className="row">
                                <div className="col-md-12">
                                  <p className="fw-bold fs-6">Name: {name}</p>
                                  <p className="fw-bold fs-6">Daily Commuting Cost: Rs. &nbsp; {price}/-</p>
                                  <p className="fw-bold fs-6">Start Date: {date && formatDate(date)}</p>
                                </div>
                              </div>

                            </div>
                            <div>
                            </div>
                          </div>
                          {/* <div
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
                              </div> */}
                        </div>
                        <div className="col-md-8">
                          {/* <TableContainer className="bg-dark text-white" component={Paper} style={{ backgroundColor: "#ECF8F9", border: '1px solid gray' }}> */}

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
                          {/* </TableContainer> */}
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

                      <div className="row d-flex justify-content-between pt-5 rounded rounded-3">

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
              <div className="col-md-4">
                <div className="row  justify-content-between">
                  <div className="col-md-12 col-sm-12 px-5 py-6 background_body text-center border-2 rounded-4">
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
              <div className="col-md-8 col-sm-6">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="">
                     
                      <Table className="bg-dark text-white border-1 rounded-top-4">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}> <h2 className="text-light">Recent Transactions
                            </h2></TableCell>

                          </TableRow></TableBody></Table>
                      <Table className="bg-dark text-white border-1 rounded-bottom-4">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}>Date</TableCell>
                            <TableCell className="text-white" style={tableCellStyle}>Message</TableCell>
                            <TableCell className="text-white" style={tableCellStyle}>Amount</TableCell>

                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>02 Oct,2023</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
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


                  <div className="col-md-6">  <button className="font-custom btn btn-sm me-3 w-100 w-sm-auto w-md-75 fs-6 fw-bold btn-dark-green text-white  px-4 px-sm-5 py-3 py-sm-3 mb-3" onClick={viewTrasaction}>
                    View Transaction History
                  </button></div>
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
