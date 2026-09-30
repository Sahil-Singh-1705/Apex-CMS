"use client";
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { AlertContext } from "@/context/context";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/context";
import Link from "next/link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CategoryTableRows = ({ el, token, count }) => {
  const router = useRouter();
  const { onOpen } = useContext(ModalContext);
  const { setAlert } = useContext(AlertContext);
  // const handleDelete = async () => {
  //   if (confirm("Are you sure you want to delete this category?")) {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/category/remove-category/${el?.id}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.ok) {
  //         setAlert({
  //           message: "Deleted successfully!",
  //           type: "success",
  //           open: true,
  //         });
  //         router.refresh();
  //       }
  //     } catch (error) {
  //       setAlert({
  //         message: "Deleted unsuccessfully!",
  //         type: "warning",
  //         open: true,
  //       });
  //       console.error("Error deleting:", error);
  //       router.refresh();
  //     }
  //     // Handle error
  //   }
  // };
  
  return (
    <>
      <TableRow key={el?.id}>
        <StyledTableCell component="th" scope="row">
          {el?.category_name}
        </StyledTableCell>
        <StyledTableCell>{count[el.category_name] || 0}</StyledTableCell>
        <StyledTableCell>
          <IconButton
            onClick={() => {
              onOpen(
                {
                  id: el?.id,
                  token: token,
                  category_name: el?.category_name,
                },
                "updatecategory"
              );
            }}
          >
            <ModeEditIcon />
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>
          <IconButton
            onClick={
              () => 
              // handleDelete()
              {
                onOpen({
                  id: el?.id,
                  token:token,
                }, "deletecategory");
              }
            }
          >
            <DeleteIcon />
          </IconButton>
        </StyledTableCell>
      </TableRow>
    </>
  );
};

const Category = ({ token, data }) => {
  const router = useRouter();
  const { setAlert } = useContext(AlertContext);
  const [name, setName] = useState("");
  const [count, setCount] = useState({});

  const getCount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/get-count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { categoryCounts } = await response.json();
      setCount(categoryCounts);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/add-category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_name: name,
          }),
        },
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to add category.");
      }

      router.refresh();
      setName("");
      setAlert({
        message: "Category added successfully!",
        type: "success",
        open: true,
      });
    } catch (error) {
      console.error("Error adding category:", error.message);
      setAlert({
        message: "Failed to add category.",
        type: "warning",
        open: true,
      });
    }
  };

  return (
    <>
      <div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"20px"}
          marginTop={"40px"}
        >
          <Typography variant="h4">Categories</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Typography marginBottom={"15px"}>Add New Categories</Typography>
              <Typography marginBottom={"5px"}>Name </Typography>

              <Box marginBottom={"20px"} sx={{ display: "flex", gap: 1 }}>
                <TextField
                  key="categoryName"
                  sx={{
                    width: "100%",
                    "& input": {
                      padding: "25px",
                    },
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  onClick={async () => await handleSubmit()}
                  variant="contained"
                  sx={{
                    minWidth: 200, 
                    backgroundColor: "#E85B24",
                    fontWeight: "bold",
                    border: "1px solid #E85B24",
                    ":hover": {
                      backgroundColor: "#fff",
                      color: "#E85B24",
                      border: "1px solid #E85B24",
                    },
                  }}
                >
                  Add New Category
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Count</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((el) => (
                  <CategoryTableRows
                    key={el.id}
                    el={el}
                    token={token}
                    count={count}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Category;
