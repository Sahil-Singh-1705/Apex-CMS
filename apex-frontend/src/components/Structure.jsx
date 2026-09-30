"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const Structure = ({ data }) => {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.type = "application/ld+json";
  //   script.innerHTML = JSON.stringify(schemajson);
  //   document.head.appendChild(script);
  //   return () => {
  //     if (script) {
  //       document.head.removeChild(script);
  //     }
  //   };
  // }, [path]);
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        strategy="afterInteractive"
      ></Script>
    </>
  );
};

export default Structure;
