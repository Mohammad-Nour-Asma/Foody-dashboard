import * as yup from "yup";

const FILE_SIZE = 5_000_000; //5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const productValidationUpdate = yup.object({
  // name: yup.string().required("name field is required"),
  // ingredient: yup.string().required("Meal description field is required"),
  price: yup.number("the price filed is required"),
  estimated_time: yup
    .mixed()
    .test(
      "duration",
      "Invalid duration format must be in format xx:xx",
      (value) => {
        if (!value) {
          return false;
        }

        const durationRegex = /([0-5]\d):([0-5]\d)$/;
        return durationRegex.test(value);
      }
    ),
  position: yup.number("the position filed is required"),
});
