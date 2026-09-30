'use client'
import React from 'react'

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





  const BlogTableRows = ({ el, token ,index}) => {
    const [checked, setChecked] = useState(el?.published === 1);
    const router = useRouter();
    const { onOpen } = useContext(ModalContext);
  
  
    return (
      <>
        <StyledTableRow key={el?.id}>
          <StyledTableCell component="th" scope="row">
            {index +1}
          </StyledTableCell>
          <StyledTableCell>{el?.title}{el?.subtitle}</StyledTableCell>
          <StyledTableCell>{el?.slug}</StyledTableCell>
          {/* <StyledTableCell>{el?.keyword}</StyledTableCell> */}
          {/* <StyledTableCell>{el?.author}</StyledTableCell> */}
          <StyledTableCell>{el?.category_id}</StyledTableCell>
          <StyledTableCell>
            {el?.published == 'true' ? (
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
          <StyledTableCell><img
  src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${el?.thumbnail_image}`}
  width={100}
  height={100}
  alt=""
/>
{/* </StyledTableCell>
          <StyledTableCell><img
  src={`${process.env.NEXT_PUBLIC_API_URL}/static/images/${el?.banner_image || 'default-image.jpg'}`}
  width={100}
  height={100}
  alt=""
/> */}
</StyledTableCell>
          <StyledTableCell>{el?.createdAt}</StyledTableCell>

          <StyledTableCell>
            <Link href={`/admin/blog/edit/${el?.id}`}>
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
                  "deleteblog"
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







const BlogTable = ({ token,datas }) => {
  return (
    <>
    <TableContainer className="mt-10" component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr No.</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Slug</StyledTableCell>
            {/* <StyledTableCell>Keyword</StyledTableCell> */}
            {/* <StyledTableCell>Author</StyledTableCell> */}
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Thumbnail_img</StyledTableCell>
            {/* <StyledTableCell>Banner_img</StyledTableCell> */}
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas &&
            datas?.map((el,index ) => {
              return <BlogTableRows token={token} el={el} index={index}  />;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default BlogTable