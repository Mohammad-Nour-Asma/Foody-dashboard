import { Add, Delete, PlusOne } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_new_ingredient,
  delete_ingredient,
  ready_to_submiting,
  reset,
  update_ingredient,
} from "../../redux/IngredientsSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import Loader from "./loader/loader";
// import { useQuery } from "@tanstack/react-query";

const orgnizer = (array) => {
  if (array) {
    return array.map((obj) => ({
      id: obj.id,
      label: obj.name,
    }));
  }
  return [];
};

const ExpandedTable = ({ data, type, refetch }) => {
  const { ingredients, open } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const { id } = useParams();

  let api;
  if (type === "sendBasicIng") {
    api = `/edit/ingredient/${id}`;
  } else if (type === "sendExtra") {
    api = `/edit/extra/${id}`;
  }

  const sendRequest = useMutation({
    mutationKey: [`${type}`],
    mutationFn: (data) => {
      let dataToSend;
      if (type === "sendExtra") {
        dataToSend = {
          extra_ingredients: data,
        };
      } else {
        dataToSend = {
          ingredients: data,
        };
      }
      return request({
        url: `${api}`,
        method: "POST",
        data: dataToSend,
      });
    },
    onSuccess: (res) => {
      refetch();
    },
  });

  if (sendRequest.isPending) {
    return <Loader />;
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          position: "relative",
          margin: "0 auto",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <Box
          className={"add-table-header"}
          sx={{
            border: "1px solid #b1b1b1",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "6px",
                  color: "#000",
                  fontWeight: "500",
                  borderRight: "1px solid #b1b1b1",
                }}
              >
                Ingredient
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "6px",
                  color: "#000",
                  fontWeight: "500",
                  borderRight: "1px solid #b1b1b1",
                }}
              >
                Quantity
              </Typography>
            </Grid>

            {type == "sendBasicIng" && (
              <Grid item xs={2}>
                <Typography
                  sx={{
                    textAlign: "center",
                    padding: "6px",
                    color: "#000",
                    fontWeight: "500",
                    borderRight: "1px solid #b1b1b1",
                  }}
                >
                  removed
                </Typography>
              </Grid>
            )}
            <Grid item xs={type == "sendBasicIng" ? 2 : 4}>
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "6px",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                Action
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          className={"add-table-body"}
          sx={{
            position: "relative",
            border: "1px solid #b1b1b1",
            borderTop: "none",
            padding: "20px 5px",
            borderRadius: "0 0 10px 10px",
          }}
        >
          {ingredients.length === 0 && (
            <Typography textAlign={"center"}>no ingredients</Typography>
          )}
          <Grid container spacing={1} sx={{ position: "relative" }}>
            {ingredients.map((ingredient) => (
              <Grid item xs={12} key={ingredient.key}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    pb: 1,
                    borderBottom: "1px solid #b1b1b1",
                    mb: 1,
                  }}
                >
                  <Grid item xs={4} sx={{}}>
                    <Autocomplete
                      disablePortal
                      options={orgnizer(data || [])}
                      fullWidth
                      renderInput={(params) => (
                        <TextField {...params} label="Ingredients" />
                      )}
                      onChange={(e, v) => {
                        dispatch(
                          update_ingredient({
                            ...ingredient,
                            id: v.id,
                          })
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="outlined-number"
                      label="Number"
                      type="number"
                      value={ingredient.quantity}
                      inputProps={{
                        min: 1,
                      }}
                      onChange={(e) => {
                        dispatch(
                          update_ingredient({
                            ...ingredient,
                            quantity: e.target.value,
                          })
                        );
                      }}
                      fullWidth
                    />
                  </Grid>
                  {type == "sendBasicIng" && (
                    <Grid
                      item
                      xs={2}
                      justifyContent={"center"}
                      textAlign={"center"}
                    >
                      <Checkbox
                        onChange={(e) => {
                          dispatch(
                            update_ingredient({
                              ...ingredient,
                              is_remove: e.target.checked,
                            })
                          );
                        }}
                        color="secondary"
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={type == "sendBasicIng" ? 2 : 4}
                    justifyContent={"center"}
                    textAlign={"center"}
                  >
                    <IconButton
                      color="error"
                      onClick={() => {
                        dispatch(delete_ingredient(ingredient.key));
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "5px",
        }}
      >
        <IconButton
          color="info"
          onClick={() => {
            dispatch(add_new_ingredient());
          }}
        >
          <Add />
        </IconButton>
        <Button
          variant="outlined"
          color="error"
          sx={{
            mt: 1,
          }}
          onClick={() => {
            dispatch(reset());
          }}
        >
          reset
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            mt: 1,
            borderRadius: "5px",
          }}
          onClick={() => {
            dispatch(ready_to_submiting());
          }}
        >
          Confirm
        </Button>
      </Box>
      <Box
        sx={{
          transform: open ? "translateX(-0)" : "translateX(-100px)",
          transition: "0.2s",
          width: "fit-content",
        }}
        mt={2}
        textAlign={"center"}
      >
        <Button
          disabled={!open}
          sx={{
            background:
              "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
            color: "white",
          }}
          onClick={() => {
            sendRequest.mutate(ingredients);
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ExpandedTable;
