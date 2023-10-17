import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Alert,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { BiImageAdd } from "react-icons/bi";
import { Formik } from "formik";
import { ingredientValidation } from "../../validations/ingredientsValidation";
import { request } from "../../Request/request";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import Notify from "../../components/common/Notify";
import Price from "../../components/common/Price";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ExtraValidation } from "../../validations/ExtraValidations";
import Loader from "../../components/common/loader/loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExtraForm = ({ row, refetch }) => {
  const [updatedIng, setUpdatedIng] = useState({});
  const [ingredient, setIngredient] = useState();
  const navigate = useNavigate();
  const { branch_id } = useSelector((state) => state.settings);
  const [unit, setUnit] = useState();

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleIngredientChange = (event, element) => {
    const unit = element.props["data-unit"];
    setUnit(unit);
    setIngredient(event.target.value);
  };

  let initialValues = { name: "", price_per_kilo: "", name_ar: "" };
  if (row) {
    initialValues = {
      name: row.original.name,
      name_ar: row.original.name_ar,
      quantity: row.original.quantity,
      price_per_kilo: row.original.price_per_kilo,
    };
  }

  // Submit Hanlder
  const submitHandle = (values) => {
    if (row) {
      let dataToSend = {
        price_per_kilo: values.price_per_kilo,
        branch_id: branch_id,
        unit,
      };

      setUpdatedIng(dataToSend);

      updateIngredient.mutate(dataToSend);
    } else {
      const data = {
        ingredient_id: ingredient,
        price_per_kilo: values.price_per_kilo,
        branch_id: branch_id,
        unit,
      };
      storeIngredient.mutate(data);
    }
  };

  const storeIngredientRequest = (data) => {
    return request({
      url: "/extraIng/add",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };

  const storeIngredient = useMutation({
    mutationFn: storeIngredientRequest,
    onSuccess: () => {
      setOpen(true);
      navigate("/extra");
    },
    onError: (err) => {
      setOpen(true);
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
      url: `extraIng/${row.original.id}`,

      method: "PATCH",
      data: data,
    });
  };

  // Get Ingredients
  const getIngredients = () => {
    return request({
      url: `/ingredient/branch/${branch_id}}`,
      method: "GET",
    });
  };

  const {
    data: ingredientsData,
    isLoading: loading2,
    isError: error2,
    refetch: ingredientRefetch,
    isSuccess,
  } = useQuery({
    queryKey: [`ingredients-get-${branch_id}`],
    queryFn: getIngredients,
    onSuccess: (data) => {},
  });

  useEffect(() => {
    if (isSuccess && ingredientsData.data?.data?.length !== 0) {
      setIngredient(ingredientsData.data.data[0].id);
      setUnit(ingredientsData.data.data[0].unit);
    }
  }, [isSuccess]);

  const updateIngredient = useMutation({
    mutationFn: updateIngredientRequest,
    onSuccess: (data) => {
      const newIng = data.data.data;
      setOpen(true);
      refetch();
      row.original.price_per_kilo = newIng.price_per_kilo;
    },
    onError: (err) => {
      setOpen(true);
      console.log(err);
    },
  });

  if (loading2) {
    return <Loader />;
  }

  return (
    <Paper
      sx={{
        boxShadow: "none !important",

        p: "20px",
        maxWidth: "800px",
        margin: "0 auto",

        overflow: "hidden",
      }}
    >
      <Notify
        message={
          updateIngredient.isError || storeIngredient.isError
            ? "something went wrong"
            : row
            ? "Extra Ingredient updatede Successfully"
            : "Extra Ingredient added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={
          storeIngredient?.isError || updateIngredient?.isError
            ? "error"
            : "success"
        }
      />
      {ingredientsData?.data?.data?.length === 0 ? (
        <Typography textAlign={"center"}>Please Add Ingredients</Typography>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={ExtraValidation}
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
              {!row && (
                <Box sx={{ mt: 4 }}>
                  <InputLabel mb={2} id="demo-simple-select-label">
                    Ingredient
                  </InputLabel>
                  <FormControl fullWidth size="small">
                    <Select
                      fullWidth
                      onChange={handleIngredientChange}
                      value={`${ingredient}`}
                    >
                      {ingredientsData?.data?.data?.map(
                        ({ id, name, unit }) => (
                          <MenuItem
                            data-unit={
                              unit === "g" ? "kg" : unit === "ml" ? "l" : unit
                            }
                            value={id}
                            key={id}
                          >
                            {name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
              )}

              <Box sx={{ my: 2 }}>
                <TextField
                  name="price_per_kilo"
                  label={`Price Per ${
                    unit === "kg" || unit === "g" ? "Kilogram" : "Liter"
                  }`}
                  fullWidth
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.price_per_kilo && !!errors.price_per_kilo}
                  helperText={touched.price_per_kilo && errors.price_per_kilo}
                  onChange={handleChange}
                  value={values.price_per_kilo}
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
      )}
    </Paper>
  );
};

export default ExtraForm;
