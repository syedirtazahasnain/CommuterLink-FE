import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../../constants";
import { displayNotification } from "../../../helpers";
import { setAmountState } from "../../../redux/generalSlice";

const AmountValidation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [amount, setAmount] = useState(null);
  const [data, setData] = useState("");
  const [userType, setUserType] = useState("");
  const [recentData, setRecentData] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  /* TRavel Partner */
  const [contactId, setContactId] = useState(null);
  const [seatCost, setSeatCost] = useState(null);

  useEffect(() => {
    // Fetch status data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/latest-record/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const jsonresponse = await response.json();
        console.log("Recent History:", jsonresponse);
        if (jsonresponse.success === true) {
          setRecentData(jsonresponse.data);

          // Add a delay of 1.5 seconds before removing the loading message
          setTimeout(() => {
            setRecentLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRecentLoading(false);
      }
    };

    fetchData();
    getTravelData();
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      getTravelData();
    }
  }, [userToken]);

  useEffect(() => {
    if (contactId !== null) {
      getSeatCostDetail(contactId);
    }
  }, [contactId]);

  const handleAmountChange = (event) => {
    const input = event.target.value;
    if (/^\d*$/.test(input) || input === null) {
      setAmount(input);
    }
  };

  const handleCheckAmount = () => {
    if (amount < 5) {
      displayNotification(
        "warning",
        "Amount must be at least in double digits"
      );
    } else {
      dispatch(setAmountState(amount));
      navigate("/rechargewallet");
    }
  };

  const getTravelData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/travelbuddy`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      const jsonresponse = await response.json();
      // console.log('irtaza_json', jsonresponse);
      if (jsonresponse && jsonresponse.data[0]) {
        setContactId(jsonresponse.data[0].contact_id);
      }

      //   if (jsonresponse.data[1]) {
      //     setContactId1(jsonresponse.data[1].contact_id);
      //     setName1(jsonresponse.data[1].name);
      //     setImage1(jsonresponse.data[1].commuter_image);
      //     setPrice1(jsonresponse.data[1].price);
      //     setDate1(jsonresponse.data[1].aggreement_date);
      //     setCancelDate1(jsonresponse.data[1].cancellation_date);
      //   }
      else if (jsonresponse.status_code === 100) {
        setData(jsonresponse.message);
      } else if (jsonresponse.status_code === 500) {
        Swal.fire({
          position: "top",
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: "swal-custom",
          },
        });
      }
      console.log("Travel Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getSeatCostDetail = async (contactId) => {
    console.log(contactId);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/advance-seat-cost/${contactId}`,
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
        setSeatCost(jsonresponse);
      }
      console.log("Driver Seat Cost Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  console.log("Seat Cost Data:", seatCost);

  return (
    <div>
      <div className="page-title">
        <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-dark-green my-2 fw-bold m-0">RECHARGE AMOUNT RS:  {seatCost} </h3>
            <Link to={"/dashboard"}>
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="page-title"></div>
      <div className="card p-4">
        <h5 className="text-dark-green mb-4">
          At CommutersLink, we are always available to address your queries and
          would love to hear your suggestions or feedback if any. Feel free to
          connect with us and your wallet is end to end encrypted.
        </h5>
        <div className=" bg-white">
          <div className="">
            <div className="row text-left">
              <div className="col-md-12">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-12">
                      <TextField
                        className="mb-3 bg-light"
                        id="formBasicPassword"
                        color="success"
                        label="Amount"
                        variant="outlined"
                        type="text"
                        sx={{ width: "100%" }}
                        size="small"
                        value={amount}
                        onChange={handleAmountChange}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                      />
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
                    onClick={handleCheckAmount}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountValidation;
