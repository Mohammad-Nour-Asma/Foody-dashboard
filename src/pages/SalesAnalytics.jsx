import styled from "@emotion/styled";
import { Box, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import AveargeTotals from "../components/sales/AveargeTotals";
import BarChart from "../components/sales/charts/BarChart";
import LineChart from "../components/sales/charts/LineChart";
import SalesReportChart from "../components/sales/charts/SalesReportChart";
import {
  salesLineChartData,
  salesLineChartOptions,
  salesReportPieChartData,
  salesReportPieChartOptions,
} from "../data/chartData";
import { request } from "../Request/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";
const SalesAnalytics = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const { dateFilter, branch_id } = useSelector((state) => state.settings);

  const { showBoundary } = useErrorBoundary();

  // Start Total Salse Per Month
  const totalSalseRequest = () => {
    let data = { year: new Date().getFullYear() };
    if (dateFilter.year) {
      data.year = dateFilter.year;
    }
    return request({
      url: `/totalSales/${branch_id}`,
      method: "POST",
      data: data,
    });
  };

  const totalSales = useQuery({
    queryKey: [`maxSalels-${branch_id}`],
    queryFn: totalSalseRequest,
    staleTime: Infinity,
    cacheTime: 0,

    onError: (data) => {
      if (data?.response?.status !== 404 || data?.response?.status !== 500)
        showBoundary(data);
    },
  });

  const getMonths = (data) => {
    let months = [];
    for (let index = 0; index < data?.length; index++) {
      const element = data[index];
      const date = new Date();
      date.setMonth(element.month - 1);

      months.push(date.toLocaleString("default", { month: "long" }));
    }
    return months;
  };

  const getTotalSalesData = (data) => {
    let info = [];
    for (let index = 0; index < data?.length; index++) {
      // data.push(data[index]?.total);
      info.push(data[index].totalSales);
    }
    return info;
  };

  // End Total Salse Per Month

  const getData = () => {
    return request({
      url: `peakTimes/${branch_id}`,
      method: "POST",
      data: {
        date: `${dateFilter.year}-${dateFilter.month}-${dateFilter.day}`,
      },
    });
  };

  const {
    data: bar,
    isLoading,
    isError,
    refetch,
    isRefetching,
    error,
  } = useQuery({
    queryKey: [`get-peakTimes-${dateFilter.year}-${dateFilter.month}`],
    queryFn: getData,
    staleTime: Infinity,
    cacheTime: 0,
    onError: (data) => {
      if (data?.response?.status !== 404 || data?.response?.status !== 500)
        showBoundary(data);
    },
  });

  useEffect(() => {
    refetch();
  }, [dateFilter, branch_id]);

  useEffect(() => {
    totalSales.refetch();
  }, [dateFilter.year, branch_id]);

  // initiate the line data

  let errorMessage1;
  if (isError || totalSales.error) {
    if (
      error?.response?.status === 404 ||
      totalSales.error?.response?.status === 404
    )
      errorMessage1 = "Data Not Found - Please Contact The Technical Team Or";
    else if (
      error?.response?.status === 500 ||
      totalSales.error?.response?.status === 500
    )
      errorMessage1 =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
  }

  const salsePerMonth = totalSales.isLoading
    ? []
    : totalSales?.data?.data?.data;
  const chartData = {
    name: "Total Sales",
    data: getTotalSalesData(salsePerMonth),
  };
  salesLineChartOptions.xaxis.categories = getMonths(salsePerMonth);

  return (
    <Box sx={{ pt: "20px", pb: "20px" }}>
      <Stack
        direction={"row"}
        gap={0.8}
        sx={{ marginBottom: "14px" }}
        alignItems={"center"}
      >
        <MonetizationOnIcon
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
          Sales Analytics
        </Typography>
      </Stack>
      <ComponentWrapper>
        {totalSales.isError || isError ? (
          <ErrorComponent
            message={errorMessage1}
            refetch={() => {
              totalSales.refetch();
              refetch();
            }}
          />
        ) : (
          <Stack gap={2}>
            <Box sx={{ padding: "1rem" }}>
              {isLoading ||
              totalSales.isLoading ||
              isRefetching ||
              totalSales.isRefetching ? (
                <Skeleton
                  sx={{ bottom: "80px", position: "relative" }}
                  width={"100%"}
                  height={"400px"}
                />
              ) : (
                <LineChart
                  chartOptions={salesLineChartOptions}
                  chartData={[chartData]}
                />
              )}
            </Box>

            <Box sx={{ padding: "1rem" }}>
              {isLoading ||
              totalSales.isLoading ||
              isRefetching ||
              totalSales.isRefetching ? (
                <Skeleton
                  sx={{ bottom: "80px", position: "relative" }}
                  width={"100%"}
                  height={"400px"}
                />
              ) : (
                <BarChart data={bar.data.data} />
              )}
            </Box>
          </Stack>
        )}
      </ComponentWrapper>
    </Box>
  );
};

export default SalesAnalytics;
