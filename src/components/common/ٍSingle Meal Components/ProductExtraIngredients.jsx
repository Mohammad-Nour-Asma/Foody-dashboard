import React, { useState } from "react";
import Page from "../Page";
import Table from "../../Table";
import { Paper, Button, Skeleton } from "@mui/material";
import { request } from "../../../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ingredientColumns } from "../../../data/Ingredients";
import Loader from "../loader/loader";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandedTable from "../IngredientsInput";

const ProductExtraIngredients = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const getExtraIngredientsQuery = useQuery({
    queryKey: [`Extraingredients-get-${branch_id}`],
    queryFn: () => {
      return request({
        url: `/extraIng/branch/${branch_id}`,
        method: "GET",
      });
    },
  });

  const getProductExtra = useQuery({
    queryFn: [`${id}-product-extra`],
    queryFn: () => {
      return request({
        url: `extraIng/product/${id}`,
      });
    },
  });

  let data = [];

  if (getExtraIngredientsQuery.isSuccess) {
    data = getExtraIngredientsQuery.data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.ingredient.name,
      };
    });
  }

  const deleteProduct = (idExtra) => {
    return request({
      url: `/delete/extra/${id}/${idExtra}`,
      method: "POST",
    });
  };

  const deleteMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      getProductExtra.refetch();
      console.log("hellow world");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  console.log(getProductExtra.data);

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
          Add product extra Ingredients
        </DialogTitle>
        <DialogContent
          sx={{
            minWidth: "380px",
            background: "#f4f7fe",
          }}
        >
          {getExtraIngredientsQuery.isLoading ? (
            <Skeleton width={"380px"} height={"200px"} />
          ) : (
            <ExpandedTable
              refetch={getProductExtra.refetch}
              type={"sendExtra"}
              data={data}
              setOpen={setOpen}
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
        title={"product extra ingredients"}
        link={""}
        button={"add extra ingredient"}
        type={"extraProductIng"}
        setOpen={setOpen}
      >
        <Paper my={"1rem"}>
          {getExtraIngredientsQuery.isLoading ||
          getProductExtra.isLoading ||
          getProductExtra.isRefetching ? (
            <Skeleton
              sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
              width={"100%"}
              height={"280px"}
            />
          ) : (
            <Table
              data={getProductExtra.data.data.data}
              fields={ingredientColumns}
              numberOfRows={getProductExtra.data.data.data?.length}
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

export default ProductExtraIngredients;
