import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { API_URL } from "../../../constants";

const tableHeaderCellStyle = {
  backgroundColor: "#333", // Add your desired background color
  color: "white",
  fontWeight: "bold",
  fontSize: "14px", // Increase font size for header cells if needed
  textAlign: "center",
  padding: "10px", // Add padding for better visual appearance
};

const DispatchAmount = () => {
  const [dispatchData, SetDispacthData] = useState([]);
  useEffect(() => {
    // Fetch status data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/driver-list-pending-dispatch/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const jsonresponse = await response.json();
        console.log("Dispatch Amount History:", jsonresponse);
        if (jsonresponse.status_code === 200) {
          SetDispacthData(jsonresponse.data);

          // Add a delay of 1.5 seconds before removing the loading message
          //   setTimeout(() => {
          //     // setLoading(false);
          //   }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5 container">
      <h2 className="text-center">Dispatch Amount List</h2>
      <Table className="bg-dark text-white border-1 rounded-bottom-4">
        <TableHead className="rounded-top-4">
          <TableRow>
            <TableCell className="text-white" style={tableHeaderCellStyle}>
              Sr. No
            </TableCell>
            <TableCell className="text-white" style={tableHeaderCellStyle}>
              Driver Name
            </TableCell>
            <TableCell className="text-white" style={tableHeaderCellStyle}>
              Agreement Fee
            </TableCell>
            <TableCell className="text-white" style={tableHeaderCellStyle}>
              Wallet Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dispatchData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white fw-bold">
                No Data Found
              </TableCell>
            </TableRow>
          ) : (
            dispatchData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-white text-center">
                  {item.id}
                </TableCell>
                <TableCell
                  className="text-white text-center"
                  style={{
                    fontSize: "13px",
                    paddingBottom: "6px",
                    paddingTop: "6px",
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell className="text-white text-center">{`Rs. ${item.aggreement_fee}/-`}</TableCell>
                <TableCell className="text-white text-center">{`Rs. ${item.wallet_amount}/-`}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DispatchAmount;
