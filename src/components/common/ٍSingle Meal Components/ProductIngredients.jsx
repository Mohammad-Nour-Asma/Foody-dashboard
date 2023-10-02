import React, { useState } from "react";
import Page from "../Page";
import { productIngredientColumns } from "../../../data/Ingredients";
import Table from "../../Table";
import { Paper, Button, Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandedTable from "../IngredientsInput";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../../Request/request";
import { useSelector } from "react-redux";

const ProductIngredients = ({ ingredients, refetch }) => {
  const [open, setOpen] = useState(false);
  const { branch_id } = useSelector((state) => state.settings);

  const handleClose = () => {
    setOpen(false);
  };

  const getIngredientsQuery = useQuery({
    queryKey: [`ingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/ingredient/branch/${branch_id}`,
        method: "GET",
      });
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
          {getIngredientsQuery.isLoading ? (
            <Skeleton width={"380px"} height={"200px"} />
          ) : (
            <ExpandedTable
              refetch={refetch}
              type={"sendBasicIng"}
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
          {getIngredientsQuery.isLoading ? (
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"280px"}
            />
          ) : (
            <Table
              data={ingredients}
              fields={productIngredientColumns}
              numberOfRows={ingredients?.length}
              enableTopToolBar={true}
              enableBottomToolBar={true}
              enablePagination={true}
              enableColumnFilters={true}
              enableColumnDragging={true}
              showPreview={false}
              hideFromMenu={true}
            />
          )}
        </Paper>
      </Page>
    </>
  );
};

export default ProductIngredients;
