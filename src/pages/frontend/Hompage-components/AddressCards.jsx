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
    // const card = (
    //     <React.Fragment>
    //       <CardContent classNameName="mb-4" style={{height:'10px'}}>
    //         <Grid item xs={8} style={{ color: "#198754", height:'40px'}}>
    //           <FmdGoodRoundedIcon />
    //         </Grid>
    //         <Typography variant="h5" component="div">
    //           Address
    //         </Typography>
    //         <Typography
    //           sx={{ mb: 1.5 }}
    //           color="text.black"
    //           fontFamily={""}
    //           fontSize={"12px"}
    //         >
    //           <p>
    //             {" "}
    //             Office 8, Ground Floor, Hamadan Heights, Koral Interchange, Express
    //             Highway, Islamabad, 46000{" "}
    //           </p>
    //         </Typography>
    //       </CardContent>
    //     </React.Fragment>
    //   );
    //   const card2 = (
    //     <React.Fragment>
    //       <CardContent classNameName="mb-4">
    //         <Grid item xs={8} style={{ color: "#198754", height:'7px' }}>
    //           <LocalPhoneRoundedIcon/>
    //         </Grid>
    //         <Typography variant="h5" component="div">
    //           <br/>
    //           Call Us
    //         </Typography>
    //         <Typography
    //           sx={{ mb: 1.5 }}
    //           color="text.black"
    //           fontFamily={""}
    //           fontSize={"12px"}
    //         >
    //           <p> +92 322 5121234 <br/> +92 345 5115722</p>
              
    //         </Typography>
    //       </CardContent>
    //     </React.Fragment>
    //   );
    //   const card3 = (
    //     <React.Fragment>
    //       <CardContent classNameName="mb-4">
    //         <Grid item xs={8} style={{ color: "#198754", height:'30px' }}>
    //           <EmailRoundedIcon />
    //         </Grid>
    //         <Typography variant="h5" component="div">
    //           Email Us
    //         </Typography>
    //         <Typography
    //           sx={{ mb: 1.5 }}
    //           color="text.black"
    //           fontFamily={""}
    //           fontSize={"12px"}
    //         >
    //           <p>info@commuterslink.com</p>
    //         </Typography>
    //       </CardContent>
    //     </React.Fragment>
    //   );
    //   const card4 = (
    //     <React.Fragment>
    //       <CardContent classNameName="mb-4">
    //         <Grid item xs={8} style={{ color: "#198754", height:'30px' }}>
    //           <AccessAlarmsRoundedIcon />
    //         </Grid>
    //         <Typography variant="h5" component="div">
    //           WORKING HOURS
    //         </Typography>
    //         <Typography
    //           sx={{ mb: 1.5 }}
    //           color="text.black"
    //           fontFamily={""}
    //           fontSize={"12px"}
    //         >
    //           <p> Mon - Fri: 9AM to 5PM <br/> Sunday: 9AM to 1PM</p>
    //         </Typography>
    //       </CardContent>
    //     </React.Fragment>
    //   );
  return (
    <div className="container">
        <div className="row mb-3">
          <div className="col-lg-3 info d-flex flex-column align-items-stretch">
            <i className="bx bx-map"></i>
            <h4>Address</h4>
            <p>
              Office 8, Ground Floor, Hamadan Heights, Koral Interchange,
              Express Highway, Islamabad, 46000.
            </p>
          </div>
          <div
            className="col-lg-3 info info-bg d-flex flex-column align-items-stretch"
          >
            <i className="bx bx-phone"></i>
            <h4>Call Us</h4>
            <p>
              +92 322 5121234<br />
              +92 345 5115722
            </p>
          </div>
          <div
            className="col-lg-3 info info-bg d-flex flex-column align-items-stretch"
          >
            <i className="bx bx-envelope"></i>
            <h4>Email Us</h4>
            <p>info@commuterslink.com</p>
          </div>
          <div className="col-lg-3 info d-flex flex-column align-items-stretch">
            <i className="bx bx-time-five"></i>
            <h4>Working Hours</h4>
            <p>Mon - Fri: 9AM to 5PM<br />Sunday: 9AM to 1PM</p>
          </div>
        </div>
      </div>
  )
}

export default AddressCards