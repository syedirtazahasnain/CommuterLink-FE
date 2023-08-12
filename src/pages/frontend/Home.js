import React from "react";
import Navbar from './Hompage-components/Navbar';
import CarouselSlider from "./Hompage-components/Carousel";
import MyAccordion from "./Hompage-components/MyAccordion";
import ShareRideCards from "./Hompage-components/ShareRideCards";
import Register from "./Hompage-components/Register";
import HowWorks from "./Hompage-components/HowWorks";
import Contribute from "./Hompage-components/Contribute";
import Contact from "./Hompage-components/Contact";
import Footer from "./Hompage-components/Footer";
import Signup from './Signup/Signup';
import Registration from "./register-form/Registration";
import AddressCards from "./Hompage-components/AddressCards";
import Otp from './register-form/OtpPage'
import WouldYouLikeTo from './register-form/WouldYouLikeTo';
import Driver from './register-form/Driver';
import NumberGenerate from "./register-form/NumberGenerate";
import Dashboard from './Dashboard/Dashboard';
import HeaderDashboard from "./Dashboard/HeaderDashboard";
import Terms_Condition from "./Dashboard/Terms_Condition";
import ReplyToConfirmDates from "./Dashboard/ReplyToConfirmDates";
import WhyProcessPayment from "./Dashboard/WhyProcessPayment";
import SendApprovalForPartner from './Dashboard/SendApprovalForPartner';
import CommuterProfile from './Dashboard/CommuterProfile';
import ShareRide from "./register-form/ShareRide";
import Verification from "./Dashboard/Verification";
import Login from "./login/Login";
import SeatCostVerification from "./register-form/SeatCostVerification";
// import NewDashboard from "../backend/dashboard/Dashboard";
export default function () {
  return (
    <div>
      <Navbar />
      <CarouselSlider />
      <MyAccordion />
      <ShareRideCards />
      <Register />
      <HowWorks />
      <Contribute />
      <Contact />
      <AddressCards />
      <Footer /> 
      {/* <Signup/> */}
             {/* <Login /> */}
      {/* <Registration/> */}
      {/* <Otp/> */}
      {/* <Faq/> */}
      {/* <Nestedform/> */}
      {/* <Office/> */}
      {/* <Driver/> */}
      {/* <NumberGenerate/> */}
      {/* <Dashboard/> */}
   {/* <Terms_Condition/> */}
   {/* <ReplyToConfirmDates/> */}
   {/* <WhyProcessPayment/> */}
   {/* <SendApprovalForPartner/> */}
   {/* <CommuterProfile/> */}

   {/* Hassan Components */}
      {/* <ShareRide/> */}
   {/* <Verification/> */}
   {/* <WouldYouLikeTo/> */}
 {/* <Slider/> */}
 {/* <SeatCostVerification /> */}
 {/* <NewDashboard/> */}
    
    </div>
  );
}
