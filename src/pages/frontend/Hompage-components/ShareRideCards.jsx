import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CardGroup } from 'react-bootstrap';
import { BASE_URL } from "../../../constants";
import { useNavigate } from 'react-router-dom';

const ShareRideCards = () => {
  const navigate = useNavigate();
  const signupRoute = () => {
    navigate("/signup");

  };
  return (
    <div className='bg-light-secondary'>
        <div className="section-title text-center p-5">
          <h1 className="text-dark">
            Share Ride (Your Car or Others) With
          </h1>
          <h3 className="text-green">
            Suitable Matches to Commute to</h3>
        </div>
      
      <div className="row g-0 pb-5">
        <CardGroup className='textride'><div className="col-md-6 sharingRide mb-2">
          <Card className="mr-0">
            <Card.Img variant="top" className="sharingRide" text="Img" src={`${BASE_URL}/assets/images/commutelinksoffice.jpg`} />
            <article className="d-flex">
              <div className="m-auto p-4">
                <h1 className="text-white fw-bold mb-3">Office</h1>
                <button
                  className="btn-custom2 border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={signupRoute}>
                  Join Now
                </button>
              </div>
             
            </article>
          </Card>
        </div>
          <div className="col-md-6 sharingRide mb-2">
            <Card className="ml-0">
              <Card.Img className=" sharingRide" variant="top" src={`${BASE_URL}/assets/images/commutelinksuni.jpg`} />
              <article className="d-flex">
              <div className="m-auto p-4">
                <h1 className="text-white fw-bold mb-3">School/University</h1>
                <button
                  className="btn-custom2 border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={signupRoute}>
                  Join Now
                </button>
              </div>
              </article>
             
            </Card>
          </div>
        </CardGroup>
      </div>
    </div>
  )
}

export default ShareRideCards