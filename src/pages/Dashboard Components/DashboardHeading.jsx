import React from "react";
import { Typography } from "@mui/material";
const DashboardHeading = ({ Icon, title }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        my: 3,
        textTransform: "capitalize",
        background: "linear-gradient(to bottom, #da32f9, #629ad6)",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        paddingLeft: "0.4rem",
      }}
    >
      <Icon
        sx={{
          top: "0.3rem",
          position: "relative",
          color: "#c387f2",
          marginRight: "0.3rem",
        }}
      />
      {title}
    </Typography>
  );
};

export default DashboardHeading;
