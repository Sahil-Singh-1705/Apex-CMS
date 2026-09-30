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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { logError } from "@/utils/logger";

const Row = ({ children }) => {
  return (
    <Box position={"relative"} marginBottom={"15px"}>
      {children}
    </Box>
  );
};

const Col = ({ colId, index, rowIndex, content }) => {
  const { onOpen } = useContext(ModalContext);
  const [hoverParent, setHoverParent] = useState(false);

  return (
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
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      )}
    </Box>
  );
};

const NewsEditor = ({ token, type, rowData, category_list }) => {
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
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [featured, setFeatured] = useState(false);
  const [relatedNews, setRelatedNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  
  const { submitData, setSubmitData, onOpen } = useContext(ModalContext);
  const router = useRouter();
  const { setAlert } = useContext(AlertContext);

  // Fetch existing news for related news selection
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = await response.json();
  
        if (response.ok && data?.success) {
          setAllNews(data.news || []);
        } else {
          throw new Error(data?.message || "Failed to fetch news");
        }
  
      } catch (error) {
        logError(error, "Fetch News");
      }
    };
  
    if (token) {
      fetchNews();
    }
  }, [token]);

  useEffect(() => {
    if (rowData) {
      setRows(rowData?.rows || [{
        id: uuid(),
        columnType: "one",
        padding: "",
        margin: "",
        cols: [{ id: uuid(), width: "100%", content: "" }],
      }]);
      setTitle(rowData?.news?.title || "");
      setSlug(rowData?.news?.slug || "");
      setAuthor(rowData?.news?.author || "");
      setExcerpt(rowData?.news?.excerpt || "");
      setTags(rowData?.news?.tags?.split(",").filter(tag => tag.trim()) || []);
      setPublishDate(new Date(rowData?.news?.publish_date) || new Date());
      setFeatured(rowData?.news?.featured === "true");
      setPublished(rowData?.news?.published === "true");
      
      if (rowData?.news?.featured_image) {
        setSelectedImage(rowData?.news?.featured_image);
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_API_URL}/static/images/${rowData?.news?.featured_image}`
        );
      }

      if (rowData?.news?.related_news) {
        const related = rowData.news.related_news.split(",").map(id => id.trim());
        setRelatedNews(related);
      }
    }
  }, [rowData]);

  useEffect(() => {
    if (submitData["colId"]) {
      let allRows = rows;
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
          arr[i] === "half" ? "49%" :
          arr[i] === "three" ? "32.3%" :
          arr[i] === "four" ? "24%" :
          arr[i] === "threefour" ? "73%" :
          arr[i] === "five" ? "19%" :
          arr[i] === "six" ? "15.6%" : "100%";
      } else {
        allRows.cols.push({
          content: "",
          width: arr[i] === "half" ? "49%" :
                 arr[i] === "three" ? "32.3%" :
                 arr[i] === "four" ? "24%" :
                 arr[i] === "threefour" ? "73%" :
                 arr[i] === "five" ? "19%" :
                 arr[i] === "six" ? "15.6%" : "100%",
          id: uuid(),
        });
      }
    }
    setRows(rows.map((el, index) => (rowIndex === index ? allRows : el)));
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

  const removeRow = (id) => {
    setRows(rows.filter((el) => el?.id !== id));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage("");
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleRelatedNewsChange = (event) => {
    setRelatedNews(event.target.value);
  };

  const generateHTMLContent = () => {
    let innerContent = ``;
    for (let i = 0; i < rows.length; i++) {
      let paddingCompo = rows[i].padding?.split(" ");
      let marginCompo = rows[i].margin?.split(" ");

      let padding = rows[i].padding === "" ? "padding: 0px;" : `
        padding-top: ${paddingCompo[0]} !important;
        padding-left: ${paddingCompo[1]} !important;
        padding-bottom: ${paddingCompo[2]} !important;
        padding-right: ${paddingCompo[3]} !important;
      `;
      
      let margin = rows[i].margin === "" ? "margin: 0px;" : `
        margin-top: ${marginCompo[0]} !important;
        margin-left: ${marginCompo[1]} !important;
        margin-bottom: ${marginCompo[2]} !important;
        margin-right: ${marginCompo[3]} !important;
      `;

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
    return innerContent;
  };

  const handleSubmit = async () => {
    if (published) {
      if (!title) {
        return setAlert({
          message: "Please enter title",
          type: "warning",
          open: true,
        });
      }
      if (!selectedImage) {
        return setAlert({
          message: "Please upload featured image",
          type: "warning",
          open: true,
        });
      }
    }

    const htmlContent = generateHTMLContent();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", author);
    formData.append("excerpt", excerpt);
    formData.append("tags", tags.join(","));
    formData.append("featured_image", selectedImage);
    formData.append("publish_date", publishDate.toISOString());
    formData.append("featured", featured);
    formData.append("published", published);
    formData.append("html_content", htmlContent);
    formData.append("rows", JSON.stringify(rows));
    
    if (relatedNews.length > 0) {
      formData.append("related_news", relatedNews.join(","));
    }

    try {
      let url = type === "add" 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/addnews`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/updatenews/${rowData?.news?.id}`;
      
      let method = type === "add" ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result?.success) {
        // Reset form
        setRows([{
          id: uuid(),
          columnType: "one",
          padding: "",
          margin: "",
          cols: [{ id: uuid(), width: "100%", content: "" }],
        }]);
        setTitle("");
        setSlug("");
        setAuthor("");
        setExcerpt("");
        setTags([]);
        setSelectedImage(null);
        setPreviewImage("");
        setPublishDate(new Date());
        setFeatured(false);
        setPublished(false);
        setRelatedNews([]);

        setAlert({
          message: type === "add" ? "News created successfully!" : "News updated successfully!",
          type: "success",
          open: true,
        });

        if (type === "update") {
          router.push("/admin/news/all");
        }
        router.refresh();
      } else {
        setAlert({
          message: result?.message || "Operation failed!",
          type: "error",
          open: true,
        });
      }
    } catch (error) {
      setAlert({
        message: "Network error occurred!",
        type: "error",
        open: true,
      });
    }
  };

  const handleChangeTitleSlug = (type, e) => {
    if (type === "title") {
      const value = e.target.value;
      setTitle(value);
      setSlug(value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    } else {
      setSlug(e.target.value);
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"20px"}
        marginTop={"30px"}
      >
        <Typography variant="h4" width={"100%"}>
          {type === "add" ? "Add News" : "Edit News"}
        </Typography>
        <Box display="flex" gap={2}>
          <AppSwitch
            title={"Featured"}
            checked={featured}
            setChecked={(val) => setFeatured(val)}
          />
          <AppSwitch
            title={"Publish"}
            checked={published}
            setChecked={(val) => setPublished(val)}
          />
        </Box>
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
            backgroundColor: "#F07539",
            fontWeight: "bold",
            border: "1px solid #F07539",
            ":hover": {
              backgroundColor: "#fff",
              color: "#F07539",
              border: "1px solid #F07539",
            },
          }}
          onClick={handleSubmit}
        >
          {type === "add" ? "Add News" : "Update News"}
        </Button>
      </Box>

      {/* Basic Information Section */}
      <Box sx={{ flexGrow: 1 }} marginBottom={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>News Title *</Typography>
              <TextField
                fullWidth
                value={title}
                onChange={(e) => handleChangeTitleSlug("title", e)}
                required={published}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Slug</Typography>
              <TextField
                fullWidth
                value={slug}
                onChange={(e) => handleChangeTitleSlug("slug", e)}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Author *</Typography>
              <TextField
                fullWidth
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required={published}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box marginBottom={"20px"}>
              <Typography marginBottom={"5px"}>Publish Date</Typography>
              <DatePicker
                selected={publishDate}
                onChange={(date) => setPublishDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={<TextField fullWidth />}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Featured Image */}
      <Box marginBottom={3}>
        <Typography marginBottom={"5px"}>Featured Image *</Typography>
        <Box
          display="flex"
          alignItems="center"
          padding="15px"
          backgroundColor="#efefef"
          borderRadius="7px"
        >
          <InputLabel htmlFor="featured-image-upload">
            <Button 
              variant="contained" 
              component="span"
              sx={{
                backgroundColor: "#F07539",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#fff",
                  color: "#F07539",
                  border: "1px solid #F07539",
                },
                marginRight: "10px",
              }}
            >
              Upload Featured Image
            </Button>
          </InputLabel>
          <Input
            accept="image/*"
            id="featured-image-upload"
            type="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {previewImage && (
            <Box position="relative">
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "150px",
                  marginLeft: "20px",
                  objectFit: "cover",
                }}
              />
              <IconButton 
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: "-15px",
                  right: "-15px",
                  backgroundColor: "white",
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                <CancelIcon sx={{ fontSize: "20px", color: "red" }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      {/* Excerpt */}
      <Box marginBottom={3}>
        <Typography marginBottom={"5px"}>Excerpt</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </Box>

      {/* Tags */}
      <Box marginBottom={3}>
        <Typography marginBottom={"5px"}>Tags</Typography>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
          <TextField
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleAddTag}
            placeholder="Type tag and press Enter"
            size="small"
            sx={{ flex: 1 }}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {/* Related News */}
      <Box marginBottom={3}>
        <Typography marginBottom={"5px"}>Related News</Typography>
        <FormControl fullWidth>
          <Select
            multiple
            value={relatedNews}
            onChange={handleRelatedNewsChange}
            renderValue={(selected) => selected.length + " news selected"}
          >
            {allNews
              .filter(news => news.id !== rowData?.news?.id)
              .map((news) => (
                <MenuItem key={news.id} value={news.id}>
                  {news.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {/* Content Editor */}
      <Box padding={"15px"} backgroundColor={"#efefef"} borderRadius={"7px"} marginTop={3}>
        {rows?.map((row, index) => (
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
                      backgroundColor: "grey",
                      color: "white",
                      borderRadius: "5px",
                      "&:hover": { color: "black" },
                    }}
                    onClick={() => {
                      setRowIndex(index);
                      onOpen(
                        {
                          columnType: row?.columnType,
                          margin: row?.margin?.split(" ").map(el => el?.replace("px", "")),
                          padding: row?.padding?.split(" ").map(el => el?.replace("px", "")),
                        },
                        "rowModal"
                      );
                    }}
                  >
                    <EditIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{
                      backgroundColor: "grey",
                      color: "white",
                      borderRadius: "5px",
                      "&:hover": { color: "black" },
                    }}
                    onClick={() => removeRow(row?.id)}
                  >
                    <CloseIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-evenly"}>
                {row?.cols?.map((col, colIndex) => (
                  <Grid key={col.id} item width={col.width}>
                    <Col
                      colId={type === "add" ? col.id : col.colId}
                      rowIndex={index}
                      index={colIndex}
                      content={col.content}
                    />
                  </Grid>
                ))}
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
                  onClick={() => {
                    const newRows = [...rows];
                    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
                    setRows(newRows);
                  }}
                >
                  <SwapVertIcon htmlColor="black" />
                </IconButton>
              </Box>
            )}
          </Fragment>
        ))}
        <Box
          padding={"10px"}
          border={"1px dotted black"}
          borderRadius={"8px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={2}
        >
          <IconButton onClick={addRow}>
            <AddBoxIcon sx={{ fontSize: "40px", color: "#F07539" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default NewsEditor;
