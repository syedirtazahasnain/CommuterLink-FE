import React, { useEffect, useState } from "react";
import { setloginState } from "../../../redux/loginSlice";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/base";
import Swal from "sweetalert2";

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const SendApprovalForMember = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [contactId, setContactId] = useState("");
  const [loginName, setLoginName] = useState("");
  const [id, setId] = useState("");

  const route = async () => {
    const body = {
      request_id: id,
      message: "I accept your request",
      status: 1
    }

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
  };

  useEffect(() => {
    getMemberData();
    getProfileData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

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
        setLoginName(jsonresponse[0].name);
        setContactId(jsonresponse[0].contact.contact_id);
      }
      console.log("Profile Send Member Approval Data", jsonresponse);
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
        setName(jsonresponse.data[0].user[0].name);
        setId(jsonresponse.data[0].id);
      }
      console.log("Request Member Send Member Approval Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="page-title">
        
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-success my-2 fw-bold m-0">
          TRAVEL BUDDIES FOR YOUR CAR - REQUESTS BY MEMBERS
        </h3>
        <Link
              to={"/termscondition1"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      <div className="card p-4 bg-light p-2">
      <h5 className="text-success pb-2 fw-bold">
        {/* SEND APPROVAL OF MEMBERS'S REQUEST */}
        Send approval for member's request
      </h5>

      
        <div className="card  bg-light">
          <div className="card-body">

            <p>Dear {name}</p><br />
            <p className="">
              Thank you for sending me the request for sharing my car.
            </p>
            <p>
              Based upon your profile, I feel that we are a good match. I approve your request
              to commute together.
            </p>
            <p>
              Looking forward to sharing
            </p>

            <br />

            <p>
              Best Regards
            </p>
            <p>
              {loginName}
            </p>
          </div>

          <div className="text-center">
            <Button
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
              onClick={route}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendApprovalForMember;
