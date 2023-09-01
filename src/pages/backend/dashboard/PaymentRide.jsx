import React, { useEffect, useState } from "react";
import { Button, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
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

          // Add a delay of 2 seconds before removing the loading message
          setTimeout(() => {
            setLoading(false);
          }, 2000);
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
      case 1:
        return "Not Travelled";
      case 0:
        return "Travelled | Amount Transferred to Wallet";
      case -1:
        return "Driver Didn't Come";
      default:
        return "";
    }
  };

  return (
    <div>
      <div>
        <div className="page-title">
          <h3 className="card p-4 text-success my-2 fw-bold">
            PAYMENT/RIDE HISTORY
          </h3>
          <h5 className="mx-4">{`The ride history along with payment log`}</h5>
        </div>
        <div className="card p-4 bg-light p-2">
          <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
            <div className="card-body">
              {loading ? (
                <div className="text-center" style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress color="warning" />
                </div>
              ) : (
                <>
                  <h5 className="text-center">{monthYear}</h5>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Message</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item.date}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                              {`From Home to Office | Office to Home | ${getDisplay(
                                item.status
                              )}`}
                            </TableCell>
                            <TableCell>{`Rs ${item.wallet_transfer}/-`}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </div>
            <div className="text-center">
              <Button
                className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRide;
