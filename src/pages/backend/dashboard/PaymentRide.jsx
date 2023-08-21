import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox"; 
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "react-bootstrap/Form";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4815",
      contrastText: "white",
    },
  },
});

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};
function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows = [
    createData('01 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs'),
    createData('02 August','From Home to Office | Office to Home | Travelled | Amout Transferred to Wallet', 'Rs 339/-'),
    createData('03 August', 'From Home to Office | Office to Home | Travelled | Amout Transferred to Wallet', 'Rs 168/-'),
    createData('04 August', 'From Home to Office | Office to Home | Confirmaiton in progress | Not Paid', 'Rs 335/-'),
    createData('05 August', 'From Home to Office | Office to Home | Confirmaiton in progress | Not Paid', 'Rs 335/-'),
    createData('06 August', 'From Home to Office | Office to Home | Confirmaiton in progress | Not Paid', 'Rs 335/-'),
    createData('07 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs /-'),
    createData('08 August', 'From Home to Office | Office to Home | Not Tranvelled', 'Rs /-'),
    createData('09 August', 'From Home to Office | Office to Home | Confirmation in progress| Not paid', 'Rs 385/-'),
    createData('10 August', 'From Home to Office | Office to Home | Confirmaiton in progress | Not Paid', 'Rs 385/-'),
    createData('11 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs /-'),
    createData('12 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs /-'),
    createData('13 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs /-'),
    createData('14 August', 'From Home to Office | Office to Home | Not Travelled', 'Rs /-'),
  
];
const PaymentRide = ({ children }) => {
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
          PAYMENT/RIDE HISTROY
        </h3>
        <h5 className="mx-4">The ride history along with payment log</h5>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">
            <h5 className="text-center">August 2023</h5>
            
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="">Calories</TableCell>
            <TableCell align="" component="th" scope="row">Fat</TableCell>
            <TableCell align=""></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th"  scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="">{row.fat}</TableCell>
              <TableCell align="">{row.carbs}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            
          </div>
         <h5 className="text-success mx-5">Total Amount Transferred to Wallet in August 2022: Rs. 1005/-</h5>
          <div className="text-center">
            <button
              to="/"
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRide;
