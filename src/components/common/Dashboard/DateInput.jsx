import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

const DateInput = ({ setDay, setMonth, setYear, day, month, year }) => {
  return (
    <Box sx={{ padding: "0.5rem" }}>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 80, maxHeight: "150px" }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Day"
          value={day}
          onChange={setDay}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <MenuItem value={null}>none</MenuItem>

          {getDays().map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 80, maxHeight: "150px" }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Month"
          value={month}
          onChange={setMonth}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <MenuItem value={null}>none</MenuItem>

          {getMonthsInYear().map((item) => {
            return <MenuItem value={item.number}>{item.month}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 80, maxHeight: "150px" }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Year"
          value={year}
          onChange={setYear}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <MenuItem value={null}>none</MenuItem>
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2024"}>2024</MenuItem>
          <MenuItem value={"2025"}>2025</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateInput;
