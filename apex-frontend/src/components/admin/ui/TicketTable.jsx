"use client";

import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ModalContext } from "@/context/context"; 

// Styled TableCell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styled TableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Each Row
const TicketRow = ({ ticket, index, onUpdateStatus }) => {
  const { onOpen } = useContext(ModalContext);

  const getStatusChip = (status) => {
    switch (status) {
      case "Open":
        return <Chip label="Open" color="success" size="small" />;
      case "Closed":
        return <Chip label="Closed" color="error" size="small" />;
      default:
        return <Chip label="Unknown" color="default" size="small" />;
    }
  };

  return (
    <StyledTableRow key={ticket.id}>
      <StyledTableCell>{index + 1}</StyledTableCell>
      <StyledTableCell>{ticket.email}</StyledTableCell>
      <StyledTableCell>{ticket.subject}</StyledTableCell>
      <StyledTableCell>{ticket.message}</StyledTableCell>
      <StyledTableCell>
        {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
      </StyledTableCell>
      <StyledTableCell>{getStatusChip(ticket.status)}</StyledTableCell>
      <StyledTableCell>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => onOpen(
            { 
              data: ticket, 

           },
           "openTicket"
          )}
          sx={{ mr: 1 }}
        >
          Open
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => onUpdateStatus(ticket.id, "Closed")}
          disabled={ticket.status === "Closed"}
        >
          Close
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const TicketTable = ({ tickets = [] }) => {
  const [allTickets, setAllTickets] = React.useState(tickets);

  const handleUpdateStatus = async (ticketId, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ticket/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAllTickets((prev) =>
          prev.map((t) =>
            t.id === ticketId ? { ...t, status: newStatus } : t
          )
        );
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status.");
    }
  };

  return (
    <Box mt={5}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="ticket table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No.</StyledTableCell>
              <StyledTableCell>Email Id</StyledTableCell>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTickets.length > 0 ? (
              allTickets.map((ticket, index) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  index={index}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketTable;
