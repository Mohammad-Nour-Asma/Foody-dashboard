import * as yup from "yup";

export const ingredientValidation = yup.object({
  name: yup.string().required("name field is required"),
  price: yup.string().required("price field is required"),
});
