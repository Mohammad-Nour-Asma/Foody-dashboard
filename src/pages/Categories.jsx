import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Page from "../components/common/Page";
import { offerColumns, offerData } from "../data/offer";
import Table from "../components/Table";
import { Box } from "@mui/material";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import CategoryForm from "./Forms/CategoryForm";
import Notify from "../components/common/Notify";
import { useSelector } from "react-redux";

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
      url: `/category/branch/${branch_id}`,
      method: "GET",
    });
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [`category-${branch_id}-get`],
    queryFn: getCategory,
    cacheTime: 0,
  });

  const categories = data?.data.data;

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

  if (isSuccess) {
    console.log(categories, branch_id);
  }
  return (
    <Page button={"add offer"} link={"/offer/add"} title={"Offers"}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />
      <Layout>
        <Box sx={{ pb: "20px" }}>
          {isLoading ? (
            <Loader />
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
            />
          )}
        </Box>
      </Layout>
    </Page>
  );
};

export default Categories;
