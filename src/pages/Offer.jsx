import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import { offerData, offerColumns } from "../data/offer";
import Table from "../components/Table";
import { Skeleton } from "@mui/material";
import { request } from "../Request/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../components/common/loader/loader";
import Notify from "../components/common/Notify";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";

const Offer = () => {
  const { branch_id } = useSelector((state) => state.settings);

  const getOffers = () => {
    return request({ url: `offer/branch/${branch_id}`, method: "GET" });
  };

  const { data, isLoading, isError, refetch, isRefetching, error } = useQuery({
    queryKey: ["offers-get"],
    queryFn: getOffers,
  });
  const offers = data?.data?.data;

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

  const { showBoundary } = useErrorBoundary();

  let errorMessage;
  if (isError) {
    if (error?.response?.status === 404)
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (error?.response?.status === 500)
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
    else showBoundary(error);
  }

  return (
    <Page button={"add offer"} link={"/offer/add"} title={"Offers"}>
      <Notify
        message={"deleted successfully"}
        open={open}
        handleClose={handleClose}
      />

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
          data={offers}
          fields={offerColumns}
          numberOfRows={offers?.length}
          enableTopToolBar={false}
          enableBottomToolBar={false}
          enablePagination={true}
          enableColumnFilters={false}
          enableColumnDragging={false}
          showPreview={false}
          routeLink="offer"
          enableEditing={true}
          deleteElement={mutate}
        />
      )}
    </Page>
  );
};

export default Offer;
