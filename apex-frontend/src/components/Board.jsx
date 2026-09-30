"use client";
import { htmlToJsx } from "html-to-jsx-transform";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";

const SecondTest = () => {
  return <h1>Hello From Second Test</h1>;
};

const Test = () => {
  const componentRef = useRef(null);

  const [htmlStr, setHtmlStr] = useState("");

  useEffect(() => {
    if (componentRef.current) {
      const cleanHtmlString = DOMPurify.sanitize(componentRef.current, {
        USE_PROFILES: { html: true },
      });
      const jsxEl = htmlToJsx(cleanHtmlString);
      setHtmlStr(jsxEl);
    }
  }, [componentRef.current]);

  return (
    <>
      {htmlStr}
      <button onClick={() => console.log(componentRef.current)}>Convert</button>
      <div ref={componentRef}>
        <h1 className='carousel-component'>Hello World</h1>
        <p>Hello World</p>
        <SecondTest />
      </div>
    </>
  );
};

const MyComponent = () => {
  return (
    <div>
      <h2>Original JSX</h2>
      {/* {jsxStructure} */}
      <Test />

      <h2>Converted JSON</h2>
      {/* <pre>{JSON.stringify(jsonStructure, null, 2)}</pre> */}
    </div>
  );
};

export default MyComponent;
