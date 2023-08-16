import { Box, Card } from '@mui/material'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React from 'react'

const AddressCards = () => {

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-3 info d-flex flex-column ">
          <i className="bx bx-map mb-2" style={{ fontSize: '2.5rem', color: 'darkgreen' }}></i>
          <h4>Address</h4>
          <p>
            Office 8, Ground Floor, Hamadan Heights, Koral Interchange,
            Express Highway, Islamabad, 46000.
          </p>
        </div>
        <div className="col-md-3 info info-bg d-flex flex-column align-items-stretch">
          <i className="bx bx-phone mb-2" style={{ fontSize: '2.5rem', color: 'darkgreen' }}></i>
          <h4>Call Us</h4>
          <p>
            +92 315 1502443<br />
            +92 333 5069216<br />
            +92 51 8743328
          </p>
        </div>
        <div className="col-md-3 info info-bg d-flex flex-column align-items-stretch" >
          <i className="bx bx-envelope mb-2" style={{ fontSize: '2.5rem', color: 'darkgreen' }}></i>
          <h4>Email Us</h4>
          <p>info@commuterslink.com</p>
        </div>
        <div className="col-md-3 info d-flex flex-column align-items-stretch">
          <i className="bx bx-time-five mb-2" style={{ fontSize: '2.5rem', color: 'darkgreen' }}></i>
          <h4>Working Hours</h4>
          <p> 9AM to 5PM </p>
        </div>
      </div>
    </div>
  )
}

export default AddressCards