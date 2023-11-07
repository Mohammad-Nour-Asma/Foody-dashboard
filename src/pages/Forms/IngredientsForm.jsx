import React from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Alert,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { BiImageAdd } from "react-icons/bi";
import { Formik } from "formik";
import {
  ingredientValidation,
  updateiIngredientValidation,
} from "../../validations/ingredientsValidation";
import { request } from "../../Request/request";
import { useRef, useState } from "react";
import Notify from "../../components/common/Notify";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";

const IngredientsForm = ({ row, refetch, type }) => {
  const [updatedIng, setUpdatedIng] = useState({});
  const { branch_id } = useSelector((state) => state.settings);
  const [unit, setUnit] = useState("g");
  const { showBoundary } = useErrorBoundary();

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  let initialValues = { name: "", quantity: "", name_ar: "", threshold: "" };
  if (row) {
    initialValues = {
      name: row.original.name,
      name_ar: row.original.name_ar,
      quantity: row.original.total_quantity,
      threshold: row.original.threshold,
    };
  }

  // Submit Hanlder
  const submitHandle = (values) => {
    if (row) {
      let dataToSend = {
        name: values.name,
        name_ar: values.name_ar,
        total_quantity: values.quantity,
        threshold: values.threshold,
        branch_id: branch_id,
      };

      setUpdatedIng(dataToSend);

      updateIngredient.mutate(dataToSend);
    } else {
      const data = {
        name: values.name,
        name_ar: values.name_ar,
        total_quantity: values.quantity,
        threshold: values.threshold,
        branch_id: branch_id,
        unit,
      };
      storeIngredient.mutate(data);
    }
  };

  const storeIngredientRequest = (data) => {
    return request({
      url: "/ingredient/add",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };

  const navigate = useNavigate();
  const storeIngredient = useMutation({
    mutationFn: storeIngredientRequest,
    onSuccess: () => {
      setOpen(true);
      navigate("/ingredients");
    },
    onError: (err) => {
      setOpen(true);
      showBoundary(err);
    },
  });

  const [open, setOpen] = useState(false);
  // handle cloase
  const handleClose = () => {
    setOpen(false);
  };

  // Updating
  const updateIngredientRequest = (data) => {
    return request({
      url: `ingredient/${row.original.id}`,

      method: "PATCH",
      data: data,
    });
  };

  const updateIngredient = useMutation({
    mutationFn: updateIngredientRequest,
    onSuccess: (data) => {
      const newIng = data.data.data;
      setOpen(true);
      row.original.name = newIng.name;
      row.original.name_ar = newIng.name_ar;
      row.original.total_quantity = newIng.total_quantity;
      row.original.threshold = newIng.threshold;
      refetch();
    },
    onError: (err) => {
      setOpen(true);
      showBoundary();
    },
  });

  return (
    <Box
      sx={{
        boxShadow: "none !important",

        p: "20px",
        maxWidth: "70%",
        margin: "0 auto",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Notify
        message={
          updateIngredient.isError || storeIngredient.isError
            ? "something went wrong"
            : row
            ? "Ingredient updatede Successfully"
            : "Ingredient added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={
          storeIngredient?.isError || updateIngredient?.isError
            ? "error"
            : "success"
        }
      />
      <Formik
        initialValues={initialValues}
        validationSchema={
          row ? updateiIngredientValidation : ingredientValidation
        }
        onSubmit={submitHandle}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
              <TextField
                name="name"
                label="Ingredient Name"
                variant="outlined"
                size="small"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                value={values.name}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <TextField
                name="name_ar"
                label="اسم المكون"
                variant="outlined"
                size="small"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.name_ar && !!errors.name_ar}
                helperText={touched.name_ar && errors.name_ar}
                value={values.name_ar}
              />
            </Box>
            <Stack gap={2} direction={"row"}>
              {!row && (
                <Box sx={{ my: 2, flexBasis: "90%" }}>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    size="small"
                    fullWidth
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.quantity && !!errors.quantity}
                    helperText={touched.quantity && errors.quantity}
                    onChange={handleChange}
                    value={values.quantity}
                  />
                </Box>
              )}
              <Box sx={{ my: 2, flexBasis: "10%" }}>
                {/* <InputLabel mb={2} id="demo-simple-select-label">
                  Unit
                </InputLabel> */}
                <FormControl fullWidth size="small">
                  <Select
                    size="small"
                    fullWidth
                    onChange={handleUnitChange}
                    value={unit}
                  >
                    <MenuItem value={"g"}>Gram</MenuItem>
                    <MenuItem value={"kg"}>Kilogram</MenuItem>
                    <MenuItem value={"l"}>Liter</MenuItem>
                    <MenuItem value={"ml"}>Milliliter</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Box sx={{ my: 2 }}>
              <TextField
                name="threshold"
                label="Threshold"
                fullWidth
                size="small"
                handleChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.threshold && !!errors.threshold}
                helperText={touched.threshold && errors.threshold}
                onChange={handleChange}
                value={values.threshold}
              />
            </Box>
            <Stack sx={{ my: 2 }}>
              <LoadingButton
                loading={
                  row ? updateIngredient.isPending : storeIngredient.isPending
                }
                variant="contained"
                type="submit"
                sx={{
                  background:
                    "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
                }}
              >
                <span>Submit</span>
              </LoadingButton>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default IngredientsForm;
