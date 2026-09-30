import React, { useContext, useState } from "react";
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
import { textDecoration } from "@chakra-ui/react";

const ContactModal = () => {
  const { isOpen, onClose, data, type } = useContext(ModalContext);
  const isModalOpen = isOpen && type;
  const { setAlert } = useContext(AlertContext);
  const router = useRouter();

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => onClose({})}
      maxWidth="md"
      aria-labelledby="responsive-dialog-title"

    >
      <DialogContent>
        <DialogContentText>
          {/* Content of the modal */}
          <Typography variant="h5" gutterBottom sx={{textDecoration:"underline"}}>
            Contact Information
          </Typography>
          <Typography gutterBottom >
            <span style={{ fontWeight: "bold" ,color: "black" }}>
            Name
            </span>
           : {data?.data?.name}
          </Typography>
          <Typography gutterBottom>
          <span style={{ fontWeight: "bold" ,color: "black" }}>

            Email
            </span>
            : {data?.data?.email}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold",color: "black"}}>
            countrycode
            </span>
            : {data?.data?.country_code}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold",color: "black" }}>
            Phone
            </span>
            : {data?.data?.phone}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: "bold",color: "black"  }}>
            Message
            </span>
            : {data?.data?.message}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* You can add actions buttons here */}
        <Button onClick={() => onClose({})} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactModal;
