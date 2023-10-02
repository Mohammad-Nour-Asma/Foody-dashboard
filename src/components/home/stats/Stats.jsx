import styled from "@emotion/styled";
import { Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
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

  const { dateFilter, branch_id } = useSelector((state) => state.settings);

  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: [
      `get-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}-statis`,
    ],
    mutationFn: getStats,
    onSuccess: (data) => {},
    onError: (data) => {},
  });

  useEffect(() => {
    mutate({
      year: dateFilter.year,
      day: dateFilter.day,
      month: dateFilter.month,
      branch_id,
    });
  }, [dateFilter]);

  if (isError) {
    return <Box>Error</Box>;
  }

  const stats = data?.data?.data[0];
  let statsArray;

  if (stats) statsArray = Object.keys(stats);
  return (
    <Grid container spacing={2}>
      {(isPending ? Array.from(new Array(5)) : statsArray)?.map((item, i) => (
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
    </Grid>
  );
};

export default Stats;
