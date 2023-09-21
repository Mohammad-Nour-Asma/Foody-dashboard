import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { request } from "../../Request/request";
import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Notify from "../../components/common/Notify";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
const ProductIngredientForm = ({
  type,
  productIngredient,
  productExtraIngredient,
}) => {
  const { branch_id } = useSelector((state) => state.settings);
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  // handle cloase
  const handleClose = () => {
    setOpen(false);
  };

  const [info, setInfo] = React.useState({
    id: 0,
    quantity: 1,
  });

  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["ingredients-get"],
    queryFn: () => {
      return request({
        url: `/ingredient/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  const getExtraQuiry = useQuery({
    queryKey: ["extra-ingredients-get"],
    queryFn: () => {
      return request({
        url: `extraIng/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  const storeIngredientRequest = (data) => {
    return request({
      url: `/product/${id}`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };

  const storeIngredient = useMutation({
    mutationFn: storeIngredientRequest,
    onSuccess: () => {
      setOpen(true);
    },
    onError: (err) => {
      console.log(err);
      setOpen(true);
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      setInfo((prev) => {
        return { ...prev, id: data?.data.data[0].id };
      });
    }
  }, [isSuccess]);

  if (isLoading || getExtraQuiry.isLoading) {
    return <Loader />;
  }

  let ingredients;
  if (type === "productIng") ingredients = data?.data.data;
  else ingredients = getExtraQuiry.data.data.data;

  const setIngHnadler = (e) => {
    setInfo((prev) => {
      return { ...prev, id: e.target.value };
    });
  };

  const setQuantityHnadler = (e) => {
    setInfo((prev) => {
      return { ...prev, quantity: +e.target.value };
    });
  };
  const ingredient = productIngredient.map((item) => {
    return { id: item.id, quantity: item.pivot.quantity };
  });

  const extraIngredient = productExtraIngredient.map((item) => {
    return { id: item.id, quantity: item.pivot.quantity };
  });

  console.log(extraIngredient, "jdfskljfdslkfjdslkfj");
  console.log(ingredient, "jdfskljfdslkfjdslkfj");

  return (
    <Box sx={{ padding: "1rem" }}>
      <Notify
        message={
          storeIngredient.isError
            ? "something went wrong"
            : "Product Ingredient added successfully"
        }
        open={open}
        handleClose={handleClose}
        type={storeIngredient?.isError ? "error" : "success"}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ingredient</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Ingredient"
          value={info.id}
          onChange={setIngHnadler}
        >
          {ingredients?.map((item, index2) => {
            return <MenuItem value={item.id}>{item.name}</MenuItem>;
          })}
        </Select>
        <Box margin={"0.8rem 0"}>
          <TextField
            type={"number"}
            label={"quantity"}
            required
            fullWidth
            onChange={setQuantityHnadler}
            inputProps={{ min: 1 }}
          />
        </Box>
        <Stack sx={{ my: 2 }}>
          <LoadingButton
            type="submin"
            loading={storeIngredient.isPending}
            variant="contained"
            onClick={() => {
              console.log(
                {
                  id: 1,
                  ingredients: [...ingredient, info],
                  extra_ingredients: [...extraIngredient],
                },
                "heleo"
              );
              if (type === "extraProductIng") {
                storeIngredient.mutate({
                  id: 1,
                  extra_ingredients: [...extraIngredient, info],
                  ingredients: [...ingredient],
                });
              } else {
                storeIngredient.mutate({
                  id: 1,
                  ingredients: [...ingredient, info],
                  extra_ingredients: [...extraIngredient],
                });
              }
            }}
          >
            <span>Submit</span>
          </LoadingButton>
        </Stack>
      </FormControl>
    </Box>
  );
};

export default ProductIngredientForm;
