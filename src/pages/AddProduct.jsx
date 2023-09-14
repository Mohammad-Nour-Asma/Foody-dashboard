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
import { BiImageAdd } from "react-icons/bi";
import { request } from "../Request/request";
import { ErrorMessage, Formik } from "formik";
import { productValidation } from "../validations/productValidation";
import MyLoadingButton from "../components/common/LoadingButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
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
