import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import OrderItem from "./OrderItem";

import { useNavigate } from "react-router";

import { KeyboardArrowUp } from "@mui/icons-material";

const OrderCard = ({ orderData, type, handlesub }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const navigate = useNavigate();

  const date = new Date(orderData.created_at);
  return (
    <>
      <Box
        className="order-card"
        sx={{
          borderRadius: "8px",
          // overflow : 'hidden',
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "-12.5px",
            transform: "translateX(-50%)",
            backgroundColor: "#4E4E4E",
            width: "25px",
            height: "25px",
            zIndex: "2",
          }}
        >
          <KeyboardArrowUp
            sx={{
              color: "white",
              transition: "0.5s",
              transform: !isCardOpen ? "rotate(0.5turn)" : "0",
            }}
          />
        </IconButton>
        <Box
          className="order-card-header"
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            backgroundColor: "#111827",

            flexWrap: "wrap",
            borderRadius: "8px 8px 0px 0px",
          }}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
              }}
            >
              Order ID : <b>{orderData?.id}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px" },
              }}
            >
              date : <b>{date.toLocaleString()}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px" },
              }}
            >
              Service Rate : <b>{orderData.serviceRate}/5</b>
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              table : <b>{orderData?.table.table_num}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              total : {orderData?.total_price}SAR
            </Typography>
          </Box>
        </Box>
        <Box
          className="order-card-body"
          sx={{
            backgroundColor: "#151d30",
            transition: "max-height 0.5s",
            color: "#fff",
            maxHeight: !isCardOpen ? "0px" : "1000px",
            overflow: "hidden",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          {orderData?.products?.map((orderItemCard) => (
            <OrderItem key={orderItemCard.id} orderItemData={orderItemCard} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default OrderCard;
