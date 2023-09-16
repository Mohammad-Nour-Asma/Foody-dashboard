import { Box, Button, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import ProductForm from "./Forms/ProductForm";

const Products = () => {
  const productsColumns = [
    {
      accessorKey: "image",
      header: "Image",
      //or in the component override callbacks like this
      Cell: ({ cell }) => {
        return (
          <Box
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              backgroundImage: `url(${cell.getValue()})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></Box>
        );
      },
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Meal Name",
    },
    {
      accessorKey: "name_ar", //access nested data with dot notation
      header: "Meal Arabic Name",
    },

    {
      accessorKey: "category.name", //access nested data with dot notation
      header: "Category",
    },
    {
      accessorKey: "estimated_time", //access nested data with dot notation
      header: "Estimated Time",
    },
    {
      accessorKey: "price",
      header: "Price",
      Cell: ({ cell }) => <span>${cell.getValue()}</span>,
    },
    {
      accessorKey: "position",
      header: "Position",
      //or in the component override callbacks like this
    },
  ];

  const getAllProducts = () => {
    return request({
      url: `/products/branch/${localStorage.getItem("branch_id")}`,
      method: "GET",
    });
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["porducts"],
    queryFn: getAllProducts,
  });
  console.log(isError);

  const products = data?.data.data;

  const deleteProduct = (id) => {
    return request({
      url: `delete_product/${id}`,
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
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">Products</Typography>
        <Link to="/products/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: "20px" }}
          >
            Add Product
          </Button>
        </Link>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={products}
          fields={productsColumns}
          numberOfRows={products.length}
          enableTopToolBar={true}
          enableBottomToolBar={true}
          enablePagination={true}
          enableColumnFilters={true}
          enableEditing={true}
          enableColumnDragging={true}
          showPreview={true}
          hideFromMenu={true}
          deleteElement={deleteMutate}
          edit={true}
          routeLink="products"
          UpdatingForm={ProductForm}
        />
      )}
    </Box>
  );
};

export default Products;
