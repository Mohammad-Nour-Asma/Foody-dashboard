import * as yup from "yup";

export const ExtraValidation = yup.object({
  price_per_kilo: yup.number().required("the price field is required"),
});
