import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import { BsArrowReturnRight } from "react-icons/bs";

const OrderItem = ({ orderItemData }) => {
  return (
    <Box
      sx={{
        padding: "20px 15px",
        position: "relative",
        transition: "0.4s",

        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "0.5px",
          left: "0",
          bottom: "0.5px",
          backgroundColor: "rgba(0,0,0,.29)",
        },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
            }}
          >
            {orderItemData?.name}
          </Typography>
        </Grid>
        <Grid xs={12} sm={2}>
          <Typography
            sx={{
              fontSize: "20px",
              whiteSpace: "nowrap",
            }}
          >
            Qty : {orderItemData?.qty}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              textAlign: { xs: "start", sm: "end" },
            }}
          >
            {orderItemData?.subTotal}SAR
          </Typography>
        </Grid>
      </Grid>
      {orderItemData?.note && (
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <BsArrowReturnRight
            style={{
              display: "inline-block",

              margin: "0.1rem",
            }}
          />
          <Typography variant="h6" color={"#ef4444"} whiteSpace={"nowrap"}>
            Rate :
          </Typography>
          <Typography>{orderItemData?.rating?.value}/5</Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderItem;
