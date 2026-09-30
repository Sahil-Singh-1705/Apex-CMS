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

// Add Image Type in in the column,
// Add Media Menu where all the media will be stored
// Handle column HTML and show preview
// storing data in database via API
// ----------------------------------------------------------------------------------------------/////////////////////////////////////////////////////////////////////////////////////--
const PopupEditor = ({ token, type, rowData ,pages}) => {

   
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
  // console.log(rows)
  const [openRowModal, setOpenRowModal] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
  const [choosenpage, setChoosenpage] = useState("");
  const [choosensize, setChoosensize] = useState("");
  const { submitData, setSubmitData, onOpen } = useContext(ModalContext);
//  console.log(published)
  useEffect(() => {
    if (rowData) {
      // Set title and published state from rowData
      setTitle(rowData.title);
      setPublished(rowData.published === 1 ? true : false);
      setChoosenpage(rowData?.choosenpage);
      setChoosensize(rowData?.choosensize);


      // Parse HTML code and set rows state
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
            id: id, // Use the row ID as the column ID
            width: "100%",
            content: htmlCode, // Set the provided HTML content
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

  // const addRow = () => {
  //   setRows([
  //     ...rows,
  //     {
  //       id: uuid(),
  //       columnType: "one",
  //       padding: "",
  //       margin: "",
  //       cols: [
  //         {
  //           id: uuid(),
  //           width: "100%",
  //           content: "",
  //         },
  //       ],
  //     },
  //   ]);
  // };

  // const handleRowSwap = (index, newIndex) => {
  //   let temp = rows[index];
  //   rows[index] = rows[newIndex];
  //   rows[newIndex] = temp;
  //   setRows([...rows]);
  // };
    const handlechoosenpage = (e) => {
      setChoosenpage(e.target.value)
    }
    const handlechoosensize = (e) => {
      setChoosensize(e.target.value)
    }
  // const handleShowPreview = () => {
  //   let innerContent = ``;
  //   for (let i = 0; i < rows.length; i++) {
  //     let paddingCompo = rows[i].padding?.split(" ");
  //     let marginCompo = rows[i].margin?.split(" ");

  //     let padding =
  //       rows[i].padding === ""
  //         ? "padding: 0px;"
  //         : `padding-top: ${paddingCompo[0]} !important;
  //         padding-left: ${paddingCompo[1]} !important;
  //         padding-bottom: ${paddingCompo[2]} !important;
  //         padding-right: ${paddingCompo[3]} !important;
  //         `;
  //     let margin =
  //       rows[i].margin === ""
  //         ? "margin: 0px;"
  //         : `margin-top: ${marginCompo[0]} !important;
  //         margin-left: ${marginCompo[1]} !important;
  //         margin-bottom: ${marginCompo[2]} !important;
  //         margin-right: ${marginCompo[3]} !important;`;

  //     innerContent += `<div class="d-flex justify-content-evenly flex-wrap" style="${padding} ${margin}">`;
  //     for (let j = 0; j < rows[i].cols.length; j++) {
  //       innerContent += `
  //       <div style="width: ${rows[i].cols[j].width}">
  //       ${rows[i].cols[j].content}
  //       </div>
  //       `;
  //     }
  //     innerContent += `</div>`;
  //   }
  //   let data = localStorage.getItem("previewHTML");
  //   if (data) {
  //     localStorage.clear();
  //     localStorage.setItem("previewHTML", innerContent);
  //   } else {
  //     localStorage.setItem("previewHTML", innerContent);
  //   }
  //   window.open("/preview");
  // };

  // const removeRow = (id) => {
  //   setRows(rows?.filter((el) => el?.id !== id));
  // };

  //     setCustomValue(event.target.value);
  //   };

  //   const handleAddCustomValue = (event) => {
  //     if(event.key === 'Enter')
  //  {   if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
  //       setKeyword([...keyword, customValue]);
  //       setCustomValue("");
  //     }}
  //   };
  //   const handleAddCUstomValue=()=>{
  //     if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
  //       setKeyword([...keyword, customValue]);
  //       setCustomValue("");
  //     }
  //   }

  //   const handleRemoveChip = (valueToRemove) => {
  //     setKeyword(keyword?.filter((value) => value !== valueToRemove));
  //   };
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
      choosenpage,
      choosensize,
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/popup/add`,
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
            setChoosenpage("");
            setChoosensize("");
            setPublished(false);
            setTitle("");

           setAlert({message:"Popup created successfully!",type:"success",open:true});
           router.refresh();
  

          }else{
            setAlert({message:"Same Name Popup Not Allowed",type:"error",open:true})

          }
        }
        if (type === "edit") {
          let response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/popup/update/${rowData?.id}`,
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
            setChoosenpage("");
            setChoosensize("");
           setAlert({message:"Popup updated successfully!",type:"success",open:true});
          
           router.refresh();
  

       router.push("/admin/popup/all");
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
          {type === "edit" ? "Update  Pop Up " : "Add  Pop Up"}
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
        {/* <Button
          onClick={() => handleShowPreview()}
          variant="contained"
          sx={{
            backgroundColor: "#a4c525",
            ":hover": {
              backgroundColor: "#8c9726",
            },
            marginRight: "10px",
          }}
        >
          Preview
        </Button> */}
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: 2 }}>
              <FormControl>
                <Typography marginBottom={"5px"}>Choose target</Typography>

                <Select
  sx={{ minWidth: "540px", height: "50px" }}
  labelId="demo-simple-select-label"
  id="demo-simple-select"

  value={choosenpage} 
   onChange={handlechoosenpage}
>
  {pages && pages?.data.map((value) => (
    <MenuItem key={value.id} value={value.name}>
      {value.name}
    </MenuItem>
  ))}
</Select>

              </FormControl>
            </Box>
          </Grid>
     
        </Grid>
      </Box>
      {/* ----------------------------------------- */}
      <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl>
          <Typography marginBottom={"5px"}>Choose Size</Typography>

          <Select
            sx={{  height: "50px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={choosensize} 
            onChange={handlechoosensize}
          >
            <MenuItem value="xs">xs</MenuItem>
            <MenuItem value="sm">sm</MenuItem>
            <MenuItem value="md">md</MenuItem>
            <MenuItem value="lg">lg</MenuItem>
            <MenuItem value="xl">xl</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Grid>
  </Grid>
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
                  {/* <Grid item marginRight={"5px"}>
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
                  </Grid> */}
                  <Grid item>
                    {/* <IconButton
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
                    </IconButton> */}
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
        {/* <Box
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
        </Box> */}
      </Box>
    </>
  );
};

export default PopupEditor;
