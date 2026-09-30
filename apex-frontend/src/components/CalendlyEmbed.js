import React, { useEffect } from "react";

const CalendlyEmbed = ({ url }) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ height: "870px", minwidth: "320px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    ></div>
  );
};

export default CalendlyEmbed;