import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { API_URL } from "../../../constants";
import { alpha, styled } from '@mui/material/styles';
import { displayNotification } from "../../../helpers";
import Form from "react-bootstrap/Form";

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
        // Swal.fire({
        //   position: 'top',
        //   // icon: 'warning',
        //   text: 'Please Fill All Fields!',
        //   customClass: {
        //     confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        //   },
        // }
        // )
        displayNotification("warning", "Please Fill All Fields");
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

        console.log({ jsonresponse });

        if (jsonresponse.statusCode === 200) {
          // Swal.fire({
          //   position: 'top',
          //   // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          //   },
          // }
          // )
          displayNotification("error", `${jsonresponse.message}`);
          setFullName("");
          setEmail("");
          setSubject("");
          setMessage("");
        } else {
          // Swal.fire({
          //   position: 'top',
          //   // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'bg-success', // Apply custom CSS class to the OK button
          //   },
          // }
          // )
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const cssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#000',
      fontSize: '15px',
      fontWeight: 'bolder'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E0E3E7',
      },
    },
  });

  return (
    <div>
      <section id="contact" className="contact section-bg pt-5" style={{
        backgroundImage: `url("/assets/images/contact-bg.png")`,
        backgroundSize: 'cover',
      }}>

        <div className="container">
          <div className="row text-left">
            <div className="col-md-5 bg-white px-5 pt-3 pb-4 mb-3 sha m-auto rounded rounded-4">
              <h3 className="text-success text-center pb-3">Contact Us</h3>
              <form action="#" method="post">
                <div className="row">
                  <div className="col-md-12 mb-2">
                    {" "}

                    <Form.Group
                      className="mt-3 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField
                        className=""
                        id="custom-css-outlined-input"
                        label="Your Name"
                        color="success"
                        variant="outlined"
                        sx={{
                          width: '100%', color: 'black',
                          color: "success"
                        }}
                        value={fullName}
                        onChange={handleFullNameChange}
                        size="small"
                        error={!!fullNameError}
                        helperText={fullNameError}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12 mb-2">
                    {" "}

                    <Form.Group
                      className="mt-3 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField
                        className="mb-1"
                        id="custom-css-outlined-input"
                        label="Email"
                        variant="outlined"
                        color="success"
                        type="email"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        // required
                        sx={{ width: '100%' }}
                        size="small"
                        error={!isValidEmail}
                        helperText={!isValidEmail && "Please enter a valid email"}
                      />
                    </Form.Group>


                  </div>
                  <div className="col-md-12">



                    <Form.Group
                      className="mt-3 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField id="custom-css-outlined-input"
                        className=""

                        label="Subject"
                        variant="outlined"
                        color="success"
                        type="text"
                        value={subject}
                        onChange={handleSubjectChange}
                        //required
                        sx={{ width: '100%', }}
                        size="small"
                      />
                    </Form.Group>

                  </div>
                  <div className="col-md-12">



                    <Form.Group
                      className="mt-4 text-center"
                      controlId="formBasicEmail"
                    >
                      <TextField
                        className="mb-3"
                        id="custom-css-outlined-input"
                        label="Message"
                        color="success"
                        value={message}
                        onChange={handleMessageChange}
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{ width: '100%' }}
                      />
                    </Form.Group>
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
