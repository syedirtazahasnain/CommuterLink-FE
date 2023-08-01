import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import Button from "react-bootstrap/Button";
import img from "../../../Images/contribute-1.jpg";
function NumberGenerate() {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row pt-5 pb-4 justify-content-center mt-5 ">
          <div className="col-lg-4 ">
            {/* <img src={img} className='w-100 rounded-top'  alt="Sample photo"/> */}
            <div
              className="card text-center border-1 border-success "
              style={{ borderRadius: "10px" }}
            >
              <div
                className="card-body cardpadding"
                style={{ background: "rgb(218,233,229)", borderRadius: "10px" }}
              >
                <h5 className="card-title mb-3">
                  Please Enter Your valid Phone No.
                </h5>
                <form id="numberForm">
                  <Row className="mb-3 mt-2 px-4">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="d-flex justify-content-left mb-3 ">
                        Number
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className="colorplace mb-3"
                        placeholder="03XXXXXXXXX"
                        defaultValue=""
                        maxLength={11}
                      />
                    </Form.Group>
                  </Row>
                  <div className="px-4 mb-3">
                    {" "}
                    <Button
                      variant="success"
                      className=""
                    >
                      Submit
                    </Button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NumberGenerate;
