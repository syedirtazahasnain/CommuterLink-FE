import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CardGroup } from 'react-bootstrap';
import imgoffice from '../../../Images/commutelinksoffice.jpg'
import imguni from '../../../Images/commutelinksuni.jpg';

const ShareRideCards=()=> {
  return (
    <div>
      <div className="container">
      <div className="section-title text-center p-5">
          <h2 className="heading-color text-black">
          SHARE RIDE (YOUR CAR OR OTHERS) WITH SUITABLE MATCHES TO COMMUTE TO
          </h2>
        </div>
      </div>
        
       
      
<div className="container">
  <div className="row">
    
<CardGroup className='textride'><div className="col-md-6 sharingRide">
      <Card className="mr-0">
      <Card.Img variant="top" className="sharingRide" text="Img" src={imgoffice}  />
      <article className="">
      <h3 className="text-center" ><a href="signup.js" style={{color: '#fff'}}>Office</a></h3></article>
     
      
      </Card> </div><div className="col-md-6 sharingRide">
    <Card className="ml-0">
      <Card.Img className=" sharingRide" variant="top" src={imguni}/>
    <article> <h3 className="m-auto p-0"><a href="signup.js" style={{color: '#fff'}}>College & University</a></h3>
    </article>  </Card></div></CardGroup>
    </div></div>
  
    </div>
  )
}

export default ShareRideCards