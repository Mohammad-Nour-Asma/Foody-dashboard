import React, { useEffect } from "react";
import Table from "../components/Table";
import { reviews, reviewsClumns } from "../data/reviews";
import { request } from "../Request/request";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import { Box, Button, Rating, Skeleton, Typography } from "@mui/material";
import Layout from "../components/common/Layout";
import MaterialReactTable from "material-react-table";

const Reviews = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const getOrdersReviews = () => {
    return request({
      url: `/feedbacks/${branch_id}`,
    });
  };

  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [`get-feedback-${branch_id}`],
    queryFn: getOrdersReviews,
  });

  useEffect(() => {
    refetch();
  }, [branch_id]);

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
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
          Orders
        </Typography>
      </Box>
      <Layout>
        <Box sx={{ pb: "20px" }}>
          {isLoading || isRefetching ? (
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"400px"}
            />
          ) : (
            <MaterialReactTable
              title="Expandable Table"
              data={data.data.data}
              numberOfRows={data.data.data.length}
              enableTopToolBar={true}
              enableBottomToolBar={true}
              enablePagination={true}
              enableColumnFilters={true}
              enableColumnDragging={true}
              showPreview={true}
              hideFromMenu={true}
              columns={columns}
              renderDetailPanel={({ row }) => {
                console.log(row.original.products, "row");
                if (row.original.products.length > 0) {
                  return (
                    <MaterialReactTable
                      data={row.original.products}
                      columns={productColums}
                      enableEditing={false}
                      enableColumnDragging={false}
                      enableColumnOrdering={false}
                      enableColumnFilters={false}
                      enablePagination={false}
                      enableBottomToolbar={false}
                      enableTopToolbar={false}
                    />
                  );
                } else {
                  return <Typography>No Meals</Typography>;
                }
              }}
              options={{
                initialState: { expanded: true }, // all rows expanded by default
              }}
            />
          )}
        </Box>
      </Layout>
    </Box>
  );
};

export default Reviews;

const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
  },
  {
    accessorKey: "from_client_to_kitchen_diff",
    header: "From client to kitchen",
  },
  {
    accessorKey: "from_kitchen_to_Waiter_diff",
    header: "From kitchen to waiter",
  },
  {
    accessorKey: "from_client_to_Waiter_diff",
    header: "from client to waiter",
  },
  {
    accessorKey: "from_start_to_done_diff",
    header: "from start to done",
  },
  {
    accessorKey: "serviceRate", //access nested data with dot notation
    header: "Service Rate",

    Cell: ({ cell, row }) => {
      return <Rating defaultValue={cell.getValue()} readOnly />;
    },
  },
];

const productColums = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "subTotal",
    header: "Subtotal",
  },
  {
    accessorKey: "rating.value", //access nested data with dot notation
    header: "Rate",

    Cell: ({ cell, row }) => {
      return <Rating defaultValue={cell.getValue()} readOnly />;
    },
  },
];
