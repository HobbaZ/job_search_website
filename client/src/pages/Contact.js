import React, { useState, useRef, useEffect } from "react";

import emailjs from "@emailjs/browser";

import { Container, Button, Form } from "react-bootstrap";

let emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Contact() {
  const formRef = useRef();

  const [subjectInput, setSubjectInput] = useState();
  const [nameInput, setNameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [messageInput, setMessageInput] = useState();
  const [validated] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  // submit form
  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    //send details to email provider
    emailjs

      .sendForm(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        formRef.current,
        process.env.REACT_APP_USERID
      )
      .then(
        (result) => {
          console.log("Email Sent", result);
          setEmailSent(true);
          setTimeout(() => {
            setEmailSent(false);
          }, 3000);
        },
        (error) => {
          console.log("Email failed: ", error);
          setEmailSent(false);
          setTimeout(() => {
            setInfoMessage("");
          }, 3000);
        }
      );
  };

  return (
    <Container id="contactMe">
      <h1 className="text-center text-white">Contact Me</h1>

      <Form
        validated={validated}
        onSubmit={submitForm}
        className="col-sm-12 col-md-6 m-auto p-0"
        ref={formRef}
      >
        <Form.Group>
          <label className="text-white">
            <b>Name</b>
          </label>
          <input
            className="form-control"
            type="text"
            name="from_name"
            value={nameInput || ""}
            placeholder="Your Name"
            onChange={(e) => setNameInput(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ height: "0em" }}>
          {nameInput !== "" && nameInput?.length < 2 && (
            <div className="text-center text-white">
              Name must be at least 2 characters
            </div>
          )}
        </div>
        <br />

        <Form.Group>
          <label className="text-white">
            <b>Email address</b>
          </label>
          <input
            className="form-control"
            type="email"
            name="user_email"
            value={emailInput || ""}
            placeholder="Enter email"
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ height: "0em" }}>
          {emailInput && !emailRegex.test(emailInput) && (
            <div className="text-center text-white">
              Invalid email address entered
            </div>
          )}
        </div>
        <br />

        <Form.Group>
          <label className="text-white">
            <b>Subject</b>
          </label>
          <select
            className="form-control"
            value={subjectInput}
            required
            name="user_subject"
            onChange={(e) => setSubjectInput(e.target.value)}
          >
            <option value="Make a General Enquiry">
              Make a General Enquiry
            </option>
            <option value="Make a Complaint">Make a Complaint</option>
            <option value="Idea for the Website">Idea for the Website</option>
          </select>
        </Form.Group>
        <br />

        <Form.Group>
          <label className="text-white">
            <b>Message</b>
          </label>
          <textarea
            className="form-control"
            type="text"
            rows="7"
            name="message"
            value={messageInput || ""}
            placeholder="Type your message (required)"
            onChange={(e) => setMessageInput(e.target.value)}
            required
          />
        </Form.Group>

        <div style={{ height: "0em" }}>
          {messageInput !== "" && messageInput?.length < 2 && (
            <div className="text-center text-white">Message is required</div>
          )}
        </div>
        <br />

        <div className="text-center pt-2">
          <Button
            type="submit"
            className="btn btn-primary col-8 col-md-4"
            disabled={!(emailInput && nameInput && messageInput)}
          >
            <div>
              {!emailSent ? (
                "Send Email"
              ) : emailSent ? (
                <>
                  Email Sent <i className="fas fa-check"></i>
                </>
              ) : (
                <>
                  Email Failed <i className="fas fa-xmark"></i>
                </>
              )}
            </div>
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Contact;
