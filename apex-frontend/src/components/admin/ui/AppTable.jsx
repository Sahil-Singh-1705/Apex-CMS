"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import AppSwitch from "../editor/ui/AppSwitch";
import { useEffect, useState,useContext } from "react";
import { useRouter } from "next/navigation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { ModalContext } from "@/context/context";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AppTableRows = ({ el, token , index }) => {
  const [checked, setChecked] = useState(el?.published === 1);
  const router = useRouter();
  const { onOpen } = useContext(ModalContext);

  // const handlePublished = async (val, id) => {
  //   let data = { published: checked ? 0 : 1 };
  //   let response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/changestatus/${id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   );
  //   response = await response.json();
  //   console.log(response);
  //   router.refresh();
  //   setChecked(val);
  // };

  return (
    <>
      <StyledTableRow key={index+1}>
        <StyledTableCell component="th" scope="row">
          {index + 1}
        </StyledTableCell>
        <StyledTableCell>{el?.name}</StyledTableCell>
        <StyledTableCell>{el?.endpoint ? el?.endpoint : "/"}</StyledTableCell>
        <StyledTableCell>
          {el?.published == 1 ? (
            <Chip
              label="publish"
              sx={{
                backgroundColor: "#5b9a52",
                border: "1px solid green",
                color: "white",
              }}
              size="small"
            />
          ) : (
            <Chip
              label="draft"
              sx={{
                backgroundColor: "#bc7272",
                border: "1px solid red",
                color: "white",
              }}
              size="small"
            />
          )}
        </StyledTableCell>
        <StyledTableCell>{el?.createdAt}</StyledTableCell>
        {/* <StyledTableCell>
          <AppSwitch
          title={""}
          defaultChecked={el?.published == 1 ? true : false}
          checked={checked}
            setChecked={(val) => handlePublished(val, el?.id)}
          />
        </StyledTableCell> */}
        <StyledTableCell>
          <Link href={`/admin/app-pages/edit/${el?.id}`}>
            <IconButton>
              <ModeEditIcon />
            </IconButton>
          </Link>
        </StyledTableCell>
        <StyledTableCell>
   
            <IconButton
              onClick={() => {
                onOpen({
                  id: el?.id,
                  token: token,
                },  
                "deletepage"
                );
              }}
            >
              <DeleteIcon />
            </IconButton>
   
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

const AppTable = ({ token,datas }) => {

  const router = useRouter();
  

  return (
    <>
      <TableContainer className="mt-10" component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Sr No.</StyledTableCell>
              <StyledTableCell>Page Name</StyledTableCell>
              <StyledTableCell>Enpoint</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              {/* <StyledTableCell>Change Status</StyledTableCell> */}
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas &&
              datas?.map((el, index) => {
                return <AppTableRows token={token} el={el} index={index} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppTable;
