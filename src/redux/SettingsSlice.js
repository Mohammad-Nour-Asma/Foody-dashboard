import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  year: "2023",
  month: "9",
  day: "1",
  branch_id: localStorage.getItem("branch_id"),
};

export const settingSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    setGolbalYear: (state, { payload }) => {
      state.year = payload;
    },
    setGolbalMonth: (state, { payload }) => {
      state.month = payload;
    },
    setGolbalDay: (state, { payload }) => {
      state.day = payload;
    },
    setBranchId: (state, { payload }) => {
      state.branch_id = payload;
    },
  },
});
export const { setGolbalYear, setGolbalDay, setGolbalMonth, setBranchId } =
  settingSlice.actions;
