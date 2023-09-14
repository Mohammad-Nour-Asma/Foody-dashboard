import { Box, Chip, Grid, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";

const SingleProduct = () => {
  const { id } = useParams();

  const getProductDetails = () => {
    return request({ url: `show_product/${id}` });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: getProductDetails,
  });
  const productDetails = data?.data.data;

  const getProdcutRate = () => {
    return request({
      url: `show_rating/${id}`,
    });
  };
  const rating = useQuery({
    queryKey: [`get-${id}-rate`],
    queryFn: getProdcutRate,
  });

  const rate = rating?.data?.data.data.value;
  console.log(rate);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h4">Product Details</Typography>
      {isLoading || rating.isLoading ? (
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
              <Typography variant="h4">{productDetails?.name}</Typography>
              <Typography variant="h5">${productDetails?.price}</Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}
              >
                <Typography variant="subtitle2">
                  284 customer reviews
                </Typography>
                <Rating value={rate / 2} readOnly />
              </Box>
              <Typography variant="subtitle2">
                {productDetails?.ingredients}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}
              >
                <Typography variant="subtitle2">Category</Typography>
                <Chip label={productDetails?.category.name} />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}
              >
                <Typography variant="subtitle2">Extra Ingredients</Typography>
                {productDetails?.extraIngredients.length == 0 && (
                  <p>No Extra Ingredients</p>
                )}
                {productDetails?.extraIngredients.map((item) => (
                  <Chip label={item.name} color="success" />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SingleProduct;