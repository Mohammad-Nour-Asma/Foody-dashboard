import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Page from "../components/common/Page";
import { offerColumns, offerData } from "../data/offer";
import Table from "../components/Table";
import { Box, Skeleton } from "@mui/material";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import CategoryForm from "./Forms/CategoryForm";
import Notify from "../components/common/Notify";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";

const Categories = () => {
  const offerColumns = [
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
      size: 100,
    },
    {
      accessorKey: "name_ar", //access nested data with dot notation
      header: "Arabic Name",
      size: 100,
    },
    {
      accessorKey: "position", //access nested data with dot notation
      header: "Position",
      size: 100,
    },
    {
      accessorKey: "image", //access nested data with dot notation
      header: "Image",
      size: 100,
      Cell: ({ cell }) => (
        <div>
          <img src={cell.getValue()} alt="" width={100} />
        </div>
      ),
    },
  ];

  const { branch_id } = useSelector((state) => state.settings);

  const getCategory = () => {
    return request({
      url: `/admin/category/branch/${branch_id}`,
      method: "GET",
    });
  };

  const { data, isLoading, isError, isSuccess, refetch, isRefetching, error } =
    useQuery({
      queryKey: [`category-${branch_id}-get`],
      queryFn: getCategory,
      cacheTime: 0,
    });

  const categories = data?.data?.data;
  console.log(categories);

  const deleteCategory = (id) => {
    return request({
      url: `category/${id}`,
      method: "DELETE",
    });
  };

  const deleteMutate = useMutation({
    mutationFn: deleteCategory,
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
    <Page button={"add category"} link={"/category/add"} title={"Category"}>
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
            data={categories}
            fields={offerColumns}
            numberOfRows={categories.length}
            enableTopToolBar={false}
            enableBottomToolBar={false}
            enablePagination={true}
            enableColumnFilters={true}
            enableEditing={true}
            showPreview={false}
            deleteElement={deleteMutate}
            UpdatingForm={CategoryForm}
            hideFromMenu={true}
            routeLink="categories"
            refetch={refetch}
          />
        )}
      </Box>
    </Page>
  );
};

export default Categories;
