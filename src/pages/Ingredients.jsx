import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import Table from "../components/Table";
import {
  ingredientColumns,
  IngredientsData,
  mealIngredientColumns,
} from "../data/Ingredients";

import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import IngredientsForm from "./Forms/IngredientsForm";
import { useDispatch, useSelector } from "react-redux";
import { setWarningFalse, setWarningTrue } from "../redux/WarningSlice";
import AddAmountsForm from "./Forms/AddAmountsForm";

const Ingredients = () => {
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError, refetch, isSuccess, isRefetching } =
    useQuery({
      queryKey: [`ingredients-get-${branch_id}`],
      queryFn: () => {
        return request({
          url: `/ingredient/branch/${branch_id}`,
          method: "GET",
        });
      },
    });

  const ingredients = data?.data;
  const deleteProduct = (id) => {
    return request({
      url: `ingredient/${id}`,
      method: "DELETE",
    });
  };

  const deleteMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [branch_id]);

  if (isSuccess) {
    dispatch(setWarningFalse());
    console.log(data.data.data);
    data.data.data.forEach((element) => {
      if (element.threshold >= element.total_quantity) {
        dispatch(setWarningTrue());
        return true; // stops the loop
      }
      return false; // continues the loop
    });
  }

  return (
    <Page
      button={"Add Ingredient"}
      link={"/ingredient/add"}
      title={"Ingredients"}
    >
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />

      <Box sx={{ p: "20px" }}>
        {isLoading || isRefetching ? (
          <Layout>
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"400px"}
            />
          </Layout>
        ) : (
          <Table
            data={ingredients?.data}
            fields={mealIngredientColumns}
            numberOfRows={ingredients.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableColumnFilters={true}
            enableEditing={true}
            enableColumnDragging={true}
            showPreview={false}
            deleteElement={deleteMutate}
            UpdatingForm={IngredientsForm}
            hideFromMenu={true}
            refetch={refetch}
            AddAmountsForm={AddAmountsForm}
            routeLink="ingredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default Ingredients;
