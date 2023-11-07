import React, { useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../Request/request";
import { useErrorBoundary } from "react-error-boundary";

const AddAmountsForm = ({ row, refetch, type }) => {
  const { showBoundary } = useErrorBoundary();
  const units =
    row.original.unit === "kg" || row.original.unit === "g"
      ? ["kg", "g"]
      : ["l", "ml"];
  const [unit, setUnit] = useState(row.original.unit);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const addAmountsQuery = useMutation({
    mutationKey: [`addAmount-${row.original.id}`],
    mutationFn: (data) => {
      let api;
      if (type === "dec") api = `/destruction/${row.original.id}`;
      else api = `/ingredient/${row.original.id}`;
      return request({
        url: `${api}`,
        method: "POST",
        data,
      });
    },
    onSuccess: (re) => {
      refetch();
    },
    onError: (err) => {
      console.log(err);
      showBoundary();
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
      <Stack gap={1} direction={"row"}>
        <Box sx={{ my: 2, flexBasis: "95%" }}>
          <TextField
            id="outlined-number"
            label="Amount"
            type="number"
            size="small"
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
        </Box>

        <Box sx={{ my: 2, flexBasis: "5%" }}>
          {/* <InputLabel mb={2} id="demo-simple-select-label">
                  Unit
                </InputLabel> */}
          <FormControl fullWidth size="small">
            <Select
              size="small"
              fullWidth
              onChange={handleUnitChange}
              value={unit}
            >
              {units.map((item) => {
                return (
                  <MenuItem value={item}>
                    {item === "g" ? "Gram" : item === "l" ? "Liter" : item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack sx={{ my: 2 }}>
        <LoadingButton
          onClick={() => {
            addAmountsQuery.mutate({
              total_quantity: amount,
              unit,
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
