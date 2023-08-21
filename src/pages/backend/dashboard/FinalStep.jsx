import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121', // Change this to your desired dark color
    },
    // ... Other palette options
  },
  // Other styling options for different components
  // ...
});
const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const FinalStep = ({ children }) => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };
  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
  const logout = () => {
    dispatch(setloginState(""));
    navigate("/login");
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          FINAL STEP - YOU ARE RIGHT THERE!
        </h3>
        
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">
            
            <h5>Dear XYZ</h5><br/>
            <p className="">
              Thank you very much for accepting me as a travel buddy to ride on your car.
              I also think that we are a suitable match to commute together. so I also formally
              give my consent to share you car.
            </p>
            <p>
              I have deposited Rs. XXXX/- as advance with CommutersLink which will be credited
              to your wallet on daily basis @ Rs 335/-. 
            </p>
            <p>
             I wish to start commuting with your starting from:
            </p>
           <div>
           <ThemeProvider theme={theme}>
      <CssBaseline />
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Select Starting Date" className="bg-white"  slotProps={{ textField: { size: "small" } }}
                            sx={{ width: "100%", }}/>
      </DemoContainer>
    </LocalizationProvider>
    </ThemeProvider>
           </div>
           <br/>
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
            <p>
             Best Regards
            </p>
            <p>
             hassan raza
            </p>
           

            
          </div>
         
          <div className="text-center">
            <button
              to="/"
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
