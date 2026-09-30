"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StickyBox from "react-sticky-box";
import Related_blog from "./Related_blog";
import Link from "next/link";
 
// import Contact_blog from "./Contact_blog";

const Single_blog = (data) => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const [bottom_fixed,setBottom_fixed]=useState(false);
  const [height ,setHeight]= useState("");
  const [width,setWidth]= useState("");

  const categoryLinkMap = {
  News: "/news_and_analysis",
  signal: "/signal",
  webinar: "/webinar",
  academy: "/academy",
};

  const handleLinkClick = (e) => {
    e.preventDefault();;
    if (e.target.classList.contains("nextjs-link")) {
      router.push(e.target.href);
    } else {
      if (e.target.localName === "a") {
        const win = window.open(e.target.href, "_blank");
        win.focus();
      }
    }
  };

const category_id = data?.data?.category_id;
  const backLink = categoryLinkMap[category_id] || "/";
 

  return (
    <>
     <section
  className="d-flex justify-content-center align-items-center text-white text-center "
  style={{
    backgroundImage: "url('./images/dis.jpg')",
    height: "70vh",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0, 0, 0, 0.47)",
    fontFamily: "sans-serif",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  <h1 className="fw-bold display-4 text-[40px] px-5">{data?.data?.title}</h1>
</section>
<section className="blogs-content pb-20">
  <div className="container mx-auto">
    <div className="flex flex-wrap">
      <div
        className="w-full  "
        onClick={handleLinkClick}
        dangerouslySetInnerHTML={{
          __html: data?.data?.htmlCode,
        }}
      ></div>
     <div className="mt-3">
  <Link href={backLink} className=" underline d-inline-flex align-items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 1-.5.5H2.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
      />
    </svg>
    Back
  </Link>
</div>

    </div>
  </div>
</section>
      {/* <div>
        <Related_blog category={data?.data?.category_id} />
      </div> */}
    </>
  );
};

export default Single_blog;
