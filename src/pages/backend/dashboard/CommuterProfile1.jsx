import React, { useEffect, useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { setCurrentPage, setSidebarState } from "../../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import Dashboard from "../../frontend/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { setsignupState } from "../../../redux/signupSlice";

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

const CommuterProfile1 = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitbtn , setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };

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
    setContactId("");
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
  };

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/matches/office",
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
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
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
      } else {
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
      } else {
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

  return (
    <div>
      <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
        {/* <div className="border border-bottom border-success justify-content-center ml-3"></div> */}
        <p className="justify-content-center px-3 text-success">
          You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take{" "}
        </p>
      </div>

      <div
        className="card px-5 py-5"
        style={{
          border: "0",
          backgroundColor: "#D9D9D9",
        }}
      >
        <div class="card-header d-flex flex-column bg-light mb-2">
          <div>
            {name !== "" ? (
              <div>
                <h5 className="text-success ">{name}</h5>
              </div>
            ) : (
              <div>
                <h5 className="text-success ">Zafar Jamil</h5>
              </div>
            )}
          </div>

          <div className="card bg-light" style={{ border: "0" }}>
            <div className="row d-flex justify-content-between">
              <div className="col-4">
                <div
                  className="card border-0 bg-light"
                  style={{ width: "50rem" }}
                >
                  <p className="">
                    {gender !== "" ? (
                      <>
                        <b>Gender:</b> <u>{gender}</u>
                      </>
                    ) : (
                      <>
                        <b>Gender:</b> <u>Male</u>
                      </>
                    )}
                    <br />
                    {age !== "" ? (
                      <>
                        <b> Age:</b> <u>{age}</u>
                      </>
                    ) : (
                      <>
                        <b> Age:</b> <u>45</u>
                      </>
                    )}
                    <br />
                    {profession !== "" ? (
                      <>
                        <b>Profession:</b> <u>{profession}</u>
                      </>
                    ) : (
                      <>
                        <b>Profession:</b> <u>Web Developer</u>
                      </>
                    )}
                    <br />
                    {mobileNo !== "" ? (
                      <>
                        <b>Cell:</b> <u>{mobileNo}</u>
                      </>
                    ) : (
                      <></>
                    )}
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
                  <div className="card border-0 bg-light">
                    <div className="card border-0 bg-light">
                      <p>
                        {preferredGender !== "" ? (
                          <>
                            <b>Preferred Gender: </b> <u>{preferredGender}</u>
                          </>
                        ) : (
                          <>
                            <b>Preferred Gender: </b> <u>Female</u>
                          </>
                        )}
                        <br />
                        {origin !== "" ? (
                          <>
                            <b>Point of Origin: </b>
                            <u>{origin}</u>
                          </>
                        ) : (
                          <>
                            <b>Point of Origin: </b>
                            <u>(If different from home address)</u>
                          </>
                        )}
                        <br />
                        {timeDepart !== "" ? (
                          <>
                            <b>Pickup Timings:</b> <u>{timeDepart}</u>
                          </>
                        ) : (
                          <>
                            <b>Pickup Timings:</b> <u>6:00</u>
                          </>
                        )}
                        <br />
                        {destination !== "" ? (
                          <>
                            <b>Destination:</b>
                            <u>{destination}</u>
                          </>
                        ) : (
                          <>
                            <b>Destination:</b>{" "}
                          </>
                        )}
                        <br />
                        {timeReturn !== "" ? (
                          <>
                            <b>Return Timings:</b> <u>{timeReturn}</u>
                          </>
                        ) : (
                          <>
                            <b>Return Timings:</b> <u>14:00</u>
                          </>
                        )}
                        <br />
                        {days !== "" ? (
                          <>
                            <b>Days:</b> <u>{days}</u>
                          </>
                        ) : (
                          <>
                            <b>Days:</b> <u>Mon-Fri</u>
                          </>
                        )}
                        <br />
                        {mobileNo !== "" ? (
                          <>
                            <b>Contact No:</b> <u>{mobileNo}</u>
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className="card mx-2 border-0 bg-light"
                    style={{ width: "20rem" }}
                  >
                    <p>
                      {seats !== "" ? (
                        <>
                          <b>No.of Seats:</b> {seats}
                        </>
                      ) : (
                        <>
                          <b>No.of Seats:</b> 1
                        </>
                      )}
                      <br />
                      {seatsLeft !== "" ? (
                        <>
                          <b>No.of Seats Left:</b> {seatsLeft}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {price !== "" ? (
                        <>
                          <b>Payment Terms (perDay):</b> <u>{price}</u>
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {carAC !== "" ? (
                        <>
                          <b>Car have AC:</b> {carAC}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {carBrand !== "" ? (
                        <>
                          <b>Car Brand:</b> {carBrand}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {carCC !== "" ? (
                        <>
                          <b>Car CC:</b> {carCC}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {carModel !== "" ? (
                        <>
                          <b>Car Model:</b> {carModel}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {RegNo !== "" ? (
                        <>
                          <b>Registration Number:</b> {RegNo}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {RegYear !== "" ? (
                        <>
                          <b>Registration Year:</b> {RegYear}
                        </>
                      ) : (
                        <></>
                      )}
                      <br />
                      {carRegYear !== "" ? (
                        <>
                          <b>Car Registration Year:</b> {carRegYear}
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body bg-light">
              <button to="/" className=" btn_view1 btn-block ">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuterProfile1;
