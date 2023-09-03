import React, { useEffect, useState } from "react";
import { setloginState } from "../../../redux/loginSlice";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
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
        icon: 'warning',
       text: `${jsonresponse.message}`}
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
        <h3 className="card p-4 text-success my-2 fw-bold">
          TRAVEL BUDDIES FOR YOUR CAR - REQUESTS BY MEMBERS
        </h3>

      </div>
      <h5 className="card p-2 text-success text-center my-2 fw-bold">
        SEND APPROVAL OF MEMBERS'S REQUEST
      </h5>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">

            <h5>Dear {name}</h5><br />
            <p className="">
              Thank you for sending me the request for sharing my car.
            </p>
            <p>
              Based upon your profile, I feel that we are a good match. I approve your request
              to commute togeter.
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
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
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
