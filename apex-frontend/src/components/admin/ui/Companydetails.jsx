'use client';
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useCallback,useContext } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/context";
import { AlertContext } from "@/context/context";
const Companydetails = ({ data, token}) => {
  const router = useRouter();
  // const { isOpen, onClose, data, type } = useContext(ModalContext);
  // const isModalOpen = isOpen && type;
  const { setAlert } = useContext(AlertContext);
  const [formData, setFormData] = useState({
    email: "",
    phone1: "",
    phone2: "",
    physicaladdress: "",
    registeredaddress: "",
    description: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    googleplay: "",
    appstore: "",
  });

  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize formData and track initialData
  useEffect(() => {
    if (data && data.length > 0) {
      setFormData(data[0]);
      setInitialData(data[0]); // Save the initial data for comparison
    }
  }, [data]);

  // Check if formData has been modified
  const isModified = JSON.stringify(formData) !== JSON.stringify(initialData);

  // Handler to update formData
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // API call to update company details

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/updatecompanydetails`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: data[0].id, ...formData }), // Ensure ID is included
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        setAlert({
          message: errorData.message || "Failed to update!",
          type: "error",
          open: true,
        });
        return;
      }
  
      setAlert({ message: "Updated Company Details successfully!", type: "success", open: true });
      router.refresh();
      // router.push("/admin/app-pages/add");
      setInitialData(formData);
    } catch (error) {
      setAlert({
        message: "An unexpected error occurred!",
        type: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <Typography variant="h4" marginBottom="15px">
        Company Details
      </Typography>

      {/* Email Field */}
      <Box marginBottom="20px">
        <Typography marginBottom="5px">Email</Typography>
        <TextField
          size="medium"
          sx={{ width: "50%" }}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Box>

      {/* Phone Fields */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {["phone1", "phone2"].map((field, index) => (
            <Grid item xs={6} md={6} key={index}>
              <Box marginBottom="20px">
                <Typography marginBottom="5px">
                  {`Phone ${index + 1}`}
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Address Fields */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[
            { name: "physicaladdress", label: "Physical Address" },
            { name: "registeredaddress", label: "Registered Address" },
          ].map((field) => (
            <Grid item xs={6} md={6} key={field.name}>
              <Box marginBottom="20px">
                <Typography marginBottom="5px">{field.label}</Typography>
                <TextField
                  sx={{ width: "100%" }}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Description Field */}
      {/* <Box marginBottom="20px">
        <Typography marginBottom="5px">Description</Typography>
        <TextField
          sx={{ width: "100%" }}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Box> */}

      {/* Social Media Links */}
      {/* <Typography variant="h4" marginTop="20px" marginBottom="15px">
        Social Media Links
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[
            "facebook",
            "twitter",
            "instagram",
            "linkedin",
            "youtube",
            "tiktok",
            "googleplay",
            "appstore",
          ].map((field) => (
            <Grid key={field} item xs={6} md={6}>
              <Box marginBottom="20px">
                <Typography marginBottom="5px">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}

      {/* Save Button */}
      <Box marginTop="20px">
      <Button
  sx={{
    backgroundColor: isModified ? "#ff9100" : "#ccc",
    color: "#fff",
    fontWeight: "bold",
    marginLeft: "auto",
    "&:disabled": { backgroundColor: "#ccc" },
  }}
  variant="contained"
  onClick={handleUpdate}
  disabled={loading || !isModified}
>
  {loading ? "Saving..." : "Save"}
</Button>

      </Box>
    </div>
  );
};

export default Companydetails;
