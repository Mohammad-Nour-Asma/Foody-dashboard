import styled from "@emotion/styled";
import { Box, Paper, Typography } from "@mui/material";
import DonutChart from "../components/DonutChart";
import Table from "../components/Table";
import {
  productSalesDognutChartData,
  productSalesDognutChartOptions,
} from "../data/chartData";
import { productSales, productSalesColumns } from "../data/productSales";
import { useMutation } from "@tanstack/react-query";
import Notify from "../components/common/Notify";
import { useState } from "react";
import { request } from "../Request/request";
const ProductSales = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Product Sales
      </Typography>
      <ComponentWrapper>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            height: "100%",
            padding: "16px",
          }}
        >
          <Typography variant="h5">Product Sales per Category</Typography>
          <DonutChart
            chartOptions={productSalesDognutChartOptions}
            chartData={productSalesDognutChartData}
          />
        </Paper>
      </ComponentWrapper>
    </Box>
  );
};

export default ProductSales;
