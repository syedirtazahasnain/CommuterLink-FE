import React from "react";import CarouselSlider from "./Hompage-components/Carousel";
import MyAccordion from "./Hompage-components/MyAccordion";
import ShareRideCards from "./Hompage-components/ShareRideCards";
import Register from "./Hompage-components/Register";
import HowWorks from "./Hompage-components/HowWorks";
import Contribute from "./Hompage-components/Contribute";
import Contact from "./Hompage-components/Contact";
import AddressCards from "./Hompage-components/AddressCards";
// import NewDashboard from "../backend/dashboard/Dashboard";
export default function Home() {
  return (
    <div>
      <CarouselSlider />
      <MyAccordion />
      <ShareRideCards />
      <Register />
      <HowWorks />
      <Contribute />
      <Contact />
      <AddressCards />
    </div>
  );
}
