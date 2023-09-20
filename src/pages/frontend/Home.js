import React from "react";
import CarouselSlider from "./Hompage-components/Carousel";
import MyAccordion from "./Hompage-components/MyAccordion";
import ShareRideCards from "./Hompage-components/ShareRideCards";
import Register from "./Hompage-components/Register";
import HowWorks from "./Hompage-components/HowWorks";
import Contribute from "./Hompage-components/Contribute";
import Contact from "./Hompage-components/Contact";
import NewBanner from "./Hompage-components/NewBanner";
import BePartOfCL from "./Hompage-components/BePartOfCL";

export default function Home() {
  return (
    <>
      {/* <CarouselSlider /> */}
      <NewBanner />
      <MyAccordion />
      <BePartOfCL />
      <ShareRideCards />
      <Register />
      <HowWorks />
      <Contribute />
      <Contact />
    </>
  );
}
