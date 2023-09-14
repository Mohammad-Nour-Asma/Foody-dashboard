import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const Page = ({ title, children, button, link }) => {
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "14px" }}>
          {title}
        </Typography>

        {button && (
          <Link to={link} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiPlus />}
              sx={{ borderRadius: "20px" }}
            >
              {button}
            </Button>
          </Link>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default Page;
