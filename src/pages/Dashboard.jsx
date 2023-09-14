import styled from "@emotion/styled";
import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import React from "react";
import BarChart from "../components/home/charts/BarChart";
import Stats from "../components/home/stats/Stats";
import Table from "../components/Table";
import { orders, ordersColumns } from "../data/orders";
import ComponentWrapper from "../components/ComponentWrapper";
import FiveElements from "./Dashboard Components/FiveElements";
import Chart from "react-apexcharts";
import Donut from "./Dashboard Components/Donut";

const Dashboard = () => {
  const columns = [
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Product",
    },
    {
      accessorKey: "category", //access nested data with dot notation
      header: "Category",
    },
    {
      accessorKey: "rating", //access nested data with dot notation
      header: "Rating",

      Cell: ({ cell, row }) => {
        return <Rating defaultValue={cell.getValue()} readOnly />;
      },
    },
  ];

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ComponentWrapper>
        <Stats />
      </ComponentWrapper>
      <FiveElements entity={"products"} type={"top"} columns={columns} />
      <FiveElements entity={"products"} type={"least"} columns={columns} />
      <ComponentWrapper>
        <Typography mb={2} textAlign={"center"} variant="h5">
          Agerage Products Rating
        </Typography>
        <Box sx={{ margin: "0 auto", display: "block" }}>
          <Paper
            sx={{
              maxWidth: "50%",
              padding: "1rem",
              display: "flex",
              margin: "0 auto",
              justifyContent: "center",
            }}
          >
            <Donut width={400} series={[45, 100 - 40]} />
          </Paper>
        </Box>
      </ComponentWrapper>
    </Box>
  );
};

export default Dashboard;
