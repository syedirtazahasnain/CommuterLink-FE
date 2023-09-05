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
import CircularProgress from '@mui/material/CircularProgress';

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

const PaymentRide = () => {
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
        return "#FFFACD";
      case 1:
        return "#90EE90";
      case -1:
        return "#FA8072";
      default:
        return "white";
    }
  };

  return (
    <div>
      <div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">Payment/Ride History</h3>
            <Link
              onClick={() => navigate(-1)} >
              <button className="btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
            <h5 className="card p-2 px-4 text-success ">{`The ride history along with payment log`}</h5>
      </div>
        <div className="card p-4 bg-light p-2">
          <div className="card backgroundColor">
            <div className="card-body">
              {loading ? (
                <div className="text-center" style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress color="warning" />
                </div>
              ) : (
                <>
                  <h5 className="text-center pb-2 fw-bold text-dark">{monthYear}</h5>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="fw-bold fs-5 text-success">Date</TableCell>
                          <TableCell className="fw-bold fs-5 text-success">Message</TableCell>
                          <TableCell className="fw-bold fs-5 text-success">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow
                            key={item.date}
                            style={{ backgroundColor: getStatusColor(item.status) }}
                          >
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                              {`From Home to Office | Office to Home | ${getDisplay(
                                item.status
                              )}`}
                            </TableCell>
                            <TableCell className="fs-6">{`Rs ${item.wallet_transfer}/-`}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </div>
            {/* <div className="text-center">
              <Button
                className="btn btn-sm fs-7 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRide;
