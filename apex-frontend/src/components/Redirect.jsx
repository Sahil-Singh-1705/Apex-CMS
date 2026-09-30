"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { Container } from "react-bootstrap";

const Redirect = ({ type }) => {
  const router = useRouter();

  useEffect(() => {
    if (type === "home") {
      router.push("/");
    }
    if (type === "blogs") {
        router.push("/blog")
    }
  }, []);

  return (

    <Container className="redirect" sx={{ display: "flex", justifyContent: "center",alignItems:"center"}}>
      <div  style={{ textAlign: "center"}}>
        
        <img className="redirect_img" src="/images/404.png"  alt="" />
        <h1>Redirecting to  {type}....</h1>
      </div>
    </Container>
  );
};

export default Redirect;
