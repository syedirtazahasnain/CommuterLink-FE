import React, { useEffect, useState } from 'react'
import CommuterLinkSuggestions from './CommuterLinkSuggestions'
// import RequestsByMembers from './RequestsByMembers'
import TravelPatners from './TravelPatners'
import TravelConfirmation from './TravelConfirmation'
import { setCurrentPage } from '../../../redux/generalSlice'
import { useDispatch } from 'react-redux'


const Dashboard12 = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage("dashboard"));
  }, []);

  return (
    <>
      <CommuterLinkSuggestions />
      {/* <RequestsByMembers /> */}
      <TravelPatners />
      <TravelConfirmation />
    </>
  )
}

export default Dashboard12;