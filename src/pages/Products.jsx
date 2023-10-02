import { Box, Button, Skeleton, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import ProductForm from "./Forms/ProductForm";
import { useSelector } from "react-redux";
import Layout from "../components/common/Layout";

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

  const { branch_id } = useSelector((state) => state.settings);

  const getAllProducts = () => {
    return request({
      url: `/admin/products/branch/${branch_id}`,
      method: "GET",
    });
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: [`porducts-${branch_id}`],
    queryFn: getAllProducts,
    staleTime: 0,
  });

  const products = data?.data.data;

  const deleteProduct = (id) => {
    return request({
      url: `product/${id}`,
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
        <Typography
          sx={{
            background: "linear-gradient(to bottom, #da32f9, #629ad6)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          variant="h6"
        >
          Products
        </Typography>
        <Link to="/products/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            sx={{
              borderRadius: "20px",
              background:
                "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
            }}
          >
            Add Product
          </Button>
        </Link>
      </Box>
      <Layout>
        <Box sx={{ pb: "20px" }}>
          {isLoading ? (
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"400px"}
            />
          ) : (
            <Table
              data={data?.data.data}
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
      </Layout>
    </Box>
  );
};

export default Products;
