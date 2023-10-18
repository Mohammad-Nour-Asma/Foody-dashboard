import React, { useState } from "react";
import Page from "../Page";
import { productIngredientColumns } from "../../../data/Ingredients";
import Table from "../../Table";
import {
  Paper,
  Button,
  Skeleton,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import ExpandedTable from "../IngredientsInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../../../Request/request";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";

const ProductIngredients = ({ ingredients, refetch, isRefetching }) => {
  const [open, setOpen] = useState(false);
  const { branch_id } = useSelector((state) => state.settings);

  const productIngredientColumns = [
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Name",
    },
    {
      accessorKey: "name_ar", //access nested data with dot notation
      header: "Arabic Name",
    },
    {
      accessorKey: "pivot.quantity", //access nested data with dot notation
      header: "Quantity",
      Cell: ({ cell }) => {
        const number = cell.getValue();

        if (cell.row.original.threshold >= cell.getValue()) {
          return (
            <Typography>
              {number}{" "}
              <span style={{ fontWeight: "bold" }}>
                {cell.row.original.unit === "l"
                  ? "Liter"
                  : cell.row.original.unit === "g"
                  ? "Gram"
                  : cell.row.original.unit}
              </span>
            </Typography>
          );
        }
      },
    },
    {
      accessorKey: "pivot.is_remove", //access nested data with dot notation
      header: "Removed",
      Cell: ({ cell }) => {
        if (cell.getValue() == 1) {
          return (
            <Tooltip arrow placement="right" title="Toggle state">
              <IconButton
                color="error"
                onClick={() => {
                  toggleMutate.mutate(cell.row.original.id);
                }}
              >
                <Chip
                  variant="outlined"
                  color="success"
                  deleteIcon={<DoneIcon />}
                  label={"removed"}
                />
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip arrow placement="right" title="Toggle state">
              <IconButton
                color="error"
                onClick={() => {
                  toggleMutate.mutate(cell.row.original.id);
                }}
              >
                <Chip
                  label={"not removed"}
                  variant="outlined"
                  color="secondary"
                />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();

  const getIngredientProductDetails = () => {
    return request({ url: `/ingredient/pro/${id}` });
  };

  const getProductIng = useQuery({
    queryKey: [`get-product-ingredient-details-${id}`],
    queryFn: getIngredientProductDetails,
  });

  const getIngredientsQuery = useQuery({
    queryKey: [`ingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/ingredient/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  const deleteIng = (ingId) => {
    return request({
      url: `/delete/ingredient/${id}/${ingId}`,
      method: "POST",
    });
  };

  const toggle = (ingId) => {
    return request({
      url: `/product/ingredient/${id}/${ingId}`,
      method: "PUT",
    });
  };

  const toggleMutate = useMutation({
    mutationKey: [`toggle${id}`],
    mutationFn: toggle,
    onSuccess: (data) => {
      getProductIng.refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const deleteMutate = useMutation({
    mutationFn: deleteIng,
    onSuccess: () => {
      getProductIng.refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            minWidth: "450px",
            background: "#f4f7fe",
          }}
          id="alert-dialog-title"
        >
          Add product Ingredients
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: "380px",
            background: "#f4f7fe",
          }}
        >
          {getIngredientsQuery.isLoading ||
          getIngredientsQuery.isRefetching ||
          toggleMutate.isPending ? (
            <Skeleton width={"380px"} height={"200px"} />
          ) : (
            <ExpandedTable
              refetch={getProductIng.refetch}
              type={"sendBasicIng"}
              setOpen={setOpen}
              data={getIngredientsQuery?.data?.data?.data}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            background: "#f4f7fe",
          }}
        >
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>

      <Page
        title={"product ingredients"}
        type={"productIng"}
        link={""}
        button={"add ingredient"}
        setOpen={setOpen}
      >
        <Paper my={"1rem"}>
          {getIngredientsQuery.isLoading ||
          getProductIng.isRefetching ||
          getProductIng.isLoading ? (
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"280px"}
            />
          ) : (
            <Table
              data={getProductIng?.data?.data?.data}
              fields={productIngredientColumns}
              numberOfRows={getProductIng.data.data.data.length}
              enableTopToolBar={true}
              enableBottomToolBar={true}
              enablePagination={true}
              enableColumnFilters={true}
              enableColumnDragging={true}
              showPreview={false}
              hideFromMenu={true}
              deleteElement={deleteMutate}
              enableEditing={true}
              routeLink={"productExtra"}
            />
          )}
        </Paper>
      </Page>
    </>
  );
};

export default ProductIngredients;
