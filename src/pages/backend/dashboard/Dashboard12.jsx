import React, { useEffect, useState } from 'react'
import CommuterLinkSuggestions from './CommuterLinkSuggestions'
// import RequestsByMembers from './RequestsByMembers'
import TravelPatners from './TravelPatners'
import TravelConfirmation from './TravelConfirmation'
import { setCurrentPage } from '../../../redux/generalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { API_URL } from '../../../constants'
import { ThreeCircles } from 'react-loader-spinner'
import { displayNotification } from '../../../helpers'
import RequestsByMembers from './RequestsByMembers'
import MyWallet from './MyWallet'


const Dashboard12 = () => {

  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTravelData();
  }, []);

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
      if (jsonresponse.status_code === 100) {
        setData(jsonresponse.message);
      }
      else if (jsonresponse.status_code === 500) {
        // Swal.fire({
        //   position: 'top',
        //   // icon: 'error',
        //   text: `${jsonresponse.message}`,
        //   customClass: {
        //     confirmButton: "swal-custom", // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("error", `${jsonresponse.message}`);
      }
      console.log("Dashboard Travel Data:", jsonresponse);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage("dashboard"));
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center">
          {/* Render CircularProgress while loading */}
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
          <div className="mt-3">

          <ul className="nav nav-pills nav-justified">
            <li className="nav-item me-0">
              <a className={`nav-link fs-4 custom-button-style active rounded-0 font-custom`} data-bs-toggle="pill" href="#home">CommutersLink Suggestions</a>
            </li>
            <li className="nav-item me-0">
              <a className={`nav-link fs-4 custom-button-style rounded-0 font-custom px-4`} data-bs-toggle="pill" href="#menu1">Request by Members</a>
            </li>
            <li className="nav-item me-0">
              <a className={`nav-link fs-4 custom-button-style rounded-0 font-custom`} data-bs-toggle="pill" href="#menu2">Agreement Information</a>
            </li>
            <li className="nav-item me-0">
              <a className={`nav-link fs-4 custom-button-style rounded-0 font-custom px-6`} data-bs-toggle="pill" href="#menu3">My Wallet <br/><br/></a>
            </li>
            <li className="nav-item me-0">
              <a className={`nav-link fs-4 custom-button-style rounded-0 font-custom px-5`} data-bs-toggle="pill" href="#menu4">Travel Confirmation</a>
            </li>
          </ul>
          </div>

          <div className="tab-content">
            <div className="tab-pane active" id="home">
              <CommuterLinkSuggestions />
            </div>
            <div className="tab-pane fade" id="menu1">
              <RequestsByMembers />
            </div>
            <div className="tab-pane fade" id="menu2">
              <TravelPatners />
            </div>
            <div className="tab-pane fade" id="menu3">
              <MyWallet />
            </div>
            <div className="tab-pane fade" id="menu4">
              {data !== "" ? (
                <></>
              ) : (
                <TravelConfirmation />
              )}
            </div>
          </div>


          {/* <CommuterLinkSuggestions />
          <TravelPatners />
          {data !== "" ? (
            <></>
          ) : (
            <TravelConfirmation />
          )} */}
        </>
      )}
    </>
  )
}

export default Dashboard12;