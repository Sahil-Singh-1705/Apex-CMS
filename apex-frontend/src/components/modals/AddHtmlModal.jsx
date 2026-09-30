"use client";
import { ModalContext } from "@/context/context";
import { Box, InputLabel, TextField, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
// import CKEditor from "../admin/editor/ui/Editor";
import TinyMCEEditor from "../admin/editor/ui/TinyMCEEditor";
import { useRef } from "react";

const AddHtmlModal = () => {
  const tinyMCEEditorRef = useRef();
  const { data, type, isOpen, onClose } = useContext(ModalContext);
  const isModalOpen = isOpen && type === "addContent";

  const [htmlContent, setHtmlContent] = useState(data?.content);
  
  const handleSaveChanges = async() => {
     const editorContent = tinyMCEEditorRef.current.getContent();
    //  console.log(tinyMCEEditorRef.current)
     

  onClose({
    colId: data.colId,
    index: data.index,
    rowIndex: data.rowIndex,
    content:editorContent,
  });
  setHtmlContent(""); // Reset the local state if needed
};


  return (
    <Dialog
      open={isModalOpen}
      onClose={() => onClose({})}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
      fullWidth
      sx={{ padding: "10px" }}
      disableEnforceFocus
    >
      <Box position={"relative"}>
        <IconButton
          color="black"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => onClose({})}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle sx={{ color: "black" }} id="alert-dialog-title">
        {"Column Content"}
      </DialogTitle>
      <DialogContent>
    
{/*       
         <CKEditor
            initialData={htmlContent}
            setContent={(val) => setHtmlContent(val)}
          />  */}
          <TinyMCEEditor
             initialData={htmlContent}
             ref={tinyMCEEditorRef}
           />
    
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
            onClick={handleSaveChanges}
          autoFocus
          sx={{
            backgroundColor: "#0093e9",
            fontWeight: "bold",
            border: "1px solid #0093e9",
            ":hover": {
              backgroundColor: "#fff",
              color: "#0093e9",
              border: "1px solid #0093e9",
            },
            marginRight: "10px",
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHtmlModal;
