import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { Button, Typography } from "@mui/material";

const NourInput = ({ data, title, buttonTitle, setValues, initialValues }) => {
  const [validate, setValidate] = useState(false);

  const orginized = [
    ...initialValues?.map((item) => {
      return { id: item.id, quantity: item.pivot.quantity };
    }),
    {
      id: { id: data.length > 0 ? data[0].id : 0, quantity: "" },
      quantity: "",
    },
  ];

  const [components, setComponents] = React.useState(
    orginized?.length > 0 ? orginized : []
  );

  const addIngredients = (index) => {
    if (
      components.length === 0 ||
      (components[index]?.quantity.toString().trim().length > 0 &&
        components[index]?.id.toString().trim().length > 0 &&
        components[index]?.id !== 0)
    ) {
      setValidate(false);
      setComponents((prev) => {
        return [
          ...prev,
          { id: data.length > 0 ? data[0].id : 0, quantity: "" },
        ];
      });
      setValues(components);
    } else {
      setValidate(true);
    }
  };

  const setIng = (value, index) => {
    console.log(value, index);
    components[index].id = value;
  };

  const setQantity = (value, index) => {
    components[index].quantity = value;
  };

  const deleteInput = (index) => {
    const filtered = components.filter((item, index1) => index1 !== index);
    setComponents(filtered);
  };
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: "1.5rem 1rem",
        margin: "1rem 0",
        borderRadius: "5px",
        maxHeight: "20rem",
        overflowY: "auto",
      }}
    >
      <Typography sx={{ padding: " 0 1rem", fontSize: "1.3rem" }}>
        {title}
      </Typography>
      {components.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              border: "1px solid #ddd",
              padding: "1.5rem 1rem",
              borderRadius: "1rem",
              margin: "1rem",
              position: "relative",
            }}
          >
            {components.length - 1 > index && (
              <Box
                sx={{
                  position: "absolute",
                  background: "red",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  top: "-8px",
                  right: "-8px",
                }}
                onClick={() => {
                  deleteInput(index);
                }}
              >
                x
              </Box>
            )}
            <Stack
              spacing={5}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <FormControl
                disabled={components.length - 1 > index ? true : false}
                fullWidth
              >
                <InputLabel id="demo-simple-select-label">
                  Ingredient
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Ingredient"
                  onChange={(event) => {
                    console.log("red");
                    setIng(event.target.value, index);
                  }}
                >
                  {data?.map((item, index2) => {
                    return (
                      <MenuItem key={index2} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                disabled={components.length - 1 > index ? true : false}
                onChange={(e) => {
                  setQantity(e.target.value, index);
                }}
                label="quantity"
                type="number"
              />
            </Stack>
          </Box>
        );
      })}
      <Button
        sx={{
          margin: "1rem auto",
          width: "full",
          display: "block",
        }}
        onClick={() => {
          addIngredients(components.length - 1);
        }}
      >
        {buttonTitle}
      </Button>
      {validate && (
        <Typography sx={{ color: "red", fontSize: "0.6rem" }}>
          Please Fill the inputs above
        </Typography>
      )}
    </Box>
  );
};

export default NourInput;
