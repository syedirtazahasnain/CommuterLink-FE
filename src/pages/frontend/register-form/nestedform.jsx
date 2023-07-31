// import React from 'react'
// import Navbar from '../Hompage-components/Navbar';
// import Footer from "../Hompage-components/Footer";
// import mySlides1 from "../../../Images/signup.png";
// import mySlides2 from "../../../Images/signup-3.png";
// import mySlides3 from "../../../Images/signup-4.png";
// import mySlides4 from "../../../Images/signup-6.png";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import imgfacebook from "../../../Images/facebook.png";
// import imggoogle from "../../../Images/google.png";
// import imgtwitter from "../../../Images/twitter.png";
// import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

// const Nestedform = () => {

//     const Size = {
//         fonstSize: "14px",
//         marginBottom: "8px",
//         width: "350px",
//         margin: "auto",
//       };
//   return (
//     <div>
//         <div>
//         <Navbar />
        
//         <section
//           id="sign-up"
//           className="mt-5"
//           style={{ backgroundColor: "#eee" }}
//         >
//           <div className="container">
//             <div className="row">
//               <div
//                 className="col-md-6"
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   marginTop: "10vh",
//                 }}
//               >
//                 <div
//                   className="col-md-6"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginTop: "10vh",
//                   }}
//                 >
//                   <Carousel
//                     style={{
//                       backgroundColor: "#eee",
//                     }}
//                     className="carousel-container"
//                     prevIcon={null}
//                     nextIcon={null}
//                     indicators={null}
//                   >
//                     <Carousel.Item interval={2000}>
//                       <img
//                         className="Carousel_image img-fluid w-100"
//                         src={mySlides1}
//                         alt="First slide"
//                       />
//                     </Carousel.Item>

//                     <Carousel.Item interval={2000}>
//                       <img
//                         className="Carousel_image img-fluid w-100"
//                         src={mySlides2}
//                         alt="First slide"
//                       />
//                     </Carousel.Item>

//                     <Carousel.Item interval={2000}>
//                       <img
//                         className="Carousel_image img-fluid w-100"
//                         src={mySlides3}
//                         alt="First slide"
//                       />
//                     </Carousel.Item>
//                     <Carousel.Item interval={2000}>
//                       <img
//                         className="Carousel_image img-fluid w-100"
//                         src={mySlides4}
//                         alt="First slide"
//                       />
//                     </Carousel.Item>
//                   </Carousel>
//                 </div>
//               </div>

//               <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
//                 <Card
//                   sx={{
//                     marginTop: "10vh",
//                     maxWidth: "400px",
//                     marginLeft: "5px",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography
//                       sx={{ fontWeight: "bold" }}
//                       variant="h4"
//                       color="#198754"
//                     >
//                       We are sharing ride for:
//                     </Typography>
//                     <Typography sx={{ fontSize: "12px" }}>
                     
//                     </Typography>
//                     <Typography
//                       sx={{ fontWeight: "bold" }}
//                       variant="h5"
//                       color="#198754"
//                     >
//                       {/* Enter OTP */}
//                     </Typography>
                   
//                   </CardContent>
                 
//                   <CardActions className="row">
//                     <div className="col-12 text-end">
//                       {/* onClick={() => setModalShow(true)} */}

//                       <Button
//                         variant="outlined"
//                         type="submit"
//                         // onClick={validateOTP}
//                         className="btnregistration"
//                       >
//                         Next
//                       </Button>
//                     </div>
//                   </CardActions>
//                   <Typography sx={{ fontSize: "14px" }}>
//                     {" "}
                  
//                   </Typography>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </section>

        
        
//         <Footer />
//       </div>
//     </div>
//   )
// }

// export default Nestedform