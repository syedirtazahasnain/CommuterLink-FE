import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { setContactIdState, setIdState } from "../../../redux/generalSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const DriverRequestAcceptence = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const requestContactId = useSelector((s) => s.general.data.contact_id);
  const requestId = useSelector((s) => s.general.data.id);
  const [name, setName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [id, setId] = useState("");
  const [contactId, setContactId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // const [profileStatus, setProfileStatus] = useState("");

  useEffect(() => {
    getProfileData();
    getMemberData();
    //getDashboardData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  useEffect(() => {
    if (requestContactId) {
      getDateData();
    }
  }, [requestContactId]);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setName(jsonresponse[0].name);
        setContactId(jsonresponse[0].contact.contact_id);
        // setProfileStatus(jsonresponse[0].profile_status);
      }
      console.log("Final Step Profile Data", jsonresponse);
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
        setDriverName(jsonresponse.data[0].user[0].name);
        setId(jsonresponse.data[0].id);
      }
      console.log("Final Step Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getDateData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/suggestedDate/${requestContactId}`,
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
      if (jsonresponse) {
        setSelectedDate(jsonresponse.data);
      }
      console.log("Driver Request Acceptence Date:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    try {
      const body = {
        request_id: requestId,
        start_date: selectedDate,
        message: "I accept your request",
        status: 3
      }

      console.log("Request Body:", body);

      const response = await fetch(
        `${API_URL}/api/v1/request`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonresponse = await response.json();
      console.log("API Response", jsonresponse);

      if (jsonresponse.statusCode === 200) {
        dispatch(setIdState(""));
        dispatch(setContactIdState(""));
        navigate("/dashboard");
      } else {
        // alert("Resend Error: " + jsonresponse.message);
        Swal.fire({
          position:'top',
          // // icon: 'error',
         text: `${jsonresponse.message}`,
         customClass: {
          confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
        },}
        )
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      Swal.fire({
        position:'top',
        // // icon: 'error',
       text: 'An error occured while sending the request.',
       customClass: {
        confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
      },}
      )
    }
  };

  return (
    <div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-success my-2 fw-bold m-0">
        DRIVER REQUEST ACCEPTANCE
        </h3>
        <Link
              to={"/"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card bg-light">
          <div className="card-body">

            <p>Dear {requestContactId}</p>
            <p className="">
              Thank you very much for accepting me as a travel buddy to ride on your car.
              I also think that we are a suitable match to commute together. so I also formally
              give my consent to share you car.
            </p>
            {/* <p>
              I have deposited Rs. XXXX/- as advance with CommutersLink which will be credited
              to your wallet on daily basis @ Rs 335/-.
            </p> */}
            <p>
              I wish to start commuting with your starting from {selectedDate}
            </p>
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
            <p>
              Best Regards
            </p>
            <p>
              {contactId}
            </p>
          </div>

          <div className="text-center">
            <Button
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
              onClick={sendRequest}
            >
              I Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRequestAcceptence;
