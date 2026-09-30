"use client";

import { useEffect, useState, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { logError } from "@/utils/logger";
import { AlertContext } from "@/context/context";

export default function FooterEditor() {
  const { setAlert } = useContext(AlertContext);
  const [data, setData] = useState({
    company_name: "",
    register_no: "",
    description: "",
    email: "",
    support_email: "",
    phone: "",
    registered_address: "",
    physical_address: "",
    risk_disclosure: "",
    restricted_regions: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/footer/footer`
        );

        const result = await res.json();

        if (res.ok && result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || "Footer fetch failed");
        }
      } catch (error) {
        logError(error, "Fetch Footer");
      
        setAlert({
          open: true,
          type: "error",
          message: "Failed to load footer data",
        });
      }
    };

    fetchFooter();
  }, []);

  const saveFooter = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/footer/footer/1`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      let result;
  
      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid JSON response from server");
      }
  
      if (response.ok && result.success) {
        setAlert({
          open: true,
          type: "success",
          message: "Footer Updated Successfully",
        });
      } else {
        throw new Error(result.message || "Footer update failed");
      }
    } catch (error) {
      logError(error, "Update Footer");
  
      setAlert({
        open: true,
        type: "error",
        message: error.message || "Server error while updating footer",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, margin: "auto", padding: 3, marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Footer Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Company Info */}

        <Grid item xs={12}>
          <Typography variant="h6">Company Information</Typography>
          <Divider
            sx={{
              mb: 2,
              backgroundColor: "#000000",
              height: "3px",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Company Name"
            name="company_name"
            fullWidth
            value={data.company_name || ""}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Register Number"
            name="register_no"
            fullWidth
            value={data.register_no}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={data.description}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        {/* Contact */}

        <Grid item xs={12}>
          <Typography variant="h6">Contact Information</Typography>
          <Divider
            sx={{
              mb: 2,
              backgroundColor: "#000000",
              height: "3px",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={data.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Support Email"
            name="support_email"
            fullWidth
            value={data.support_email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={data.phone}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        {/* Address */}

        <Grid item xs={12}>
          <Typography variant="h6">Address</Typography>
          <Divider
            sx={{
              mb: 2,
              backgroundColor: "#000000",
              height: "3px",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Registered Address"
            name="registered_address"
            fullWidth
            multiline
            rows={2}
            value={data.registered_address}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Physical Address"
            name="physical_address"
            fullWidth
            multiline
            rows={2}
            value={data.physical_address}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        {/* Social Media */}

        <Grid item xs={12}>
          <Typography variant="h6">Social Media Links</Typography>
          <Divider
            sx={{
              mb: 2,
              backgroundColor: "#000000",
              height: "3px",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Facebook URL"
            name="facebook"
            fullWidth
            value={data.facebook}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Twitter URL"
            name="twitter"
            fullWidth
            value={data.twitter}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="LinkedIn URL"
            name="linkedin"
            fullWidth
            value={data.linkedin}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Instagram URL"
            name="instagram"
            fullWidth
            value={data.instagram}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="YouTube URL"
            name="youtube"
            fullWidth
            value={data.youtube}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        {/* Legal */}

        <Grid item xs={12}>
          <Typography variant="h6">Legal Information</Typography>
          <Divider
            sx={{
              mb: 2,
              backgroundColor: "#000000",
              height: "3px",
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Risk Disclosure"
            name="risk_disclosure"
            multiline
            rows={4}
            fullWidth
            value={data.risk_disclosure}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Restricted Regions"
            name="restricted_regions"
            multiline
            rows={3}
            fullWidth
            value={data.restricted_regions}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#F07539",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#F07539",
              },
            }}
          />
        </Grid>
      </Grid>

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
          marginRight: "10px",
          marginTop: "20px",
        }}
        onClick={saveFooter}
      >
        Save Footer
      </Button>
    </Box>
  );
}
