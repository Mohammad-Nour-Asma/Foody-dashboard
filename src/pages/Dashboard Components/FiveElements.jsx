import React from "react";
import ComponentWrapper from "../../components/ComponentWrapper";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { request } from "../../Request/request";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/loader";

const TopElements = ({ columns, type, entity , fetchAPI }) => {
  const getFiveElements = () => {
    return request({
      url : fetchAPI,
      method : 'post'
    })
  }

  //   const getData = () => {
  //     return request({ url: `/${entity}/top-five` });
  //   };

    const { data, isLoading, isErro } = useQuery({
      queryKe: [fetchAPI],
      queryFn: getFiveElements,
    });

    if(isLoading){
      return <Loader />
    }

    console.log(data.data)
  return (
    <ComponentWrapper>
      <Typography variant="h5" sx={{ my: 3, textTransform: "capitalize" }}>
        {type} 5 {entity}
      </Typography>
      <Table
        data={data.data.data}
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
