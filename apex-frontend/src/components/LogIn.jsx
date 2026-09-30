"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { logError } from "@/utils/logger";
import { ClipLoader } from "react-spinners";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <span style={{ color: "inherit" }}>Apex CMS</span>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function FullScreenLoader({ loading }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ClipLoader color="#F07539" />
    </div>
  );
}

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const urlPassword = searchParams.get("password");

    if (urlPassword) {
      logError(new Error("Password found in URL"), "Login Security Warning");

      const cleanUrl = window.location.origin + window.location.pathname;
      window.location.replace(cleanUrl);
      return;
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !password.trim()) {
      setErrorAlert("Please enter both username and password");
      return;
    }

    setLoading(true);
    setErrorAlert(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/app-pages/all");
      } else {
        logError(new Error(data.message || "Login failed"), "Login Failed");

        setErrorAlert(data.message || "Incorrect Username or Password");
      }
    } catch (error) {
      logError(error, "Login API Error");

      setErrorAlert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FullScreenLoader loading={loading} />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #181818 0%, #3A1E14 40%, #A84420 75%, #F07539 100%)",
          padding: "16px",
        }}
      >
        <Container maxWidth="xs" sx={{ padding: 0 }}>
          <CssBaseline />

          <Box
            sx={{
              width: "100%",
              borderRadius: "16px",
              padding: { xs: "28px 20px", sm: "32px 28px" },
              background: "rgba(244, 244, 242, 0.98)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(232, 91, 36, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Error Alert */}
            {errorAlert && (
              <Stack sx={{ width: "100%", mb: 2 }} spacing={1}>
                <Alert
                  severity={
                    errorAlert.includes("Security Warning")
                      ? "warning"
                      : "error"
                  }
                  onClose={() => setErrorAlert(null)}
                  sx={{
                    borderRadius: "10px",
                    fontWeight: 500,
                    py: 1,
                    border: "1px solid",
                    borderColor: errorAlert.includes("Security Warning")
                      ? "#E3B35A"
                      : "#f5c76a",
                    backgroundColor: errorAlert.includes("Security Warning")
                      ? "rgba(227, 179, 90, 0.1)"
                      : "rgba(244, 67, 54, 0.1)",
                  }}
                >
                  {errorAlert}
                </Alert>
              </Stack>
            )}

            {/* Logo and Header */}
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // center horizontally
                  mb: 1,
                }}
              >
                <Box
                  component="img"
                  src="/images/apex-cms-logo02.png"
                  alt="Logo"
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: "auto",
                  }}
                />
              </Box>

              {/* Admin Login Title */}
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  color: "#1F2937",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  mb: 0.5,
                }}
              >
                Admin Login
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  fontSize: "0.875rem",
                }}
              >
                Secure Admin Access
              </Typography>
            </Box>

            {/* Login Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                label="Username"
                variant="outlined"
                disabled={loading}
                size="medium"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover fieldset": {
                      borderColor: "#F07539",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F07539",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#6B7280",
                    fontSize: "0.95rem",
                    "&.Mui-focused": {
                      color: "#F07539",
                      fontWeight: 600,
                    },
                  },
                }}
              />

              <TextField
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                autoComplete="current-password"
                variant="outlined"
                disabled={loading}
                size="medium"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={loading}
                        sx={{
                          color: "#6B7280",
                          "&:hover": {
                            color: "#F07539",
                            backgroundColor: "rgba(232, 91, 36, 0.1)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover fieldset": {
                      borderColor: "#F07539",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F07539",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#6B7280",
                    fontSize: "0.95rem",
                    "&.Mui-focused": {
                      color: "#F07539",
                      fontWeight: 600,
                    },
                  },
                }}
              />

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  height: "48px",
                  mt: 1,
                  mb: 2,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #F07539 0%, #B9471D 100%)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  textTransform: "none",
                  boxShadow: "0 30px 60px rgba(240, 117, 57, 0.15)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #D95F2B 0%, #8F3516 100%)",
                    boxShadow: "0 15px 35px rgba(240, 117, 57, 0.35)",
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                  "&:disabled": {
                    background: "#9CA3AF",
                    transform: "none",
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Box>

            {/* Copyright */}
            <Copyright
              sx={{
                mt: 2,
                color: "#6B7280",
                fontSize: "0.75rem",
              }}
            />
          </Box>
        </Container>
      </div>
    </>
  );
}
