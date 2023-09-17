import styled from "@emotion/styled";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { lineChartData, lineChartOptions } from "../../../data/chartData";
import { stats } from "../../../data/stats";
import LineChart from "../charts/LineChart";
import { request } from "../../../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../../common/loader/loader";
import { isPending } from "@reduxjs/toolkit";

const Stats = () => {
  const Item = styled(Paper)({
    padding: "5px 10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const getStats = (data) => {
    return request({
      url: "/statistics",
      data,
      method: "POST",
    });
  };

  const { year, day, month } = useSelector((state) => state.settings);
  console.log(year, day, month);

  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: [`get-${year}-${month}-${day}-statis`],
    mutationFn: getStats,
    onSuccess: (data) => {
      console.log(data, "success");
    },
    onError: (data) => {
      console.log(data, "error");
    },
  });

  useEffect(() => {
    mutate({
      year,
      day,
      month,
    });
  }, [year, day, month]);

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return <Box>Error</Box>;
  }

  const stats = data?.data?.data[0];
  let statsArray;

  if (stats) statsArray = Object.keys(stats);
  console.log(stats, statsArray);
  return (
    <Grid container spacing={2}>
      {statsArray?.map((item, i) => (
        <Grid item xs={12} sm={i === stats.length - 1 ? 12 : 6} lg={4} key={i}>
          <Item
            sx={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
            }}
          >
            <Box sx={{ flex: 1 }}>
              icon
              <Typography variant="h4" sx={{ my: 2 }}>
                {stats[item]}
              </Typography>
              <Typography sx={{ opacity: 0.7 }}>{item}</Typography>
            </Box>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default Stats;
