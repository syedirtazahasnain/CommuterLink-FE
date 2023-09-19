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
      <section id="contact" className="contact section-bg pt-5" style={{ 
      backgroundImage: `url("/assets/images/contact-bg.png")`,  backgroundSize: 'cover', 
    }}>
        
      <div className="container">
        <div className="row text-left">
          <div className="col-md-5 bg-col-4 px-5 pt-3 pb-4 mb-3 sha m-auto rounded rounded-4">
        <h3 className="text-white text-center pb-3">Contact Us</h3>
            <form action="#" method="post">
              <div className="row">
                <div className="col-md-12 mb-2">
                  {" "}
                  <TextField
                    className="mb-3 bg-light"
                    id="outlined-basic"
                    label="Your Name"
                    variant="outlined"
                    sx={{ width: '100%', color: 'black' }}
                    value={fullName}
                    onChange={handleFullNameChange}
                    size="small"
                    error={!!fullNameError}
                    helperText={fullNameError}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  {" "}
                  <TextField
                    className="mb-3 bg-light"
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
                    className="mb-3 bg-light"
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
                    className="mb-3 bg-light"
                    id="exampleFormControlTextarea1"
                    label="Message"
                    value={message}
                    onChange={handleMessageChange}
                    multiline
                    rows={5}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-center">
            <button
                  className="btn-custom mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold"
                  onClick={SubmitForm}
                >
                  Send
                </button>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Contact;
