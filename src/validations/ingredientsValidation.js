import * as yup from "yup";

export const ingredientValidation = yup.object({
  name: yup.string().required("name field is required"),
  quantity: yup.number().required("quantity field is required"),
  threshold: yup.number().required("threshold field is required"),
  name_ar: yup.string().required("name_ar field is required"),
});

export const updateiIngredientValidation = yup.object({
  name: yup.string().required("name field is required"),
  threshold: yup.number().required("threshold field is required"),
  name_ar: yup.string().required("name_ar field is required"),
});
