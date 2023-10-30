import {
  Box,
  Paper,
  Tab,
  Tabs,
  Grid,
  Typography,
  Skeleton,
  Stack,
} from "@mui/material";

import { request } from "../Request/request";
import { useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";

function decimalToTime(decimalNumber) {
  const hours = Math.floor(decimalNumber);
  const minutes = Math.floor((decimalNumber - hours) * 60);
  const seconds = Math.floor(((decimalNumber - hours) * 60 - minutes) * 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return ` ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const ServiceTiming = () => {
  const { showBoundary } = useErrorBoundary();

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
        onError: (data) => {
          if (data?.response?.status !== 404 || data?.response?.status !== 500)
            showBoundary(data);
        },
      },
      {
        queryKey: ["timefromDone"],
        queryFn: timefromDone,
        onError: (data) => {
          if (data?.response?.status !== 404 || data?.response?.status !== 500)
            showBoundary(data);
        },
      },
      {
        queryKey: ["timeReady"],
        queryFn: getReadyTime,
        onError: (data) => {
          if (data?.response?.status !== 404 || data?.response?.status !== 500)
            showBoundary(data);
        },
      },
    ],
  });

  let errorMessage;
  if (result[0].isError || result[1].isError || result[2].isError) {
    if (
      result[0].error?.response?.status === 404 ||
      result[1].error?.response?.status === 404 ||
      result[2].error?.response?.status === 404
    )
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (
      result[0].error?.response?.status === 500 ||
      result[1].error?.response?.status === 500 ||
      result[2].error?.response?.status === 500
    )
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
  }

  const preparationTimeData =
    result[0].isLoading || result[0].error ? [] : result[0].data.data.data;
  const timefromDoneData =
    result[1].isLoading || result[1].error ? [] : result[1].data.data.data;
  const timeReadyData =
    result[2].isLoading || result[2].error ? [] : result[2].data.data.data;

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Stack
        gap={0.8}
        sx={{ marginBottom: "14px" }}
        direction={"row"}
        alignItems={"center"}
      >
        <HourglassBottomIcon
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
          Service Timing
        </Typography>
      </Stack>
      {result[0].isError || result[1].isError || result[2].isError ? (
        <ErrorComponent
          message={errorMessage}
          refetch={() => {
            result[0].refetch();
            result[1].refetch();
            result[2].refetch();
          }}
        />
      ) : (
        <Grid container spacing={2}>
          <Grid lg={4} md={6} sm={12} item>
            <Paper
              sx={{
                background: "#ededfd",
                padding: "2rem",
                border: "1px solid",
              }}
            >
              Preparation Time In Kitchen
              <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
                {result[0].isLoading || result[0].isRefetching ? (
                  <Skeleton width={"55%"} />
                ) : preparationTimeData ? (
                  decimalToTime(preparationTimeData)
                ) : (
                  "no orders"
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid lg={4} md={6} sm={12} item>
            <Paper
              sx={{
                background: "#ededfd",
                padding: "2rem",
                border: "1px solid",
              }}
            >
              Waiter Delivery Time
              <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
                {result[1].isLoading || result[1].isRefetching ? (
                  <Skeleton width={"55%"} />
                ) : timefromDoneData ? (
                  decimalToTime(timefromDoneData)
                ) : (
                  "no orders"
                )}
              </Typography>
            </Paper>
          </Grid>
          <Grid lg={4} md={6} sm={12} item>
            <Paper
              sx={{
                background: "#ededfd",
                padding: "2rem",
                border: "1px solid",
              }}
            >
              Full Process Time
              <Typography fontWeight={"bold"} fontSize={"1.4rem"}>
                {result[2].isLoading || result[2].isRefetching ? (
                  <Skeleton width={"55%"} />
                ) : timeReadyData ? (
                  decimalToTime(timeReadyData)
                ) : (
                  "no orders"
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ServiceTiming;
