import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";

import AddIcon from "@mui/icons-material/Add";
const Question_accordian = () => {


  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <h2 class="text-black">Questions ? Look Here</h2>
          <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
            sx={{
              width: "100%",
              boxShadow: "none",
              borderRadius: "0px !important",
             
              borderBottom:  expanded === "panel1" ? 'none'  :"2px solid #a6c73a",

              
            }}
           
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel1" ? (
                  <RemoveIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                ) : (
                  <AddIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                )
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ padding: "20px 10px" }}
            >
              <Typography
                sx={{
                  color: expanded === "panel1" ? "#a6c73a" : "black",
                  fontFamily: "var(--tp-ff-heading)",
                  letterSpacing: "1px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {/* Why choose Techysquad team for your web application? */}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ color: "#85868c", fontFamily: "var(--tp-ff-body)" }}
              >
                {/* Techysquad is web design agency delivering expert and cost
                effective solutions. Our experts take a customer-centric
                approach to deliver bespoke technology solutions that meet your
                expectations, timelines and budget. */}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              width: "100%",
              boxShadow: "none",
              borderRadius: "0px !important",
              borderBottom:  expanded === "panel2" ? 'none'  :"2px solid #a6c73a",

            }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel2" ? (
                  <RemoveIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                ) : (
                  <AddIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                )
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              sx={{ padding: "20px" }}
            >
              <Typography
                sx={{
                  color: expanded === "panel2" ? "#a6c73a" : "black",
                  fontFamily: "var(--tp-ff-heading)",
                  letterSpacing: "1px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                What services do you offer?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ color: "#85868c", fontFamily: "var(--tp-ff-body)" }}
              >
                Our service offerings include website design, usability, web
                development, e-Marketing, application development, e-Commerce,
                search engine optimisation (SEO), Forex CRM, hosting and a range
                of other interactive products.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{
              width: "100%",
              boxShadow: "none",
              borderRadius: "0px !important",
              borderBottom:  expanded === "panel3" ? 'none'  :"2px solid #a6c73a",

            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel3" ? (
                  <RemoveIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                ) : (
                  <AddIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                )
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              sx={{ padding: "20px" }}
            >
              <Typography
                sx={{
                  color: expanded === "panel3" ? "#a6c73a" : "black",
                  fontFamily: "var(--tp-ff-heading)",
                  letterSpacing: "1px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Do you provide maintainence for web application?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ color: " #85868c", fontFamily: "var(--tp-ff-body)" }}
              >
                We are a full-service software development company that offers
                design, development, deployment, and maintenance services.
                Software application maintenance is as important as development
                because it keeps the application healthy and relevant. <br />
                Our maintenance services include enhancements, optimizations,
                troubleshooting and preventive maintenance.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{
              width: "100%",
              boxShadow: "none",
              borderRadius: "0px !important",
              borderBottom:  expanded === "panel4" ? 'none'  :"2px solid #a6c73a",

            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === "panel4" ? (
                  <RemoveIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                ) : (
                  <AddIcon sx={{ color: "#a6c73a", fontSize: "30px" }} />
                )
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              sx={{ padding: "20px" }}
            >
              <Typography
                sx={{
                  color: expanded === "panel4" ? "#a6c73a" : "black",
                  fontFamily: "var(--tp-ff-heading)",
                  letterSpacing: "1px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                What different pricing do you offer?{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: "#85868c",  fontFamily: "var(--tp-ff-body)"  }}>
                Techysquad provides a flexible approach by providing two models.{" "}
                <br />
                DTM (Dedicated Team Model) This model gives companies long-term
                access to a dedicated team of professionals by screening based
                on matching experience and skills. <br />
                FPM (Fixed Price Model) In this model, timelines and budgets are
                set by clients and service providers to meet standards and
                achieve short-term goals.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <img
            className="float-xl-end ls-is-cached lazyloaded"
            // src="https://techysquad.com/wp-content/uploads/2022/10/img009.png"
            alt="Do you have questions regarding website development? Contact Us"
          />
        </div>
      </div>
    </div>
  );
};

export default Question_accordian;
