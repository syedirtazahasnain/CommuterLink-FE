import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Iframe from "react-iframe";
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

const AdvancePayment = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [userId, setUserId] = useState("");
  const [payment, setPayment] = useState("");
  const userToken = useSelector((s) => s.login.data.token);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showJazzModal, setShowJazzModal] = useState(false);
  const [paymentContent, setPaymentContent] = useState("");
  const paymentURL =`https://staging.commuterslink.com/getpayments3?id=${userId}&amountPaid=${payment}&mobile=sjkdhaskjdhs`;

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
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

  useEffect(() => {
    if(memberId){
      getPaymentDetails();
    }
  }, [memberId]);

  const getProfileData = async () => {
    try{
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization : `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if(jsonresponse){
        setUserId(jsonresponse[0].contact.user_id);
      }
      console.log("Advance Payment Profile Data", jsonresponse);
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
      }
      console.log("Advance Payment Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getPaymentDetails = async () => {
    try {
      const response = await fetch(
        `https://staging.commuterslink.com/api/v1/advance-seat-cost/${memberId}`,
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
      if(jsonresponse){
        setPayment(jsonresponse);
      }
      console.log("Payment Details:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  // Function to fetch content from the given URL
  const fetchPaymentContent = (url) => {
    try {
      const response = url;
      const textContent = response;
      setPaymentContent(textContent);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Two Weeks Advance Min. Payment Due: Rs.{payment}/-{" "}
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <p>
              Money will stay in your Wallet & will be transferred to car owner
              on weekly basis after you have availed the services
            </p>
            <p className="">
              At any given point in time wallet must have 2 weeks balance, so
              keep checking and keep loading.
            </p>
            <div className="page-title">
              <h5 className="card p-2 text-success text-center my-2 fw-bold">
                PAYMENT OPTIONS{" "}
              </h5>
            </div>
            <div className="page-title">
              <div className="card p-2 text-success text-center my-2 fw-bold">
                <div className="container text-center p-2">
                  <div className="row">
                    <div className="col-12 mb-2  border border-success rounded rounded-3">
                      <div>
                        <button 
                          className="btn  text-success fw-bold fs-5 lh-1" 
                          onClick={() => {
                            setShowCardModal(true);
                            fetchPaymentContent(paymentURL);
                          }}
                        >
                          <span><i className="fa-solid fa-wallet text-success mx-2" /></span>
                          Credit/Debit Card
                        </button>
                      </div>
                    </div>
                    <div className="col-12 border advancecolor border-success rounded rounded-3">
                      <div>
                        <button 
                          className="btn btncol advancecolor text-success fw-bold fs-5 lh-1"
                          onClick={() => setShowJazzModal(true)} >
                          <span><img
                            src={`${BASE_URL}/assets/images/jazz.png`}
                            className="card-img-top w-40px m-auto mx-4"
                          /></span>
                          Jazz Cash
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Skip Payment
            </button>
          </div>
          
          {/* Credit/Debit Card Modal */}
          <Modal show={showCardModal} onHide={() => setShowCardModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Credit/Debit Card Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Using <object> to embed content */}
              <Iframe
                url={paymentContent}
                width="100%"
                height="400px"
                display="initial"
                position="relative"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCardModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Jazz Cash Modal */}
          <Modal show={showJazzModal} onHide={() => setShowJazzModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Jazz Cash Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <pre>{paymentContent}</pre> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowJazzModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdvancePayment;
