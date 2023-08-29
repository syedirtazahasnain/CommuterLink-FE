import React, { useEffect, useState } from 'react'
import CommuterLinkSuggestions from './CommuterLinkSuggestions'
import RequestsByMembers from './RequestsByMembers'
import TravelPatners from './TravelPatners'
import TravelConfirmation from './TravelConfirmation'
import { setCurrentPage } from '../../../redux/generalSlice'
import { useDispatch, useSelector } from 'react-redux'


const Dashboard12 = () => {

  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [option, setOption] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage("dashboard"));
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
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
      }
      else {
        setOption("");
      }
      console.log("Dashboard Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      {option === 1 ?
        (
          <>
            <CommuterLinkSuggestions />
            <RequestsByMembers />
            <TravelPatners />
            <TravelConfirmation />
          </>
        )
        : 
        (
          <>
            <RequestsByMembers />
            <CommuterLinkSuggestions />
            <TravelPatners />
            <TravelConfirmation />
          </>
        )
      }
    </>
  )
}

export default Dashboard12;