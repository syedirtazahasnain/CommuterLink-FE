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
  const [requestType, setRequestType] = useState("");
 
  useEffect(() => {
    getDashboardData();
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
        setContactId(jsonresponse.rider[0].contact_id);
        setName(jsonresponse.rider[0].name);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setRequestType("rider");
        setContactId(jsonresponse.drivers[0].contact_id);
        setName(jsonresponse.drivers[0].name);
      } else {
        setContactId("");
      }
      console.log("Send Approval Data:", jsonresponse);
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
    if (jsonresponse.statusCode == 200) {
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

  return (
    // <div>
    //   <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
    //     <div className="card-body py-5" style={{}}></div>
    //   </div>

    //   <div
    //     className="card px-5 py-5 m-auto backgroundColor"
    //     style={{
    //      border:"0",
    //       backgroundColor: "",
    //       width: "50rem",
    //     }}
    //   >
    //     <div class="card backgroundColor mb-2 ">
         

        
    //         <div className="card-body backgroundColor" style={{ backgroundColor: "" }}>
    //           <h5>Dear {name},</h5>
    //           <p className="">
    //             I have gone through your profile and I feel that we are a good
    //             match to commute together.
    //           </p>

    //           <p>
    //             I have approved you as a partner and we can start as soon as you
    //             also accept to share my car.
    //           </p>
    //         </div>
    //         <div className="card-body backgroundColor">
    //           <Button className=" btn_view1 btn-block" onClick={sendRequest}>
    //             Send Request
    //           </Button>
    //         </div>
          
    //     </div>
    //   </div>
    // </div>


<div> <div className="page-title">
      <h3 className="card p-4 text-success my-2 fw-bold">SEND APPROVAL FOR PARTNER</h3>
      
    </div>
 
        <div className="card p-4 bg-light p-2">
        <div
                      className="card backgroundColor"
                    >
                <div className="card-body ">
              <h5>Dear {name},</h5>
              <p className="">
                I have gone through your profile and I feel that we are a good
                match to commute together.
              </p>

              <p>
                I have approved you as a partner and we can start as soon as you
                also accept to share my car.
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
