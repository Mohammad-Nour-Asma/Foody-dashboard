import React, { useEffect } from "react";
import Table from "../components/Table";
import { reviews, reviewsClumns } from "../data/reviews";
import { request } from "../Request/request";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const { isLoading, data, refetch, isRefetching, isError } = useQuery({
    queryKey: [`get-feedback-${branch_id}`],
    queryFn: getOrdersReviews,
  });

  useEffect(() => {
    refetch();
  }, [branch_id]);

  const getExcel = useMutation({
    mutationKey: [`excel-${branch_id}`],
    mutationFn: (branch_id) => {
      return request({
        url: `/export/${branch_id}`,
        method: "GET",
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  if (isError) {
    return <p>Error</p>;
  }

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

      {getExcel.isPending ? (
        <Typography
          sx={{
            color: "#b27ded",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.8rem",
            "&:active": {
              transform: "translateY(2px)",
            },
          }}
        >
          Downloading...
        </Typography>
      ) : (
        <Typography
          sx={{
            color: "#b27ded",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.8rem",
            "&:active": {
              transform: "translateY(2px)",
            },
          }}
          onClick={() => {
            getExcel.mutate(branch_id);
          }}
        >
          Download as Excel
        </Typography>
      )}

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
              muiBottomToolbarProps={{
                //simple styling with the `sx` prop, works just like a style prop in this example
                sx: {
                  backgroundColor: "#f4f7fe",
                },
              }}
              muiTopToolbarProps={{
                //simple styling with the `sx` prop, works just like a style prop in this example
                sx: {
                  backgroundColor: "#f4f7fe",
                },
              }}
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
    accessorKey: "table.table_num",
    header: "Table Number",
  },
  {
    accessorKey: "waiter_name",
    header: "Waiter Name",
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
