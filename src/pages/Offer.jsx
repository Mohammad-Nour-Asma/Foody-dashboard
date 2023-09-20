import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import { offerData, offerColumns } from "../data/offer";
import Table from "../components/Table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import { useSelector } from "react-redux";

const Offer = () => {
  const { branch_id } = useSelector((state) => state.settings);

  const getOffers = () => {
    return request({ url: `offer/branch/${branch_id}`, method: "GET" });
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["offers-get"],
    queryFn: getOffers,
  });
  const offers = data?.data.data;

  const handleDelete = (id) => {
    return request({ url: `offer/${id}`, method: "POST" });
  };

  const mutate = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [branch_id]);
  return (
    <Page button={"add offer"} link={"/offer/add"} title={"Offers"}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />
      <Layout>
        <Box sx={{ pb: "20px" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <Table
              data={offers}
              fields={offerColumns}
              numberOfRows={offers?.length}
              enableTopToolBar={true}
              enableBottomToolBar={true}
              enablePagination={true}
              enableColumnFilters={true}
              enableColumnDragging={true}
              showPreview={false}
              routeLink="offer"
              deleteElement={mutate}
            />
          )}
        </Box>
      </Layout>
    </Page>
  );
};

export default Offer;
