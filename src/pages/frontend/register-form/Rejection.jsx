import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ThreeCircles } from "react-loader-spinner";

const Rejection = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const [rejectedData, setRejectedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = useSelector((s) => s.login.data.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/resubmit");
    }
  };

  useEffect(() => {
    getRejectedStatus();
  }, []);

  const getRejectedStatus = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/rejectedStatus/`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data (${response.status})`);
      }
  
      const jsonresponse = await response.json();
      console.log("Rejected Status:", jsonresponse);
  
      // Check if the response indicates a rejected status
      if (jsonresponse.success && jsonresponse.data.length > 0) {
        setRejectedData(jsonresponse.data[1]);
      }
      else {
        setRejectedData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rejected status:", error);
      // Handle the error, e.g., display an error message or take appropriate action.
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#eee" }}>
        <div className="container pt-5" >
          <div className="row justify-content-center">
            <div className="col-md-7 bg-light mt-5 mb-5"  >
              <div className="row shadow bg-danger" style={{ backgroundColor: '#1F5F5B' }}>
                <h1 className="text-center text-white py-4">
                  Account Rejected!
                </h1>
              </div>
              <div className="container py-3">
              <div className="p-3">
                  {/* Display the Spinner when loading is true */}
                  {loading ? (
                    <div className="text-center">
                      {/* // Render CircularProgress while loading */}
                      <div className="d-flex justify-content-center align-items-center vh-10">
                        <ThreeCircles
                          height={50}
                          width={50}
                          color="#4fa94d"
                          visible={true}
                          ariaLabel="three-circles-rotating"
                          outerCircleColor=""
                          innerCircleColor=""
                          middleCircleColor=""
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>
                        Your request has not been approved due to the following
                        reasons:
                      </p>
                      {rejectedData && rejectedData.length > 0 && (
                        <ul>
                          {rejectedData.map((reason, index) => (
                            <p key={index} className="text-danger">
                              {index + 1}: {reason}
                            </p>
                          ))}
                        </ul>
                      )}
                      <div className="text-info py-2">
                        <h5>
                          Note: The above mentioned changes are necessary and you
                          can also update any other data on your dashboard.
                        </h5>
                        <div className="text-center">
                          <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark text-white rounded-4 px-3 py-2 mb-3" onClick={route}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rejection;