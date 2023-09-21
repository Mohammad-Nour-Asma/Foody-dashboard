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

const Page = ({
  title,
  children,
  button,
  link,
  type,
  productIngredient,
  productExtraIngredient,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(productIngredient, "flag");
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add product Ingredient
        </DialogTitle>
        <DialogContent>
          <ProductIngredientForm
            type={type}
            productIngredient={productIngredient}
            productExtraIngredient={productExtraIngredient}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "14px" }}>
          {title}
        </Typography>

        {button && (
          <Link to={link} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiPlus />}
              sx={{ borderRadius: "20px" }}
              onClick={() => {
                if (type === "extraProductIng" || type === "productIng") {
                  handleClickOpen();
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
