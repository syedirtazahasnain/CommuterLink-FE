import React from 'react'
// import imgfaqs from '../../../Images/question.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BASE_URL } from '../../../constants';
const WhyProcessPayment = () => {
  return (
    <div>
      <div className="container text-center mt-5 pt-5 fw-bold fs-1 mb-5">
        <span><i className=" p-3 wallet-margin fa-solid text-success fa-wallet fs-1"></i>
          Why Process Payment</span>
      </div>
      <div>
        <div className="container">
          <div className="row">
          <div className="col-md-8  col-lg-12 col-sm-8 mb-5">
              <TableContainer className="terms_services bg-light" component={Paper}>
              <Table>
                        <TableBody>
                          <TableRow>
                            <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">1.   &nbsp;</span>
                          Commuters link keeps a month's advance and your money is
                secure and will be paid transferrred to you wallet on daily
                basis.
                        </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">2.   &nbsp;</span>
                          No bargaining involved. Commuterslink works out per day cost
                based upon a fixed relationized formula. If the petrol prices go
                up or down the same will be adjusted.                        </li> </ul>
                            
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">3.   &nbsp;</span>
                          No dispute on cost,payments,number of days the services were
                utilized etc.                        </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">4.  &nbsp;</span>
                          If you stop provision of car seat to a partner for a reason
                or other with 1 week, your payment is secure and you will still be able to
                get another match.                                              </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">5.   &nbsp;</span>
                          CommutersLink verifies all the data of its members and ensures
                your safety and security                        </li> </ul>
                           
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">6.   &nbsp;</span>
                          By receiving money through CommutersLink you remain an active
                member and have access to to other options to find travel buddies.                        </li> </ul>
                          
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">7.   &nbsp;</span>
                          Last but not the least it is the most respectable way of
                receiving money as you donot have to ask your travel buddy
                to pay you cash.                                                </li> </ul>
                          </TableRow>
                      
                        </TableBody>
                      </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyProcessPayment;