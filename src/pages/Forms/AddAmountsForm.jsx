import React, { useState } from "react";
import { Paper, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../Request/request";

const AddAmountsForm = ({ row, refetch }) => {
  console.log(row.original.id, "orginal");
  const addAmountsQuery = useMutation({
    mutationKey: [`addAmount-${row.original.id}`],
    mutationFn: (data) => {
      return request({
        url: `/ingredient/${row.original.id}`,
        method: "POST",
        data,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const [amount, setAmount] = useState(1);

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
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 1,
        }}
      />
      <Stack sx={{ my: 2 }}>
        <LoadingButton
          onClick={() => {
            addAmountsQuery.mutate({
              total_quantity: amount,
            });
          }}
          loading={addAmountsQuery.isPending}
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

export default AddAmountsForm;
