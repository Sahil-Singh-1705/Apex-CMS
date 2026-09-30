import React, { useEffect, useState } from 'react';
import { Dialog, Typography, DialogContent } from '@mui/material';

const PopUp = ({ popupData }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  // Improved button detection and click handling
  const handleButtonClick = (event) => {
    const isDynamicButton = event.target.closest('.popmake-close'); // More specific selector for close button
    if (isDynamicButton) {
      event.stopPropagation(); // Prevent event bubbling to close the dialog
      setOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to document for better compatibility
    document.addEventListener('click', handleButtonClick);

    // Cleanup function to remove event listener
    return () => document.removeEventListener('click', handleButtonClick);
  }, []); // Empty dependency array ensures event listener is added/removed only once
  //  console.log(popupData?.choosensize);
  return (
    <div>
    <Dialog
      open={open}
      maxWidth={popupData?.choosensize}
      fullWidth={true}
      // sx={{ "& .DialogContent .css-ekeie0": { backgroundColor: "black" } }}
    >
      <DialogContent>
        <Typography>
          {popupData && (
            <div dangerouslySetInnerHTML={{ __html: popupData?.htmlCode }} />
          )}
        </Typography>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default PopUp;
