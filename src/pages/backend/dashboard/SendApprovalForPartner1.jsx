import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";

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

const SendApprovalForPartner1 = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [contactId, setContactId] = useState("");
  const [requestContactId, setRequestContactId] = useState("");
  const [requestType, setRequestType] = useState("");

  useEffect(() => {
    getDashboardData();
    getProfileData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

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
        setRequestType("driver");
        //setContactId(jsonresponse.rider[0].contact_id);
        setName(jsonresponse.rider[0].name);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setRequestType("rider");
        setRequestContactId(jsonresponse.drivers[0].contact_id);
        setName(jsonresponse.drivers[0].name);
      } else {
        setContactId("");
      }
      console.log("Send Approval Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
        setContactId(jsonresponse[0].contact.contact_id);
      }
      console.log("Commuter Profile Data", jsonresponse);
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

    const response = await fetch(
      `${API_URL}/api/v1/request`,
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
    if (jsonresponse.statusCode === 200) {
      navigate("/dashboard");
    } else if (jsonresponse.statusCode === 100) {
      // alert("Resend Error: " + jsonresponse.message);
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: `${jsonresponse.message}`,
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      }
      )
    }
    else if (jsonresponse.statusCode === 500) {
      // alert("Resend Error: " + jsonresponse.message);
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: `${jsonresponse.message}`,
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      }
      )
    }
  };

  return (

    <div> <div className="page-title">
      <h3 className="card p-4 text-success my-2 fw-bold">SEND APPROVAL REQUEST TO MEMBER TO CONNECT</h3>

    </div>

      <div className="card p-4 bg-light p-2">
        <div
          className="card backgroundColor"
        >
          <div className="card-body ">
            <h5>Dear {contactId},</h5>
            <p className="">
              Commuterslink has found that we are a possible match to commute together.
            </p>

            <p>
              Based upon your profile I feel that we are a good match. Kindly view my profile and if you think it suits, please approve the request and let's start commuting together.
            </p>
            <p className="">
              Looking forward to sharing.
            </p>
            <p className="">
              Regards,
            </p>
            <p className="">
              Member {requestContactId},
            </p>
          </div>

          <div className="row text-left">


            <div className="d-flex justify-content-center mt-4">
              <Button className="btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={sendRequest}>
                Send Request
              </Button>

            </div>
          </div>
        </div>

      </div></div>
  );
};

export default SendApprovalForPartner1;
