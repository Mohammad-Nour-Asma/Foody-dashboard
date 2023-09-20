import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Table from "../components/Table";
import { reviews, reviewsClumns } from "../data/reviews";
import { request } from "../Request/request";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import OrderCard from "../components/OrderCard";

const Reviews = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const getOrdersReviews = () => {
    return request({
      url: `/feedbacks/${branch_id}`,
    });
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: [`get-feedback-${branch_id}`],
    queryFn: getOrdersReviews,
  });

  useEffect(() => {
    refetch();
  }, [branch_id]);

  if (isLoading) {
    return (
      <Box sx={{ pt: "100px", pb: "60px", px: "30px" }}>
        <Loader />
      </Box>
    );
  }
  const orders = data.data.data;
  console.log(orders);

  return (
    <Box sx={{ pt: "100px", pb: "60px", px: "30px" }}>
      <Grid spacing={4} container>
        {orders?.map((item) => {
          return (
            <Grid item xs={12} md={6}>
              {" "}
              <OrderCard orderData={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Reviews;
