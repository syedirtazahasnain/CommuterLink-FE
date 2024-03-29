import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate,useParams } from "react-router-dom";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { Breadcrumbs} from '@mui/material'

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
  const { id } = useParams();
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const requestId = useSelector((s) => s.general.data.contact_id);
  const [name, setName] = useState("");
  const [option, setOption] = useState(null);
  const [contactId, setContactId] = useState("");
  const [requestContactId, setRequestContactId] = useState("");
  const [requestType, setRequestType] = useState("");
  const crumbs = [
    {
      path: "/commuter-profile",
      label: "Home",
      active: false,
    },{
    path:"/termscondition1",
    label:"Terms and Condition"},
    {
      label: id == undefined ? "Send Approval Request" : "",
      active: true,
    },
  ];
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
        setOption(jsonresponse[0].userlist.vehicle_option);
        setContactId(jsonresponse[0].contact.contact_id);
      }
      console.log("Commuter Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    if (option === 0) {
      const body = {
        reciever_contact_id: requestId,
        request_type: "rider",
        message: "Dear CL Member, CL have found us as matching xyz",
        start_date: "2023-06-10",
      };

      console.log({ body });

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
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          },
        }
        )
      }
      else if (jsonresponse.statusCode === 500) {
        // alert("Resend Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          },
        }
        )
      }
    }
    else if (option === 1) {

      const body = {
        reciever_contact_id: requestId,
        request_type: "driver",
        message: "Dear CL Member, CL have found us as matching xyz",
        start_date: "2023-06-10",
      };

      console.log({ body });

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
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          },
        }
        )
      }
      else if (jsonresponse.statusCode === 500) {
        // alert("Resend Error: " + jsonresponse.message);
        Swal.fire({
          position: 'top',

          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          },
        }
        )
      }
    }
  };

  return (

    <div> <div className="page-title">
        <h3 className="px-4 py-2 text-success my-2 fw-bold">
          <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map((crumb, index) => (
              <Link
                key={index}
                to={crumb.path || ""}
                style={{
                  color: crumb.active ? "black" : "green",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  pointerEvents: crumb.path ? "auto" : "none",
                  textDecoration: "none",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </h3>
      <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
        <div className="d-flex justify-content-between align-items-xl-baseline">
          <h3 className="text-success my-2 fw-bold m-0">SEND APPROVAL REQUEST TO MEMBER TO CONNECT</h3>
          <Link
            to={"/termscondition1"} >
            <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
              <i className="fas fa-angle-left text-white" />
              Back
            </button>
          </Link></div></div>
    </div>

      <div className="card p-4 bg-light p-2">
        <div
          className="card bg-light"
        >
          <div className="card-body ">
            <p>Dear {requestId},</p>
            <p className="">
              Commuterslink has found that we are a possible match to commute together.
            </p>

            <p>
              Based upon your profile I feel that we are a good match. Kindly view my profile and if you think it suits, please approve the request and let's start commuting together.
            </p>
            <p className="">
              Looking forward to sharing your car.
            </p>
            <p className="">
              Regards,
            </p>
            <p className="">
              Member {contactId},
            </p>
          </div>

          <div className="row text-left">


            <div className="d-flex justify-content-center mt-4">
              <Button className="font-custom border-0 btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={sendRequest}>
                Send Request
              </Button>

            </div>
          </div>
        </div>

      </div></div>
  );
};

export default SendApprovalForPartner1;
