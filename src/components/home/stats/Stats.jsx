import styled from "@emotion/styled";
import { Box, Grid, IconButton, Paper, Select, Typography , MenuItem } from "@mui/material";
import React, { useState } from "react";
import { lineChartData, lineChartOptions } from "../../../data/chartData";
import { stats } from "../../../data/stats";
import LineChart from "../charts/LineChart";
import moment from "moment/moment";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../../Request/request";
import Loader from '../../loader/loader'
import { FiShoppingBag } from "react-icons/fi";

const getStatisticsFromServer = () => {
  return request({
    url : '/statistics',
    method : 'post'
  })
}

const Stats = () => {
  const [currentYear , setCureentYear] = useState(moment().year())
  const Item = styled(Paper)({
    padding: "5px 10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const statisticsQuery = useQuery({
    queryKey : ['get-statistics-from-server'],
    queryFn : getStatisticsFromServer
  })

if(statisticsQuery.isLoading){
  return <Loader />
}

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>
              <IconButton
                sx={{ background: `rgba(100, 39, 255, 0.2)`, color: '#6427ff' }}
              >
                <FiShoppingBag />
              </IconButton>
              
            </Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              {statisticsQuery.data.data.data[0]?.total_sales}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Total Seales</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>
              <IconButton
                sx={{ background: `rgba(100, 39, 255, 0.2)`, color: '#6427ff' }}
              >
                <FiShoppingBag />
              </IconButton>
              
            </Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              {statisticsQuery.data.data.data[0]?.avg_sales || 0}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Average Seales</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>
              <IconButton
                sx={{ background: `rgba(100, 39, 255, 0.2)`, color: '#6427ff' }}
              >
                <FiShoppingBag />
              </IconButton>
              
            </Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              {statisticsQuery.data.data.data[0]?.max_sales || 0}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Max Seales</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>
              <IconButton
                sx={{ background: `rgba(100, 39, 255, 0.2)`, color: '#6427ff' }}
              >
                <FiShoppingBag />
              </IconButton>
              
            </Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              {statisticsQuery.data.data.data[0]?.avg_orders || 0}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Average Orders</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>
              <IconButton
                sx={{ background: `rgba(100, 39, 255, 0.2)`, color: '#6427ff' }}
              >
                <FiShoppingBag />
              </IconButton>
              
            </Box>
            <Typography variant="h4" sx={{ my: 2 }}>
              {statisticsQuery.data.data.data[0]?.total_orders || 0}
            </Typography>
            <Typography sx={{ opacity: 0.7 }}>Total Orders</Typography>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Stats;
