import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { request } from "../Request/request";
import Layout from "../components/common/Layout";

const DamagedIngredient = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [`Extraingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/destruction/${branch_id}`,
        method: "GET",
      });
    },
  });

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
        Destructed Ingredient
      </Typography>
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
          data={data.data.data}
          fields={destructuredCol}
          numberOfRows={data.data.data.length}
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

const destructuredCol = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "Desturcted_amount", //access nested data with dot notation
    header: "The Destructed Amount",
    Cell: ({ cell }) => {
      const number = cell.getValue();

      return (
        <Typography>
          {number}{" "}
          <span style={{ fontWeight: "bold" }}>
            {cell.row.original.unit_Destructed}
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

export default DamagedIngredient;
