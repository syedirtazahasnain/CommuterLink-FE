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

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/whyprocesspayment1");
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
  const [memberId, setMemberId] = useState("");
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
  const [requestType, setRequestType] = useState("");


  useEffect(() => {
    getDashboardData();
    getMemberData();
    if (contactId) {
      getProfileData();
    }
  }, [contactId]);

  useEffect(() => {
    getMemberData();
  }, []);

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
        setRequestType("driver");
        setContactId(jsonresponse.rider[0].contact_id);
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
        setRequestType("rider");
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
        setProfileType("Rider");
        setMemberId(jsonresponse.data[0].contact_id);
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
      }else {
        setProfileType("");
        setMemberId("");
        setName("");
        setImage("");
        setGender("");
        setAge("");
        setProfession("");
        setOrigin("");
        setDestination("");
        setTimeDepart("");
        setTimeReturn("");
        setDays("");
      }
      console.log("Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    const body = {
      reciever_contact_id: contactId,
      request_type: requestType,
      message: "Dear CL Member, CL have found us as matching xyz",
      start_date: "2023-06-10",
    };

    // console.log("Send Request:", body);
    const response = await fetch(
      "https://staging.commuterslink.com/api/v1/request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    const jsonresponse = await response.json();
    console.log("API Response", jsonresponse);
    if (jsonresponse.statusCode == 200) {
      navigate("/dashboard");
    } else {
      alert("Resend Error: " + jsonresponse.message);
    }
  };

  return (
    <div>
      <div className="page-title">
        {/* <div className="border border-bottom border-success justify-content-center ml-3"></div> */}
        <p className="card p-4 text-dark my-2 fw-bold fs-6">
          You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take{" "}
        </p>
      </div>

      <div className="card p-4 bg-light p-2" >
        <div className="card p-4" style={{ backgroundColor: '#e5f8f3' }} >

          <div>
            {name !== "" ? (
              <div>
                <h3 className="text-success ">{name}</h3>
              </div>
            ) : (
              <div>
                <h5 className="text-white py-2 fw-bold">Zafar Jamil</h5>
              </div>
            )}
          </div>


          <div className="row d-flex justify-content-between">
            <div className="col-6">
              <p className="">
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
            <div className="col-6 text-end">
              <img src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "95px", width: "95px", backgroundColor: "rgb(32 155 98)" }} />
            </div>
          </div>
          <div>
            <h2 className="text-success">{profileType} Details</h2>
            <div className="row d-flex">
              <div className="col-4">
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
              <div className="col-2">
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
              {memberId !== "" ? (
                <div className="text-center">
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={route}>
                    Accept Request
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={sendRequest}>
                    Send Request
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuterProfile1;
