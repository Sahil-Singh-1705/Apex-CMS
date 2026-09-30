"use client";
import { useEffect, useState } from 'react';

import "../app/globals.css";
import Header from "./Header";
import Link from "next/link";
import Footer from "./Footer";
const Test = ({ data, headers,
  footers }) => {
    const [html, setHtml] = useState('');

  useEffect(() => {
    // Check if window object is available (indicating client-side)
    if (typeof window !== 'undefined') {
      const storedHtml = localStorage.getItem("previewHTML");
      if (storedHtml) {
        setHtml(storedHtml);
      }
    }
  }, []);
 

  if (data) {
    return (
      <>
       <Header headers={headers}/>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        <Footer footers={footers}    />
      </>
    );
  }
};

export default Test;
