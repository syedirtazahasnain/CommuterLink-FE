import React, { useEffect, useState } from "react";
import { Button, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import CircularProgress from '@mui/material/CircularProgress';
import { ThreeCircles } from 'react-loader-spinner'

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

const TransactionHistory = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthYear, setMonthYear] = useState("");

  useEffect(() => {
    // Fetch status data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/monthtravelhistory`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const jsonresponse = await response.json();
        console.log("Month History:", jsonresponse);
        if (jsonresponse.success === true) {
          setData(jsonresponse.data);
          if (jsonresponse.data.length > 0) {
            const firstItem = jsonresponse.data[0];
            const date = new Date(firstItem.date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            setMonthYear(`${month} ${year}`);
          }

          // Add a delay of 1.5 seconds before removing the loading message
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  const getDisplay = (status) => {
    switch (status) {
      case 0:
        return "Not Travelled";
      case 1:
        return "Travelled | Amount Transferred to Wallet";
      case -1:
        return "Driver Didn't Come";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "#eeeec4";
      case 1:
        return "#ccffcc";
      case -1:
        return "#ffc2b3";
      default:
        return "white";
    }
  };
  const tableCellStyle = {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: '7px',
    paddingTop: '7px',
    fontSize: '13px'
  };

  return (
    <div>
      <div>
        <div className="page-title">
          <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
            <div className="d-flex justify-content-between align-items-xl-baseline">
              <h3 className="text-dark-green my-2 fw-bold m-0">TRANSACTION HISTORY </h3>
              <Link
                to={"/dashboard"}  >
                <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                  <i className="fas fa-angle-left text-white" />
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-4 bg-white p-2">
        <h5 className="pb-2 text-dark-green ">{`Payment Log`}</h5>
        <div className="card bg-light">
          <div className="card-body">
            {loading ? (
              <div className="text-center" style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ThreeCircles
                  height={50}
                  width={50}
                  color="#4fa94d"
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            ) : (
              <>
                <h5 className="text-center pb-2 fw-bold text-dark">{monthYear}</h5>
                <div className="col-md-12 col-sm-6">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="">
                     
                      <Table className="bg-dark text-white border-1 rounded-top-4">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}> <h2 className="text-light">Recent Transactions
                            </h2></TableCell>

                          </TableRow></TableBody></Table>
                      <Table className="bg-dark text-white border-1 rounded-bottom-4">
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-white" style={tableCellStyle}>Date</TableCell>
                            <TableCell className="text-white text-center" style={tableCellStyle}>Message</TableCell>
                            <TableCell className="text-white" style={tableCellStyle}>Amount</TableCell>

                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }} >02 Oct,2023</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Transferred to Car Offer on Monday</TableCell>
                            <TableCell className="text-white" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Rs. 360/-</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                  </div>
                </div>

              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default TransactionHistory;
