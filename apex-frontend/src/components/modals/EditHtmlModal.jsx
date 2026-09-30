"use client";
import { ModalContext } from "@/context/context";
import { Box, InputLabel, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import TinyMCEEditor from "../admin/editor/ui/TinyMCEEditor";
import { useRef } from "react";


const EditHtmlModal = () => {
  const tinyMCEEditorRef = useRef();
  const { data, type, isOpen, onClose } = useContext(ModalContext);
  const isModalOpen = isOpen && type === "editContent";
  // console.log("col.umn", data.colId);
  const [htmlContent, setHtmlContent] = useState(data?.content);

  useEffect(() => {
    if (data?.content) {
      setHtmlContent(data?.content);
    }
  }, [data?.content]);

 //  console.log("data_editor",data)
const handleSaveChanges = async() => {
  const Content = tinyMCEEditorRef.current.getContent();
  
 //  console.log("editort",Content)
onClose({
 colId: data.colId,
 index: data.index,
 rowIndex: data.rowIndex,
 content:Content,
});
setHtmlContent(""); // Reset the local state if needed
};

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => onClose({})}
      aria-labelledby="alert-dialog-title-edit"
      aria-describedby="alert-dialog-description-edit"
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
      <DialogTitle id="alert-dialog-title">
        {"Handle Column Content"}
      </DialogTitle>
      <DialogContent>
        <Box marginTop="40px">

          {/* <CKEditor
            initialData={htmlContent}
            setContent={(val) => setHtmlContent(val)}
          /> */}
          <TinyMCEEditor
           initialData={htmlContent}
           ref={tinyMCEEditorRef}

          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSaveChanges}
          autoFocus
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHtmlModal;
