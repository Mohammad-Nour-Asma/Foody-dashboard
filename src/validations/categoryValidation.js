import * as yup from "yup";

export const categoryValidation = yup.object({
  name: yup.string().required("name field is required"),
  name_ar: yup.string().required("Arabic name field is required"),

  position: yup
    .number("Position must be a number")
    .required("position field is required"),
});
