"use client";

import {
  Box,
  IconButton,
  Grid,
  Select,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment, useContext, useEffect, useState } from "react";
import { ModalContext } from "@/context/context";
import { v4 as uuid } from "uuid";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CloseIcon from "@mui/icons-material/Close";
import RowModal from "@/components/modals/RowModal";
import AppSwitch from "./ui/AppSwitch";
import { AlertContext } from "@/context/context";
import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";

const Row = ({ children }) => {
  return (
    <>
      <Box position={"relative"} marginBottom={"15px"}>
        {children}
      </Box>
    </>
  );
};

const Col = ({ colId, index, rowIndex, content }) => {
  const { onOpen } = useContext(ModalContext);
  const [hoverParent, setHoverParent] = useState(false);

  return (
    <>
      <Box
        padding={"20px"}
        backgroundColor={"white"}
        border={"1px solid grey"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"7px"}
        onMouseOver={() => setHoverParent(true)}
        onMouseLeave={() => setHoverParent(false)}
      >
        {!content ? (
          <IconButton
            onClick={() => {
              onOpen(
                {
                  colId,
                  index,
                  rowIndex,
                  content,
                },
                "addContent"
              );
            }}
          >
            <AddBoxIcon sx={{ fontSize: "40px", color: "#9f9f9f" }} />
          </IconButton>
        ) : (
          <Box position={"relative"}>
            {hoverParent && (
              <Box
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                position={"absolute"}
                sx={{
                  top: "0",
                  left: "0",
                  backgroundColor: "black",
                  padding: "3px",
                  borderRadius: "5px",
                  width: "150px",
                }}
              >
                <Typography variant="body2" color={"white"}>
                  Raw HTML
                </Typography>
                <IconButton
                  sx={{ paddingRight: "0", paddingLeft: "0" }}
                  onClick={() => {
                    onOpen(
                      {
                        colId,
                        index,
                        rowIndex,
                        content,
                      },
                      "editContent"
                    );
                  }}
                >
                  <EditIcon
                    sx={{
                      fontSize: "14px",
                      color: "white",
                    }}
                  />
                </IconButton>
              </Box>
            )}
            <p style={{ fontSize: "12px" }}>{content}</p>
          </Box>
        )}
      </Box>
    </>
  );
};


