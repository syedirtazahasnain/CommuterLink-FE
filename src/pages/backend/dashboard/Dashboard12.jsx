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
          {/* <div className="alert alert-danger alert-dismissible fade show overflow-hidden" role="alert">
            <strong>Dear [Name of Traveler],<br/></strong>We would like to inform you that your termination of agreement, which was initiated on [Date], is currently in the process of being handled. A notification has been sent to your travel partner [Name of Car Offeror] and the travel agreement will be canceled on [Date].
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Dear [Name of Car Offeror],</strong><br/>We would like to inform you that your termination notification, which was initiated on [Date], is currently in the process of being handled. We are notifying all travel partners regarding this matter. According to this notification, the travel agreement will be canceled on [Date].
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div> */}
          <CommuterLinkSuggestions />
          {/* <RequestsByMembers /> */}
          <TravelPatners />
          {data !== "" ? (
            <></>
          ) : (
            <TravelConfirmation />
          )}
        </>
      )}
    </>
  )
}

export default Dashboard12;