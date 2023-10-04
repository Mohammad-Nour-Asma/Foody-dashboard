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
import NourInput from "./NourInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import Loader from "../../components/common/loader/loader";
import { productValidationUpdate } from "../../validations/productValidationUpdate";
import { productValidation } from "../../validations/productValidation";
import Notify from "../../components/common/Notify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProductForm = ({ row }) => {
  const [image, setImage] = useState("");
  let initialValues;
  const { branch_id } = useSelector((state) => state.settings);
  if (row) {
    initialValues = {
      name: row.original.name,
      description: row.original.description,
      price: row.original.price,
      estimated_time: row.original.estimated_time,
      position: row.original.position,
      description_ar: row.original.description_ar,
      name_ar: row.original.name_ar,
    };
  } else {
    initialValues = {
      name: "",
      name_ar: "",
      description: "",
      description_ar: "",
      price: "",
      estimated_time: "",
      position: "",
    };
  }

  const [updatedMeal, setUpdatedMeal] = useState();
  const [ingredient, setIngredients] = useState([]);
  const [extraIngredient, setExtraIngredients] = useState([]);

  const handleSubmit = (values) => {
    const product = {
      ...values,
      category_id: selectedCategory,
      status: status ? 1 : 0,
      branch_id,
      ingredients: ingredient,
      extra_ingredients: extraIngredient,
    };

    setUpdatedMeal(product);
    if (row) {
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
    return request({
      url: `category/branch/${branch_id}}`,
      method: "GET",
    });
  };

  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: [`category-get-${branch_id}`],
    queryFn: getCategory,
  });
  const categories = data?.data.data;

  const [selectedCategory, setSelectedCategory] = useState(
    row ? row.original.category.id : 8
  );
  useEffect(() => {
    if (isSuccess) {
      if (categories.length !== 0) setSelectedCategory(categories[0].id);
    }
  }, [isSuccess]);

  useEffect(() => {
    refetch();
    extraIngredientRefetch();
    ingredientRefetch();
  }, [branch_id]);

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
  } = useQuery({
    queryKey: [`ingredients-get-${branch_id}`],
    queryFn: getIngredients,
  });

  // Get Ingredients
  const getExtraIngredients = () => {
    return request({
      url: `/extraIng/branch/${branch_id}}`,
      method: "GET",
    });
  };

  const ingredients = ingredientsData?.data.data;

  const {
    data: extraIngredientsData,
    isLoading: loading3,
    isError: error3,
    refetch: extraIngredientRefetch,
  } = useQuery({
    queryKey: [`extra-ingredients-get-${branch_id}`],
    queryFn: getExtraIngredients,
  });

  const extraIngredients = extraIngredientsData?.data.data;

  // Handle Status Change
  const [status, setStatus] = useState(true);
  const handleStatusChange = (e) => {
    setStatus(e.target.checked);
  };

  // UPdate

  const updateProduct = (data) => {
    return request({
      url: `/product/${row.original.id}`,
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
      url: "/product/add",
      method: "POST",
      data: meal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const navigate = useNavigate();

  const addProduct = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      setOpen(true);
      navigate("/products");
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
      {categories?.length === 0 ? (
        <Typography textAlign={"center"}>Please Add a Category</Typography>
      ) : (
        <>
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
              addProduct?.isError || updateMutation?.isError
                ? "error"
                : "success"
            }
          />
          {isLoading || loading2 || loading3 ? (
            <Loader />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={
                row ? productValidationUpdate : productValidation
              }
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
                  <Box sx={{ my: 2 }}>
                    <TextField
                      label="اسم الوجبة بالعربي"
                      name="name_ar"
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
                  <Box sx={{ mt: 4 }}>
                    <TextField
                      label="Meal Description"
                      name="description"
                      variant="outlined"
                      rows={4}
                      fullWidth
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      value={values.description}
                    />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <TextField
                      label="وصف الوجبة"
                      name="description_ar"
                      variant="outlined"
                      rows={4}
                      fullWidth
                      multiline
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.description_ar && !!errors.description_ar
                      }
                      helperText={
                        touched.description_ar && errors.description_ar
                      }
                      value={values.description_ar}
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

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
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
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
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
                      error={
                        !!touched.estimated_time && !!errors.estimated_time
                      }
                      helperText={
                        touched.estimated_time && errors.estimated_time
                      }
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
        </>
      )}
    </Paper>
  );
};

export default ProductForm;
