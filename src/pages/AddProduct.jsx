import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import ProductForm from "./Forms/ProductForm";

const AddProduct = ({ edit }) => {
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        {edit ? "Edit Meal" : "Add Meal"}
      </Typography>

      <ProductForm />
    </Box>
  );
};

export default AddProduct;
