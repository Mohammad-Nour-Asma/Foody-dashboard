import React from "react";
import { Box } from "@mui/material";

const ComponentWrapper = (props) => {
  return (
    <Box
      style={{
        marginTop: "10px",
        paddingBottom: "10px",
      }}
    >
      {props.children}
    </Box>
  );
};

export default ComponentWrapper;
