import { Autocomplete, Box, Paper, Typography } from "@mui/material";
import React from "react";

import ProductForm from "./Forms/ProductForm";

const AddProduct = ({ edit }) => {
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        {edit ? "Edit Meal" : "Add Meal"}
      </Typography>
      <Paper
        sx={{
          border: "3px solid",
          borderRadius: "10px",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <ProductForm />
      </Paper>
    </Box>
  );
};

export default AddProduct;
