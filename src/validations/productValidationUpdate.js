import * as yup from "yup";

const FILE_SIZE = 5_000_000; //5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const productValidationUpdate = yup.object({
  // name: yup.string().required("name field is required"),
  // ingredient: yup.string().required("Meal description field is required"),
  price: yup.number("the price filed is required"),
  estimated_time: yup
    .mixed()
    .required()
    .test(
      "duration",
      "Invalid duration format must be Positive Number",
      (value) => {
        if (isNaN(Number(value)) || value <= 0) {
          return false;
        }

        return value;
      }
    ),
  position: yup.number("the position filed is required"),
});
