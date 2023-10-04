import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  setFilter,
  setFromDay,
  setFromMonth,
  setFromYear,
  setGolbalDay,
  setGolbalMonth,
  setGolbalYear,
  setToDay,
  setToMonth,
  setToYear,
} from "../../../redux/SettingsSlice";
import DateInput from "./DateInput";

const Filter = () => {
  const { dateFilter, branch_id, filterState, fromToFilter } = useSelector(
    (state) => state.settings
  );

  console.log(dateFilter);

  const dispatch = useDispatch();

  const handleYearChange = (event) => {
    dispatch(setGolbalYear(event.target.value));
  };
  const handleMonthChange = (event) => {
    dispatch(setGolbalMonth(event.target.value));
  };
  const handleDayChange = (event) => {
    dispatch(setGolbalDay(event.target.value));
  };

  // Handle From Day
  const handleFromYear = (event) => {
    dispatch(setFromYear(event.target.value));
  };

  const handleFromMonth = (event) => {
    dispatch(setFromMonth(event.target.value));
  };

  const handleFromDay = (event) => {
    dispatch(setFromDay(event.target.value));
  };
  // Handle To Day
  const handleToYear = (event) => {
    dispatch(setToYear(event.target.value));
  };

  const handleToMonth = (event) => {
    dispatch(setToMonth(event.target.value));
  };

  const handleToDay = (event) => {
    dispatch(setToDay(event.target.value));
  };

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Tooltip title="Time Filtering" arrow>
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
          sx={{
            fontSize: "2rem",
            marginRight: "2rem",
            fontWeight: "bold",
            color: "#da31fa",
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          position: "absolute",
          zIndex: "1000",
          left: "33px",
          top: "35px",
          minHeight: "40vh",
          padding: "1.8rem 2rem",
          overflow: "hidden",
          borderRadius: "10px",
          backgroundColor: "rgb(142 0 236 / 10%)",
          backdropFilter: "blur(10px)",
          borderRadius: "0 40px 40px 40px",
          transition: "0.4s",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translate(5px , 5px)" : "translate(0 , 0)",
        }}
      >
        <Box>
          <Stack
            sx={{
              border: "3px solid rgb(116 167 218)",
              width: "fit-content",
              borderRadius: "5px",
              margin: "0.5rem auto 1rem ",
            }}
            justifyContent={"center"}
            direction={"row"}
          >
            <button
              onClick={() => {
                dispatch(setFilter("fromTo"));
              }}
              style={{
                border: "none",
                outline: "none",
                padding: "0.2rem 1rem",
                borderRadius: "2px",
                cursor: "pointer",
                background:
                  filterState === "fromTo" ? "rgb(235 128 255)" : "transparent",
                color: filterState === "fromTo" ? "White" : "black",

                fontSize: "0.7rem",
              }}
            >
              From To
            </button>
            <button
              onClick={() => {
                dispatch(setFilter("date"));
              }}
              style={{
                border: "none",
                outline: "none",
                padding: "0.2rem 1rem",
                borderRadius: "2px",
                cursor: "pointer",
                background:
                  filterState === "date" ? "rgb(235 128 255)" : "transparent",
                color: filterState === "date" ? "White" : "black",

                fontSize: "0.7rem",
              }}
            >
              Date
            </button>
          </Stack>
          {filterState === "date" && (
            <Box sx={{ padding: "0.5rem" }}>
              <DateInput
                setYear={handleYearChange}
                setMonth={handleMonthChange}
                setDay={handleDayChange}
                year={dateFilter.year}
                month={dateFilter.month}
                day={dateFilter.day}
              />
            </Box>
          )}

          {filterState === "fromTo" && (
            <Box>
              <DateInput
                setYear={handleFromYear}
                setMonth={handleFromMonth}
                setDay={handleFromDay}
                year={fromToFilter.from.year}
                month={fromToFilter.from.month}
                day={fromToFilter.from.day}
              />

              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "0.4rem 0",
                  fontSize: "1.2rem",
                }}
              >
                To
              </Typography>

              <DateInput
                setYear={handleToYear}
                setMonth={handleToMonth}
                setDay={handleToDay}
                year={fromToFilter.to.year}
                month={fromToFilter.to.month}
                day={fromToFilter.to.day}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
