import React, { useContext,useState } from "react";
import { ModalContext } from "@/context/context";
import { AlertContext } from "@/context/context";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import {
    Box,
    Grid,
   
    Typography,
    TextField,
  } from '@mui/material';

const UpdateModal = () => {
  const { isOpen, onClose, data, type } = useContext(ModalContext);
  const isModalOpen = isOpen && type;
  const { setAlert } = useContext(AlertContext);
  const router = useRouter();
  const { id, token,category_name } = data;
  const [title, setTitle] = useState(category_name);
  let handleUpdate = async () => {
    try {
      let response;
      if (type === "updatecategory") {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/category/update-category/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category_name: title,
            }),
          }
        );
      }
      // console.log(response);
      if (response.ok) {
        setAlert({
          message: "Updated successfully!",
          type: "success",
          open: true,
        });
        router.refresh();
        onClose({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => onClose({})}
      maxWidth="md"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <DialogContentText>
        <Typography marginBottom={'15px'}>Update Category</Typography>
            
          <TextField
            sx={{
              width: "100%",
              "& input": {
                padding: "25px",
              },
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleUpdate()}
          autoFocus
          style={{ backgroundColor: "#ec530e", color: "white" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
