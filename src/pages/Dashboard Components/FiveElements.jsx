import React, { useEffect } from "react";
import ComponentWrapper from "../../components/ComponentWrapper";
import Table from "../../components/Table";
import { Typography } from "@mui/material";
import { request } from "../../Request/request";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";

const TopElements = ({ columns, type, entity }) => {
  const data1 = [
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

  const { year, month, day } = useSelector((state) => state.settings);

  const getData = () => {
    let api;
    if (type === "top requested products") {
      api = "/mostRequestedProduct";
    } else if (type === "least requested products") {
      api = "/leastRequestedProduct";
    } else if (type === "top rated products") {
      api = "/mostRatedProduct";
    } else if (type === "least rated products") {
      api = "/leastRequestedProduct";
    }
    console.log(api);
    return request({
      url: `${api}`,
      method: "POST",
      data: {
        year,
        month,
        day,
      },
    });
  };

  const { data, isLoading, isErro, refetch } = useQuery({
    queryKe: [`get-${type}-${entity}`],
    queryFn: getData,
  });

  useEffect(() => {
    refetch();
  }, [year, month, day]);

  if (isLoading) {
    return <Loader />;
  }
  const response = data.data.data;
  const orgnizeTheResponse = (response) => {
    let data;
    if (
      type === "top requested products" ||
      type === "least requested products"
    ) {
      data = response.map((item) => {
        return {
          name: item.product.name,
          category: item.product.category.name,
          total: item.total,
        };
      });
    } else {
      data = response.map((item) => {
        return {
          name: item.product.name,
          category: item.product.category.name,
          rate: item.product.AvgRating,
        };
      });
    }
    return data;
  };

  return (
    <ComponentWrapper>
      <Typography variant="h5" sx={{ my: 3, textTransform: "capitalize" }}>
        5 {type}
      </Typography>
      <Table
        data={orgnizeTheResponse(response)}
        fields={columns}
        numberOfRows={data.data.data.length}
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
