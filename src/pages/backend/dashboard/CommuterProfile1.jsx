import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";

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

const CommuterProfile1 = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const [requestStage, setRequestStage] = useState("");

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

  const route = async () => {
    if (requestedAs === "rider") {
      navigate("/termscondition1");
    }
    else if (requestedAs === "driver") {
      navigate("/beforeapprovalterms");
    }
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
        }
        console.log("Driver Profile Data:", jsonresponse);
      }
      else if (profileType === "Rider") {
        const response = await fetch(
          `https://staging.commuterslink.com/api/v1/commuter/profile/${contactId}/rider`,
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
        "https://staging.commuterslink.com/api/v1/requests",
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
        setMemberId(jsonresponse.data[0].contact_id);
        setId(jsonresponse.data[0].id);
        setRequestedAs(jsonresponse.data[0].requested_as);
        setRequestStage(jsonresponse.data[0].request_stage);
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

  useEffect(() => {
    if (contactId) {
      getProfileData();
    }
  }, [contactId]);

  useEffect(() => {
    getDashboardData();
    getMemberData();
  }, []);

  const viewRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/beforeapprovalterms");
    }
  };

  const requestViewDriver = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/driver-acceptance");
    }
  };

  const requestAccepeted = () => {
    alert("Request is waiting for response!");
  };

  const sendRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/termscondition1");
    }
  };

  return (
    <div>
      <div className="page-title">
        <p className="card p-4 text-dark my-2 fw-bold fs-6">
          You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take{" "}
        </p>
      </div>

      <div className="card p-4 bg-light p-2" >
        <div className="card p-4" style={{ backgroundColor: '#e5f8f3' }} >
          <div className="row">
            <div className="col-md-1 mt-1">
              <img src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "115px", width: "115px" }} />
            </div>
            <div className="col-md-11 px-5">
              <div className="px-5">
                {name !== "" ? (
                  <div>
                    <h3 className="text-success ">{name}</h3>
                  </div>
                ) : (
                  <>
                  </>
                )}
              </div>
              <p className="px-5">
                {gender !== "" ? (
                  <>
                    <b>Gender:</b> <u>{gender}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {age !== "" ? (
                  <>
                    <b> Age:</b> <u>{age}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {profession !== "" ? (
                  <>
                    <b>Profession:</b> <u>{profession}</u>
                  </>
                ) : (
                  <>
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
          <hr style={{ color: "grey" }} />
          <div className="row">
            <h2 className="text-success py-2 fw-bold">{profileType ? profileType : "Commuter"} Details</h2>
            <div className="col-md-6">
              <p>
                {preferredGender !== "" ? (
                  <>
                    <b>Preferred Gender: </b> <u>{preferredGender}</u>
                  </>
                ) : (
                  <>
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
                  </>
                )}
                <br />
                {timeDepart !== "" ? (
                  <>
                    <b>Pickup Timings:</b> <u>{timeDepart}</u>
                  </>
                ) : (
                  <>

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

                  </>
                )}
                <br />
                {timeReturn !== "" ? (
                  <>
                    <b>Return Timings:</b> <u>{timeReturn}</u>
                  </>
                ) : (
                  <>

                  </>
                )}
                <br />
                {days !== "" ? (
                  <>
                    <b>Days:</b> <u>{days}</u>
                  </>
                ) : (
                  <>

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
            <div className="col-md-6">
              <p>
                {seats !== "" ? (
                  <>
                    <b>No.of Seats:</b> {seats}
                  </>
                ) : (
                  <>

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
          {memberId !== "" ? (
            (
              requestStage === 2 ? (
                <div className="text-center">
                  <Button className="btn btn-sm fs-6 fw-bold btn-warning text-gray rounded-4 px-3 py-2 mb-3" onClick={requestAccepeted}>
                    Request Accepted
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={route}>
                    Accept Request
                  </Button>
                </div>
              )
            )
          ) : (
            <div className="text-center">
              {requestStage === 1 ? (
                <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={viewRequest}>
                  View Request
                </Button>
              ) : (
                requestStage === 2 ? (
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={requestViewDriver}>
                    View Request
                  </Button>
                ) : (
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={sendRequest}>
                    Send Request
                  </Button>
                )
              )}
            </div>
          )}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default CommuterProfile1;
