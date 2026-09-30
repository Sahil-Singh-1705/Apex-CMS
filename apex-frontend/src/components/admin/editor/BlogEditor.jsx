"use client";

import {
  Box,
  IconButton,
  Grid,
  Select,
  Input,
  MenuItem,
  Button,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
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
            <p style={{ fontSize: "12px" }}>{content}</p>
          </Box>
        )}
      </Box>
    </>
  );
};

const BlogEditor = ({ token, type, rowData, category_list }) => {
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
  
  const [rowIndex, setRowIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [published, setPublished] = useState(false);
  const [keyword, setKeyword] = useState([]);
  const [customValue, setCustomValue] = useState("");
  const { submitData, setSubmitData, onOpen } = useContext(ModalContext);
  const [color, setColor] = useState([]);
  const [Customclass, setCustomclass] = useState("");
  const [openRowModal, setOpenRowModal] = useState(false);
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const [selectedThumbnailImage, setSelectedThumbnailImage] = useState(null);
  const [previewBannerImage, setPreviewBannerImage] = useState("");
  const [previewThumbnailImage, setPreviewThumbnailImage] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const { setAlert } = useContext(AlertContext);
  const [excerpt, setExcerpt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (rowData) {
      setRows(rowData?.rows || [{
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
      }]);
      setTitle(rowData?.blog?.title || "");
      setSubTitle(rowData?.blog?.subtitle || "");
      setExcerpt(rowData?.blog?.excerpt || "");
      setCustomclass(rowData?.blog?.customclass || "");
      setAuthor(rowData?.blog?.author || "");
      
      if (rowData?.blog?.category_id) {
        const categories = rowData.blog.category_id.split(',').map(category => category.trim());
        setColor(categories);
      }
      
      if (rowData?.blog?.thumbnail_image) {
        setSelectedThumbnailImage(rowData?.blog?.thumbnail_image);
        setPreviewThumbnailImage(
          `${process.env.NEXT_PUBLIC_API_URL}/static/images/${rowData?.blog?.thumbnail_image}`
        );
      }
      
      if (rowData?.blog?.banner_image) {
        setSelectedBannerImage(rowData?.blog?.banner_image);
        setPreviewBannerImage(
          `${process.env.NEXT_PUBLIC_API_URL}/static/images/${rowData?.blog?.banner_image}`
        );
      }

      setShortDesc(rowData?.blog?.description || "");
      setSlug(rowData?.blog?.slug || "");
      
      if (rowData?.blog?.keyword?.length > 0) {
        setKeyword(rowData?.blog?.keyword.split(","));
      } else {
        setKeyword([]);
      }

      setPublished(rowData?.blog?.published === "true" ? true : false);
    }
  }, [rowData]);

  useEffect(() => {
    if (submitData["colId"]) {
      let allRows = [...rows];
      allRows[submitData["rowIndex"]].cols[submitData["index"]] = {
        ...allRows[submitData["rowIndex"]].cols[submitData["index"]],
        content: submitData.content,
      };
      setRows(allRows);
      setSubmitData("");
    }
  }, [submitData]);

  const handleColumType = (value, rowIndex) => {
    let arr = value.split("-");
    let allRows = [...rows];
    let currentRow = { ...allRows[rowIndex] };
    currentRow.columnType = value;
    
    if (currentRow.cols.length > arr.length) {
      let allRowsLength = currentRow.cols.length;
      if (arr.length === 1) {
        for (let i = 0; i < allRowsLength - arr.length; i++) {
          currentRow.cols.pop();
        }
      } else {
        for (let i = 0; i <= allRowsLength - arr.length; i++) {
          currentRow.cols.pop();
        }
      }
    }
    
    for (let i = 0; i < arr.length; i++) {
      if (currentRow.cols[i]) {
        currentRow.cols[i].width =
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
        currentRow.cols.push({
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
    
    allRows[rowIndex] = currentRow;
    setRows(allRows);
  };

  const handleMargin = (margin, rowIndex) => {
    let allRows = [...rows];
    allRows[rowIndex].margin = margin;
    setRows(allRows);
  };

  const handlePadding = (padding, rowIndex) => {
    let allRows = [...rows];
    allRows[rowIndex].padding = padding;
    setRows(allRows);
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
    let allRows = [...rows];
    let temp = allRows[index];
    allRows[index] = allRows[newIndex];
    allRows[newIndex] = temp;
    setRows(allRows);
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
    
    localStorage.setItem("previewHTML", innerContent);
    window.open("/preview");
  };

  const removeRow = (id) => {
    setRows(rows?.filter((el) => el?.id !== id));
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleAddCustomValue = (event) => {
    if (event.key === "Enter") {
      if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
        setKeyword([...keyword, customValue]);
        setCustomValue("");
      }
    }
  };

  const handleAddCUstomValue = () => {
    if (customValue.trim() !== "" && !keyword?.includes(customValue)) {
      setKeyword([...keyword, customValue]);
      setCustomValue("");
    }
  };

  const handlecategoryChange = (event) => {
    setColor(event.target.value);
  };

  const handleImageBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBannerImage = () => {
    setSelectedBannerImage(null);
    setPreviewBannerImage("");
  };

  const handleImageThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnailImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewThumbnailImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnailImage = () => {
    setSelectedThumbnailImage(null);
    setPreviewThumbnailImage("");
  };

  const handleRemoveChip = (valueToRemove) => {
    setKeyword(keyword?.filter((value) => value !== valueToRemove));
  };

  const handleChangeTitleSlug = (type, e) => {
    if (type === "title") {
      setTitle(e.target.value);
      setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
    } else {
      setSlug(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      // Validation
      if (!selectedThumbnailImage) {
        setAlert({
          message: "Please upload thumbnail image",
          type: "warning",
          open: true,
        });
        setIsSubmitting(false);
        return;
      }

      if (published) {
        if (!title) {
          setAlert({
            message: "Please enter title",
            type: "warning",
            open: true,
          });
          setIsSubmitting(false);
          return;
        }
        if (!author) {
          setAlert({
            message: "Please enter author",
            type: "warning",
            open: true,
          });
          setIsSubmitting(false);
          return;
        }
        if (!excerpt) {
          setAlert({
            message: "Please enter excerpt",
            type: "warning",
            open: true,
          });
          setIsSubmitting(false);
          return;
        }
      }

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
              padding-right: ${paddingCompo[3]} !important;`;
        
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
              ${rows[i].cols[j].content || ""}
            </div>
          `;
        }
        innerContent += `</div>`;
      }

      const formData = new FormData();
      
      // Add banner image if exists
      if (selectedBannerImage) {
        formData.append("banner_image", selectedBannerImage);
      }
      
      // Add thumbnail image
      formData.append("thumbnail_image", selectedThumbnailImage);
      
      // Add text fields
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("keyword", keyword.join(","));
      formData.append("author", author);
      formData.append("description", shortDesc);
      formData.append("excerpt", excerpt);
      formData.append("htmlCode", innerContent);
      formData.append("published", published.toString());
      formData.append("slug", slug);
      formData.append("customclass", Customclass);
      
      // Handle category_id properly - convert array to comma-separated string
      let categoryValue = "";
      if (Array.isArray(color) && color.length > 0) {
        categoryValue = color.join(",");
      } else if (color) {
        categoryValue = color;
      }
      formData.append("category_id", categoryValue);
      
      // Stringify rows for sending
      formData.append("rows", JSON.stringify(rows));

      // Debug log
      console.log("Submitting form data:");
      console.log("Title:", title);
      console.log("Category ID:", categoryValue);
      console.log("Rows count:", rows.length);
      console.log("Thumbnail image:", selectedThumbnailImage ? "Yes" : "No");

      let url, method;
      
      if (type === "add") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/addblog`;
        method = "POST";
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/updateblog/${rowData?.blog?.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      
      console.log("API Response:", result);

      if (result?.success) {
        // Reset form only for add operation
        if (type === "add") {
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
          
          setExcerpt("");
          setPublished(false);
          setSlug("");
          setTitle("");
          setAuthor("");
          setSubTitle("");
          setShortDesc("");
          setKeyword([]);
          setColor([]);
          setCustomclass("");
          setSelectedBannerImage(null);
          setSelectedThumbnailImage(null);
          setPreviewThumbnailImage("");
          setPreviewBannerImage("");
          setCustomValue("");
        }
        
        setAlert({
          message: `Content ${type === "add" ? "created" : "updated"} successfully!`,
          type: "success",
          open: true,
        });
        
        if (type === "update") {
          router.push("/admin/blog/all");
        } else {
          router.refresh();
        }
      } else {
        setAlert({
          message: result?.error || result?.message || `Content not ${type === "add" ? "created" : "updated"}!`,
          type: "error",
          open: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert({
        message: "Network error. Please try again.",
        type: "error",
        open: true,
      });
    } finally {
      setIsSubmitting(false);
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
        <Typography variant="h4" width={"100%"}>
          {type === "add" ? "Add Content" : "Update Content"}
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
            backgroundColor: "#fff",
            color: "#F07539",
            border: "1px solid #F07539",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#F07539",
              color: "#fff",
            },
            "&.Mui-disabled": {
              backgroundColor: "#f5f5f5",
              color: "#bdbdbd",
              border: "1px solid #e0e0e0",
            }
          }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : (type === "add" ? "Add Content" : "Update Content")}
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Title *</Typography>
              <TextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "10px",
                  },
                }}
                value={title}
                onChange={(e) => handleChangeTitleSlug("title", e)}
                required={published}
                error={published && !title}
                helperText={published && !title ? "Title is required when publishing" : ""}
              />
            </Box>
          </Grid>
          
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Author {published && "*"}</Typography>
              <TextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "10px",
                  },
                }}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required={published}
                error={published && !author}
                helperText={published && !author ? "Author is required when publishing" : ""}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography marginBottom={"5px"}>Keywords</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  value={customValue}
                  onChange={handleCustomInputChange}
                  size="small"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      padding: "10px",
                    },
                  }}
                  variant="outlined"
                  onKeyUp={handleAddCustomValue}
                  placeholder="Type and press Enter to add"
                />
                <Button
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
                  }}
                  onClick={handleAddCUstomValue}
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
            </Box>
          </Grid>
          
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Slug</Typography>
              <TextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "10px",
                  },
                }}
                value={slug}
                onChange={(e) => handleChangeTitleSlug("slug", e)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box marginBottom={"20px"}>
        <Typography marginBottom={"5px"}>Short Description</Typography>
        <TextField
          size="normal"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              padding: "5px",
            },
          }}
          value={shortDesc}
          multiline
          rows={2}
          onChange={(e) => setShortDesc(e.target.value)}
        />
      </Box>

      <Box marginBottom={"20px"}>
        <Typography marginBottom={"5px"}>Excerpt {published && "*"}</Typography>
        <TextField
          size="normal"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              padding: "5px",
            },
          }}
          value={excerpt}
          multiline
          rows={2}
          onChange={(e) => setExcerpt(e.target.value)}
          required={published}
          error={published && !excerpt}
          helperText={published && !excerpt ? "Excerpt is required when publishing" : "Brief summary of the content"}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <Typography marginBottom={"5px"}>Category</Typography>
                <Select
                  sx={{ height: "50px" }}
                  labelId="category-select-label"
                  id="category-select"
                  multiple
                  value={color || []}
                  onChange={handlecategoryChange}
                  displayEmpty
                >
                  {category_list && category_list?.map((value) => (
                    <MenuItem key={value.category_name} value={value.category_name}>
                      {value.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Custom CSS Class</Typography>
              <TextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "10px",
                  },
                }}
                value={Customclass}
                onChange={(e) => setCustomclass(e.target.value)}
                placeholder="custom-class-name"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} marginBottom={"20px"}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              padding="15px"
              backgroundColor="#efefef"
              borderRadius="7px"
              minHeight="120px"
            >
              <Box>
                <InputLabel htmlFor="upload-banner">
                  <Button 
                    variant="contained" 
                    component="span"
                    sx={{
                      backgroundColor: "#F07539",
                      fontWeight: "bold",
                      border: "1px solid #F07539",
                      ":hover": {
                        backgroundColor: "#fff",
                        color: "#F07539",
                        border: "1px solid #F07539",
                      },
                    }}
                  >
                    Upload Banner Image
                  </Button>
                </InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-banner"
                  onChange={handleImageBannerChange}
                />

                {previewBannerImage && (
                  <Box style={{ position: "relative", marginLeft: "20px" }}>
                    <Box>
                      <img
                        src={previewBannerImage}
                        alt="Banner Preview"
                        style={{
                          width: "150px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        top: "-10px",
                        right: "-10px",
                      }}
                    >
                      <IconButton onClick={handleRemoveBannerImage} size="small">
                        <CancelIcon sx={{ fontSize: "20px", color: "red" }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              alignItems="center"
              padding="15px"
              backgroundColor="#efefef"
              borderRadius="7px"
              minHeight="120px"
            >
              <Box>
                <InputLabel htmlFor="upload-thumbnail">
                  <Button 
                    variant="contained" 
                    component="span"
                    sx={{
                      backgroundColor: "#F07539",
                      fontWeight: "bold",
                      border: "1px solid #F07539",
                      ":hover": {
                        backgroundColor: "#fff",
                        color: "#F07539",
                        border: "1px solid #F07539",
                      },
                    }}
                  >
                    Upload Thumbnail Image *
                  </Button>
                </InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-thumbnail"
                  onChange={handleImageThumbnailChange}
                  required
                />

                {previewThumbnailImage && (
                  <Box style={{ position: "relative", marginLeft: "20px" }}>
                    <Box>
                      <img
                        src={previewThumbnailImage}
                        alt="Thumbnail Preview"
                        style={{
                          width: "150px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        top: "-10px",
                        right: "-10px",
                      }}
                    >
                      <IconButton onClick={handleRemoveThumbnailImage} size="small">
                        <CancelIcon sx={{ fontSize: "20px", color: "red" }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
                
                {!selectedThumbnailImage && (
                  <Typography variant="caption" color="error" display="block" mt={1}>
                    Thumbnail image is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

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
                          colId={type === "add" ? col.id : col.colId}
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
          <IconButton onClick={addRow}>
            <AddBoxIcon sx={{ fontSize: "40px", color: "black" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default BlogEditor;