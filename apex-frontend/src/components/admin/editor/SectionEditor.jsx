"use client";

import {
  Box,
  IconButton,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Typography,
  TextField,
  Alert,
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
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import { AlertContext } from "@/context/context";
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
            <p style={{ fontSize: "12px", wordBreak: "break-all" }}>{content}</p>
          </Box>
        )}
      </Box>
    </>
  );
};

// Add Image Type in in the column,
// Add Media Menu where all the media will be stored
// Handle column HTML and show preview
// storing data in database via API
// ------------------------------------------------------------------------------------------------
const SectionEditor = ({ token, type, rowData }) => {
  // const { endpoint} = useContext(EndpointContext);
    
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
  const [endpoint, setEndpoint] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [published, setPublished] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [customValue, setCustomValue] = useState("");
  const { submitData, setSubmitData, onOpen } = useContext(ModalContext);
  const router = useRouter();
  const [color, setColor] = useState("");
  const [types, setTypes] = useState("");
  const [oneEndPoint, setOneEndPoint] = useState("");
  const [twoEndPoint, setTwoEndPoint] = useState("");
  const [threeEndPoint, setThreeEndPoint] = useState("");

  const { setAlert } = useContext(AlertContext);

  

  const handleChange = (event) => {
    setColor(event.target.value);
  };
  
  useEffect(() => {
    
    if (rowData?.data) {
      setRows(rowData?.data?.rows);
      setTitle(rowData?.data?.page?.name);
      setShortDesc(rowData?.data?.page?.description);
      if (rowData?.data?.page?.keyword?.length > 0) {
        setKeyword(rowData?.data?.page?.keyword.split(","));
      } else {
        setKeyword([]);
      }
      setPublished(rowData?.data?.page?.published === 1 ? true : false);
      setColor(rowData?.data?.page?.header_type);
      setEndpoint(rowData?.data?.page?.endpoint);
    }
  }, [rowData?.data]);
  
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
  
  const addRow = () => {
    setRows([
      ...rows,
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
  };
  
  const handleRowSwap = (index, newIndex) => {
    let temp = rows[index];
    rows[index] = rows[newIndex];
    rows[newIndex] = temp;
    setRows([...rows]);
  };
  useEffect(() => {
    
    
    let data = endpoint.split("/");
    if (data?.length == 1) {
      setOneEndPoint(data[0]);
    }
    if (data?.length == 2) {
      setOneEndPoint(data[0]);
      setTwoEndPoint(data[1]);
    }
    if (data?.length == 3) {
      setOneEndPoint(data[0]);
      setTwoEndPoint(data[1]);
      setThreeEndPoint(data[2]);
    }
    
  }, [endpoint]);
  
  const handleEndpoint = (one, two, three) => {
    if (one) {
      setEndpoint(one);
    }
    if (one && two) {
      setEndpoint(one + "/" + two);
    }
    if (one && two && three) {
      setEndpoint(one + "/" + two + "/" + three);
    }
    if (!one && !two && !three) {
      setEndpoint("/");
    }
    setOneEndPoint(one);
    setTwoEndPoint(two);
    setThreeEndPoint(three);
  };
  const handleShowPreview = () => {
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
          
          innerContent += `<div class="d-flex justify-content-evenly flex-wrap" style="${padding} ${margin}">`;
      for (let j = 0; j < rows[i].cols.length; j++) {
        innerContent += `
        <div style="width: ${rows[i].cols[j].width}">
        ${rows[i].cols[j].content}
        </div>
        `;
      }
      innerContent += `</div>`;
    }
    let data = localStorage.getItem("previewHTML");
    if (data) {
      localStorage.clear();
      localStorage.setItem("previewHTML", innerContent);
    } else {
      localStorage.setItem("previewHTML", innerContent);
    }
    window.open("/preview");
  };
  
  const removeRow = (id) => {
    setRows(rows?.filter((el) => el?.id !== id));
  };
  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };
  
  const handleAddCustomValue = (event) => {
    if(event.key === 'Enter')
 {   if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
      setKeyword([...keyword, customValue]);
      setCustomValue("");
    }}
  };
  const handleAddCUstomValue=()=>{
    if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
      setKeyword([...keyword, customValue]);
      setCustomValue("");
    }
  }
  
  const handleRemoveChip = (valueToRemove) => {
    setKeyword(keyword?.filter((value) => value !== valueToRemove));
  };
  // const showAlert = ({message, severity}) => {
  //   setOpenAlert(message);
  //   setOpenAlertdetails(severity);

  //   setTimerId(setTimeout(() => {
  //     setOpenAlert(null);
  //     setOpenAlertdetails(null);
  //   },1500));
  // };
  
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
      
      innerContent += `<div class="d-flex justify-content-evenly flex-wrap" style="${padding} ${margin}">`;

      for (let j = 0; j < rows[i].cols.length; j++) {
        innerContent += `
          <div style="width: ${rows[i].cols[j].width}">
            ${rows[i].cols[j].content}
          </div>
        `;
      }
      innerContent += `</div>`;
    }
     
    
    let data = {
      htmlCode: innerContent,
      endpoint,
      rows,
      keyword: keyword.join(","),
      name: title,
      shortDesc,
      published,
      header_type: color,
    };

    if (type === "add") {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/create`,
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
        setEndpoint("");
        setPublished(false);
        setTitle("");

        setOneEndPoint();
        setTwoEndPoint("");
        setThreeEndPoint("");
        setShortDesc("");
        setKeyword([]);
        setColor("");
       setAlert({message:"Page created successfully!",type:"success",open:true})
       router.refresh();
      ;
    
      }else{
        setAlert({message:"End Point Already  exists!",type:"error",open:true})
     
      }
    }
    if (type === "update") {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/pages/update/${rowData?.data?.page?.id}`,
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
      if (response?.success) {
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
        setEndpoint("");
        setPublished(false);
        setTitle("");
        setShortDesc("");
        setKeyword([]);
        setColor("");
     setAlert({message:"Page Updated successfully!",type:"success",open:true})
        
   router.push("/admin/app-pages/all");
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
        marginTop={"30px"}
      >
        <Typography variant="h4" 
         width={"100%"}
        >
          {type === "add" ? "Add Page" : "Update Page"}
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
          onClick={() => handleShowPreview()}
          variant="contained"
          sx={{
            backgroundColor: "#F07539",
            fontWeight: "bold",
            border: "1px solid #F07539",
            ":hover": {
              backgroundColor: "#fff",
              color: "#F07539",
              border: "1px solid #F07539",
            },
            marginRight: "10px",
          }}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#F07539",
            border: "1px solid #F07539",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#F07539",
              color: "#fff",
            },
          }}
          onClick={() => {
            handleSubmit();
          }}
        >
          {type === "add" ? "Add Page" : "Update"}
        </Button>
      </Box>
      <Box marginBottom={"20px"}>
        <Typography marginBottom={"5px"}>Add Title</Typography>
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
      <Box marginBottom={"20px"}>
        <Typography marginBottom={"5px"}>Add Short Description</Typography>
        <TextField
          size="medium"
          sx={{
            width: "65%",
            "& textarea": {
              paddingRight: "10px",
              paddingLeft: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
            },
          }}
          value={shortDesc}
          multiline
          rows={2}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </Box>
      <div style={{ marginBottom: "20px" }}>
        <Typography marginBottom={"5px"}>Keywords</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            value={customValue}
            onChange={handleCustomInputChange}
            size="medium"
            sx={{
              width: "50%",
              "& input": {
                padding: "21px",
              },
            }}
            variant="outlined"
            onKeyUp={handleAddCustomValue}
          />
          <Button variant="contained" onClick={handleAddCUstomValue}
          sx={{
            backgroundColor: "#F07539",
            fontWeight: "bold",
            border: "1px solid #F07539",
            ":hover": {
              backgroundColor: "#fff",
              color: "#F07539",
              border: "1px solid #F07539",
            },
            marginRight: "10px",
          }}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} marginTop={1}>
          {keyword?.map((value) => (
            <Chip
              key={value}
              label={value}
              color="info"
              size="medium"
              variant="elevated"
              onDelete={() => handleRemoveChip(value)}
            />
          ))}
        </Box>
        {/* for header_type */}
        {/* <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl>
            <Typography marginBottom={"5px"}>Header Type</Typography>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={color}
              onChange={handleChange}
            >
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="black">Black</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
      </div>

      {/* ---------------------------- */}
      <Box marginBottom={"20px"}>
      <Typography marginBottom={"5px"}>Add Endpoint</Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"65%"}
     
      >
        <TextField
          size='medium'
          sx={{
            "& input": {
              padding: "20px",
            },
            width: "25%",
          }}
          value={oneEndPoint}
          onChange={(e) =>
            handleEndpoint(e.target.value, twoEndPoint, threeEndPoint)
          }
        />
        <Typography variant='h5'>/</Typography>
        <TextField
          sx={{
            "& input": {
              padding: "20px",
            },
            width: "25%",
          }}
          size='medium'
          value={twoEndPoint}
          onChange={(e) =>
            handleEndpoint(oneEndPoint, e.target.value, threeEndPoint)
          }
        />
        <Typography variant='h5'>/</Typography>
        <TextField
          sx={{
            "& input": {
              padding: "20px",
            },
            width: "25%",
          }}
          size='medium'
          value={threeEndPoint}
          onChange={(e) =>
            handleEndpoint(oneEndPoint, twoEndPoint, e.target.value)
          }
        />
      </Box>
      </Box>
 {/* ----------------------------------------- */}
      {/* <Box marginBottom={"20px"}>
        <AddEndpoint
         
          endpoint={rowData?.data?.page?.endpoint}
         setEndpoint={(val) => setEndpoint(val)}
         type={openAlertdetails}
        />
      </Box> */}
      <Box padding={"15px"} backgroundColor={"#efefef"} borderRadius={"7px"}>
        {rows?.map((row, index) => {
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
                  <Grid item marginRight={"5px"}>
                    <IconButton
                      sx={{
                        ":hover": {
                          color: "black",
                        },
                        backgroundColor: "grey",
                        color: "white",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setRowIndex(index);
                        onOpen(
                          {
                            columnType: row?.columnType,
                            margin: row?.margin
                              ?.split(" ")
                              .map((el) => el?.replace("px", "")),
                            padding: row?.padding
                              ?.split(" ")
                              .map((el) => el?.replace("px", "")),
                          },
                          "rowModal"
                        );
                      }}
                    >
                      <EditIcon
                        sx={{
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      sx={{
                        ":hover": {
                          color: "black",
                        },
                        backgroundColor: "grey",
                        color: "white",
                        borderRadius: "5px",
                      }}
                      onClick={() => removeRow(row?.id)}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: "18px",
                        }}
                      />
                    </IconButton>
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
        <Box
          padding={"10px"}
          border={"1px dotted black"}
          borderRadius={"8px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton onClick={() => addRow()}>
            <AddBoxIcon sx={{ fontSize: "40px", color: "" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default SectionEditor;
