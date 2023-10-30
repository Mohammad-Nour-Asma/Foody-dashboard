import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { reviews, reviewsClumns } from "../data/reviews";
import { request } from "../Request/request";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import { Box, Button, Rating, Skeleton, Typography } from "@mui/material";
import Layout from "../components/common/Layout";
import MaterialReactTable from "material-react-table";
import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";

const Reviews = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const getOrdersReviews = () => {
    return request({
      url: `/feedbacks/${branch_id}`,
    });
  };

  const { isLoading, data, refetch, isRefetching, isError, error } = useQuery({
    queryKey: [`get-feedback-${branch_id}`],
    queryFn: getOrdersReviews,
  });
  console.log(data);
  useEffect(() => {
    refetch();
  }, [branch_id]);

  const [loader, setLoader] = useState(false);

  async function downloadExil(branch_id) {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.foody.gomaplus.tech/api/export/${branch_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "arraybuffer", // Ensure the response is treated as binary data
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // Create a link and click it to trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "downloaded_file.xlsx"; // Set the desired file name
      link.click();

      // Clean up the Blob URL
      URL.revokeObjectURL(blobUrl);
      setLoader(false);
    } catch (error) {
      setLoader(false);

      // Handle the error appropriately (show an error message, etc.)
    }
  }

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

      {loader ? (
        <Typography
          sx={{
            color: "#b27ded",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.8rem",
            marginBottom: "1rem",
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
            marginBottom: "1rem",
            "&:active": {
              transform: "translateY(2px)",
            },
          }}
          onClick={() => {
            downloadExil(branch_id);
          }}
        >
          Export Excel Sheet
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
          ) : isError ? (
            <ErrorComponent message={errorMessage} refetch={refetch} />
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
    header: "Order Preparation Time",
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