// ----------------------------------------------------------------------------------------------/////////////////////////////////////////////////////////////////////////////////////--
const SliderEditor = ({ token, type, rowData }) => {

   
  const { setAlert } = useContext(AlertContext);
  const router = useRouter();
  const [rows, setRows] = useState([
    {
      id: uuid(),
      columnType: "one",
      padding: "",
      margin: "",
      cols: [
        {
          id: uuid(),
          width: "100%",
          content: "",
        },
      ],
    },
  ]);

  const [openRowModal, setOpenRowModal] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  
  const { submitData, setSubmitData, onOpen } = useContext(ModalContext);

  useEffect(() => {
    if (rowData) {
      
      setTitle(rowData.title);
      setPublished(rowData.published === 1 ? true : false);
    


      
      const parsedHTML = parseHTML(rowData.htmlCode,rowData.id);
      setRows(parsedHTML);
    }
  }, [rowData]);

  
  const parseHTML = (htmlCode, id) => {
    return [
      {
        id: id,
        columnType: "one",
        padding: "",
        margin: "",
        cols: [
          {
            id: id,
            width: "100%",
            content: htmlCode, 
          },
        ],
      },
    ];
  };
  
  

  useEffect(() => {
    if (submitData["colId"]) {
      let allRows = rows;

      allRows[submitData["rowIndex"]].cols[submitData["index"]] = {
        ...allRows[submitData["rowIndex"]].cols[submitData["index"]],
        content: submitData.content,
      };
      setRows(allRows);
      setSubmitData({});
    }
  }, [submitData]);

  const handleColumType = (value, rowIndex) => {
    let arr = value.split("-");
    let allRows = rows[rowIndex];
    allRows.columnType = value;
    if (allRows.cols.length > arr.length) {
      let allRowsLength = allRows.cols.length;
      if (arr.length === 1) {
        for (let i = 0; i < allRowsLength - arr.length; i++) {
          allRows.cols.pop();
        }
      } else {
        for (let i = 0; i <= allRowsLength - arr.length; i++) {
          allRows.cols.pop();
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (allRows.cols[i]) {
        allRows.cols[i].width =
          arr[i] === "half"
            ? "49%"
            : arr[i] === "three"
            ? "32.3%"
            : arr[i] === "four"
            ? "24%"
            : arr[i] === "threefour"
            ? "73%"
            : arr[i] === "five"
            ? "19%"
            : arr[i] === "six"
            ? "15.6%"
            : "100%";
      } else {
        allRows.cols.push({
          content: "",
          width:
            arr[i] === "half"
              ? "49%"
              : arr[i] === "three"
              ? "32.3%"
              : arr[i] === "four"
              ? "24%"
              : arr[i] === "threefour"
              ? "73%"
              : arr[i] === "five"
              ? "19%"
              : arr[i] === "six"
              ? "15.6%"
              : "100%",
          id: uuid(),
        });
      }
    }
    setRows(rows?.map((el, index) => (rowIndex === index ? allRows : el)));
  };

  const handleMargin = (margin, rowIndex) => {
    rows[rowIndex].margin = margin;
    setRows([...rows]);
  };

  const handlePadding = (padding, rowIndex) => {
    rows[rowIndex].padding = padding;
    setRows([...rows]);
  };



  const handleSubmit = async () => {
  
    let innerContent = ``; 
    for (let i = 0; i < rows.length; i++) {
      let paddingCompo = rows[i].padding?.split(" ");
      let marginCompo = rows[i].margin?.split(" ");

      let padding =
        rows[i].padding === ""
          ? "padding: 0px;"
          : `padding-top: ${paddingCompo[0]} !important;
          padding-left: ${paddingCompo[1]} !important;
          padding-bottom: ${paddingCompo[2]} !important;
          padding-right: ${paddingCompo[3]} !important;
          `;
      let margin =
        rows[i].margin === ""
          ? "margin: 0px;"
          : `margin-top: ${marginCompo[0]} !important;
          margin-left: ${marginCompo[1]} !important;
          margin-bottom: ${marginCompo[2]} !important;
          margin-right: ${marginCompo[3]} !important;`;

      // innerContent += `<div class="d-flex justify-content-evenly flex-wrap" style="${padding} ${margin}">`;

      for (let j = 0; j < rows[i].cols.length; j++) {
        innerContent += `
            ${rows[i].cols[j].content}
        `;
      }
      // innerContent += `</div>`;
    }
    
  
    let data = {
      htmlCode: innerContent,
    
       rows,
       title,
       
        published,
    };
    // console.log("add",data);
    if(!title || !innerContent)
    {
      return setAlert({message: "Please enter title and other details",type:"error",open:true})
     
    
    }
        if (type === "add") {
          let response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/slider/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            },{ cache: 'no-store' },
          );
          response = await response.json();
          // console.log(response);
    
          if (response?.success)
          {
            setRows([
              {
                id: uuid(),
                columnType: "one",
                padding: "",
                margin: "",
                cols: [
                  {
                    id: uuid(),
                    width: "100%",
                    content: "",
                  },
                ],
              },
            ]);
          
            setPublished(false);
            setTitle("");

           setAlert({message:"Slider created successfully!",type:"success",open:true});
           router.refresh();
  

          }else{
            setAlert({message:"Same Name Slider Not Allowed",type:"error",open:true})

          }
        }
        if (type === "edit") {
          let response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/slider/update/${rowData?.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            },{ cache: 'no-store' },
          );
          response = await response.json();
          if (response?.success)
          {
            setRows([
              {
                id: uuid(),
                columnType: "one",
                padding: "",
                margin: "",
                cols: [
                  {
                    id: uuid(),
                    width: "100%",
                    content: "",
                  },
                ],
              },
            ]);
           
           
            setTitle("");
            setPublished(false);
           
           setAlert({message:"Slider updated successfully!",type:"success",open:true});
          
           router.refresh();
  

       router.push("/admin/slider/all");
      }
        }
  };

  return (
    <>
      <RowModal
        open={openRowModal}
        setOpen={(val) => setOpenRowModal(val)}
        handleColumType={(val) => handleColumType(val, rowIndex)}
        handleMargin={(val) => handleMargin(val, rowIndex)}
        handlePadding={(val) => handlePadding(val, rowIndex)}
      />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
      >
        <Typography variant="h4" sx={{ width: "100%" }}>
          {type === "edit" ? "Update  Slider " : "Add  Slider"}
        </Typography>
        <AppSwitch
          title={"Publish"}
          checked={published}
          setChecked={(val) => setPublished(val)}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
        marginBottom={"20px"}
      >
  
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ec530e",
            ":hover": {
              backgroundColor: "#ba4a24",
            },
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          {type === "edit" ? "Update" : "Add"}
        </Button>
      </Box>
      <Box marginBottom={"20px"}>
        <Typography marginBottom={"5px"}> Title</Typography>
        <TextField
          size="medium"
          sx={{
            width: "65%",
            "& input": {
              padding: "30px",
            },
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      {/* ----------------------------------------- */}
      
      <Box padding={"15px"} backgroundColor={"#efefef"} borderRadius={"7px"}>
        {rows && rows?.map((row, index) => {
          return (
            <Fragment key={row.id}>
              <Row>
                <Grid
                  container
                  justifyContent={"end"}
                  alignItems={"center"}
                  padding={"5px"}
                  marginRight={"10px"}
                >
                               <Grid item>
                  
                  </Grid>
                </Grid>
                <Grid container justifyContent={"space-evenly"}>
                  {row?.cols?.map((col, colIndex) => {
                    return (
                      <Grid key={col.id} item width={col.width}>
                        <Col
                          colId={col.id}
                          rowIndex={index}
                          index={colIndex}
                          content={col.content}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Row>
              {rows.length > index + 1 && (
                <Box
                  marginTop={"30px"}
                  marginBottom={"0px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <IconButton
                    sx={{ backgroundColor: "#bebebe" }}
                    onClick={() => handleRowSwap(index, index + 1)}
                  >
                    <SwapVertIcon htmlColor="black" />
                  </IconButton>
                </Box>
              )}
            </Fragment>
          );
        })}
        
      </Box>
    </>
  );
};

export default SliderEditor;
