"use client";
import { InputLabel, TextField, Box } from "@mui/material";
import { useState } from "react";
import parse from "html-react-parser";
import CKEditor from "@/components/admin/editor/ui/Editor";

const TopHeaderEditorNew = () => {
  const [topHeaderHTML, setTopHeaderHTML] = useState("");

  return (
    <>
      <Box height={"500px"} padding="20px" backgroundColor="white">
        {/* <div dangerouslySetInnerHTML={{ __html: topHeaderHTML }}></div> */}
        <header className="header">{parse(topHeaderHTML)}</header>
        <Box marginTop="40px">
          <InputLabel>Write your HTML</InputLabel>
          <CKEditor
            initialData={topHeaderHTML}
            setContent={(val) => setTopHeaderHTML(val)}
          />
        </Box>
      </Box>
    </>
  );
};

export default TopHeaderEditorNew;
