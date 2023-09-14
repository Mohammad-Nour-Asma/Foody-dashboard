import React from "react";
import ComponentWrapper from "../../components/ComponentWrapper";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { request } from "../../Request/request";
import { useQuery } from "@tanstack/react-query";

const TopElements = ({ columns, type, entity }) => {
  const data = [
    {
      id: 1,
      name: "product 1",
      category: "pitzza",
      rating: 4,
    },
    {
      id: 2,
      name: "product 2",
      category: "pitzza",
      rating: 4,
    },
    {
      id: 3,
      name: "product 3",
      category: "pitzza",
      rating: 4,
    },
  ];

  //   const getData = () => {
  //     return request({ url: `/${entity}/top-five` });
  //   };

  //   const { data, isLoading, isErro } = useQuery({
  //     queryKe: [`get-${type}-${entity}`],
  //     queryFn: getData,
  //   });

  return (
    <ComponentWrapper>
      <Typography variant="h5" sx={{ my: 3, textTransform: "capitalize" }}>
        {type} 5 {entity}
      </Typography>
      <Table
        data={data}
        fields={columns}
        numberOfRows={5}
        enableTopToolBar={false}
        enableBottomToolBar={false}
        enablePagination={false}
        enableColumnFilters={false}
        enableEditing={false}
        enableColumnDragging={false}
      />
    </ComponentWrapper>
  );
};

export default TopElements;
