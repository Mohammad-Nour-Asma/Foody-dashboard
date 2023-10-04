import React from "react";
import { Paper } from "@mui/material";
const Layout = (props) => {
  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        p: "20px",
        maxWidth: "99%",
        margin: "0 auto",

        overflow: "hidden",
      }}
    >
      {props.children}
    </Paper>
  );
};

export default Layout;
