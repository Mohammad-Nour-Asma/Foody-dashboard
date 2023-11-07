import * as yup from "yup";

export const ingredientValidation = yup.object({
  name: yup
    .string()
    .required("name field is required")
    .max(20, "The Name Must Be Under 20 Letters"),
  quantity: yup.number().required("quantity field is required"),
  threshold: yup.number().required("threshold field is required"),
  name_ar: yup
    .string()
    .required("name_ar field is required")
    .max(20, "The Name Must Be Under 20 Letters"),
});

export const updateiIngredientValidation = yup.object({
  name: yup.string().required("name field is required"),
  threshold: yup.number().required("threshold field is required"),
  name_ar: yup.string().required("name_ar field is required"),
});
