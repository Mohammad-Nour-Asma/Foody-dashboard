import styled from "@emotion/styled";
import { Box, Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import BarChart from "../components/home/charts/BarChart";
import Stats from "../components/home/stats/Stats";
import Table from "../components/Table";
import { orders, ordersColumns } from "../data/orders";
import ComponentWrapper from "../components/ComponentWrapper";
import FiveElements from "./Dashboard Components/FiveElements";
import Chart from "react-apexcharts";
import Donut from "./Dashboard Components/Donut";
import SalesAnalytics from "./SalesAnalytics";
import ServiceTiming from "./ServiceTiming";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Filter from "../components/common/Dashboard/Filter";

const ratedColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Product",
  },
  {
    accessorKey: "category", //access nested data with dot notation
    header: "Category",
  },
  {
    accessorKey: "rate", //access nested data with dot notation
    header: "Rating",

    Cell: ({ cell, row }) => {
      return <Rating defaultValue={cell.getValue()} readOnly />;
    },
  },
];

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
    accessorKey: "total", //access nested data with dot notation
    header: "Total",
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Filter />

      <ComponentWrapper>
        <Stats />
      </ComponentWrapper>

      <ServiceTiming />
      <SalesAnalytics />
      <Stack
        gap={0.8}
        sx={{ marginBottom: "-1.33rem" }}
        direction={"row"}
        alignItems={"center"}
      >
        <RestaurantIcon
          sx={{
            color: "#c387f2",
            fontSize: "1.5rem",
            position: "relative",
            bottom: "0.1rem",
          }}
          className="gradient-icon"
        />{" "}
        <Typography
          sx={{
            background: "linear-gradient(to bottom, #da32f9, #629ad6)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          variant="h5"
        >
          Products
        </Typography>
      </Stack>
      <FiveElements
        entity={"products"}
        type={"top requested products"}
        columns={columns}
      />
      <FiveElements
        entity={"products"}
        type={"least requested products"}
        columns={columns}
      />
      <FiveElements
        entity={"products"}
        type={"top rated products"}
        columns={ratedColumns}
      />
      <FiveElements
        entity={"products"}
        type={"least rated products"}
        columns={ratedColumns}
      />
    </Box>
  );
};

export default Dashboard;
