import React, { useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import Table from "../components/Table";
import { extraIngredientsColumns } from "../data/Ingredients";

import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Notify from "../components/common/Notify";
import ExtraForm from "./Forms/ExtraForm";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";

const ExtraIngredients = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError, refetch, isRefetching, error } = useQuery({
    queryKey: [`Extraingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/extraIng/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  console.log(data);

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

  const { showBoundary } = useErrorBoundary();

  let errorMessage;
  if (isError) {
    if (error?.response?.status === 404)
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (error?.response?.status === 500)
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
    else {
      showBoundary(error);
    }
  }

  return (
    <Page button={"Add Extra"} link={"/extra/add"} title={"Extra Ingredients"}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />

      <Box sx={{ pb: "20px" }}>
        {isLoading || isRefetching ? (
          <Layout>
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"400px"}
            />
          </Layout>
        ) : isError ? (
          <ErrorComponent message={errorMessage} refetch={refetch} />
        ) : (
          <Table
            data={ingredients?.data}
            fields={extraIngredientsColumns}
            numberOfRows={ingredients?.length}
            enableTopToolBar={true}
            enableBottomToolBar={true}
            enablePagination={true}
            enableColumnFilters={true}
            enableEditing={true}
            enableColumnDragging={true}
            showPreview={false}
            deleteElement={deleteMutate}
            refetch={refetch}
            UpdatingForm={ExtraForm}
            routeLink="extraIngredients"
          />
        )}
      </Box>
    </Page>
  );
};

export default ExtraIngredients;
