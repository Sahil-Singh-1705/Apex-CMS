"use client";

import { PreviewContext } from "@/context/context";
import { useContext } from "react";
import parse from "html-react-parser";

const PreviewContent = () => {
  const { content, isOpen } = useContext(PreviewContext);

  // console.log(content);

  return <>{isOpen ? <>{parse(content)}</> : ""}</>;
};

export default PreviewContent;
