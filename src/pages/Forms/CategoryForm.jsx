import React from "react";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { BiImageAdd } from "react-icons/bi";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import { request } from "../../Request/request";
import { useMutation } from "@tanstack/react-query";
import MyLoadingButton from "../../components/common/LoadingButton";
import { Formik } from "formik";
import { categoryValidation } from "../../validations/categoryValidation";
import Notify from "../../components/common/Notify";
import { useNavigate } from "react-router-dom";
const CategoryForm = ({ row }) => {
  let initialValues = { name: "", position: "" };
  if (row) {
    initialValues = {
      name: row.original.name,
      name_ar: row.original.name_ar,
      position: row.original.position,
    };
  }

  const [updatedCat, setUpdatedCat] = useState();

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
  const [imageValidation, setImageValidation] = useState(true);

  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);

  const storeCategory = (data) => {
    return request({
      url: "/category/add",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const navigate = useNavigate();

  const addCategory = useMutation({
    mutationFn: storeCategory,

    onError: (err) => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(true);
      navigate("/categories");
    },
  });

  const handleSubmit = (values) => {
    if (row) {
      let categoryToSend;
      if (image) {
        categoryToSend = {
          ...values,
          image,
        };
      } else {
        categoryToSend = {
          ...values,
        };
      }
      setUpdatedCat(categoryToSend);
      updateCategory.mutate(categoryToSend);
    } else {
      if (image == "") {
        setImageValidation(false);
        return;
      } else {
        const category = {
          image: image,
          ...values,
          branch_id: localStorage.getItem("branch_id"),
        };
        addCategory.mutate(category);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Updating
  const updateCategoryRequest = (data) => {
    return request({
      url: `category/${row.original.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: data,
    });
  };

  const updateCategory = useMutation({
    mutationFn: updateCategoryRequest,
    onSuccess: (data) => {
      const newCat = data.data.data;
      setOpen(true);
      if (image) {
        row.original.image = URL.createObjectURL(image);
      }

      row.original.name = newCat.name;
      row.original.name_ar = newCat.name_ar;
      row.original.position = newCat.position;
    },
    onError: (err) => {
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
          updateCategory.isError || addCategory.isError
            ? "something went wrong"
            : row
            ? "Category updatede Successfully"
            : "Category added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={
          addCategory?.isError || updateCategory?.isError ? "error" : "success"
        }
      />

      <Formik
        initialValues={initialValues}
        validationSchema={categoryValidation}
        onSubmit={handleSubmit}
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
                label="Category Name"
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
                label="اسم الفئة بالعربي"
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
              <TextField
                name="position"
                label="Position in menu"
                variant="outlined"
                size="small"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.position && !!errors.position}
                helperText={touched.position && errors.position}
                value={values.position}
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
              {!imageValidation && (
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
              <MyLoadingButton
                title={row ? "Edit category" : "add category"}
                variant={"contained"}
                loading={row ? updateCategory.isPending : addCategory.isPending}
                type="submit"
              />
            </Box>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default CategoryForm;
