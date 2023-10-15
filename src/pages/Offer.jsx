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

const Offer = () => {
  const { branch_id } = useSelector((state) => state.settings);

  const getOffers = () => {
    return request({ url: `offer/branch/${branch_id}`, method: "GET" });
  };

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
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
          deleteElement={mutate}
        />
      )}
    </Page>
  );
};

export default Offer;
