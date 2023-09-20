import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Loader from "./loader/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setBranchId,
  setGolbalDay,
  setGolbalMonth,
  setGolbalYear,
} from "../../redux/SettingsSlice";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const theme = useTheme();

  const dispatch = useDispatch();
  const currentTheme = theme.palette.mode;

  const getBranches = () => {
    return request({
      url: `/branch/restaurant/${localStorage.getItem("restaurant_id")}`,
      method: "GET",
    });
  };
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,

    onSuccess: (data) => {
      // Assuming data contains an id property

      localStorage.setItem("id", data[0].id);
      dispatch(setBranchId(data[0].id));
    },
  });

  if (isSuccess) {
    if (!localStorage.getItem("branch_id")) {
      localStorage.setItem("branch_id", data.data.data[0].id);
      dispatch(setBranchId(data.data.data[0].id));
    }
  }

  const { year, day, month, branch_id } = useSelector(
    (state) => state.settings
  );

  const handleBranchChange = (event) => {
    localStorage.setItem("branch_id", event.target.value);
    dispatch(setBranchId(event.target.value));
  };

  const handleYearChange = (event) => {
    dispatch(setGolbalYear(event.target.value));
  };
  const handleMonthChange = (event) => {
    console.log(event.target.value);
    dispatch(setGolbalMonth(event.target.value));
  };
  const handleDayChange = (event) => {
    dispatch(setGolbalDay(event.target.value));
  };

  function getMonthsInYear() {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(2022, month, 1);
      months.push({
        month: date.toLocaleString("default", { month: "long" }),
        number: month + 1,
      });
    }
    return months;
  }

  function getDays() {
    const days = [];
    for (let day = 1; day < 32; day++) {
      days.push(day);
    }
    return days;
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 80 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Day"
                value={day}
                onChange={handleDayChange}
              >
                <MenuItem value={null}>none</MenuItem>

                {getDays().map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 80 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Month"
                value={month}
                onChange={handleMonthChange}
              >
                <MenuItem value={null}>none</MenuItem>

                {getMonthsInYear().map((item) => {
                  return <MenuItem value={item.number}>{item.month}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 80 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Year"
                value={year}
                onChange={handleYearChange}
              >
                <MenuItem value={null}>none</MenuItem>
                <MenuItem value={"2023"}>2023</MenuItem>
                <MenuItem value={"2024"}>2024</MenuItem>
                <MenuItem value={"2025"}>2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 80 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Branch</InputLabel>
              {isLoading ? (
                <Box sx={{ transform: "scale(0.5)" }}>
                  <Loader />
                </Box>
              ) : (
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={branch_id}
                  label="Branch"
                  onChange={handleBranchChange}
                >
                  {data.data.data.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              )}
            </FormControl>

            <Tooltip title="Toggle Theme" arrow>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ fontSize: "20px", color: "text.primary" }}
              >
                {currentTheme === "light" ? <FiMoon /> : <FiSun />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
