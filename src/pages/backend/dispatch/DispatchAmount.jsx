import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const tableHeaderCellStyle = {
    backgroundColor: '#333', // Add your desired background color
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px', // Increase font size for header cells if needed
    textAlign: 'center',
    padding: '10px', // Add padding for better visual appearance
};

const DispatchAmount = () => {
    return (
        <div>
            <Table className="bg-dark text-white border-1 rounded-bottom-4 rounded-top-4">
                <TableHead>
                    <TableRow>
                        <TableCell className="text-white" style={tableHeaderCellStyle}>
                            Date
                        </TableCell>
                        <TableCell className="text-white" style={tableHeaderCellStyle}>
                            Description
                        </TableCell>
                        <TableCell className="text-white" style={tableHeaderCellStyle}>
                            Amount
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="text-white text-center">17-Nov-2023</TableCell>
                        <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>Description section</TableCell>
                        <TableCell className="text-white text-center">{`Rs. 1200/-`}</TableCell>
                    </TableRow>
                    {/* {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-white fw-bold">
                            No Data Found
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-white text-center">{item.date}</TableCell>
                            <TableCell className="text-white text-center" style={{ fontSize: '13px', paddingBottom: '6px', paddingTop: '6px' }}>{item.Description}</TableCell>
                            <TableCell className="text-white text-center">{`Rs. ${item.wallet_transfer}/-`}</TableCell>
                        </TableRow>
                    ))
                )} */}
                </TableBody>
            </Table>
        </div>
    )
}

export default DispatchAmount;