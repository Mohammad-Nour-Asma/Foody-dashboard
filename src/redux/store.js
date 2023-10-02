import { configureStore } from "@reduxjs/toolkit";
import { settingSlice } from "./SettingsSlice";
import ingredients from "./IngredientsSlice";
import { WarningSlice } from "./WarningSlice";

export const store = configureStore({
  reducer: {
    settings: settingSlice.reducer,
    ingredients: ingredients.reducer,
    warning: WarningSlice.reducer,
  },
});
