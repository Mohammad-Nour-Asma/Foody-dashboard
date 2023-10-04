import React from "react";
import { Paper, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";

export const AddAmountsForm = ({ row }) => {
  console.log(row);
  const addAmountsQuery = useMutation({
    mutationKey: "",
  });

  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
        p: "20px",
        maxWidth: "800px",
        margin: "0 auto",

        overflow: "hidden",
      }}
    >
      <TextField
        id="outlined-number"
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 1,
        }}
      />
      <Stack sx={{ my: 2 }}>
        <LoadingButton
          //   loading={row ? updateIngredient.isPending : storeIngredient.isPending}
          variant="contained"
          sx={{
            background:
              "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
          }}
        >
          <span>Submit</span>
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
