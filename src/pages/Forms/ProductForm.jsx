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
import { BiImageAdd } from "react-icons/bi";
import { ErrorMessage, Formik } from "formik";
import MyLoadingButton from "../../components/common/LoadingButton";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import Loader from "../../components/common/loader/loader";
import { productValidationUpdate } from "../../validations/productValidationUpdate";
import { productValidation } from "../../validations/productValidation";
import Notify from "../../components/common/Notify";
const ProductForm = ({ row }) => {
  const [image, setImage] = useState("");
  let initialValues;
  if (row) {
    initialValues = {
      name: row.original.name,
      ingredient: row.original.ingredient,
      price: row.original.price,
      estimated_time: row.original.estimated_time,
      position: row.original.position,
    };
  } else {
    initialValues = {
      name: "",
      ingredient: "",
      price: "",
      estimated_time: "",
      position: "",
    };
  }

  const [updatedMeal, setUpdatedMeal] = useState();
  const handleSubmit = (values) => {
    console.log("lsdakfjsdlkfjds");
    const product = {
      ...values,
      category_id: selectedCategory,
      status: status ? 1 : 0,
      branch_id: 1,
    };
    if (selectedIngredients.length > 0) {
      product.ingredientID = selectedIngredients.map((item) => {
        const { id } = ingredients.find(
          (ingredient) => ingredient.name == item
        );
        return id;
      });
    }
    setUpdatedMeal(product);
    if (row) {
      // row.original.extraIngredients = selectedIngredients;

      updateMutation.mutate(product);
    } else {
      addProduct.mutate(product);
    }
  };

  const imageInput = useRef(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const UploadBox = styled(Box)({
    marginTop: 30,
    height: 200,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "divider",
  });

  // Get Categories

  const getCategory = () => {
    return request({ url: "/categories", method: "GET" });
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["category-get"],
    queryFn: getCategory,
  });
  const categories = data?.data.data;

  const [selectedCategory, setSelectedCategory] = useState(
    row ? row.original.category.id : 8
  );
  useEffect(() => {
    if (isSuccess) {
      setSelectedCategory(categories[0].id);
    }
  }, [isSuccess]);
  // Get Ingredients
  const getExtreIngredients = () => {
    return request({ url: "/ingredients", method: "GET" });
  };

  const {
    data: ingredientsData,
    isLoading: loading2,
    isError: error2,
  } = useQuery({
    queryKey: ["ingredients-get"],
    queryFn: getExtreIngredients,
  });

  const ingredients = ingredientsData?.data.data;

  const [selectedIngredients, setSelectedIngredients] = useState(
    row ? row.original.extraIngredients.map((item) => item.name) : []
  );

  const handleIngredientsChange = (event, newValue) => {
    setSelectedIngredients(newValue);
  };
  // Handle Status Change
  const [status, setStatus] = useState(true);
  const handleStatusChange = (e) => {
    setStatus(e.target.checked);
  };

  // UPdate

  const updateProduct = (data) => {
    return request({
      url: `/update_product/${row.original.id}`,
      data,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      setOpen(true);
      row.original.name = updatedMeal.name;
      row.original.category.name = categories.find(
        (item) => item.id == selectedCategory
      ).name;
      row.original.estimated_time = updatedMeal.estimated_time;

      row.original.ingredient = updatedMeal.ingredient;
      row.original.position = updatedMeal.position;
      row.original.price = updatedMeal.price;
      row.original.status = updatedMeal.status;
    },
    if(image) {
      row.original.image = URL.createObjectURL(image);
    },
    onError: () => {
      setOpen(true);
    },
  });

  // Add the MEAl

  const addMeal = (meal) => {
    return request({
      url: "/store_product",
      method: "POST",
      data: meal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const addProduct = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      setOpen(true);
    },
    onError: () => {
      setOpen(true);
    },
  });

  // For Notify
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        p: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Notify
        message={
          updateMutation.isError || addProduct.isError
            ? "something went wrong"
            : row
            ? "Meal updatede Successfully"
            : "Meal added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={
          addProduct?.isError || updateMutation?.isError ? "error" : "success"
        }
      />
      {isLoading || loading2 ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={row ? productValidationUpdate : productValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ my: 2 }}>
                <TextField
                  label="Meal Name"
                  name="name"
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
              <Box sx={{ mt: 4 }}>
                <TextField
                  label="Meal Description"
                  name="ingredient"
                  variant="outlined"
                  rows={4}
                  fullWidth
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.ingredient && !!errors.ingredient}
                  helperText={touched.ingredient && errors.ingredient}
                  value={values.ingredient}
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    {categories?.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Autocomplete
                  sx={{ mt: 4 }}
                  multiple
                  id="tags-standard"
                  options={ingredients?.map((option) => option.name)}
                  onChange={handleIngredientsChange}
                  value={selectedIngredients}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText="Select Meals's Ingredients "
                      variant="outlined"
                      label="Meal's Ingredients"
                      placeholder="Meal's Ingredients"
                    />
                  )}
                />
              </Box>

              <Box
                sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}
              >
                <TextField
                  label="Price"
                  variant="outlined"
                  rows={4}
                  fullWidth
                  name="price"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  value={values.price}
                />
              </Box>

              <Box
                sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}
              >
                <TextField
                  label="Estimated Time"
                  variant="outlined"
                  rows={4}
                  fullWidth
                  name="estimated_time"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.estimated_time && !!errors.estimated_time}
                  helperText={touched.estimated_time && errors.estimated_time}
                  value={values.estimated_time}
                />
                <TextField
                  label="Position"
                  variant="outlined"
                  name="position"
                  rows={4}
                  fullWidth
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.position && !!errors.position}
                  helperText={touched.position && errors.position}
                  value={values.position}
                />
              </Box>

              <Box sx={{ my: 2 }}>
                <label
                  style={{
                    color: "#9d9fa6",
                  }}
                >
                  Meal Status
                </label>
                <Switch
                  onChange={handleStatusChange}
                  defaultChecked={row?.original.status != 1 ? false : true}
                ></Switch>
              </Box>

              <input
                type="file"
                // name={row ? " " : "image"}
                ref={imageInput}
                hidden
                // onBlur={handleBlur}
                onChange={(event) => {
                  setImage(event.currentTarget.files[0]);
                  setFieldValue("image", event.currentTarget.files[0]); // Update this line
                }}
              />
              <UploadBox onClick={() => imageInput.current.click()}>
                {image ? (
                  <img
                    src={image && URL.createObjectURL(image)}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : row?.original.image ? (
                  <img
                    src={row.original.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <BiImageAdd
                      style={{ fontSize: "50px", color: "#027edd" }}
                    />
                    <Typography>
                      Drop your image here or{" "}
                      <span style={{ color: "#027edd", cursor: "pointer" }}>
                        browse
                      </span>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      JPG, PNG and GIF images are allowed
                    </Typography>
                  </Box>
                )}
              </UploadBox>
              {/* <ErrorMessage
                    name="image"
                    style={{
                    fontSize: "1rem",
                    color: "#f44336",
                    }}
                    component="p"
                /> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "30px",
                }}
              >
                <MyLoadingButton
                  variant={"contained"}
                  title={"submit"}
                  type="submit"
                  loading={
                    row ? updateMutation.isPending : addProduct.isPending
                  }
                  onClick={handleSubmit}
                />
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Paper>
  );
};

export default ProductForm;
