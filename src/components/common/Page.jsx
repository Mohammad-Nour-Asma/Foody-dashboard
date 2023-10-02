import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductIngredientForm from "../../pages/Forms/ProductIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/IngredientsSlice";

const Page = ({
  title,
  children,
  button,
  link,
  type,
  productIngredient,
  productExtraIngredient,
  setOpen,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: "0",

            background: "linear-gradient(to bottom, #da32f9, #629ad6)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </Typography>

        {button && (
          <Link to={link} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<FiPlus />}
              sx={{
                borderRadius: "20px",
                background:
                  "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
              }}
              onClick={() => {
                if (type === "extraProductIng" || type === "productIng") {
                  handleClickOpen();
                  dispatch(reset());
                }
              }}
            >
              {button}
            </Button>
          </Link>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default Page;
