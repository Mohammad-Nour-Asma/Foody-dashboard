import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
  ingredientaForSubmiting: [],
  open: false,
};

const ingredients = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    add_new_ingredient: (state) => {
      state.open = false;
      state.ingredients.push({
        key: state.ingredients.length,
        id: 0,
        quantity: 0,
        is_remove: false,
        units_options: [],
        unit: "",
      });
    },
    delete_ingredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (obj) => obj.key !== action.payload
      );
      if (state.ingredients.length === 0) {
        state.open = false;
      }
    },
    update_ingredient: (state, action) => {
      let oldArray = [...state.ingredients];
      oldArray.forEach((element, i) => {
        if (element.key === action.payload.key) {
          const ingredient = {
            key: element.key,
            id: action.payload.id,
            quantity: action.payload.quantity,
            is_remove: action.payload.is_remove,
            units_options: action.payload.units_options,
            unit: action.payload.unit,
          };
          oldArray[i] = ingredient;
        }
      });
      state.ingredients = oldArray;
    },
    ready_to_submiting: (state) => {
      let data = state.ingredients.filter(
        (ingredient) => ingredient.id !== 0 && ingredient.quantity !== 0
      );

      state.ingredients = data;
      if (data.length !== 0) state.open = true;
    },
    setClose: (state) => {
      state.open = false;
    },
    reset: (state) => {
      state.ingredientaForSubmiting = [];
      state.ingredients = [];
      state.open = false;
    },
  },
});

export default ingredients;

export const {
  add_new_ingredient,
  delete_ingredient,
  update_ingredient,
  ready_to_submiting,
  reset,
  setClose,
} = ingredients.actions;
