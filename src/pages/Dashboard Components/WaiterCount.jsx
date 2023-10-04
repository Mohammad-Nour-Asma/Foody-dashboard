import { Box, Skeleton, Typography } from "@mui/material";
import Table from "../../components/Table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ComponentWrapper from "../../components/ComponentWrapper";
import { request } from "../../Request/request";

const WaiterCount = () => {
  const { dateFilter, branch_id, fromToFilter, filterState } = useSelector(
    (state) => state.settings
  );

  const getData = () => {
    let data;

    if (filterState === "date") {
      data = {
        year: dateFilter.year,
        month: dateFilter.month,
        day: dateFilter.day,
      };

      const filteredData = Object.keys(data).reduce((accumulator, key) => {
        if (data[key] !== null) {
          accumulator[key] = data[key];
        }
        return accumulator;
      }, {});

      data = filteredData;
    } else if (filterState === "fromTo") {
      data = {
        start_date: `${fromToFilter.from.year}-${fromToFilter.from.month}-${fromToFilter.from.day}`,
        end_date: `${fromToFilter.to.year}-${fromToFilter.to.month}-${fromToFilter.to.day}`,
      };
    }

    return request({
      url: `waiter/countTables/1`,
      method: "POST",
      data: data,
    });
  };

  const { data, isLoading, isError, refetch, error, isRefetching, isSuccess } =
    useQuery({
      queryKey: [
        `getWaiter-${branch_id}-${dateFilter.year}-${dateFilter.month}-${dateFilter.day}`,
      ],
      queryFn: getData,
      staleTime: Infinity,
      cacheTime: 0,
    });

  useEffect(() => {
    refetch();
  }, [
    dateFilter.year,
    dateFilter.month,
    dateFilter.day,
    fromToFilter.to.year,
    fromToFilter.to.month,
    fromToFilter.to.day,
    fromToFilter.from.day,
    fromToFilter.from.year,
    fromToFilter.from.month,
    branch_id,
    filterState,
  ]);

  return (
    <ComponentWrapper>
      <Typography
        variant="h6"
        sx={{
          my: 3,
          textTransform: "capitalize",
          background: "linear-gradient(to bottom, #da32f9, #629ad6)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          paddingLeft: "0.4rem",
        }}
      >
        {/* <InterestsIcon
          sx={{
            top: "0.3rem",
            position: "relative",
            color: "#c387f2",
          }}
        />{" "} */}
        Waiters Overview
      </Typography>
      {isLoading || isRefetching ? (
        <Skeleton
          sx={{ margin: "0 auto", bottom: "43px", position: "relative" }}
          width={"100%"}
          height={"280px"}
        />
      ) : (
        <Box pb={"1rem"}>
          <Table
            data={data?.data?.data}
            fields={waiterColumn}
            numberOfRows={data?.data?.data.length}
            enableTopToolBar={false}
            enableBottomToolBar={false}
            enablePagination={false}
            enableColumnFilters={false}
            enableEditing={false}
            enableColumnDragging={false}
          />
        </Box>
      )}
    </ComponentWrapper>
  );
};

export default WaiterCount;

const waiterColumn = [
  {
    accessorKey: "waiter_name",
    header: "Waiter Name",
  },
  {
    accessorKey: "num_tables_served",
    header: "Table that served",
  },
  {
    accessorKey: "avg_time_diff",
    header: "avg time diff",
  },
];
