import React, { useEffect } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Skeleton } from "@mui/material";
import DashboardHeading from "./DashboardHeading";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import Layout from "../../components/common/Layout";
import Table from "../../components/Table";
import { mealIngredientColumns } from "../../data/Ingredients";
import ComponentWrapper from "../../components/ComponentWrapper";
import Loader from "../../components/common/loader/loader";
import { useErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../components/ErrorComponent";

const filterTheData = (data) => {
  const filtered = data.filter((item) => item.threshold >= item.total_quantity);
  return filtered;
};

const UnderThersholdIng = () => {
  const { branch_id } = useSelector((state) => state.settings);
  const { showBoundary } = useErrorBoundary();
  const { data, isLoading, isError, refetch, isSuccess, isRefetching, error } =
    useQuery({
      queryKey: [`ingredients-get-${branch_id}`],
      queryFn: () => {
        return request({
          url: `/ingredient/branch/${branch_id}`,
          method: "GET",
        });
      },
      onError: () => {
        if (data?.response?.status !== 404 || data?.response?.status !== 500)
          showBoundary(data);
      },
    });

  let errorMessage;
  if (isError) {
    if (error?.response?.status === 404)
      errorMessage = "Data Not Found - Please Contact The Technical Team Or";
    else if (error?.response?.status === 500)
      errorMessage =
        "Something Went Wrong In Our Server - Please Contact The Technical Team Or";
  }

  const ingredients = data?.data;

  return (
    <ComponentWrapper>
      <DashboardHeading
        title={"Ingredient Under Thershold"}
        Icon={WarningAmberIcon}
      />

      {isLoading || isRefetching ? (
        <Skeleton
          sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
          width={"100%"}
          height={"280px"}
        />
      ) : isError ? (
        <ErrorComponent message={errorMessage} refetch={refetch} />
      ) : (
        <>
          <Table
            data={filterTheData(ingredients?.data)}
            fields={mealIngredientColumns}
            numberOfRows={filterTheData(ingredients?.data).length}
            enableTopToolBar={false}
            enableBottomToolBar={false}
            enablePagination={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        </>
      )}
    </ComponentWrapper>
  );
};

export default UnderThersholdIng;
