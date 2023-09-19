import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BASE_URL } from "../../../constants";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MyAccordion = () => {

  const navigate = useNavigate();
  const signupRoute = () => {
    navigate("/signup");

  };
  return (
    <div>
      <div className="row g-0 bg-secondary-light" id="aboutSection">
        <div className="col-md-6 d-flex">
          <div className="container my-auto px-5">
            <h1 className="text-white fw-bold mb-3">About</h1>
            <h3 className="text-yellow mb-3">Let’s Combat High Fuel Prices and Daily Commuting Costs by Sharing</h3>
            <p className="text-white fs-5 mb-5">Say goodbye to your commuting woes with CommutersLink, a revolutionary app developed by SysReforms International (www.sysreforms.com) which is a game-changer for Pakistani people, suffereing from inflation, high feul costs and lack of public transport facities for daily commute to offices and educational institutions.
            </p>
            <button
              className="btn-custom1  border-0 px-4 py-2 rounded rounded-2 text-white fw-bold">
              Download App
            </button>
          </div>
        </div>
        <div className="col-md-6  p-5">
          <img src={`${BASE_URL}/assets/images/diagonal-picture.png`} className='img-fluid w-100' />
        </div>
      </div>
      <div  id="costEarningSection">
        <div className="row g-0 bg-light-secondary">
          <div className="col-md-6 d-flex p-5">
            <div className="container">
              <h3 className="text-dark fw-bold mb-2">It's Not About Earning but </h3>
              <h1 className="text-green mb-3">Cost Sharing & Saving</h1>
              <p className="text-dark fs-5 mb-5">The basic difference between other carpooling
                apps and CommutersLink is that we are offering long term solutions for daily commute
                instead of onetime ride. The concept is to collectively
                defeat the impact of price hike by cost sharing. It’s not a source of earning but saving</p>
              <div className="row">
                <div className="col-md-6 mb-3 text-center">
                  <a data-bs-toggle="collapse" href="#collapseOne" className="text-decoration-none">
                    <div class="card card-pink h-100">
                      <div class="card-body">
                        <i class="fa-solid fa-money-bill-1-wave mb-3 fs-1"></i>
                        <h3 class="card-subtitle mb-2 text-muted">Share Cost of
                          Commuting</h3>
                      </div>
                    </div>
                  </a>
                </div>
                {/* <div className="col-md-3"></div> */}
                <div className="col-md-6 mb-3 text-center">
                  <a data-bs-toggle="collapse" href="#collapseTwo" className="text-decoration-none">
                    <div class="card card-orange h-100" >
                      <div class="card-body">
                        <i class="fa-solid fa-stopwatch fs-1 mb-3"></i>
                        <h3 class="card-subtitle mb-2 text-muted">Long Term Commitment</h3>
                      </div>
                    </div>
                  </a>
                </div>
                {/* <div className="col-md-3"></div> */}
                <div className="col-md-6 mb-3 text-center">
                  <a data-bs-toggle="collapse" href="#collapseThree" className="text-decoration-none">
                    <div class="card card-purple h-100">
                      <div class="card-body">
                        <i class="fa-solid fa-chart-simple fs-1 mb-3"></i>
                        <h3 class="card-subtitle mb-2 text-muted">Socioeconomic
                          Angle</h3>
                      </div>
                    </div>
                  </a>
                </div>
                {/* <div className="col-md-3"></div> */}
                <div className="col-md-6 mb-3 text-center">
                  <a data-bs-toggle="collapse" href="#collapseFour" className="text-decoration-none">
                    <div class="card card-green h-100" >
                      <div class="card-body">
                        <i class="fa-solid fs-1 fa-car-side mb-3"></i>
                        <h3 class="card-subtitle mb-2 text-muted">Use
                          your Car or Ride with
                          Others</h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-5 mb-5">
            <div className=" collapse show fade" id="collapseOne" data-bs-parent="#costEarningSection">
              <img src={`${BASE_URL}/assets/images/car-ride.png`} className='img-fluid w-100 p-3' />
              <h5 className="text-dark fw-bold mb-3">Choose between Using your  Car or Ride with
                Others One</h5>
              <p className="text-dark mb-3">CommutersLink simultaneously offers you partners, who are a suitable match to ride your car and at the same time matches you up with car owners with whom we think you can ride with. Both choices are made available at the same time</p>
              <Link  to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
            </div>
            <div className="collapse fade" id="collapseTwo" data-bs-parent="#costEarningSection">
              <img src={`${BASE_URL}/assets/images/contribute-2.jpg`} className='img-fluid w-100 p-3' />
              <h5 className="text-dark fw-bold mb-3">Choose between Using your  Car or Ride with
                Others Two</h5>
              <p className="text-dark mb-3">CommutersLink simultaneously offers you partners, who are a suitable match to ride your car and at the same time matches you up with car owners with whom we think you can ride with. Both choices are made available at the same time</p>
              <Link  to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
            </div>
            <div className="collapse fade" id="collapseThree" data-bs-parent="#costEarningSection">
              <img src={`${BASE_URL}/assets/images/car-ride.png`} className='img-fluid w-100 p-3' />
              <h5 className="text-dark fw-bold mb-3">Choose between Using your  Car or Ride with
                Others Three</h5>
              <p className="text-dark mb-3">CommutersLink simultaneously offers you partners, who are a suitable match to ride your car and at the same time matches you up with car owners with whom we think you can ride with. Both choices are made available at the same time</p>
              <Link  to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
            </div>
            <div className="collapse fade" id="collapseFour" data-bs-parent="#costEarningSection">
              <img src={`${BASE_URL}/assets/images/contribute-2.jpg`} className='img-fluid w-100 p-3' />
              <h5 className="text-dark fw-bold mb-3">Choose between Using your  Car or Ride with
                Others Four</h5>
              <p className="text-dark mb-3">CommutersLink simultaneously offers you partners, who are a suitable match to ride your car and at the same time matches you up with car owners with whom we think you can ride with. Both choices are made available at the same time</p>
              <Link  to="/Faq" className="text-green fw-bold fs-4 faq-text text-decoration-none">To Learn More Please Visit FAQs <i class="fa-solid fa-arrow-right-long fs-4"></i>  </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
