import React, { useEffect, useState } from 'react'
import CommuterLinkSuggestions from './CommuterLinkSuggestions'
// import RequestsByMembers from './RequestsByMembers'
import TravelPatners from './TravelPatners'
import TravelConfirmation from './TravelConfirmation'
import { setCurrentPage } from '../../../redux/generalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { API_URL } from '../../../constants'


const Dashboard12 = () => {

  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [data, setData] = useState("");

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
        Swal.fire({
          position: 'top',
          // icon: 'error',
          text: `${jsonresponse.message}`,
          customClass: {
            confirmButton: "bg-success", // Apply custom CSS class to the OK button
          },
        });
      }
      console.log("Dashboard Travel Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage("dashboard"));
  }, []);

  return (
    <>
      <CommuterLinkSuggestions />
      {/* <RequestsByMembers /> */}
      <TravelPatners />
      {data !== "" ?
        (
          <></>
        )
        :
        (
          <TravelConfirmation />
        )
      }
    </>
  )
}

export default Dashboard12;