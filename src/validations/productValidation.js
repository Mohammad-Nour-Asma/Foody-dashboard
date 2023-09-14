import * as yup from "yup";

const FILE_SIZE = 5_000_000; //5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const productValidation = yup.object({
  name: yup.string().required("name field is required"),
  ingredient: yup.string().required("Meal description field is required"),
  price: yup.number().required("the price filed is required"),
  estimated_time: yup
    .mixed()
    .test("duration", "Invalid duration format", (value) => {
      if (!value) {
        return false;
      }

      const durationRegex = /^(?:[0-5]?[0-9]):(?:[0-5]?[0-9])$/;
      return durationRegex.test(value);
    }),
  position: yup.number().required("the position filed is required"),
  image: yup
    .mixed()
    .required("An image file is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.size <= FILE_SIZE;
    })
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
