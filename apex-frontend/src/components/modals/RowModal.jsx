"use client";

import {
  Box,
  IconButton,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Margin from "../admin/editor/ui/Margin";
import Padding from "../admin/editor/ui/Padding";
import { ModalContext } from "@/context/context";

const RowModal = ({ handleColumType, handleMargin, handlePadding }) => {
  const { data, isOpen, type, onClose } = useContext(ModalContext);

  const [columnType, setColumnType] = useState(data?.columnType);
  const [margin, setMargin] = useState("");
  const [padding, setPadding] = useState("");

  useEffect(() => {
    if (data?.columnType) {
      setColumnType(data?.columnType);
    }
  }, [data?.columnType]);

  const isOpenModal = isOpen && type === "rowModal";

  return (
    <>
      <Dialog
        open={isOpenModal}
        onClose={() => onClose({})}
        aria-labelledby="alert-dialog-title-edit"
        aria-describedby="alert-dialog-description-edit"
        fullWidth
        maxWidth={"lg"}
        sx={{ padding: "10px" }}
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
          <Grid container paddingLeft={"15px"} marginBottom={"10px"}>
            <Grid item xs={4}>
              <InputLabel id="demo-simple-select-label">
                Column Division
              </InputLabel>
              <Select
                value={columnType}
                onChange={(e) => setColumnType(e.target.value)}
                size="small"
                sx={{
                  width: "80%",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <MenuItem value={"one"}>1</MenuItem>
                <MenuItem value={"half-half"}>1/2 + 1/2</MenuItem>
                <MenuItem value={"three-three-three"}>1/3 + 1/3 + 1/3</MenuItem>
                <MenuItem value={"four-four-four-four"}>
                  1/4 + 1/4 + 1/4 + 1/4
                </MenuItem>
                <MenuItem value={"four-threefour"}>1/4 + 3/4</MenuItem>
                <MenuItem value={"five-five-five-five-five"}>
                  1/5 + 1/5 + 1/5 + 1/5 + 1/5
                </MenuItem>
                <MenuItem value={"six-six-six-six-six-six"}>
                  1/6 + 1/6 + 1/6 + 1/6 + 1/6 + 1/6
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Margin
                margin={data?.margin}
                setMargin={(val) => setMargin(val)}
              />
            </Grid>
            <Grid item xs={4}>
              <Padding
                padding={data?.padding}
                setPadding={(val) => setPadding(val)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleColumType(columnType);
              handleMargin(margin);
              handlePadding(padding);
              onClose({});
            }}
            autoFocus
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RowModal;
