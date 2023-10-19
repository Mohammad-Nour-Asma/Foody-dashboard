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
  FormControl,
  Select,
  MenuItem,
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
      unit: obj.unit,
    }));
  }
  return [];
};

const ExpandedTable = ({ data, type, refetch, setOpen }) => {
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

      setOpen(false);
    },
  });

  const sendTheFilterdData = (ingredients) => {
    let data = ingredients.filter(
      (ingredient) => ingredient.id !== 0 && ingredient.quantity !== 0
    );
    if (data.length > 0) {
      sendRequest.mutate(data);
    }
  };

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
          maxHeight: "500px",
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
                Unit
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
              <Grid item xs={12} key={`${ingredient.key}`}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    pb: 1,
                    borderBottom: "1px solid #b1b1b1",
                    mb: 1,
                  }}
                >
                  <Grid item xs={3} sx={{}}>
                    <Autocomplete
                      disablePortal
                      options={orgnizer(data || [])}
                      fullWidth
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} label="Ingredients" />
                      )}
                      onChange={(e, v) => {
                        const units =
                          v.unit === "kg" || v.unit === "g"
                            ? ["g", "kg"]
                            : ["ml", "l"];

                        dispatch(
                          update_ingredient({
                            ...ingredient,
                            id: v.id,
                            units_options: units ? units : [],
                            unit: units[0],
                          })
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-number"
                      label="Number"
                      type="number"
                      size="small"
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

                  <Grid
                    item
                    xs={2}
                    justifyContent={"center"}
                    textAlign={"center"}
                  >
                    {type == "sendBasicIng" ? (
                      <FormControl fullWidth size="small">
                        <Select
                          size="small"
                          fullWidth
                          value={ingredient.unit}
                          onChange={(e) => {
                            dispatch(
                              update_ingredient({
                                ...ingredient,
                                unit: e.target.value,
                              })
                            );
                          }}
                        >
                          {ingredient?.units_options?.map((item) => {
                            return (
                              <MenuItem key={item} value={item}>
                                {item === "g"
                                  ? "Gram"
                                  : item === "l"
                                  ? "Liter"
                                  : item.toUpperCase()}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    ) : (
                      <Typography
                        sx={{ bottom: "-7px", position: "relative" }}
                        fontWeight={"bold"}
                      >
                        {ingredient.unit}
                      </Typography>
                    )}
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
            sendTheFilterdData(ingredients);
          }}
        >
          Submit
        </Button>
      </Box>
      {/* <Box
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
      </Box> */}
    </>
  );
};

export default ExpandedTable;
