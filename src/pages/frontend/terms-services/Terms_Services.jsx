import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BASE_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
function createData(text) {
  return { text };
}

const rows = [
  createData('1. Your car is in good shape and is roadworthy'),
  createData('2. You are committed to providing the car for commuting of partners on all days mentioned by your travel buddy'),
  createData('3. If due to any unforeseen reason you cannot commute on a certain day, no fee will be paid for that day'),
  createData('4. You will inform the travel buddy well in advance (at least 12 hours) about your inability to commute on a certain day. In case of any emergency, this can be waived off under exceptional circumstances'),
  createData('5. You will be paid on weekly basis for the actual number of days that your car is used'),
  createData('6. If a commuting partner misses the car and fails to commute due to late arrival/time off, you will still be paid for that day'),
  createData('7. You will wait at least 15 minutes after the agreed time for the commuting partner to join you'),
  createData('8. You will update the scheduler in your dashboard on a daily (as and when required basis)'),
  createData('9. You will receive your share of the fee through CommutersLink, and there will be no direct transaction between you and your commuting partner'),
  createData('10. If you wish to discontinue your partnership with a member due to a reason or other, CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice'),
  createData('11. Any complaints or grievances will be addressed to CommutersLink for resolution'),
];

const Terms_Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  
  return (
    <div>
      <div className="container text-center mt-5 pt-5 fw-bold fs-1 mb-3">
        <span>
          <img src={`${BASE_URL}/assets/images/question.png`} alt="Question" />
          Terms And Services
        </span>
      </div>
      <div>
        <div className="container">
          <div className="row d-flex justify-content-between pt-5">
            <div className="col-md-8  col-lg-12 col-sm-8 mb-5">
              <TableContainer className="terms_services bg-light" component={Paper}>
              <Table>
                        <TableBody>
                          <TableRow>
                            <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">1.   &nbsp;</span>
                        CommutersLink is not a money making mechanism but follows the concept of saving through sharing. Unlike other Apps, it’s not means to earn for driver/car owner but to save the cost by distributing it amongst travel buddies
                        </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">2.   &nbsp;</span>
                          You are committed to providing the car for commuting of partners on all days mentioned by your travel buddy
                        </li> </ul>
                            
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">3.   &nbsp;</span>
                          If due to any unforeseen reason you cannot commute on a certain day, no fee will be paid for that day
                        </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">4.  &nbsp;</span>
                          You will inform the travel buddy well in advance (at least 12 hours) about your inability to commute on a certain day. In case of any emergency, this can be waived off under exceptional circumstances    
                                              </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">5.   &nbsp;</span>
                          You will be paid on a daily basis for the actual number of days that your car is used
                        </li> </ul>
                           
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">6.   &nbsp;</span>
                          If a commuting partner misses the car and fails to commute due to late arrival/time off, you will still be paid for that day
                        </li> </ul>
                          
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">7.   &nbsp;</span>
                          You will wait at least 15 minutes after the agreed time for the commuting partner to join you  
                                                </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">8.   &nbsp;</span>
                          You will update the scheduler in your dashboard on a daily (as and when required basis) 
                                                </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">9.   &nbsp;</span>
                          You will receive your share of the fee through CommutersLink, and there will be no direct transaction between you and your commuting partner
                                                </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">10.   &nbsp;</span>
                          If you wish to discontinue your partnership with a member due to a reason or other, CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice                                                </li> </ul>
                          </TableRow>
                          <TableRow>
                          <ul className="list-unstyled">
                          <li className="d-flex px-3"><span className="text-success fw-bold">11.   &nbsp;</span>
                          Any complaints or grievances will be addressed to CommutersLink for resolution.
                                                </li> </ul>
                          
                          </TableRow>
                        </TableBody>
                      </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms_Services;
