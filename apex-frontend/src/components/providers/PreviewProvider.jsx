"use client";

import { PreviewContext } from "@/context/context";
import { useState } from "react";

const PreviewProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const onOpen = (data) => {
    setOpen(true);
    setContent(data);
  };

  return (
    <PreviewContext.Provider value={{ isOpen: open, content, onOpen }}>
      {children}
    </PreviewContext.Provider>
  );
};

export default PreviewProvider;
