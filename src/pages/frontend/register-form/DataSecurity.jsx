import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const DataSecurity = () => {

  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [contactId, setContactId] = useState("");
  const [price, setPrice] = useState("");
  const [option, setOption] = useState("");

  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100',
    height: '20vh'
    // Set the desired height of the background area
  };

  const route = () => {
    navigate("/verification");
  };


  // const handleButtonClick = () => {
  //   Swal.fire({

  //     html: `
  //     <div className="col-md-12  text-center" style="margin-top: 4vh; margin-bottom: 3vh;">
  //     <div className="container py-3">
  //     <div class="text-center "> <h3 class="card-title text-center  text-white">DATA SECURITY</h3></div>
  //     <div class="border-bottom m-auto border-white p-2 mb-4 w-50 "></div>
  //       <div>
  //         <img
  //           src="${BASE_URL}/assets/images/data_security_icon.png"
  //           alt="Sample photo"
  //           style="width: 150px; height: 150px; object-fit: cover; border-radius: 60%;"
  //         />
  //         <p class="text-white text-justify fs-6 p-2 px-5">
  //           CommutersLink has established strict security policies across our processes,
  //           systems, resources, and offices that ensure your data is 100% secure.
  //         </p>
  //       </div></div>
  //       <div class="text-center py-2 px-2  mb-4">
  //       <a href="">
  //         <button class="btnregistration px-3 fs-6 py-2">Next</button>
  //       </a>

  //     </div></div>
  //     `,

  //     showConfirmButton: false,
  //     background: 'rgb(22,70,57)',
  //   }
  //     ,

  //   );
  // };

  return (

    <div>
      <section id="sign-up" class="mt-5 main-bg">
        <div className="container">
          {" "}
          <div className="row">
            <div
              className="col-md-6 d-flex justify-content-center"
              style={{
                marginTop: "12vh"
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
                    src={`${BASE_URL}/assets/images/data_security_icon.png`}
                    alt="First slide"
                  />
                  <h4 className="text-success fw-bold text-center mt-2">Data is Encrypted</h4>
                </Carousel.Item>

                <Carousel.Item interval={40000000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/data_security_icon.png`}
                    alt="First slide"
                  />
                  <h4 className="text-success fw-bold text-center mt-4 mx-3">Data is Encrypted</h4>

                </Carousel.Item>
                <Carousel.Item interval={400000000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/data_security_icon.png`}
                    alt="First slide"
                  />
                  <h4 className="text-success fw-bold text-center mt-4 mx-3"></h4>

                </Carousel.Item>
                {/* <Carousel.Item interval={400000000}>
                  <img
                    className="d-block img-fluid w-auto"
                    src={`${BASE_URL}/assets/images/data_security_icon.png`}
                    alt="First slide"
                  />
                  <h4 className="text-success fw-bold text-center mt-2">Share Ride For Office</h4>

                </Carousel.Item> */}
              </Carousel>
              {/* </div> */}
            </div>
            <div className="col-md-6 pt-5" style={{ marginTop: "6vh", marginBottom: "9vh" }}>
              <div
                className="container py-3"
              >
                <div className="card p-3 bg-white border border-2 shadow"><div className="mt-3" >
                  <div
                    className="text-center"
                  // style={{ background: "rgb(22,70,57)" }}
                  >
                    <div>
                      <div>
                        {" "}
                        {/* <img
                          src={`${BASE_URL}/assets/images/data_security_icon.png`}
                          alt="Sample photo"
                          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                        /> */}
                        <h3 className="card-title py-1 text-center fw-bold text-success" >
                          DATA SECURITY
                        </h3>
                        <div className="border-bottom m-auto border-success p-1 w-50 "></div>
                      </div>
                    </div>
                    <div className="text-white p-4 ">
                      <p className="text-black text-justify px-4 fs-5 ">
                        CommutersLink has established strict security policies across our processes,
                        systems, resources and offices that ensure your data is 100% secure.
                      </p>
                    </div>


                    <div className="mb-5">
                      <Button className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                        onClick={route}
                      >
                        Next
                      </Button>
                    </div>

                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 pt-5" style={{marginTop: "6vh", marginBottom: "9vh"}}>
            <div>
                      <div>
                        {" "}
                        <img
                          src={`${BASE_URL}/assets/images/signup-5.png`}
                          alt="Sample photo"
                          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                        />
                      </div>
                    </div>
                    <div className="text-white py-4">
                      <p className="text-white text-justify">
                        According to the information you provided regarding your car and route the system has calculated
                        your per seat per day cost is <strong>Rs.{price}/</strong> on const sharing basis.
                      </p>
                    </div>
                    <div className="text-white">
                      <p className="text-white text-justify">
                        The cost will be adjusted fortnightly according to changes in fuel prices.
                      </p>
                    </div>
                    <form id="numberForm">
                      <div className="mb-3">
                        <Button variant="success" className="btn-custom mx-2 text-white bg-success px-4 py-2 rounded rounded-5 text-custom fw-bold" onClick={onSubmit}>
                          Okay
                        </Button>
                      </div>
                    </form>
              </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataSecurity;