import * as yup from "yup";
export const userSchema = yup.object({
  email: yup
    .string()
    .email("must be valid email")
    .required("email field is required"),
  password: yup.string().min(4).required("email field is required"),
});
