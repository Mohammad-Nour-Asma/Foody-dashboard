import React from "react";
import { Box, TextField, Typography, Paper, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { BiImageAdd } from "react-icons/bi";
import { Formik } from "formik";
import { ingredientValidation } from "../../validations/ingredientsValidation";
import { request } from "../../Request/request";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import Notify from "../../components/common/Notify";
import Price from "../../components/common/Price";
import { useMutation } from "@tanstack/react-query";

const IngredientsForm = ({ row }) => {
  const [updatedIng, setUpdatedIng] = useState({});

  let initialValues = { name: "", price: "", name_ar: "" };
  if (row) {
    initialValues = {
      name: row.original.name,
      name_ar: row.original.name_ar,
      price: row.original.price_by_piece,
    };
  }
  //Image Upload Stuff
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
  const imageInput = useRef(null);
  const [image, setImage] = useState("");
  const [imageValidation, setImageValidation] = useState();

  // Submit Hanlder
  const submitHandle = (values) => {
    console.log(values);
    // if (row) {
    //   console.log(row);
    //   let dataToSend = {
    //     price_by_piece: values.price,
    //     name: values.name,
    //     branch_id: 1,
    //   };
    //   if (image) {
    //     dataToSend = {
    //       price_by_piece: values.price,
    //       name: values.name,
    //       branch_id: 1,
    //       image,
    //     };
    //   }
    //   setUpdatedIng(dataToSend);

    //   console.log(dataToSend);
    //   updateIngredient.mutate(dataToSend);
    // } else {
    //   if (image === "") {
    //     setImageValidation(true);
    //   } else {
    //     setImageValidation(false);
    //   }
    //   const data = {
    //     price_by_piece: values.price,
    //     name: values.name,
    //     image: image,
    //     branch_id: 1,
    //   };
    //   storeIngredient.mutate(data);
    // }
  };

  const storeIngredientRequest = (data) => {
    return request({
      url: "/store_ingredient",
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
    },
    onError: (err) => {
      console.log(err);
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
      url: `update_ingredient/${row.original.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: data,
    });
  };

  const updateIngredient = useMutation({
    mutationFn: updateIngredientRequest,
    onSuccess: () => {
      setOpen(true);
      if (image) {
        row.original.image = URL.createObjectURL(image);
      }
      row.original.name = updateIngredient.name;
      row.original.price_by_piece = updateIngredient.price_by_piece;
    },
    onError: (err) => {
      console.log(err);
      setOpen(true);
    },
  });
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
        validationSchema={ingredientValidation}
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
            <Box sx={{ my: 2 }}>
              <Price
                handleChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                onChange={handleChange}
                name="price"
                value={values.price}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <input
                type="file"
                hidden
                ref={imageInput}
                onChange={(e) => setImage(e.target.files[0])}
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
                ) : row ? (
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
              {imageValidation && (
                <Box sx={{ color: "#f44336", margin: "1rem 0" }}>
                  image field is required
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "30px",
              }}
            >
              <LoadingButton
                loading={
                  row ? updateIngredient.isPending : storeIngredient.isPending
                }
                variant="contained"
                type="submit"
              >
                <span>Submit</span>
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default IngredientsForm;
