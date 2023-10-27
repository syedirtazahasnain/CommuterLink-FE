import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { CardGroup } from "react-bootstrap";
import Navbar from './Navbar';
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants";

function HowWorks() {
  return (
    <div id="howworks" className="bg-light-secondary">
      <section id="working">
        <div className="section-title text-center">
          <h1 className="heading-color text-black">How It Works?</h1>
          <h3 className="fs-4">
            It’s a long term commitment between the car owner
            and travel buddies for ride sharing and not a one-time drop-off
          </h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <CardGroup className="mt-3">
              <div className="col-md-6 col-lg-3 mb-3" >
                <div className="ratio ratio-1x1">
                  <Card className="p-0 rounded-circle d-flex card-orange1">
                    <CardContent className="m-auto text-center px-5 py-3">
                      <CardMedia
                        className="media mt-10vh mx-auto mb-1"
                        component="img"
                        sx={{ width: 40 }}
                        image="https://www.commuterslink.com/front_assets/img/icons/signup-01.png"
                        alt="green iguana"
                      />
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                        <p className="fs-4 fw-bold text-dark">Sign Up &amp; Match</p>{" "}
                      </Typography>
                      <Typography className="Typography1 fs-6" variant="body2" color="text.dark">
                        CommutersLink provides personalized carpooling matches based on your gender, 
                        location, starting point, schedule, and destination. You have the flexibility 
                        to choose the best match for sharing rides.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3" >
                <div className="ratio ratio-1x1">
                  <Card className="p-0 rounded-circle d-flex card-pink1">
                    <CardContent className="m-auto text-center px-5 py-3">
                      <CardMedia
                        className="media mt-10vh mx-auto mb-1"
                        component="img"
                        sx={{ width: 40 }}
                        image="https://www.commuterslink.com/front_assets/img/icons/connect.png"
                        alt="green iguana"
                      />
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                        <p className="fs-4 fw-bold text-dark">Connect</p>{" "}
                      </Typography>
                      <Typography className="Typography1 fs-6" variant="body2" color="text.dark">
                      Members connect and coordinate rides through their personal dashboard. Once both 
                      parties agree, they formalize the ride-sharing arrangement with clear terms and conditions,
                       ensuring transparency and security.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3" >
                <div className="ratio ratio-1x1">
                  <Card className="p-0 rounded-circle d-flex card-green1">
                    <CardContent className="m-auto text-center px-5 py-3">
                      <CardMedia
                        className="media mt-10vh mx-auto mb-1"
                        component="img"
                        sx={{ width: 40 }}
                        image="https://www.commuterslink.com/front_assets/img/icons/fuel-pump-01.png"
                        alt="green iguana"
                      />
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                        <p className="fs-4 fw-bold text-dark">Share Cost</p>{" "}
                      </Typography>
                      <Typography className="Typography1 fs-6" variant="body2" color="text.dark">
                      The system computes the "cost per seat" considering car type, distance, maintenance, 
                      and wear and tear. This cost is shared with car owners and travel buddies.
                       We regularly update it based on fuel prices, ensuring fairness for everyone.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-3" >
                <div className="ratio ratio-1x1">
                  <Card className="p-0 rounded-circle d-flex card-purple1">
                    <CardContent className="m-auto text-center px-5 py-3">
                      <CardMedia
                        className="media mx-auto mb-1"
                        component="img"
                        sx={{ width: 30 }}
                        image="https://www.commuterslink.com/front_assets/img/icons/pay-01.png"
                        alt="green iguana"
                      />
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                        <p className="fs-4 fw-bold text-dark">Pay</p>{" "}
                      </Typography>
                      <Typography className="Typography1 fs-6" variant="body2" color="text.dark">
                      Payment is generated daily for car owners based on actual travel days 
                      (excluding public and school holidays). Travel buddies pay one month in advance, 
                      and any unused balance is carried over to the following month.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardGroup>
            <section id="working" >
              <div>
                <img className="car-animate" src={`${BASE_URL}/assets/images/animate-car.png`} width="100px" height="50px" alt="logoimg" />
              </div>
              <img src={`${BASE_URL}/assets/images/black-white.png`} className='img-fluid w-100 ' />
            </section>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HowWorks;
