import styled from "@emotion/styled";
import { Box, Grid, Paper, Skeleton, Typography, Stack } from "@mui/material";
import React, { useEffect } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { request } from "../../Request/request";
import DashboardHeading from "./DashboardHeading";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/ErrorComponent";
import { formatNumber } from "../../components/HelperFunction";
const OutDoorStats = () => {
  const Item = styled(Paper)({
    padding: "1rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "left",
    background: "#ededfd",
    justifyContent: "space-between",
    textAlign: "left",
  });

  const { showBoundary } = useErrorBoundary();
  const getStats = (data) => {
    return request({
      url: `/takeaway/statistics/${branch_id}`,
      data,
      method: "POST",
    });
  };

  const { dateFilter, branch_id, fromToFilter, filterState } = useSelector(
    (state) => state.settings
  );

  const { mutate, isPending, data, isError, error } = useMutation({
    mutationKey: [
      `get-outdoor-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}-statis`,
    ],
    mutationFn: getStats,
    onSuccess: (data) => {},
    onError: (data) => {
      if (data?.response?.status !== 404 || data?.response?.status !== 500)
        showBoundary(data);
    },
  });

  useEffect(() => {
    if (filterState === "date") {
      mutate({
        year: dateFilter.year,
        day: dateFilter.day,
        month: dateFilter.month,
        branch_id,
      });
    } else if (filterState === "fromTo") {
      const data = {
        start_date: `${fromToFilter.from.year}-${fromToFilter.from.month}-${fromToFilter.from.day}`,
        end_date: `${fromToFilter.to.year}-${fromToFilter.to.month}-${fromToFilter.to.day}`,
      };
      mutate(data);
    }
  }, [
    dateFilter.year,
    dateFilter.month,
    dateFilter.day,
    fromToFilter.to.year,
    fromToFilter.to.day,
    fromToFilter.to.month,
    fromToFilter.from.year,
    fromToFilter.from.day,
    fromToFilter.from.month,
    branch_id,
    filterState,
  ]);

  const refetch = () => {
    if (filterState === "date") {
      mutate({
        year: dateFilter.year,
        day: dateFilter.day,
        month: dateFilter.month,
        branch_id,
      });
    } else if (filterState === "fromTo") {
      const data = {
        start_date: `${fromToFilter.from.year}-${fromToFilter.from.month}-${fromToFilter.from.day}`,
        end_date: `${fromToFilter.to.year}-${fromToFilter.to.month}-${fromToFilter.to.day}`,
      };
      mutate(data);
    }
  };

  let errorMessage = "";
  if (isError) {
    if (error?.response?.status === 404)
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (error?.response?.status === 500)
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
  }

  const stats = data?.data[0];
  let statsArray;

  if (stats) statsArray = Object.keys(stats);

  return (
    <>
      <DashboardHeading title={"Outdoor Statistics"} Icon={QueryStatsIcon} />
      {isError ? (
        <ErrorComponent message={errorMessage} refetch={refetch} />
      ) : (
        <Grid container spacing={2}>
          {(isPending ? Array.from(new Array(6)) : statsArray)?.map(
            (item, i) => (
              <Grid item xs={12} sm={i === 5 - 1 ? 12 : 6} lg={4} key={i}>
                <Item
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    {/* icon */}
                    {item ? (
                      item.replace("_", " ").toLocaleUpperCase()
                    ) : (
                      <Skeleton width="60%" />
                    )}
                    <Typography variant="h4" sx={{ mt: "1rem" }}>
                      {item ? (
                        stats[item] ? (
                          formatNumber(Math.trunc(stats[item]))
                        ) : (
                          0
                        )
                      ) : (
                        <Skeleton width="60%" />
                      )}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            )
          )}

          <Grid xs={12} sm={6} lg={4} item>
            <Item
              sx={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
              }}
            >
              <Box sx={{ flex: 1 }}>
                {/* icon */}
                {isPending ? <Skeleton width="60%" /> : "Order Count"}
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={"1rem"}
                >
                  <Typography variant="h4">
                    {isPending ? (
                      <Skeleton width="60%" />
                    ) : data?.data[1] ? (
                      data?.data[1]?.count ? (
                        formatNumber(data?.data[1]?.count)
                      ) : (
                        0
                      )
                    ) : (
                      <Typography variant="h4">0</Typography>
                    )}
                  </Typography>

                  <Typography variant="h6">
                    {isPending ? (
                      <Skeleton width="60%" />
                    ) : data?.data[1] ? (
                      data?.data[1]?.date ? (
                        data?.data[1]?.date
                      ) : (
                        0
                      )
                    ) : (
                      <Typography></Typography>
                    )}
                  </Typography>
                </Stack>
              </Box>
            </Item>
          </Grid>
          <Grid xs={12} sm={6} lg={4} item>
            <Item
              sx={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
              }}
            >
              <Box sx={{ flex: 1 }}>
                {/* icon */}
                {isPending ? <Skeleton width="60%" /> : "Max Sales"}
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mt={"1rem"}
                >
                  <Typography variant="h4">
                    {isPending ? (
                      <Skeleton width="60%" />
                    ) : data?.data[2] ? (
                      data?.data[2]?.max_sales ? (
                        formatNumber(Math.trunc(data?.data[2]?.max_sales))
                      ) : (
                        0
                      )
                    ) : (
                      <Typography variant="h4">0</Typography>
                    )}
                  </Typography>

                  <Typography variant="h6">
                    {isPending ? (
                      <Skeleton width="60%" />
                    ) : data?.data[2] ? (
                      data?.data[2]?.date ? (
                        data?.data[2]?.date
                      ) : (
                        0
                      )
                    ) : (
                      <Typography></Typography>
                    )}
                  </Typography>
                </Stack>
              </Box>
            </Item>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OutDoorStats;
