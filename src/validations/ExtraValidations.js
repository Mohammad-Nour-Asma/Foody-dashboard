import * as yup from "yup";

export const ExtraValidation = yup.object({
  name: yup.string().required("name field is required"),

  name_ar: yup.string().required("name_ar field is required"),
  price_per_peice: yup.number().required("the price field is required"),
});
