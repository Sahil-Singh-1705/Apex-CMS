"use client";
import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AppSwitch from "../editor/ui/AppSwitch";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
;
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

const QueryTableRows = ({ el, token, index }) => {
  const [checked, setChecked] = useState(el?.published === 1);
  const router = useRouter();
  const { onOpen } = useContext(ModalContext);

  return (
    <>
      <StyledTableRow key={el?.id}>
        <StyledTableCell component="th" scope="row">
          {index + 1}
        </StyledTableCell>
        <StyledTableCell>
        {el?.name}
        </StyledTableCell>
        <StyledTableCell>{el?.email}</StyledTableCell>
        <StyledTableCell>{el?.country_code}</StyledTableCell>
        <StyledTableCell>{el?.phone}</StyledTableCell>
        <StyledTableCell>{el?.company_name}</StyledTableCell>
        <StyledTableCell>{el?.createdAt}</StyledTableCell>

        <StyledTableCell>
          
           
        
       
   
          <IconButton
            onClick={() => {
              onOpen(
                {
                  id: el?.id,
                  token: token,
                },
                "deletequeries"
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

const QueryTable = ({ token, data}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Country_code</StyledTableCell>
              <StyledTableCell>Phone no.</StyledTableCell>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((el, index) => {
                return <QueryTableRows token={token} el={el} index={index} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default QueryTable;
