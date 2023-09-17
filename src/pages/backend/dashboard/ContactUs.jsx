import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/generalSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../../constants";

const ContactUs = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage("contactus"));
    getProfileData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setFullName(jsonresponse[0].name);
        setEmail(jsonresponse[0].email);
      }
      console.log("Commuter Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value.replace(/[^a-z" "]/gi, '');
    setFullName(value);
    
    if (!/^[a-zA-Z" "]+$/.test(value) || value.length < 4) {
      setFullNameError("Full Name must contain only alphabetic characters and be at least 4 characters long");
    } else {
      setFullNameError("");
    }
  };

  const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "" || emailPattern.test(email)) {
      setEmail(email);
      setIsValidEmail(true);
    } else {
      setEmail(email);
      setIsValidEmail(false);
    }
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value.replace(/[^a-z" "]/gi, '');
    setSubject(value);
  };

  const handleMessageChange = (e) => {
    const value = e.target.value.replace(/[^a-z" "]/gi, '');
    setMessage(value);
  };

  const SubmitForm = async () => {
    try {
      if (fullName === "" || email === "" || subject === "" || message === "") {
        Swal.fire({
          position: 'top',
          // icon: 'warning',
          text: 'Please Fill All Fields!',
          customClass: {
            confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          },
        }
        )
      }
      else {
        const body = {
          name: fullName,
          email: email,
          subject: subject,
          message: message
        }
        const response = await fetch(
          `${API_URL}/api/v1/user-contact-us`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        console.log("Form Body:", body);

        const jsonresponse = await response.json();

        console.log({jsonresponse});

        if (jsonresponse.statusCode === 200) {
          Swal.fire({
            position: 'top',
            // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success', // Apply custom CSS class to the OK button
            },
          }
          )
          setSubject("");
          setMessage("");
        } else {
          Swal.fire({
            position: 'top',
            // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success', // Apply custom CSS class to the OK button
            },
          }
          )
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">CONTACT US</h3>
            <Link
              to={"/dashboard"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="page-title">
      </div>
      <div className="card p-4">
        <h5 className="text-success mb-4">
          At CommutersLink, we are always available to address your queries and
          would love to hear your suggestions or feedback if any. Feel free to
          connect with us
        </h5>
        <div className=" bg-white">
          <div className="">

            <div className="row text-left">
              <div
                className="col-md-12"
               
              >
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <TextField
                        className="mb-3 bg-light"
                        color="success"
                        id="outlined-basic"
                        label="Your Name"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        size="small"
                        value={fullName}
                        onChange={handleFullNameChange}
                        disabled
                        error={!!fullNameError}
                        helperText={fullNameError}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      {" "}
                      <TextField
                        className="mb-3 bg-light"
                        id="formBasicPassword"
                        color="success"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        // required
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "#000000",
                          },
                        }}
                        disabled
                        size="small"
                        error={!isValidEmail}
                        helperText={!isValidEmail && "Please enter a valid email"}
                      />
                    </div>
                    <div className="col-md-12">
                      <TextField
                        className="mb-3 bg-light"
                        id="formBasicPassword"
                        color="success"
                        label="Subject"
                        variant="outlined"
                        type="text"
                        // required
                        sx={{ width: "100%" }}
                        size="small"
                        value={subject}
                        onChange={handleSubjectChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 bg-light"
                        id="exampleFormControlTextarea1"
                        label="Message"
                        color="success"
                        multiline
                        rows={10}
                        variant="outlined"
                        sx={{ width: "100%" }}
                        value={message}
                        onChange={handleMessageChange}
                      />
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center mt-3">
                  <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={SubmitForm}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
