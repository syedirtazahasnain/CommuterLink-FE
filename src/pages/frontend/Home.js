import React from 'react'
import Navbar from './Hompage-components/Navbar';
import CarouselSlider from './Hompage-components/Carousel'
import MyAccordion from './Hompage-components/MyAccordion';
import ShareRideCards from './Hompage-components/ShareRideCards';
import Register from './Hompage-components/Register';
import HowWorks from './Hompage-components/HowWorks';
import Contribute from './Contribute';
import Contact from './Hompage-components/Contact';
import Footer from './Hompage-components/Footer';
// import Signup from './Hompage-components/Signup';
// import Login from './Hompage-components/Login';
import Registration from './Hompage-components/Registration ';
import AddressCards from './Hompage-components/AddressCards';
export default function () {
  return (
    <div>
        <Navbar />
        <CarouselSlider />
        <MyAccordion />
        <ShareRideCards/>
        <Register/>
        <HowWorks/>
        <Contribute/>
        <Contact/>
        <AddressCards />
        <Footer/>
      {/* <Signup/>
             <Login/> */}
             {/* <Registration/> */}
             </div>

 
  
  )
}
