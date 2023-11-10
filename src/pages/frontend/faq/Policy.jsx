import React, {useEffect} from 'react'
// import imgfaqs from '../../../Images/question.png'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BASE_URL } from '../../../constants';
import { useNavigate } from "react-router-dom";
const Policy = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  
  return (
    <div>
      <div className="container text-center mt-5 pt-5 fw-bold fs-1 mb-5">
        <span><img src={`${BASE_URL}/assets/images/question.png`}
        />
          Policy</span>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-12 col-sm-6 mb-5">

              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography className='fw-bold text-black'><span className="text-success fw-bold">1.   &nbsp;</span> How is CommutersLink different than other carpooling Apps?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">
                        CommutersLink has been introduced to respond to the specific environment that we confront today in the aftermath of unpreceded price hike, especially in fuel prices. This has hit the middle class and lower middle class the most.
                        <ul className="list-unstyled">
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>CommutersLink is not a money making mechanism but follows the concept of saving through sharing. Unlike other Apps, it’s not means to earn for driver/car owner but to save the cost by distributing it amongst travel buddies
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            This App connects you with travel buddies living around you and have similar commuting routes and timings
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            It’s not meant for one time drop off or picking passengers on your way to a certain location. This App matches you with travel buddies on long term basis primarily for regular commute to office and school
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            This app adds a security feature by verifying commuters. Moreover, it provides social profiling of commuters so you can find a person having similar profession or interests
                          </li>
                        </ul>
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography className='fw-bold'><span className="text-success fw-bold">2.   &nbsp;</span> How the cost is calculated and distributed? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">
                        CommutersLink has an internal Artificial Intelligence based cost calculator. It takes into account following factors and then works out cost per seat per day.
                        <ul className="list-unstyled">
                          <li class="d-flex"><i className="bx bx-chevron-right text-success"></i>CommutersLink is not a money making mechanism but follows the concept of saving through sharing. Unlike other Apps, it’s not means to earn for driver/car owner but to save the cost by distributing it amongst travel buddies
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            This App connects you with travel buddies living around you and have similar commuting routes and timings
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            It’s not meant for one time drop off or picking passengers on your way to a certain location. This App matches you with travel buddies on long term basis primarily for regular commute to office and school
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            This app adds a security feature by verifying commuters. Moreover, it provides social profiling of commuters so you can find a person having similar profession or interests
                          </li>
                        </ul>
                      </div></div>

                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold'><span className="text-success fw-bold">3.   &nbsp;</span> As a travel buddy with someone who owns a car, how my payment is calculated and paid?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">
                        CommutersLink keeps a record of your travel on daily basis. Member’s dashboard shows this record both for car owners and travel buddies
                        <ul className="list-unstyled ">
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>As a travel buddy, you pay for the number of days you contract to commute a month in advance (less public holidays and school vacations). This amount is credited to your vault and is visible on the dashboard. Every day you travel, the agreed cost for that particular day is transferred to the wallet of member whose car you are using
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success" ></i>Any leftover amount from one month is carried over to next month or adjusted if you choose to change your travel buddy
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success" ></i>
                            If you, as a travel buddy do not use the car due to any reason, you will still be charged for the day if car owner has used the car. This is because your seat is reserved for long term in advance and the car owner cannot replace you with an alternative buddy at a short notice
                          </li>
                          <li className="d-flex"><i class="bx bx-chevron-right text-success"></i>
                            If the car owner misses a day due to any reason, the travel buddy will not be charged and car owner will not be paid, as services were not made available
                          </li>
                        </ul>
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold' ><span className="text-success fw-bold">4.   &nbsp;</span>Will I be picked up from Home and dropped at my exact office location on daily basis?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">

                        <ul className="list-unstyled">
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            It will depend on the start and end point of travel buddies. If all reside in same vicinity (e.g. Sector A, DHA) then pick and drop from home is possible but if the distances are more, than a central point will be suggested by the system or as mutually agreed by the partners
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            For School going travel buddies the pickup point will be home and drop off will be school. The cost will be adjusted accordingly
                          </li>
                        </ul>
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold' ><span className="text-success fw-bold">5.   &nbsp;</span> What are the benefits of paying through CommutersLink Wallet System?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>

                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">

                        <ul className="list-unstyled">
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            As explained earlier, In CommutersLink the car owners or the drivers are not professional taxi drivers but those belonging to middle class. It would be difficult and may be, we say, embarrassing for them to receive cash from travel buddies on daily basis. If it’s transferred through the system, it’s a most respectable way for both stakeholders
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            The car owners will feel safe and secured and will not have to ask for payments or follow up on that
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            As the system releases the contribution on daily basis so one month advance facilitates the process. Issues like change and other things do not arise
                          </li>
                          <li className="d-flex"><i className="bx bx-chevron-right text-success"></i>
                            There is no discussion needed on number of days for which payment has to be made as the system calculates that and releases the amount from travel buddy account accordingly

                          </li>
                        </ul>
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold'><span className="text-success fw-bold">6.   &nbsp;</span> What if I wish to change my Travel buddy?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">

                        Your dashboard will continue showing you the possible matches even if you are already engaged with a travel buddy. If you find someone more suitable you may give a week’s notice to the car owner (or travel buddy) and change your travel companion. The remaining amount in your wallet will get adjusted with the new companion
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold'><span className="text-success fw-bold">7.   &nbsp;</span> Will my profile be publically visible? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div className="card-body small-text ">

                        No the system offers you as “Match-1/Match-2 and so on”. By clicking on a match the viewer can only see basic details like pickup point and drop off, gender, age and timings. When both the members (car owner and travel buddies) agree to release their profile for each other, only then the names pictures and other details become visible to both
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold'><span className="text-success fw-bold">8.   &nbsp;</span> Can I withdraw any balance amount from my Wallet?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="card-body small-text ">

                        Yes by all means! You can claim any remaining amount in your wallet after a month ends and if you wish to discontinue sharing the ride. It would be appropriate and logical that you give at least one week notice to your partner prior to discontinuing the services or in lieu pay for a week so that your partner has sufficient time to find an alternative. The dashboard shall reflect the notice given
                      </div></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className="bg-light">
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Typography className='fw-bold' > <span className="text-success fw-bold">9.   &nbsp;</span> How much CommutersLink will charge me for provision of services and coordination?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div id="collapseTwo" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="card-body small-text ">

                        CommutersLink offers not only ride matching but coordinates payments, schedules and maintains an active helpline/call center for its members. We also have to ensure that the system is up and running all the time. This requires a considerable effort and HR engagement and IT costs. CommutersLink charges 5% fee on total transaction which means 2.5% from each partner. For a transaction of Rs. 10000 Commuters link will charge Rs. 250 from each partner which is on cost to cost basis              </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy;