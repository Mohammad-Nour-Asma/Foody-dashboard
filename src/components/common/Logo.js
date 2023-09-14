import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        fontSize: "2rem",
        textAlign: "center",
        padding: "2rem 0 0",
        color: "#333",
        fontWeight: "bold",
      }}
    >
      F<Box sx={{ color: "#db0927", display: "inline-block" }}>OO</Box>
      DY
    </Box>
  );
};

export default Logo;
