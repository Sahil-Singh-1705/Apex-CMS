"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { logError } from "@/utils/logger"; // ✅ ADD THIS

const ContactTable = () => {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/api/contact`);
      const result = await res.json();

      if (Array.isArray(result)) {
        setData(result);
      } else if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        // ❌ unexpected API structure
        throw new Error("Unexpected API format");
      }

    } catch (err) {
      setError("Something went wrong");

      // ✅ SEND ERROR TO BACKEND
      logError(err, "Fetch Contact Messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`${API}/api/contact/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Delete failed");
      }

    } catch (err) {
      logError(err, "Delete Contact Message");
    }
  };

  const handleView = async (el) => {
    try {
      await fetch(`${API}/api/contact/read/${el.id}`, {
        method: "PUT",
      });

      const updatedStatus = "read";

      setData((prev) =>
        prev.map((item) =>
          item.id === el.id ? { ...item, status: updatedStatus } : item
        )
      );

      alert(
        `Name: ${el.name}
Email: ${el.email}
Phone: ${el.phone}
Subject: ${el.subject}
Message: ${el.message}
Status: ${updatedStatus}`
      );

    } catch (err) {
      logError(err, "Mark Contact as Read");
    }
  };

  if (error) {
    // optional UI message, no console spam
  }

  return (
    <TableContainer
      component={Paper}
      className="mt-10"
      sx={{
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#000",
            "& .MuiTableCell-root": {
              color: "#fff",
              fontWeight: "600",
            },
          }}
        >
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ backgroundColor: "#e5e5e5" }}>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((el, index) => (
              <TableRow
                key={el.id}
                sx={{
                  backgroundColor: "#f5f5f5",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell>{el.phone || "-"}</TableCell>
                <TableCell>{el.subject || "-"}</TableCell>
                <TableCell>{el.status}</TableCell>

                <TableCell>
                  {el.created_at
                    ? new Date(el.created_at).toLocaleString()
                    : "-"}
                </TableCell>

                <TableCell>
                  <IconButton onClick={() => handleView(el)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(el.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No messages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;