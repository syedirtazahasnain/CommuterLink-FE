import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import { setloginState } from "../../../redux/loginSlice";
import { Button } from "@mui/base";
import { setsignupState } from "../../../redux/signupSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const CommuterProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);

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
  const [name , setName] = useState("");
  const [image , setImage] = useState("");
  const [gender , setGender] = useState("");
  const [age , setAge] = useState("");
  const [profession , setProfession] = useState("");
  const [preferredGender , setPreferredGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [seats, setSeats] = useState("");
  const [timeDepart, setTimeDepart] = useState("");
  const [timeReturn, setTimeReturn] = useState("");
  const [days, setDays] = useState("");


  useEffect(() => {
    getDashboardData();
  }, []);

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
    setName(jsonresponse.rider[0].name);
    setImage(jsonresponse.rider[0].commuter_image);
    setGender(jsonresponse.rider[0].gender);
    setAge(jsonresponse.rider[0].age);
    setProfession(jsonresponse.rider[0].profession);
    setPreferredGender(jsonresponse.rider[0].preferred_gender);
    setSeats(jsonresponse.rider[0].seats);
    setOrigin(jsonresponse.rider[0].origin);
    setDestination(jsonresponse.rider[0].destination);
    setTimeDepart(jsonresponse.rider[0].time_depart);
    setTimeReturn(jsonresponse.rider[0].time_return);
    setDays(jsonresponse.rider[0].days);
    //console.log("Rider Data:", jsonresponse.rider);
  };

  const backgroundStyle = {
    // backgroundSize: 'cover',
    backgroundImage:`url(${BASE_URL}/assets/images/CL-logo.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
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
    <div>
  
        
            <div
              className="card w-100">
              <div className="card-body w-100">
                <div className="row">
                  <div
                    className="col-lg-12 col-md-6 col-sm-4 d-flex"
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
                        >
                        
                        </div>

                        <div className="d-flex align-items-center mt-3 me-5 me-xl-13">
                          {/*begin::Symbol*/}
                          <div className="symbol symbol-50px symbol-circle me-3">
                            <img src={`${BASE_URL}/assets/images/pic.png`} className alt />
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
                                  <li className="border-bottom text-white">
                                    MATCHES
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    REQUESTS
                                  </li>
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
                                  <li className="border-bottom text-white">
                                    FAQS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    TERMS
                                  </li>
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
                        className="card d-flex   d-flex justify-content-left"
                        style={{
                          width: "60.5rem",
                          backgroundColor: "rgba(162 229 198)",
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
                            {/*end::Title*/}
                            {/*begin::Breadcrumb*/}
                            {/*end::Breadcrumb*/}
                          </div>
                          {/*end::Page title*/}
                          {/*begin::Actions*/}
                          <div className="d-flex align-items-center gap-2 gap-lg-3">
                            {/*begin::Secondary button*/}
                            <i
                              className="fas fa-bell text-success"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            {/*end::Secondary button*/}
                            {/*begin::Primary button*/}
                            <Button
                              className="btn btn-sm fw-bold btn-success"
                              onClick={logout}
                            >
                              LOG OUT
                            </Button>
                            {/*end::Primary button*/}
                          </div>

                          {/*end::Actions*/}
                        </div>
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
                          <div className="border border-bottom border-success justify-content-center ml-3"></div>
                          <p className="justify-content-center px-3">
                            You are looking for travel buddles to ride your car,
                            others who want to share their car and to connect
                            with members with whom you can take
                          </p>
                        </div>

                        <div
                          className="card px-5 py-5"
                          style={{
                            border: "0",
                            backgroundColor: "rgba(162 229 198)",
                          }}
                        >
                          <div class="card-header d-flex flex-column bg-light mb-2">
                            <div>
                              {" "}
                              <h5 className="text-success ">{name}</h5>
                            </div>

                            <div className="card" style={{ border: "0" }}>
                              <div className="row d-flex justify-content-between">
                                <div className="col-4">
                                  <div
                                    className="card border-0"
                                    style={{ width: "50rem" }}
                                  >
                                    <p className="">
                                      <b>Gender:</b> <u>{gender}</u>
                                      <br />
                                      <b> Age:</b> <u>{age}</u> <br />
                                      <b>Home Address:</b>
                                      <u>
                                        H-1150, St-09, DHA Phase 2, Islamabad
                                      </u>
                                      <br />
                                      <b>Profession:</b> <u>{profession}</u>
                                      <br />
                                      <b>Education:</b>
                                      <u>Masters</u>
                                      <br />
                                      <b>Cell:</b> <u>XXXXXXXXXXX</u>
                                    </p>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="card">
                                    <img src={`${BASE_URL}/assets/images/Sir Zafar.png`} />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-success">Rider Details</h5>
                                <div className="row d-flex">
                                  <div className="col-4">
                                    <div className="card border-0">
                                      <div className="card border-0">
                                        <p>
                                          <b>Preferred Gender: </b> <u>{preferredGender}</u> <br />
                                          <b>Point of Origin: </b>
                                          <u>
                                            {origin}
                                          </u>
                                          <br />
                                          <b>Pickup Timings:</b> <u>{timeDepart}</u>
                                          <br />
                                          <b>Destination:</b>
                                          <u>{destination}</u>
                                          <br />
                                          <b>Contact No:</b> <u>0334-9594377</u>
                                          <br />
                                          <b>Return Timings:</b> <u>{timeReturn}</u>
                                          <br />
                                          <b>Days:</b> <u>{days}</u>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div
                                      className="card mx-2 border-0"
                                      style={{ width: "20rem" }}
                                    >
                                      <p>
                                        <b>No.of Seats:</b> {seats} <br />
                                        <b>Payment Terms (perDay):</b>{" "}
                                        <u>Rs.350</u>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body">
                                <button
                                  href="/"
                                  className=" btn_view1 btn-block "
                                >
                                  Approve
                                </button>
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

export default CommuterProfile;
