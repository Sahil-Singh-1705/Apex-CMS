import React, { useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Alert } from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";

const Tscontactpage = () => {
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[phone,setphone]=useState("");
    const[country_code,setcountry_code]=useState("+91");
    const[company_name,setcompany_name]=useState("");
    const [alertOpen, setAlertOpen] = useState(false); // State for controlling alert visibility
    const [alertSeverity, setAlertSeverity] = useState('success'); // State for alert severity
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message
	  const recaptchaRef = useRef(null);
	
  const mystyle = {
    section:{
        backgroundColor: '#ECECEC',
        padding: ' 50px  0px',
    
    },
    contactformdiv: { 
     
    
    },
    texsidecol:{
        padding: '20px',
        display:"flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
    },
    h3:{    
        color: "#000000;",
        fontSize: "38px",
        fontWeight: "700",
        lineHeight: "48px",

    },
    p:{
        color: "#A1A1A1",
        fontSize: "18px",   
        lineHeight: "38px",
        marginTop: "30px",

    },
    input:{
        width: "100%",
        height: "60px",
        border: "none",
        marginBottom: "20px",
        borderLeft: "3px solid #A6C73A",
        paddingLeft: "20px",
    
    },
    btn:{
        color:"#fff",
        backgroundColor:"#A6C73A",
        fontSize:"15px",
        padding:"10px 20px",
        border: "none",
        

    }
  };
  function MouseOver(event) {
    event.target.style.background = '#EE5835';
  }
  function MouseOut(event){
    event.target.style.background="#A6C73A";
  }
   const data = {
      name: name,
      email: email,
      phone: phone,
      country_code:country_code,
      company_name:company_name,
      
  };
   const handleconatct = async (e) => {
    const token = recaptchaRef.current.getValue();
    const data = {
      name: name,
      email: email,
      phone: phone,
      country_code: country_code,
      company_name: company_name,
      recaptchaToken: token,
    };

    e.preventDefault();

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/queries/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let json = await response.json();

    if (json.status == 200) {
      setAlertSeverity("success");
      setAlertMessage(
        "Thanks for contacting us, we will get back to you soon."
      );
      setAlertOpen(true);
      setname("");
      setemail("");
      setphone("");
      setcompany_name("");
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
    <div>
 
      <section style={mystyle.section} >
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',paddingBottom: '20px'}}>
               
               {alertOpen && (
                <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)} open={alertOpen}>
                   {alertMessage}
               </Alert>)}
                   </div>
        <Container>
          <Row>
            <Col lg={6} sm={12} md={6} style={mystyle.texsidecol} >
                <div className="titelTwo contactformtitle ">
                    <h3 style={mystyle.h3}>Any Queries? Lets Talk</h3>

                </div>
                <div>
                    <p style={mystyle.p}>250+ Brokerages Selected Us Worldwide</p>
                </div>
            </Col>
            <Col lg={6} sm={12} md={6}>
              <div className="contactformdiv" style={mystyle.contactformdiv}>
              
                <form method='post' onSubmit={handleconatct}>

                 
                 
                  <div className="row" >
                    <Col lg={12}>

                    <input type="text" style={mystyle.input} value={name} onChange={(e)=>setname(e.target.value)}  name="name" className=""   placeholder="Name *" />
                    </Col>  
                  </div>
                  <div className='row'>
                    <Col lg={3} md={3} sm={3}>
                    <input type="text"  style={mystyle.input} value={country_code} onChange={(e)=>setcountry_code(e.target.value)}  name="country_code" className=""   placeholder=" *" />


                    </Col>
                    <Col lg={9} md={9} sm={9}>
                    <input type="number"  style={mystyle.input} className="" value={phone} onChange={(e)=>setphone(e.target.value)}    placeholder="Phone number *" />


                    </Col>
                    
                  </div>
                  <div className="row" >
                    <Col lg={12}>

                    <input type="email" style={mystyle.input} className="" value={email} onChange={(e)=>setemail(e.target.value)}    placeholder="Email *" />
                    </Col>  
                  </div>
                  <div className="row" >
                    <Col lg={12}>

                    <input type="text" style={mystyle.input} className="" value={company_name} onChange={(e)=>setcompany_name(e.target.value)}   placeholder="Company Name *" />
                    </Col>  
                  </div>
					
					  <div className="row mb-3">
                  <div className="col-lg-12" style={{transform:"scale(0.85)", transformOrigin:"0 0"}}>
                      {" "}
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        ref={recaptchaRef}
                      />
                    </div>
                  </div>

                  <div className="row" >

                    <Col lg={12}>
                        <button style={mystyle.btn} onMouseOver={MouseOver} onMouseOut={MouseOut} type='submit' >Submit</button>
                    </Col>

                 </div>


                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section class="mainBlogSmall pt-80 pb-80">
            <div class="container-fluid">
                <div class="titelTwo text-center mb-0">
                    <h3 class="mb-0">Other Forex Related Services</h3>
                </div>
                <div class="row">
                    <aside class="col-md-4">
                        <div class="homeBlogBox"> <a href="forex-traders-room"> <img src="https://techysquad.com/wp-content/uploads/2022/10/blog08.png" alt=""/>
                                <h3>Forex Trader’s Room</h3>
                            </a>
                            <p>Together with Forex CRM and trader's room (Client Area), Techysquad.....</p>
                            <p><strong><a href="forex-traders-room" class="text-orange">Know More</a></strong></p>
                        </div>
                    </aside>
                    <aside class="col-md-4">
                        <div class="homeBlogBox"> <a href="forex-multi-level-ib"> <img src="https://techysquad.com/wp-content/uploads/2022/10/blog09.png" alt=""/>
                                <h3>Forex Multilevel IB</h3>
                            </a>
                            <p>Increase the growth and potential of your brokerage activity by using a multi-level.....</p>
                            <p><strong><a href="forex-multi-level-ib" class="text-orange">Know More</a></strong></p>
                        </div>
                    </aside>
                    <aside class="col-md-4">
                        <div class="homeBlogBox"> <a href="forex-crm-solution"> <img src="https://techysquad.com/wp-content/uploads/2023/03/1.png" alt=""/>
                                <h3>Forex CRM Solutions</h3>
                            </a>
                            <p>Designed and built with care, filled with creative elements and useful options....</p>
                            <p><strong><a href="forex-crm-solution" class="text-orange">Know More</a></strong></p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
     
    </div>
  );
};

export default Tscontactpage;
