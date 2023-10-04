import styled from "@emotion/styled";
import { Box, Grid, Paper, Skeleton, Typography, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { request } from "../../../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Stats = () => {
  const Item = styled(Paper)({
    padding: "1rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "left",
    background: "#ededfd",
    justifyContent: "space-between",
    textAlign: "left",
  });

  const getStats = (data) => {
    return request({
      url: `/statistics/${branch_id}`,
      data,
      method: "POST",
    });
  };

  const { dateFilter, branch_id, fromToFilter, filterState } = useSelector(
    (state) => state.settings
  );

  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: [
      `get-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}-statis`,
    ],
    mutationFn: getStats,
    onSuccess: (data) => {},
    onError: (data) => {},
  });

  const getMaxSales = useMutation({
    mutationKey: [
      `get-maxSales-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}-statis`,
    ],
    mutationFn: (data) => {
      return request({
        url: `/max/${branch_id}`,
        data,
        method: "POST",
      });
    },
    onSuccess: (data) => {},
    onError: (data) => {},
  });

  useEffect(() => {
    if (filterState === "date") {
      mutate({
        year: dateFilter.year,
        day: dateFilter.day,
        month: dateFilter.month,
        branch_id,
      });
      getMaxSales.mutate({
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
      getMaxSales.mutate(data);
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

  if (isError) {
    return <Box>Error</Box>;
  }

  const stats = data?.data?.data;
  let statsArray;

  if (stats) statsArray = Object.keys(stats);
  console.log(getMaxSales.data?.data?.data, "max");
  return (
    <Grid container spacing={2}>
      {(isPending ? Array.from(new Array(4)) : statsArray)?.map((item, i) => (
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
              <Typography variant="h4" sx={{ my: 2 }}>
                {item ? (
                  stats[item] ? (
                    stats[item]
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
      ))}

      <Grid item xs={12} sm={12} lg={4}>
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography>
              {getMaxSales.isPending ? <Skeleton width="60%" /> : "Max Sales"}
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h4" sx={{ my: 2 }}>
                {getMaxSales.isPending ? (
                  <Skeleton width="60%" />
                ) : (
                  getMaxSales.data?.data?.data.count
                )}
              </Typography>
              <Typography fontSize={"1rem"} sx={{ my: 2 }}>
                {getMaxSales.isPending ? (
                  <Skeleton width="60%" />
                ) : (
                  getMaxSales.data?.data?.data.date
                )}
              </Typography>
            </Stack>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Stats;
