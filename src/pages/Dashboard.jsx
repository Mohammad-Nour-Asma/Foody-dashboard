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

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ComponentWrapper>
        <Stats />
      </ComponentWrapper>
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
