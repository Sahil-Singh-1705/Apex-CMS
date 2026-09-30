"use client"
import  { useState, useRef } from 'react';
 
import { Alert } from '@mui/material';
import CalendlyEmbed from './CalendlyEmbed';
import ReCAPTCHA from "react-google-recaptcha";

const Contact_form = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [message, setmessage] = useState('');
    const [country_code, setcountry_code] = useState('+91');
    const [alertOpen, setAlertOpen] = useState(false); // State for controlling alert visibility
    const [alertSeverity, setAlertSeverity] = useState('success'); // State for alert severity
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message
	
	const recaptchaRef = useRef(null);

    const mystyle = {
        contactformdiv: {
            backgroundColor: 'rgba(166, 198, 38, 0.2)',
            padding: '70px 50px ',
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
        },
        h3: {
            color: "#000000",
            fontSize: "38px",
            fontWeight: "700",
            lineHeight: "48px",
        },
		  h1: {
            color: "#000000",
            lineHeight: "48px",
        },
        p: {
            color: "#A1A1A1",
            fontSize: "24px",
            lineHeight: "38px",
            marginBottom: "30px",
        },
        input: {
            width: "100%",
            height: "60px",
            border: "none",
            marginBottom: "20px",
            borderLeft: "3px solid #A6C73A",
            paddingLeft: "20px",
        },
        textarea: {
            width: "100%",
            height: "250px",
            border: "none",
            marginBottom: "20px",
            borderLeft: "3px solid #A6C73A",
            paddingLeft: "20px",
            paddingTop: "20px",
        },
        btn: {
            color: "#fff",
            backgroundColor: "#A6C73A",
            fontSize: "15px",
            padding: "10px 20px",
            border: "none",
        }
    };

    function MouseOver(event) {
        event.target.style.background = '#EE5835';
    }

    function MouseOut(event) {
        event.target.style.background = "#A6C73A";
    }
    let data = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        country_code: country_code
    };
    
const handlecontact = async (e) => {
      e.preventDefault();
      const token = recaptchaRef.current.getValue();
      let data = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        country_code: country_code,
        recaptchaToken: token,
    
      };
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let json = await response.json();
    // console.log(json);
    if (json.status == 200) {
      setAlertSeverity("success");
      setAlertMessage(
        "Thanks for contacting us, we will get back to you soon."
      );
      setAlertOpen(true);
      setname("");
      setemail("");
      setphone("");
      setmessage("");
      setcountry_code("+91");
      recaptchaRef.current.reset();
    } else {
      setAlertSeverity("error");
      setAlertMessage(
        "Please complete the ReCAPTCHA verification before submitting the form."
      );
      setAlertOpen(true);
      
    }
  };

    return (
        <>
        <div className="container" style={{marginTop: '250px', marginBottom: '150px'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',paddingBottom: '20px'}}>
               
        {alertOpen && (
         <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)} open={alertOpen}>
            {alertMessage}
        </Alert>)}
            </div>
                
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mt-5" >
                    {/* <CalendlyEmbed url="https://calendly.com/techysquad-crm/30min?primary_color=181e21&month=2024-03"/> */}
                </div>

                <div className="col-lg-6 col-sm-12 col-md-6 mt-5">
                    <div className="contactformdiv  contact_box" style={mystyle.contactformdiv}>
                        <div className="contactformtitle titelTwo">
                            <h1 style={mystyle.h1}>Get In Touch!</h1>
                        </div>
                        <div className="contact-title">
                            <p style={mystyle.p}>Fill this form and we’ll get back to you!</p>
                        </div>
                        <form method="post" onSubmit={handlecontact}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <input type="text" style={mystyle.input} className="" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name *" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <input type="text" style={mystyle.input} name="country_code" className="" value={country_code} onChange={(e) => setcountry_code(e.target.value)} placeholder=" *"  required/>
                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-9">
                                    <input type="number" style={mystyle.input} className="" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="Phone number *" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <input type="email" style={mystyle.input} className="" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email *" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <textarea name="message" style={mystyle.textarea} cols="30" value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Message *" rows="10" required></textarea>
                                </div>
                            </div>
							<div className="row mb-3">
                  <div className="col-lg-12 " style={{transform:"scale(0.85)", transformOrigin:"0 0"}}>
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      ref={recaptchaRef}
                    />
                  </div>
                </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <button style={mystyle.btn} onMouseOver={MouseOver} onMouseOut={MouseOut} type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div></>
    );
};

export default Contact_form;
