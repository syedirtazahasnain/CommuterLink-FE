import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardGroup } from "react-bootstrap";
import Navbar from './Navbar';
import Footer from "./Footer";
function HowWorks() {
  return (
    <div>
{/* <Navbar/> */}
      <section id="working" className="my-1">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="heading-color text-black">How It Works?</h2>
            <span>
              It’s a long term commitment between the car owner and travel
              buddies for ride sharing and not a one-time drop-off
            </span>
          </div>
          <div className="row">
            {/* <div
              class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div class="card" id="work-card">
                <div class="card-icon">
                  <img
                    src="https://www.commuterslink.com/front_assets/img/icons/signup-01.png"
                    style="padding-bottom: 12px"
                  />
                </div>
                <div class="card-body">
                  <h4 class="heading"><a href="">Sign Up &amp; Match</a></h4>
                  <p class="description">
                    CommutersLink, based upon your gender, area of residence,
                    start point (usually home address), start timings,
                    destination (office/school/university) and return time,
                    offers you various matches. These matches will include
                    individuals whose car you can share and at the same time
                    those who can share your car. You make the final choice that
                    you consider suitable
                  </p>
                </div>
              </div>
            </div> */}

            {/* <div
              class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            >
              <div class="card" id="work-card">
                <div class="card-icon">
                  <img
                    src="https://www.commuterslink.com/front_assets/img/icons/connect.png"
                    style="padding-bottom: 20px"
                  />
                </div>
                <div class="card-body">
                  <h4 class="heading"><a href="">
                    Connect</a></h4>
                  <p class="description">
                    You connect with matches offered through your personal dashboard in the system. And if both members find each other suitable then they give formal consent to share the ride and the cost. There are terms and conditions both for the member whose car is being used and the one sharing someone else’s car. This ensures transparency and security.
                  </p>
                </div>
              </div>
            </div> */}

            {/* <div
              class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            >
              <div class="card" id="work-card">
                <div class="card-icon">
                  <img
                    src="https://www.commuterslink.com/front_assets/img/icons/fuel-pump-01.png"
                    style="padding-bottom: 12px"
                  />
                </div>
                <div class="card-body">
                  <h4 class="heading"><a href="">Share Cost</a></h4>
                  <p class="description">
                    System calculates “cost per seat” considering type of car, distance (average fuel consumption) and offers this system generated cost to car owners and travel buddies. We review the cost on monthly basis depending upon fuel prices and inform both stake holders. The cost calculator also takes care of maintenance cost and wear and tear.
                  </p>
                </div>
              </div>
            </div> */}

            {/* <div
              class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            >
              <div class="card" id="work-card">
                <div class="card-icon">
                  <img
                    src="https://www.commuterslink.com/front_assets/img/icons/pay-01.png"
                    style="padding-bottom: 16px"
                  />
                </div>
                <div class="card-body">
                  <h4 class="heading"><a href="">Pay
                  </a></h4>
                  <p class="description">
                    Payment is also system generated and reimbursed to the car owner on daily basis. You only pay for the number of days travelled (public holidays and school holidays exempted). Travel buddies pay one month in advance which is credited to their Wallet. Any remaining amount after daily payments are carried forward to next month.
                  </p>
                </div>
              </div>
            </div> */}
            <CardGroup className="mt-3">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3 mb-lg-0">
                <Card sx={{ maxWidth: 345 }} id="work-card">
                  <CardActionArea>
                    <CardMedia
                      className="media mt-10vh ml-3"
                      component="img"
                      sx={{ width: 60, marginTop: "10vh" }}
                      image="https://www.commuterslink.com/front_assets/img/icons/signup-01.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                          <a href="">Sign Up &amp; Match</a>{" "}
                      </Typography>
                      <Typography className="Typography1" variant="body2" color="text.secondary">
                          CommutersLink, based upon your gender, area of
                          residence, start point (usually home address), start
                          timings, destination (office/school/university) and
                          return time, offers you various matches. These matches
                          will include individuals whose car you can share and
                          at the same time those who can share your car. You
                          make the final choice that you consider suitable
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3 mb-lg-0">
                <Card sx={{ maxWidth: 345 }} id="work-card">
                  <CardActionArea>
                    <CardMedia
                      className="media mt-10vh ml-3"
                      component="img"
                      sx={{ width: 60, marginTop: "10vh" }}
                      image="https://www.commuterslink.com/front_assets/img/icons/connect.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                          <a href="">Connect</a>{" "}
                      </Typography>
                      <Typography className="Typography1" variant="body2" color="text.secondary">
                          You connect with matches offered through your personal
                          dashboard in the system. And if both members find each
                          other suitable then they give formal consent to share
                          the ride and the cost. There are terms and conditions
                          both for the member whose car is being used and the
                          one sharing someone else’s car. This ensures
                          transparency and security.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3 mb-lg-0">
                <Card sx={{ maxWidth: 345 }} id="work-card">
                  <CardActionArea>
                    <CardMedia
                      className="media mt-10vh ml-3"
                      component="img"
                      sx={{ width: 60, marginTop: "10vh" }}
                      image="https://www.commuterslink.com/front_assets/img/icons/fuel-pump-01.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                          <a href="">Share Cost</a>
                      </Typography>
                      <Typography className="Typography1" variant="body2" color="text.secondary">
                          System calculates “cost per seat” considering type of
                          car, distance (average fuel consumption) and offers
                          this system generated cost to car owners and travel
                          buddies. We review the cost on monthly basis depending
                          upon fuel prices and inform both stake holders. The
                          cost calculator also takes care of maintenance cost
                          and wear and tear.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-3 mb-lg-0">
                <Card sx={{ maxWidth: 345 }} id="work-card">
                  <CardActionArea>
                    <CardMedia
                      className="media mt-10vh ml-3"
                      component="img"
                      sx={{ width: 50, height: 80, marginTop: "8vh" }}
                      image="https://www.commuterslink.com/front_assets/img/icons/pay-01.png"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography className="heading" gutterBottom variant="h5" component="div">
                          
                          <a href="">Pay</a>
                      </Typography>
                      <Typography className="Typography1" variant="body2" color="text.secondary">
                          Payment is also system generated and reimbursed to the
                          car owner on daily basis. You only pay for the number
                          of days travelled (public holidays and school holidays
                          exempted). Travel buddies pay one month in advance
                          which is credited to their Wallet. Any remaining
                          amount after daily payments are carried forward to
                          next month.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </CardGroup>
            <section id="working" className="my-0">
              <div className="container">
                <div className="section-title text-center">
                  
                    
                    <a className="heading" style={{color:'#198754'}} href="faq1.html">To Learn More Please Visit FAQs</a>
                  
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
   
    </div>
  );
}

export default HowWorks;
