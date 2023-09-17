import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { resetsignupState } from "../../../redux/signupSlice";
import { resetloginState } from "../../../redux/loginSlice";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifiedMember = () => {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  const [verificationName, setVerificationName] = useState("");
  const [image, setImage] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");

  const route = () => {
    dispatch(resetsignupState());
    dispatch(resetloginState());
    window.location.href = "/";
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
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
        setVerificationName(jsonresponse[0].name);
        setVerificationEmail(jsonresponse[0].email);
        setImage(jsonresponse[0].contact.commuter_image);
      }
      else {
        setVerificationName("");
        setVerificationEmail("");
        setImage("");
      }
      console.log("Verification Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100',
    height: '20vh'
    // Set the desired height of the background area
  };

    // Swal.fire({
    //   html: (
    //     <div className="col-md-5 ml-5 text-right" style={{ marginTop: "6vh", marginBottom: "9vh" }}>
    //       <div className="container py-3">
    //         <div className="card p-2 bg-white">
    //           <div className="mt-3">
    //             <div className="text-center">
    //               {" "}
    //               <img
    //                 src={image ? `${IMAGE_URL}${image}` : `${BASE_URL}/assets/images/CL-logo-small.png`}
    //                 alt="photo"
    //                 style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
    //               />
    //             </div>
    //             <div className="text-dark text-center mt-2">{name ? name : verificationName}<br />{email ? email : verificationEmail}</div>
    //             <h3 className="card-title mt-4 mb-1 text-center text-success" >
    //               CONGRATULATIONS!
    //             </h3>
    //           </div>
    //           <div>
    //             <p className="text-dark text-justify fs-5 p-2 px-5">
    //               You are Now a Verified Member and have Access to Members that Match Your Profile.
    //             </p>
    //           </div>
    //           <div className="text-center mb-4">
    //             <img
    //               src={`${BASE_URL}/assets/images/Verified_member_icon.png`}
    //               alt="Sample photo"
    //               style={{ height: '100px' }}
    //             />
    //           </div>
    //           <div className="text-center mb-4">
    //             <Link to={"/dashboard"} >
    //               <button className="btnregistration px-3 fs-6 py-2">
    //                 My Dashboard
    //               </button>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ),
     
    // });
    
    function showCustomAlert() {
      Swal.fire({
        html: `
          <div className="col-md-5 ml-5 text-right" style="margin-top: 4vh; margin-bottom: 3vh;">
            <div className="container py-2">
              <div>
                <div >
                  <div class="text-center">
                    <img src="${image ? `${IMAGE_URL}${image}` : `${BASE_URL}/assets/images/CL-logo-small.png`}" alt="photo" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%;" />
                  </div>
                  <div class="text-white text-center mt-2">${name ? name : verificationName}<div >${email ? email : verificationEmail}</div></div>
                 <div class="border-bottom m-auto border-white p-2 w-50 "></div>
                  <h3 class="card-title mt-4 mb-1 text-center text-white">CONGRATULATIONS!</h3>
                </div>
                <div>
                  <p class="text-white text-justify fs-6 p-2 px-5">
                    You are Now a Verified Member and have Access to Members that Match Your Profile.
                  </p>
                </div>
                <div class="text-center mb-4">
                  <img src="${BASE_URL}/assets/images/Verified_member_icon.png" alt="Sample photo" style="height: 100px;" />
                </div>
                <div class="text-center py-2 px-2  mb-4">
                  <a href="/dashboard">
                    <button class="btnregistration px-3 fs-6 py-2">Close</button>
                  </a>
                
                </div>
              </div>
            </div>
          </div>
        `,
        background: 'rgb(22,70,57)',
        showConfirmButton: false, // Hide the default OK button
      });
    }
   
  
  return (

    <div>
      <section id="sign-up" class="mt-5 main-bg">
        <div className="container">
          {" "}
          <div className="row">
            <div
              className="col-md-6 d-flex fixed"
              style={{
                marginTop: "10vh"
              }}
            >

              <Carousel
                className="carousel-container main-bg"
                prevIcon={null}
                nextIcon={null}
                indicators={null}
              >
                <Carousel.Item interval={4000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/signup.png`}
                    alt="First slide"
                  />
                   <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                </Carousel.Item>

                <Carousel.Item interval={4000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/signup-3.png`}
                    alt="First slide"
                  />
                  <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>

                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/signup-4.png`}
                    alt="First slide"
                  />
                 <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>

                </Carousel.Item>
                <Carousel.Item interval={4000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/signup-6.png`}
                    alt="First slide"
                  />
                 <h4 className="text-success fw-bold text-center mt-2">Share Ride For Office</h4>

                </Carousel.Item>
              </Carousel>
              {/* </div> */}
            </div>


            <div className="col-md-5 ml-5 text-right" style={{marginTop: "6vh", marginBottom: "9vh"}}>
              <div className="container py-3">
                <div className="card p-2 bg-white" >
                <div className="mt-3">
                          <div className="text-center">
                            {" "}
                            <img
                              src={image?`${IMAGE_URL}${image}`: `${BASE_URL}/assets/images/CL-logo-small.png` }
                              alt="photo"
                              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                          </div>
                          <div className="text-dark text-center mt-2">{name ? name : verificationName}<br />{email ? email : verificationEmail}</div>
                         
                          <h3 className="card-title  text-center fw-bold text-success" >
                            CONGRATULATIONS!
                          </h3>
                          <div className="border-bottom m-auto  border-success p-2 w-75 "></div>
                        </div>
                        <div>
                          <p className="text-dark text-justify fs-5 p-2 px-5">
                          You are Now a Verified Member and have Access to Members that 
                          Match Your Profile.
                          </p>
                        </div>
                        <div className="text-center mb-4">     
                        <img
                          src={`${BASE_URL}/assets/images/Verified_member_icon.png`}
                          alt="Sample photo"
                          style={{  height: '100px', }}
                        /></div>
                   
                        <div className="text-center mb-4">
                        <Link to={"/dashboard"} >

              <button className="btnregistration px-3 fs-6 py-2">
                My Dashboard
              </button>
            </Link>
            {/* <div className="mb-5">
                        <button  className="btnregistration px-4 fs-6 py-2" onClick={showCustomAlert}>
                          Next
                        </button>
                      </div> */}
                    </div>
                       


                  </div>
                </div>
              </div>
           
            </div>
          </div>
      </section>
    </div>
  );
};

export default VerifiedMember;