import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warning: false,
};

export const WarningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    setWarningTrue: (state) => {
      state.warning = true;
    },
    setWarningFalse: (state) => {
      state.warning = false;
    },
  },
});

export const { setWarningTrue, setWarningFalse } = WarningSlice.actions;
