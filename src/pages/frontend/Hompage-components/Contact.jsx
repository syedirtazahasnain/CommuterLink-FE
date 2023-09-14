import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { API_URL } from "../../../constants";


const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
          `${API_URL}/api/v1/contact-us`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
          setFullName("");
          setEmail("");
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
      <section id="contact" className="contact section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="text-dark">Contact Us</h2>
            <p className="fs-5">
              At CommutersLink, we are always available to address your queries
              and would love to hear your suggestions or feedback if any. Feel
              free to connect with us
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row text-left">
          <div className="col-md-8 bg-light p-5 mb-3 sha m-auto">
            <form action="#" method="post">
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <TextField
                    className="mb-3"
                    id="outlined-basic"
                    label="Your Name"
                    variant="outlined"
                    sx={{ width: '100%' }}
                    value={fullName}
                    onChange={handleFullNameChange}
                    size="small"
                    error={!!fullNameError}
                    helperText={fullNameError}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  {" "}
                  <TextField
                    className="mb-3"
                    id="formBasicPassword"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    // required
                    sx={{ width: '100%' }}
                    size="small"
                    error={!isValidEmail}
                    helperText={!isValidEmail && "Please enter a valid email"}
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    className="mb-3"
                    id="formBasicPassword"
                    label="Subject"
                    variant="outlined"
                    type="text"
                    value={subject}
                    onChange={handleSubjectChange}
                    //required
                    sx={{ width: '100%' }}
                    size="small"
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    className="mb-3"
                    id="exampleFormControlTextarea1"
                    label="Message"
                    value={message}
                    onChange={handleMessageChange}
                    multiline
                    rows={10}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <button
                className="btn-custom px-4 py-2 rounded rounded-5 text-custom fw-bold"
                onClick={SubmitForm}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
