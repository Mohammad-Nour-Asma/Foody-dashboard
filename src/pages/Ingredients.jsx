import React, { useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import Table from "../components/Table";
import { ingredientColumns, IngredientsData } from "../data/Ingredients";

import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import IngredientsForm from "./Forms/IngredientsForm";

const Ingredients = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ingredients-get"],
    queryFn: () => {
      return request({
        url: `/ingredient/branch/${localStorage.getItem("branch_id")}`,
        method: "GET",
      });
    },
  });

  const ingredients = data?.data;
  const deleteProduct = (id) => {
    return request({
      url: `delete_ingredient/${id}`,
      method: "POST",
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
      <Box sx={{ pb: "20px" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Table
            data={ingredients?.data}
            fields={ingredientColumns}
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
            routeLink="ingredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default Ingredients;
