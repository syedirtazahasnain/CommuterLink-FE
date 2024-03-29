import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BASE_URL } from "../../../constants";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "react";

const MyAccordion = () => {
  const [openCollapse, setOpenCollapse] = useState('#collapseOne');
  const navigate = useNavigate();
  const signupRoute = () => {
    navigate("/signup");

  };
  const handleScroll = () => {
    document.getElementById('footer').scrollIntoView();
  }
  const handleButtonClick = (target) => {
    setOpenCollapse(target);
  };

  const renderCollapseContent = () => {
    if (openCollapse === '#collapseOne') {
      return (
        <>
          {/* Content for collapseOne */}
          <img className='img-fluid w-100 p-3' src={`${BASE_URL}/assets/images/banner-big.jpg`} style={{ maxWidth: '750px', maxHeight: "400px" }} />
          <h5 className="text-dark fw-bold ps-3 mb-3">Choose between Using your Car or Ride with Others</h5>
          <p className="text-dark mb-3 ps-3 text-justified">CommutersLink simultaneously offers you partners, who are a suitable match to ride your car and at the same time matches you up with car owners with whom we think you can ride with. Both choices are made available at the same time</p>
        </>
      );
    } else if (openCollapse === '#collapseTwo') {
      return (
        <>
          <img className='img-fluid w-100 p-3' src={`${BASE_URL}/assets/images/longTermCommitment.jpg`} style={{ maxWidth: '750px', maxHeight: "400px" }} />
          <h5 className="text-dark fw-bold mb-3 ps-3"> Long Term Commitment</h5>
          <p className="text-dark mb-3 ps-3 text-justified">The commuting buddies would mostly belong to same neighbourhood and community. It’s a long term solution for cost effective commute to Work/Office or University/School and not a one-time drop off.</p>
          {/* <Link to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link> */}
        </>
      );
    } else if (openCollapse === '#collapseThree') {
      return (
        <>
          <img src={`${BASE_URL}/assets/images/costsharing.jpg`} className='img-fluid w-100 p-3' style={{ maxWidth: '750px', maxHeight: "400px" }} />
          <h5 className="text-dark fw-bold mb-3 ps-3">Share Cost of Commuting</h5>
          <p className="text-dark mb-3 ps-3 text-justified">CommutersLink aims to empower society to manage ever increasing cost of living and inflation by distributing the burden of commuting in a respectable manner</p>
        </>
      );
    }
    return null;
  };
  return (
    <div className="accordion-padding">
      {/* <div className="container">
        <h1 className="text-light text-center py-4 bg-col-3">
          Your Fuel-Saving Daily Commuting Solution!
        </h1>
      </div> */}
      <div id="costEarningSection">
        <div className="row g-0 bg-light-secondary ">
          {/* <div className="col-md-1">
          </div> */}
          <div className="col-md-6 d-flex p-5 justify-content-end">
            <div className="container">
              <h1 className="text-dark fw-bold mb-2">How CommutersLink is Different</h1>
              <h3 className="text-green mb-3">Cost Sharing & Saving</h3>
              <p className="text-dark fs-5">The basic difference between other carpooling
                apps and CommutersLink is that we are offering long term solutions for daily commute
                instead of onetime ride. The concept is to collectively
                defeat the impact of price hike by cost sharing. It’s not a source of earning but saving</p>

              <div className="row ">
                <div className="col-md-12  mb-1 text-center">
                  <button
                    type="button"
                    className={`btn btn-pink h-100 w-100 btn-secondary-light ${openCollapse === '#collapseOne' ? 'active' : ''
                      }`}
                    onClick={() => handleButtonClick('#collapseOne')}
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <i className="fas fs-1 fa-car-side mb-2"></i>
                      <h5 className="mb-1 text-center text-wrap">Use your Car or Ride with Others</h5>
                    </div>
                  </button>

                </div>

                {/* <div className="col-md-3"></div> */}
                <div className="col-md-12  mb-1 text-center">
                  <button
                    type="button"
                    className={`btn btn-orange h-100 w-100 btn-secondary-light ${openCollapse === '#collapseTwo' ? 'active' : ''
                      }`}
                    onClick={() => handleButtonClick('#collapseTwo')}
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <i className="fas fs-1 fa-stopwatch mb-2"></i>
                      <h5 className="mb-1 text-center text-wrap">Long Term Commitment</h5>
                    </div>
                  </button>

                </div>
                {/* <div className="col-md-3"></div> */}
                <div className="col-md-12  mb-2 text-center">
                <button
                    type="button"
                    className={`btn btn-purple h-100 w-100 btn-secondary-light ${openCollapse === '#collapseThree' ? 'active' : ''
                      }`}
                    onClick={() => handleButtonClick('#collapseThree')}
                  >
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <i className="fas fs-1 fa-money-bill-1-wave  mb-2"></i>
                        <h5 className="mb-1 ">Share Cost of
                          Commuting</h5>
                      </div>
                    </button>
                
                </div>
                {/* <div className="col-md-3"></div> */}
                {/* <div className="col-md-6 mb-3 text-center">
                    <a data-bs-toggle="collapse" href="#collapseFour" className="text-decoration-none">
                      <div class="card card-green h-100" >
                        <div class="card-body">
                          <i class="fa-solid fa-chart-simple fs-1 mb-3"></i>
                          <h3 class="card-subtitle mb-2 text-muted">Socioeconomic
                            Angle</h3>
                        </div>
                      </div>
                    </a>
                  </div> */}

              </div>
            </div>
          </div>
          <div className="col-md-1">
          </div>
          <div className="col-md-5 p-5 d-block justify-content-start mb-5">
            <div className=" collapse show fade" id="collapseOne" data-bs-parent="#costEarningSection">
            {renderCollapseContent()}
            </div>
            <div className="collapse fade" id="collapseTwo" data-bs-parent="#costEarningSection">
            {renderCollapseContent()}
            </div>
            <div className="collapse fade" id="collapseThree" data-bs-parent="#costEarningSection">
            {renderCollapseContent()}
              {/* <Link to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none ms-3">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link> */}
            </div>
            {/* <div className="collapse fade" id="collapseFour" data-bs-parent="#costEarningSection">
              <img src={`${BASE_URL}/assets/images/car-ride.png`} className='img-fluid w-100 p-3' />
              <h5 className="text-dark fw-bold mb-3">Socioeconomic Angle</h5>
              <p className="text-dark mb-3">Commuterslink has a socioeconomic welfare angle by reducing traffic, hazards, pollution, government spending on communication infrastructure and improving citizen mental health</p>
              <Link to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
            </div> */}
            <Link to="/Faq" className="text-green fw-bold fs-4 faq-text h-50 text-decoration-none ms-3">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
          </div>

        </div>
      </div>
      <div className="row g-0 bg-secondary-light" id="aboutSection">
        <div className="col-md-6 d-flex">
          <div className="container my-auto px-5">
            <h1 className="text-yellow mb-3">Earn through Sharing and Saving</h1>
            <p className="text-white fs-5 mb-5">Where Drivers Save and Earn, and Passengers Pay for Only Their Seat – A Win-Win Commuting Solution!"
              For drivers, CommutersLink is about saving money through sharing seats in their car. Passengers only pay for the seat they occupy, calculated based on car model, CC, distance to be traveled, fuel consumption, and a nominal maintenance fee for wear and tear. CommutersLink calculates all the costs for you
            </p>
            <button
              className="btn-custom1  border-0 px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={() => handleScroll()}>
              Download App
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <img src={`${BASE_URL}/assets/images/diagonal-picture.png`} className='img-fluid w-100' />
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
