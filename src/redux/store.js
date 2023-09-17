import { configureStore } from "@reduxjs/toolkit";
import { settingSlice } from "./SettingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingSlice.reducer,
  },
});
