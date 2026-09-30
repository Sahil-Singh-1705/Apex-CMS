"use client";

import { useState, useRef, useEffect } from "react";
import { Alert } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const TicketGenerate = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail]= useState("");
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const recaptchaRef = useRef(null);

  useEffect
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = recaptchaRef.current?.getValue();

    // if (!token) {
    //   triggerAlert("error", "Please complete the ReCAPTCHA.");
    //   return;
    // }

    const payload = {
      email:email , 
      subject:subject,
      message:message,
    //   recaptchaToken: token,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ticket/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
        console.log("response of ticket:", response);
      const data = await response.json();
      console.log("Ticket response:", data);

      if (data.status === 200) {
        triggerAlert("success", "Ticket submitted successfully!");
        setEmail("");
        setSubject("");
        setMessage("");
        // recaptchaRef.current.reset();
      } else {
        triggerAlert("error", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      triggerAlert("error", "Network error. Please try again.");
    }
  };

  const triggerAlert = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "100px auto",
      padding: "40px",
      backgroundColor: "rgba(166, 198, 38, 0.1)",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
      fontWeight: 600,
      fontSize: "24px",
    },
    input: {
      width: "100%",
      height: "50px",
      border: "1px solid #ccc",
      marginBottom: "20px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
    },
    textarea: {
      width: "100%",
      height: "150px",
      border: "1px solid #ccc",
      padding: "10px",
      fontSize: "16px",
      marginBottom: "20px",
      borderRadius: "4px",
    },
    recaptcha: {
      marginBottom: "20px",
      transform: "scale(0.9)",
      transformOrigin: "0 0",
    },
    button: {
      backgroundColor: "#A6C73A",
      color: "#fff",
      border: "none",
      padding: "12px 25px",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
    },
  };

  return (
    <div style={styles.container}>
      {alertOpen && (
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      )}

      <h2 style={styles.heading}>Submit a Ticket</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          style={styles.input}
          placeholder="Enter your subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Describe your issue"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <div className="row mb-3">
              <div
                className="col-lg-12"
                style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}
                >
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    ref={recaptchaRef}
                />
              </div>
          </div>

        <button type="submit" style={styles.button}>
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketGenerate;
