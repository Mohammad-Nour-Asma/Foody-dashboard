import * as React from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function Price({ handleChange, ...option }) {
  const [values, setValues] = React.useState({
    numberformat: "x",
  });

  return (
    <Box>
      <TextField
        label="Price"
        value={values.numberformat}
        onChange={handleChange}
        name="price"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="outlined"
        size="small"
        fullWidth
        {...option}
      />
    </Box>
  );
}
