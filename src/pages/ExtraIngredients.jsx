import React, { useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import Table from "../components/Table";
import { extraIngredientsColumns } from "../data/Ingredients";

import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import IngredientsForm from "./Forms/IngredientsForm";
import ExtraForm from "./Forms/ExtraForm";

const ExtraIngredients = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["extra-ingredients-get"],
    queryFn: () => {
      return request({
        url: `/extraIng/branch/${localStorage.getItem("branch_id")}`,
        method: "GET",
      });
    },
  });

  const ingredients = data?.data;
  const deleteProduct = (id) => {
    return request({
      url: `extraIng/${id}`,
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

  return (
    <Page button={"Add Extra"} link={"/extra/add"} title={"Extra Ingredients"}>
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
            fields={extraIngredientsColumns}
            numberOfRows={ingredients.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableColumnFilters={true}
            enableEditing={true}
            enableColumnDragging={true}
            showPreview={false}
            deleteElement={deleteMutate}
            UpdatingForm={ExtraForm}
            routeLink="extraIngredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default ExtraIngredients;
