import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

const Ingredients = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ingredients-get"],
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
    console.log("hello");
  }, [branch_id]);

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
            hideFromMenu={true}
            routeLink="ingredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default Ingredients;
