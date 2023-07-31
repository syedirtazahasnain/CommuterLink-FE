import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import imgsignup3 from '../../../Images/signup-3.png'
import React from "react";

const MyAccordion = () => {
  return (
    <div >
      <div className="container">
        <div className="section-title text-center py-2">
          <h2 className="heading-color" style={{ color: "black"}}>
            It's Not About Earning but Cost Sharing and Saving
          </h2>
          <p className="p-3">
            The basic difference between other carpooling Apps and CommutersLink
            is that we are offering long term solutions for daily commute
            instead of a onetime ride. The concept is to collectively defeat the
            impact of price hike by cost sharing. It’s not a source of earning
            but saving
          </p>
        </div>
      </div>
      <div className="container d-flex">

      <div className="row accordion justify-content-between">
        <div className="col-md-6">
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="heading-color">1. Choose Between
                        Using Your Car or Ride with Others</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          CommutersLink simultaneously offers you partners, who are
                      a suitable match to ride your car and at the same time
                      matches you up with car owners with whom we think you can
                      ride with. Both choices are made available at the same
                      time
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="heading-color">2. Long Term
                        Commitment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The commuting buddies would mostly belong to same
                      neighbourhood and community. It’s a long term solution for
                      cost effective commute to Work/Office or University/School
                      and not a one-time drop off.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="heading-color"> 3. Share Cost of
                        Commuting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          CommutersLink aims to empower society to manage ever
                      increasing cost of living and inflation by distributing
                      the burden of commuting in a respectable manner
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="heading-color"> 4. Socioeconomic
                        Angle</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Commuterslink has a socioeconomic welfare angle by
                      reducing traffic, hazards, pollution, government spending
                      on communication infrastructure and improving citizen
                      mental health
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
        
        <div className="col-md-4">
        <div className="container d-flex justify-content-center">
            <img className="w-100 img-fluid" src={imgsignup3} />
            </div>
        </div>
      </div>
      </div>
      <div>
      <section>
        <div id="parallax-world-of-ugg">
        <div className="parallax-one">
          <div className="container">
            <div className="text-center text-white">
              <h3>Be Part of CommutersLink</h3>
              <p>It's not about EARNING but cost sharing and SAVING</p>
              <button onclick="window.location.href = 'signup.html';"
                className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 btn-outline-custom"
                type="submit"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div></div>
      </section>
      
      </div>
    </div>
  );
};

export default MyAccordion;
