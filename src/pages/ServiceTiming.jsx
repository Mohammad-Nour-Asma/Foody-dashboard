import { Box, Paper, Tab, Tabs, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Notifications from "../components/settings/Notifications";
import Password from "../components/settings/Password";
import Profile from "../components/settings/Profile";
import styled from "@emotion/styled";
import { request } from "../Request/request";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../components/common/loader/loader";

const ServiceTiming = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const preparationTime = () => {
    return request({
      url: `/preparationTime/${branch_id}`,
      method: "GET",
    });
  };

  const timefromDone = () => {
    return request({ url: `/timefromDone/${branch_id}`, method: "GET" });
  };

  const getReadyTime = () => {
    return request({ url: `/timeReady/${branch_id}`, method: "GET" });
  };

  const result = useQueries({
    queries: [
      {
        queryKey: ["preparationTime"],
        queryFn: preparationTime,
      },
      {
        queryKey: ["timefromDone"],
        queryFn: timefromDone,
      },
      {
        queryKey: ["timeReady"],
        queryFn: getReadyTime,
      },
    ],
  });

  if (result[0].isLoading || result[1].isLoading || result[2].isLoading) {
    return <Loader />;
  }

  const preparationTimeData = result[0].data.data.data;
  const timefromDoneData = result[1].data.data.data;
  const timeReadyData = result[2].data.data.data;
  console.log(preparationTimeData, "rep");
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Grid justifyContent={"center"} container spacing={2}>
        <Grid item>
          <Paper sx={{ width: "250px", background: "", padding: "2rem" }}>
            preparation Time
            <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
              {preparationTimeData ? preparationTimeData : "no orders"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper sx={{ width: "250px", background: "", padding: "2rem" }}>
            time from Done
            <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
              {timefromDoneData ? timefromDoneData : "no orders"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper sx={{ width: "250px", background: "", padding: "2rem" }}>
            timeReady
            <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
              {timeReadyData ? timeReadyData : "no orders"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceTiming;
