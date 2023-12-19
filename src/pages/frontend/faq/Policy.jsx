import React, { useEffect } from "react";
// import imgfaqs from '../../../Images/question.png'
import Table from "react-bootstrap/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
const Policy = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div>
      <div className="container text-center mt-5 pt-5 fw-bold fs-1 mb-5">
        <span>
          <img src={`${BASE_URL}/assets/images/question.png`} />
          Privacy Policy
        </span>
      </div>
      <div>
        <div className="container">
          <div className="row mb-10">
            <div className="col-md-8 col-lg-12 col-sm-6 mb-5">
              <p className="text-dark fs-5">
                Our mobile and web apps (the term “app” is used for both
                hereinafter) let you order transportation services
                from our partners or our companies. CommutersLink apps were
                developed by an international IT company with office located in
                the Islamabad, Pakistan.{" "}
              </p>

              <h2 className="mt-10 mb-4">1. HOW TO CONTACT US?</h2>
              <p>
                1. Our Data Protection Officer can be contacted by email at
                info@commuterslink.com
              </p>
              <p>
                2. You can reach our customer support team via the mobile app
                after logging in. Logging into the app allows us to identify
                you.
              </p>

              <h2 className="mt-10 mb-4">
                2. WHO IS PROCESSING YOUR PERSONAL DATA?
              </h2>
              <p>
                1. Your personal data are processed by the company providing the
                service in your country:
              </p>
              <Table className="px-2 py-2 border border-2 border-secondary rounded">
                <div className="px-2 py2">
                  <thead>
                    <tr>
                      <th className="fw-bold">Brand</th>
                      <th className="fw-bold">Country</th>
                      <th className="fw-bold">Company</th>
                      <th className="fw-bold">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Commuters Link</td>
                      <td>Pakistan</td>
                      <td>SysReforms International</td>
                      <td>Hamadan Heights, Ghouri Town, Islamabad</td>
                    </tr>
                  </tbody>
                </div>
              </Table>
              <h2 className="mt-10 mb-4">
                3. WHAT PERSONAL DATA ARE PROCESSED, HOW, AND WHY?
              </h2>
              <p>
                1. Categories of data we process, source of these data, and
                purposes of processing are as follows:
              </p>
              <Table className="px-2 py-2 border border-2 border-secondary rounded">
                <div className="px-2 py-2">
                  <thead>
                    <tr>
                      <th className="fw-bold">Source</th>
                      <th className="fw-bold">Data</th>
                      <th className="fw-bold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>You Provide us directly</td>
                      <td>
                        Name <br />
                        Phone number <br /> Email
                      </td>
                      <td>
                        To identify you as our user and communicate with you
                        about your order
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Addresses</td>
                      <td>
                        To show you the services , where the starting and ending
                        point of of your ride
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Credit Card Information</td>
                      <td>To proceed with your payment</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Email address</td>
                      <td>
                        To send you service information about your orders and,
                        if you consented to it, marketing messages
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Fill-in forms</td>
                      <td>
                        To provide you with feedback and special offers, process
                        your request to customer support, arrange your
                        participation in marketing contests or any other
                        activities
                      </td>
                    </tr>
                    <tr>
                      <td>
                        You provide to the customer support team via social
                        media
                      </td>
                      <td>
                        Specified by you at your discretion; requested by us at
                        our discretion
                      </td>
                      <td>To resolve issues related to our apps</td>
                    </tr>
                  </tbody>
                </div>
              </Table>
              <p>
                2. <b>The data that you provide to us directly</b> are required
                in order for the app to function properly. Without such data,
                you would be unable to place an order, proceed with the payment
                or use other functionalities.
              </p>
              <p>
                3.{" "}
                <b>
                  Data generated when you interact with the apps, received from
                  the authentication tool
                </b>{" "}
                used by you in apps provided by members of our company group, or{" "}
                <b>received from our marketing agencies</b> are used to achieve
                a legitimate interest while respecting your rights.
              </p>
              <p>
                4. We may request your consent to use data to arrange your
                participation in marketing contests or any other activities.
              </p>
              <p>
                5. We process your data until the purpose for processing them is
                achieved. We can continue processing your data if such
                processing is required by law or necessary to protect our rights
                and interests, as well as the rights and interests of third
                parties.
              </p>
              <h2 className="mt-10 mb-4">
                4. DO WE SHARE OR TRANSFER YOUR PERSONAL DATA?
              </h2>
              <p>1. Your personal data are only shared with parties that:</p>
              <p>
                -(a) Directly assist in providing the services within the app:
              </p>
              <p>
                Our partners involved in obtaining and handling your order and
                in providing software solutions for the same purpose; our
                affiliates providing authentication tools and data centers; and
                companies assisting us with customer support.
              </p>
              <p>
                -(b) Are entitled to receive your data in accordance with the
                law:
              </p>
              <p>
                For example, if law enforcement authorities are duly entitled to
                do so.
              </p>
              <p>-(c) Help us to improve our app:</p>
              <p>
                Advertising or device identifiers may be shared with companies
                providing us with advertisement or analytics services. Data
                about technical errors encountered while using our services are
                shared with our affiliates who are involved in developing our
                apps.
              </p>
              <h2 className="mt-10 mb-4">
                5. HOW CAN YOU ENFORCE YOUR RIGHTS?
              </h2>
              <h3>1. Access</h3>
              <p>
                You always have access to your personal data. After logging into
                the app using our authentication tool, you will have access to
                your order history, credentials, and banking information. If you
                use authentication with a user name (login) and password, you
                can obtain all your data.
              </p>
              <h3>2. Rectification</h3>
              <p>
                After you log into the app using our authentication tool, you
                can correct your personal data in the app. If it is not possible
                to correct the data from within the app, please contact our
                customer support team.
              </p>
              <h3>3. Erasure</h3>
              <p>
                After you log into the app using our authentication tool and
                upgrade your account with a user name (login) and password, you
                can erase your personal data from the app or delete your account
                entirely.
              </p>
              <h3>4. Restriction of processing</h3>
              <p>
                You have the right to restrict the processing of your personal
                data in certain circumstances. For example, should you wish to
                correct your personal data, you can request via our customer
                support team that the processing of your data be restricted
                until such data have been rectified. Please contact our customer
                support team to proceed.
              </p>
              <h3>5. Portability</h3>
              <p>
                If your personal data has been processed by automated means
                based on your consent or based on a contract with us (e.g. in
                order to provide you with the features of the app), you have the
                right to receive such data in a structured, commonly used and
                machine-readable format.{" "}
              </p>
              <h3>6. Complaints</h3>
              <p>
                We are always ready to examine your complaints and suggestions.
                Please send them to our customer support team.
              </p>
              <h3>7. Customer support</h3>
              <p>You can reach our customer support team via our apps.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
