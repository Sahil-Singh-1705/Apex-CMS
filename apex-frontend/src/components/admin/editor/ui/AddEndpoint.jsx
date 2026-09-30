"use client";
import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const AddEndpoint = ({ endpoint, setEndpoint }) => {
  const [oneEndPoint, setOneEndPoint] = useState("");
  const [twoEndPoint, setTwoEndPoint] = useState("");
  const [threeEndPoint, setThreeEndPoint] = useState("");

  useEffect(() => {
    if (endpoint) {
      setEndpoint(endpoint);
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

  return (
    <>
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
    </>
  );
};

export default AddEndpoint;
