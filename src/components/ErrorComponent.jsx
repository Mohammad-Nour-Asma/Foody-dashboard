import React from "react";
import { Box, Typography } from "@mui/material";
const ErrorComponent = ({ message, refetch }) => {
  if (!message) message = "an error happen - please";
  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {message}
      </Typography>
      <Typography
        onClick={() => {
          refetch();
        }}
        sx={{
          color: "#b27ded",
          textDecoration: "underline",
          cursor: "pointer",
          textAlign: "center",
          marginBottom: "1rem",
          fontWeight: "bold",
          "&:active": {
            transform: "translateY(2px)",
          },
        }}
      >
        Try Again
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
