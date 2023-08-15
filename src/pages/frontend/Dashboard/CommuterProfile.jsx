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
  const [profileType, setProfileType] = useState("");
  const [contactId, setContactId] = useState("");
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


  useEffect(() => {
    getDashboardData();

    if (contactId) {
      getProfileData();
    }
  }, [contactId]);

  const logout = () => {
    dispatch(setloginState(""));
    dispatch(setsignupState(""));
    setProfileType("");
    setContactId("")
    setName("");
    setImage("");
    setGender("");
    setAge("");
    setProfession("");
    setPreferredGender("");
    setSeats("");
    setOrigin("");
    setDestination("");
    setTimeDepart("");
    setTimeReturn("");
    setDays("");
    setPrice("");
    setMobileNo("");
    setSeatsLeft("");
    setCarAC("");
    setCarBrand("");
    setCarCC("");
    setCarModel("");
    setCarRegYear("");
    setRegNo("");
    setRegYear("");
    navigate("/login");
  }

  const getDashboardData = async () => {
    try {
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
      if (jsonresponse.rider && jsonresponse.rider.length > 0) {
        setProfileType("Rider");
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
      }
      else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setProfileType("Driver");
        setContactId(jsonresponse.drivers[0].contact_id);
        setName(jsonresponse.drivers[0].name);
        setImage(jsonresponse.drivers[0].commuter_image);
        setGender(jsonresponse.drivers[0].gender);
        setAge(jsonresponse.drivers[0].age);
        setProfession(jsonresponse.drivers[0].profession);
        setPreferredGender(jsonresponse.drivers[0].preferred_gender);
        setSeats(jsonresponse.drivers[0].seats);
        setOrigin(jsonresponse.drivers[0].origin);
        setDestination(jsonresponse.drivers[0].destination);
        setTimeDepart(jsonresponse.drivers[0].time_depart);
        setTimeReturn(jsonresponse.drivers[0].time_return);
      }
      else {
        setName("");
        setImage("");
        setGender("");
        setAge("");
        setProfession("");
        setPreferredGender("");
        setSeats("");
        setOrigin("");
        setDestination("");
        setTimeDepart("");
        setTimeReturn("");
        setDays("");
      }
      console.log("Profile Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `https://staging.commuterslink.com/api/v1/commuter/profile/${contactId}/driver`,
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
      else{
        setDays("");
        setPrice("");
        setMobileNo("");
        setSeatsLeft("");
        setCarAC("");
        setCarBrand("");
        setCarCC("");
        setCarModel("");
        setCarRegYear("");
        setRegNo("");
        setRegYear("");
      }
      console.log("Driver Profile Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const backgroundStyle = {
    // backgroundSize: 'cover',
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
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
                </div>
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
                      {name !== "" ? (
                        <div>
                          <h5 className="text-success ">{name}</h5>
                        </div>
                      )
                        : (
                          <div>
                            <h5 className="text-success ">Zafar Jamil</h5>
                          </div>
                        )
                      }

                      <div className="card" style={{ border: "0" }}>
                        <div className="row d-flex justify-content-between">
                          <div className="col-4">
                            <div
                              className="card border-0"
                              style={{ width: "50rem" }}
                            >
                              <p className="mt-1">

                                {gender !== "" ? (
                                  <>
                                    <b>Gender:</b> <u>{gender}</u>
                                  </>
                                )
                                  : (
                                    <>
                                      <b>Gender:</b> <u>Male</u>
                                    </>
                                  )
                                }

                                <br />
                                {age !== "" ? (
                                  <>
                                    <b> Age:</b> <u>{age}</u>
                                  </>
                                )
                                  : (
                                    <>
                                      <b> Age:</b> <u>45</u>
                                    </>
                                  )
                                }
                                <br />
                                <b>Home Address:</b>
                                <u>
                                  H-1150, St-09, DHA Phase 2, Islamabad
                                </u>
                                <br />
                                {profession !== "" ? (
                                  <>
                                    <b>Profession:</b> <u>{profession}</u>
                                  </>
                                )
                                  : (
                                    <>
                                      <b>Profession:</b> <u>Web Developer</u>
                                    </>
                                  )
                                }
                                <br />
                                {mobileNo !== "" ? (
                                  <>
                                    <b>Cell:</b> <u>{mobileNo}</u>
                                  </>
                                )
                                  : (
                                    <>
                                    </>
                                  )
                                }
                              </p>
                            </div>
                          </div>
                          <div className="col-2">
                            <div className="card">
                              <img src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "95px", width: "95px", backgroundColor: "rgb(32 155 98)" }} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-success">{profileType} Details</h5>
                          <div className="row d-flex">
                            <div className="col-4">
                              <div className="card border-0">
                                <div className="card border-0">
                                  <p>
                                    {preferredGender !== "" ? (
                                      <>
                                        <b>Preferred Gender: </b> <u>{preferredGender}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Preferred Gender: </b> <u>Female</u>
                                        </>
                                      )
                                    }
                                    <br />
                                    {origin !== "" ? (
                                      <>
                                        <b>Point of Origin: </b>
                                        <u>
                                          {origin}
                                        </u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Point of Origin: </b>
                                          <u>
                                            (If different from home address)
                                          </u>
                                        </>
                                      )
                                    }
                                    <br />
                                    {timeDepart !== "" ? (
                                      <>
                                        <b>Pickup Timings:</b> <u>{timeDepart}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Pickup Timings:</b> <u>6:00</u>
                                        </>
                                      )
                                    }
                                    <br />
                                    {destination !== "" ? (
                                      <>
                                        <b>Destination:</b>
                                        <u>{destination}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Destination:</b>{" "}
                                        </>
                                      )
                                    }
                                    <br />
                                    {timeReturn !== "" ? (
                                      <>
                                        <b>Return Timings:</b> <u>{timeReturn}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Return Timings:</b> <u>14:00</u>
                                        </>
                                      )
                                    }
                                    <br />
                                    {days !== "" ? (
                                      <>
                                        <b>Days:</b> <u>{days}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                          <b>Days:</b> <u>Mon-Fri</u>
                                        </>
                                      )
                                    }
                                     <br />
                                    {mobileNo !== "" ? (
                                      <>
                                        <b>Contact No:</b> <u>{mobileNo}</u>
                                      </>
                                    )
                                      : (
                                        <>
                                        </>
                                      )
                                    }
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
                                  {seats !== "" ? (
                                    <>
                                      <b>No.of Seats:</b> {seats}
                                    </>
                                  )
                                    : (
                                      <>
                                        <b>No.of Seats:</b> 1
                                      </>
                                    )
                                  }
                                  <br />
                                  {seatsLeft !== "" ? (
                                    <>
                                      <b>No.of Seats Left:</b> {seatsLeft}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {price !== "" ? (
                                    <>
                                      <b>Payment Terms (perDay):</b>{" "}
                                      <u>{price}</u>
                                    </>
                                  )
                                    : (
                                      <>

                                      </>
                                    )
                                  }
                                  <br />
                                  {carAC !== "" ? (
                                    <>
                                      <b>Car have AC:</b> {carAC}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {carBrand !== "" ? (
                                    <>
                                      <b>Car Brand:</b> {carBrand}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {carCC !== "" ? (
                                    <>
                                      <b>Car CC:</b> {carCC}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {carModel !== "" ? (
                                    <>
                                      <b>Car Model:</b> {carModel}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {RegNo !== "" ? (
                                    <>
                                      <b>Registration Number:</b> {RegNo}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {RegYear !== "" ? (
                                    <>
                                      <b>Registration Year:</b> {RegYear}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                  <br />
                                  {carRegYear !== "" ? (
                                    <>
                                      <b>Car Registration Year:</b> {carRegYear}
                                    </>
                                  )
                                    : (
                                      <>
                                      </>
                                    )
                                  }
                                </p>
                              </div>
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

  );
};

export default CommuterProfile;
