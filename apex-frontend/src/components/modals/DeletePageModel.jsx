import React, { useContext } from 'react';
import { ModalContext } from "@/context/context";
import { AlertContext } from "@/context/context";
import { useRouter } from 'next/navigation';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export default function DeletePageModel() {
  const { isOpen, onClose, data, type } = useContext(ModalContext);
  const isModalOpen = isOpen && type;
  const { setAlert } = useContext(AlertContext);
  const router = useRouter();

  const handleDelete = async () => {
    const { id, token } = data;

    try {
      let response;
      if (type === "deletepage") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (type === "deleteblog") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteblog/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (type === "deletecategory") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category/remove-category/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if(type === "deletecontact") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if(type === "deletequeries") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/queries/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } 
      else if(type === "deletepopup") {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/popup/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    
    //  console.log(response); 
      if (response.ok || response.success) {
        // console.log('Deleted successfully!');
        setAlert({
          message: "Deleted successfully!",
          type: "success",
          open: true,
        });
       router.refresh();
        onClose({});
      }
    } catch (error) {
      setAlert({
        message: "Deleted unsuccessfully!",
        type: "warning",
        open: true,
      });
      console.error('Error deleting:', error);
      // Handle error
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
          Are you sure you want to delete this {type === "deletepage" ? "page" : type === "deleteblog" ? "news" : type === "deletecategory"? "category" : type === "deletecontact"? "contact" : type === "deletequeries"? "queries" : type === "deletepopup"? "popup" : "page"}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose({})} color="primary">
          No
        </Button>
        <Button onClick={() => handleDelete()} autoFocus style={{ backgroundColor: '#ec530e', color: 'white' }}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
