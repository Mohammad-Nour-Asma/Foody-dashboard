import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { request } from "../Request/request";
import { Box, Typography, Skeleton } from "@mui/material";
import Layout from "../components/common/Layout";
import ErrorComponent from "../components/ErrorComponent";
import Table from "../components/Table";

const AddedIngredients = () => {
  const { showBoundary } = useErrorBoundary();

  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError, refetch, isRefetching, error } = useQuery({
    queryKey: [`Extraingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/addition/${branch_id}`,
        method: "POST",
      });
    },
  });

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

  console.log(data);
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "14px",
          background: "linear-gradient(to bottom, #da32f9, #629ad6)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Added Ingredient
      </Typography>
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
          data={data?.data?.data}
          fields={AddedCol}
          numberOfRows={data?.data?.data?.length}
          enableTopToolBar={true}
          enableBottomToolBar={true}
          enablePagination={true}
          enableRowSelection={true}
          enableColumnFilters={true}
          enableColumnDragging={true}
          showPreview
        />
      )}
    </Box>
  );
};

export default AddedIngredients;

const AddedCol = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "Quantity_added", //access nested data with dot notation
    header: "The Added Amount",
    Cell: ({ cell }) => {
      const number = cell.getValue();

      return (
        <Typography>
          {number}{" "}
          <span style={{ fontWeight: "bold" }}>
            {cell.row.original.Added_unit}
          </span>
        </Typography>
      );
    },
  },
  {
    accessorKey: "total_quantity", //access nested data with dot notation
    header: "Amount in warehouse",
    Cell: ({ cell }) => {
      const number = cell.getValue();

      return (
        <Typography>
          {number}{" "}
          <span style={{ fontWeight: "bold" }}>{cell.row.original.unit}</span>
        </Typography>
      );
    },
  },
  {
    accessorKey: "created_at", //access nested data with dot notation
    header: "Destructured Date",
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue());

      return <Typography>{date.toLocaleString()}</Typography>;
    },
  },
];
