import React, {useEffect} from 'react'
import { BASE_URL } from '../../../constants'
import { Form } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { Breadcrumbs, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { setCurrentPage } from "../../../redux/generalSlice";

const ViewProfile = () => {
  const dispatch = useDispatch();
    const crumbs = [
        {
          // path: "/portal/document-management",
          label:"View Profile",
        //   path:"/viewprofile",
          active: true,
        },
      ];
      useEffect(() => {
        dispatch(setCurrentPage("profile"));
        document.getElementById("root").classList.remove("w-100");
        document.getElementById("root").classList.add("d-flex");
        document.getElementById("root").classList.add("flex-grow-1");
        window.KTToggle.init();
        window.KTScroll.init();
      }, []);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <div>
        <div className="page-title">
        <h3 className="card px-4 py-2 text-success my-2 fw-bold">
        <Breadcrumbs aria-label="breadcrumb">
          {crumbs.map((crumb, index) => (
            <Link
              key={index}
              to={crumb.path || ""}
              style={{
                color: crumb.active ? "black" : "#ff4815",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                pointerEvents: crumb.path ? "auto" : "none",
                textDecoration: "none"

              }}
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>        
        </h3>
      </div>
        <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          User Profile 
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center">
            <img src={`${BASE_URL}/assets/images/Vector.png`} style={{ height: "150px", width: "150px" }} className='border border-2 rounded rounded-circle'/>
                <p>Name</p>
                <Form className="text-center">
                <Form.Group
                    className="mt-5 mb-1 text-center"
                    controlId="formfullName"
                  >
                      <TextField
                        fullWidth
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        label="Full Name"
                        // value={fullName}
                        // onChange={handleFullNameChange}
                        required
                        size="small"
                        // error={!!fullNameError}
                        // helperText={fullNameError}
                        
                      />
                    </Form.Group>
                    
                    <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                      <TextField
                        fullWidth
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        type="email"
                        label="Email"
                        // value={email}
                        // onChange={(e) => validateEmail(e.target.value)}
                        required
                        size="small"
                        // error={!isValidEmail}
                        // helperText={
                        //   !isValidEmail && "Please enter a valid email"
                        // }
                      />
                    </Form.Group>
                    <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                      <TextField
                        fullWidth
                        className="bg-light"
                        color='success'
                        variant="outlined"
                        // value={phoneNumber}

                        label="Mobile Number (03xxxxxxxxx)"
                        // onChange={(e) => {
                        //   if (/^\d{0,11}$/.test(e.target.value)) {
                        //     validatePhoneNumber(e.target.value);
                        //   }
                        // }}
                        required
                        size="small"
                        // error={!isValidPhoneNumber && phoneNumber !== ''}
                        // helperText={
                        //   !isValidPhoneNumber && phoneNumber !== '' &&
                        //   "Please enter a valid Phone Number starting with '03' and having 11 digits."
                        // }
                      />
                    </Form.Group>
                <div className="container my-5">
                
                  <Link className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"              
                   to={"/editprofile"}
>
                    Change Password
                    
                  </Link>
                </div>
              </Form>
            </div>
            
          </div>
          
        </div>
      </div>
        
  </div>
  )
}

export default ViewProfile