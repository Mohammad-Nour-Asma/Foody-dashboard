import { Box, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import {
  ingredientColumns,
  productIngredientColumns,
} from "../data/Ingredients";
import Table from "../components/Table";
import Page from "../components/common/Page";
import ProductIngredients from "../components/common/ٍSingle Meal Components/ProductIngredients";
import ProductExtraIngredients from "../components/common/ٍSingle Meal Components/ProductExtraIngredients";

const SingleProduct = () => {
  const { id } = useParams();

  const getProductDetails = () => {
    return request({ url: `product/${id}` });
  };

  const { data, isLoading, isError, isSuccess, refetch, isRefetching } =
    useQuery({
      queryKey: [`get-product-details-${id}`],
      queryFn: getProductDetails,
    });

  let productDetails;
  if (isSuccess) productDetails = data?.data.data;

  if (isLoading) {
    return (
      <Box sx={{ pt: "80px", pb: "20px" }}>
        <Loader />
      </Box>
    );
  }

  const extra = productDetails.extra_ingredients;
  const ingredients = productDetails.ingredients;
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h4">Product Details</Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            p: "20px",
            background: "rgba(129, 139, 156, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <img
                src={productDetails?.image}
                alt={"product_name"}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Typography variant="h4">{productDetails.name}</Typography>
              <Typography variant="h5">{productDetails.description}</Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}
              >
                {/* <Rating value={rate / 2} readOnly /> */}
              </Box>
              <Typography variant="subtitle2">
                {productDetails.price} SAR
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}
              >
                <Typography variant="subtitle2">Category</Typography>
                <Chip label={productDetails?.category?.name} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      <ProductIngredients
        isRefetching={isRefetching}
        refetch={refetch}
        ingredients={ingredients}
      />

      <ProductExtraIngredients
        isRefetching={isRefetching}
        refetch={refetch}
        extra={extra}
      />
    </Box>
  );
};

export default SingleProduct;
