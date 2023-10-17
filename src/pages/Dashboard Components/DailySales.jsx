import React, { useState } from "react";
import ComponentWrapper from "../../components/ComponentWrapper";
import { Skeleton, Box, Paper, Typography, Button, Stack } from "@mui/material";

import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { request } from "../../Request/request";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/ErrorComponent";

const DailySales = () => {
  const { showBoundary } = useErrorBoundary();

  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
    width: "fit-content",
  });

  const { dateFilter, branch_id, filterState } = useSelector(
    (state) => state.settings
  );

  const { data, isLoading, isError, refetch, isRefetching, isSuccess, error } =
    useQuery({
      queryKey: [`get-dayily-Sales-${dateFilter.year}-${dateFilter.month}`],
      queryFn: () => {
        let data;

        data = {
          month: dateFilter.month,
          year: dateFilter.year,
        };

        return request({
          url: `totalSales/${branch_id}`,
          data,
          method: "POST",
        });
      },
      onError: (data) => {
        if (data?.response?.status !== 404 || data?.response?.status !== 500)
          showBoundary(data);
      },
    });

  const [state, setState] = useState("bar");

  // End Total Salse Per Month

  let errorMessage;
  if (isError) {
    if (error?.response?.status === 404)
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (error?.response?.status === 500)
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
  }

  let chartData = [];

  if (isSuccess) {
    chartData = data?.data?.data ? data?.data?.data : [];
  }
  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        padding: "15px",
        height: { xs: "380px", md: "100%" },
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={6}
      >
        <Typography variant="h5">
          Sales Statistics On{" "}
          <Typography
            variant="h5"
            sx={{
              background: "linear-gradient(to bottom, #da32f9, #629ad6)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {dateFilter.month}/{dateFilter.year}
          </Typography>
        </Typography>

        <Stack
          sx={{
            border: "3px solid rgb(116 167 218)",
            width: "fit-content",
            borderRadius: "5px",
          }}
          justifyContent={"center"}
          direction={"row"}
        >
          <button
            onClick={() => {
              setState("bar");
            }}
            style={{
              border: "none",
              outline: "none",
              padding: "0.2rem 1rem",
              borderRadius: "2px",
              cursor: "pointer",
              background: state === "bar" ? "rgb(235 128 255)" : "transparent",
              color: state === "bar" ? "White" : "black",

              fontSize: "0.7rem",
            }}
          >
            Bar
          </button>
          <button
            onClick={() => {
              setState("line");
            }}
            style={{
              border: "none",
              outline: "none",
              padding: "0.2rem 1rem",
              borderRadius: "2px",
              cursor: "pointer",
              background: state === "line" ? "rgb(235 128 255)" : "transparent",
              color: state === "line" ? "White" : "black",

              fontSize: "0.7rem",
            }}
          >
            Line
          </button>
        </Stack>
      </Stack>
      {isError ? (
        <ErrorComponent message={errorMessage} refetch={refetch} />
      ) : (
        <ComponentWrapper>
          {isLoading || isRefetching ? (
            <Skeleton animation={"wave"} width={600} height={250} />
          ) : (
            <>
              {chartData.length === 0 ? (
                <Typography>No Sales In This Day</Typography>
              ) : state === "line" ? (
                <LineChart
                  width={600}
                  height={250}
                  data={chartData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              ) : (
                <BarChart width={600} height={300} data={chartData}>
                  <XAxis dataKey="day" stroke="#c387f2" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#c387f2" strokeDasharray="2 2" />
                  <Bar dataKey="totalSales" fill="#c387f2" barSize={30} />
                </BarChart>
              )}
            </>
          )}
        </ComponentWrapper>
      )}
    </Paper>
  );
};

export default DailySales;
