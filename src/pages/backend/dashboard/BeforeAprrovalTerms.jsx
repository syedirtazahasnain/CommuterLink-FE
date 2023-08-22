import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox"; 
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "react-bootstrap/Form";


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

const BeforeApprovalTerms = ({ children }) => {
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
          Terms And Conditions
        </h3>
        <h5 className="mx-4">BEFORE SENDING THE REQUEST ACCEPT TERMS</h5>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">
            
            <p>1. The car offer will wait 15 mins after agreed time for you to join.</p>
            <p className="">
              2. If due to anyunforeseen reason you cannot commute an a certain day, fee will be still be charged on
              on your seat remains reserved for you.
            </p>
            <p>
              3. You will inform the partners well in advance (atleast 12 hours)
              about your inability to cummute on a certain day. In case of an
              emergency this can be waived off under exceptional circumstances
            </p>
            <p>
              4. You will pay are month in advance. The money will remain in your
              wallet and will be transferred to car owner on daily basis after confirmation
              that the service was provided.
            </p>
            <p>
              5. You will charged on daily basis for actual number of days that you share
              the car. No charges will be levied for public holidays or number of days
              that the car owner does not turn up.
            </p>
            <p>
              6. You will update the scheduler in your dashboard on daily (as and when required
              basis.)
            </p>
            <p>
              7. You will pay your share of fee through Commuterslink and there will be no direct
              transaction between you and your commuting partner. (insert a llink here "why to 
              receive payment through commutersLink")
            </p>
            <p>
              8. If you wish to discontinue your partnership with a memeber due a reason or other
              CommutersLink will inform the partner an your behalf
            </p>
            <p>
              9. Any complaints, grievances will be addressed to CommutersLink for resolution.
            </p>

            
          </div>
          <Form.Group>
          <FormControlLabel
                        control={
                          <Checkbox
                            value="termsService"
                            style={{ borderColor: "#198754" }}
                            className="mx-4"
                            required
                            // onChange={(e) => setTermsService(e.target.checked)}
                            size="small"
                          />
                        }
                        label={
                          <div id="span-text" className="large">
                            I agree with all statements in
                            <a href="" style={{ textDecoration: "none" }}>
                              
                            </a>
                          </div>
                        }
                      />
                    </Form.Group>
          <div className="text-center">
            <button
              to="/"
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeApprovalTerms;
