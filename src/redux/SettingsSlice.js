import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateFilter: {
    year: new Date().getFullYear(),
    month: null,
    day: null,
  },
  fromToFilter: {
    from: { year: null, month: null, day: null },
    to: { year: null, month: null, day: null },
  },
  filterState: "fromTo",
  branch_id: localStorage.getItem("branch_id"),
  restaurant_id: localStorage.getItem("restaurant_id"),
};

export const settingSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    setGolbalYear: (state, { payload }) => {
      state.dateFilter.year = payload;
    },
    setGolbalMonth: (state, { payload }) => {
      state.dateFilter.month = payload;
    },
    setGolbalDay: (state, { payload }) => {
      state.dateFilter.day = payload;
    },
    setBranchId: (state, { payload }) => {
      state.branch_id = payload;
    },

    setFromYear: (state, { payload }) => {
      state.fromToFilter.from.year = payload;
    },
    setFromMonth: (state, { payload }) => {
      state.fromToFilter.from.month = payload;
    },
    setFromDay: (state, { payload }) => {
      state.fromToFilter.from.day = payload;
    },

    setToYear: (state, { payload }) => {
      state.fromToFilter.to.year = payload;
    },
    setToMonth: (state, { payload }) => {
      state.fromToFilter.to.month = payload;
    },
    setToDay: (state, { payload }) => {
      state.fromToFilter.to.day = payload;
    },

    setFilter: (state, { payload }) => {
      state.filterState = payload;
    },

    setRestaurantId(state, { payload }) {
      state.restaurant_id = payload;
    },
  },
});
export const {
  setGolbalYear,
  setGolbalDay,
  setGolbalMonth,
  setBranchId,
  setFilter,
  setFromYear,
  setFromMonth,
  setFromDay,
  setToYear,
  setToMonth,
  setToDay,
  setRestaurantId,
} = settingSlice.actions;
