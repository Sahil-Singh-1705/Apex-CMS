import Script from 'next/script';
import { GoogleAnalytics } from "@next/third-parties/google";
import React from "react";
import '../globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../public/custom";
const PageLayout = ({ children }) => {
  return (
    <>
	   {/* <GoogleAnalytics gaId="G-H579EVQRTQ" /> */}
      {/* <Script id="ga-analytics" strategy="beforeInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-H579EVQRTQ');
          `}
      </Script> */}
      {children}

    </>
  );
};

export default PageLayout;
