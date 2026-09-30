"use client"
import React, { useEffect } from 'react';
import Script from 'next/script';

const TidioChatWidget = () => {
  const showChatWidget = true; // Replace with your logic to determine visibility

  useEffect(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-H579EVQRTQ');
  });

  return (
    <>
      {showChatWidget && (
        <Script src="//code.tidio.co/ulws8wmetuyjz0nrhj37lb3kr7om2xqw.js" async />
      )}
    </>
  );
};

export default TidioChatWidget;
