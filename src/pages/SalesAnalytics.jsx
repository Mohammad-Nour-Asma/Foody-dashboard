import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
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
import Loader from "../components/common/loader/loader";

const SalesAnalytics = () => {
  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  const { year, month, day, branch_id } = useSelector(
    (state) => state.settings
  );

  // Start Total Salse Per Month
  const totalSalseRequest = () => {
    return request({
      url: `totalSales/${branch_id}`,
      method: "POST",
      data: { year },
    });
  };

  const totalSales = useQuery({
    queryKey: [`maxSalels-${branch_id}`],
    queryFn: totalSalseRequest,
  });

  const getMonths = (data) => {
    let months = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const date = new Date();
      date.setMonth(element.month - 1);

      months.push(date.toLocaleString("default", { month: "long" }));
    }
    return months;
  };

  const getTotalSalesData = (data) => {
    let info = [];
    for (let index = 0; index < data.length; index++) {
      // data.push(data[index]?.total);
      info.push(data[index].totalSales);
    }
    return info;
  };

  // const data = [
  //   {
  //     month: 1,
  //     totalSales: 20000,
  //   },
  //   {
  //     month: 2,
  //     totalSales: 40,
  //   },
  //   {
  //     month: 3,
  //     totalSales: 90,
  //   },
  //   {
  //     month: 4,
  //     totalSales: 200,
  //   },
  //   {
  //     month: 5,
  //     totalSales: 400,
  //   },
  // ];

  // End Total Salse Per Month

  const getData = () => {
    console.log(`${year}-${month}-${day}`);
    return request({
      url: `peakTimes/${branch_id}`,
      method: "POST",
      data: { date: `${year}-${month}-${day}` },
    });
  };

  const {
    data: bar,
    isLoading,
    isErro,
    refetch,
  } = useQuery({
    queryKe: [`get-${year}-${month}`],
    queryFn: getData,
  });

  useEffect(() => {
    refetch();
  }, [year, month, day, branch_id]);

  useEffect(() => {
    totalSales.refetch();
  }, [year]);

  if (isLoading || totalSales.isLoading) {
    return (
      <Box sx={{ pt: "80px", pb: "20px" }}>
        <Loader />
      </Box>
    );
  }

  // initiate the line data

  const salsePerMonth = totalSales.data.data.data;
  console.log(salsePerMonth);
  const chartData = {
    name: "Total Sales",
    data: getTotalSalesData(salsePerMonth),
  };
  salesLineChartOptions.xaxis.categories = getMonths(salsePerMonth);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Sales Analytics
      </Typography>
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <LineChart
              chartOptions={salesLineChartOptions}
              chartData={[chartData]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <BarChart data={bar.data.data} />
            </Paper>
          </Grid>
        </Grid>
      </ComponentWrapper>
    </Box>
  );
};

export default SalesAnalytics;
