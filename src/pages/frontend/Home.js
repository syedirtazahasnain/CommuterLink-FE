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


// import React, {Suspense} from "react";
// import CarouselSlider from "./Hompage-components/Carousel";
// import MyAccordion from "./Hompage-components/MyAccordion";
// import ShareRideCards from "./Hompage-components/ShareRideCards";
// import Register from "./Hompage-components/Register";
// import HowWorks from "./Hompage-components/HowWorks";
// import Contribute from "./Hompage-components/Contribute";
// import Contact from "./Hompage-components/Contact";
// import NewBanner from "./Hompage-components/NewBanner";
// import BePartOfCL from "./Hompage-components/BePartOfCL";

// const LazyMyAccordion = React.lazy(()=>import("./Hompage-components/MyAccordion"));
// const LazyShareRideCards = React.lazy(()=>import("./Hompage-components/ShareRideCards"));
// const LazyRegister = React.lazy(()=>import("./Hompage-components/Register"));
// const LazyHowWorks = React.lazy(()=>import("./Hompage-components/HowWorks"));
// const LazyContribute = React.lazy(()=>import("./Hompage-components/Contribute"));
// const LazyContact = React.lazy(()=>import("./Hompage-components/NewBanner"));
// const LazyNewBanner = React.lazy(()=>import("./Hompage-components/MyAccordion"));
// const LazyBePartOfCL = React.lazy(()=>import("./Hompage-components/BePartOfCL"));
// export default function Home() {
//   return (
//     <>
//       {/* <CarouselSlider /> */}
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}><LazyNewBanner /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}><LazyMyAccordion /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}><LazyBePartOfCL /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}><LazyShareRideCards /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}><LazyRegister /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}> <LazyHowWorks /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}>  <LazyContribute /></Suspense>
//       <Suspense fallback={<div><h5>Loading.....</h5></div>}> <LazyContact /></Suspense>
//     </>
//   );
// }
