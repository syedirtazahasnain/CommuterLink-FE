import React, { useEffect, useState } from "react";
import { TextField, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import DatePicker from '@mui/lab/DatePicker';


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

const TravelBuddyProfile = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  const [requestStage, setRequestStage] = useState("");


  const route = async () => {
    if (requestedAs === "rider") {
      navigate("/termscondition1");
    }
    else if (requestedAs === "driver") {
      navigate("/beforeapprovalterms");
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

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/matches/office`,
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
          `${API_URL}/api/v1/commuter/profile/${contactId}/driver`,
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
          `${API_URL}/api/v1/commuter/profile/${contactId}/rider`,
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
        `${API_URL}/api/v1/requests`,
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
        setId(jsonresponse.data[0].id);
        setRequestedAs(jsonresponse.data[0].requested_as);
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
      if(jsonresponse.data && jsonresponse.data.length > 0){
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
      }
      console.log("Travel Data:", jsonresponse);
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
    getTravelData();
  }, []);

  const GoBack = () => {
    navigate(-1);
  };


  const calendarPicker = ()=>{
    navigate("/partner-cancellation");

  };
 const youSure=()=>{
  Swal.fire({
    position:'top',
    title: 'Are you sure?',
    text: "You want to cancel",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#037e03',
    cancelButtonColor: '#037e03',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
        calendarPicker();
    }
  })
 }
  const sendRequest = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/termscondition1");
    }
  };

  return (
    <div>
      <div className="page-title">
      <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">Travel Buddy Profile</h3>
            <Link
              to={"/dashboard"} >
              <button className="btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
          <h5 className="card p-2 px-4 text-success ">{`You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take turns to use each other's car`}</h5>
        </div>
      {/* <div className="page-title">
        <h4 className="card p-2 px text-success my-2">
          You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take turns to use each other's car
        </h4>
      </div> */}

      <div className="card p-4 bg-light p-2" >
        <div className="card p-4 backgroundColor">
          <div className="row">
            <div className="col-md-1 mt-1">
              <img src={`${IMAGE_URL}${image}`} style={{ height: "115px", width: "115px" }} />
            </div>
            <div className="col-md-11 px-5">
              <div className="px-5">
                {name !== "" ? (
                  <div>
                    <h3 className="text-success fw-bold">{name}</h3>
                  </div>
                ) : (
                  <>
                  </>
                )}
              </div>
              <p className="px-5">
                {gender !== "" ? (
                  <>
                    <b className="text-black">Gender:</b> <u>{gender}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {age !== "" ? (
                  <>
                    <b className="text-black"> Age:</b> <u>{age}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {profession !== "" ? (
                  <>
                    <b className="text-black">Profession:</b> <u>{profession}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {mobileNo !== "" ? (
                  <>
                    <b className="text-black">Cell:</b> <u>{mobileNo}</u>
                  </>
                ) : (
                  <></>
                )}
              </p>

            </div>
          </div>
          <hr style={{ color: "grey" }} />
          <div className="row">
            <h2 className="text-success py-2 fw-bold">{profileType === "rider" ? ("Rider Details") : ("Driver Details")}</h2>
            <div className="col-md-6">
              <p>
                {preferredGender !== "" ? (
                  <>
                    <b className="text-black">Preferred Gender: </b> <u className="">{preferredGender}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {origin !== "" ? (
                  <>
                    <b className="text-black">Point of Origin: </b>
                    <u>{origin}</u>
                  </>
                ) : (
                  <>
                  </>
                )}
                <br />
                {timeDepart !== "" ? (
                  <>
                    <b className="text-black">Pickup Timings:</b> <u>{timeDepart}</u>
                  </>
                ) : (
                  <>

                  </>
                )}
                <br />
                {destination !== "" ? (
                  <>
                    <b className="text-black">Destination:</b>
                    <u>{destination}</u>
                  </>
                ) : (
                  <>

                  </>
                )}
                <br />
                {timeReturn !== "" ? (
                  <>
                    <b className="text-black">Return Timings:</b> <u>{timeReturn}</u>
                  </>
                ) : (
                  <>

                  </>
                )}
                <br />
                {days !== "" ? (
                  <>
                    <b className="text-black">Days:</b> <u>{days}</u>
                  </>
                ) : (
                  <>

                  </>
                )}
                <br />
                {mobileNo !== "" ? (
                  <>
                    <b className="text-black">Contact No:</b> <u>{mobileNo}</u>
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
                    <b className="text-black">No.of Seats:</b> <u>{seats}</u>
                  </>
                ) : (
                  <>

                  </>
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
          <div className="text-center d-flex m-auto justify-content-between">
            {/* <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={GoBack}>
              Back
            </Button> */}
            <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3 mx-4" onClick={youSure}>
              Cancel Agreement
            </Button>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default TravelBuddyProfile;
