import React from "react";
import { Snackbar, Alert } from "@mui/material";
const Notify = ({ open, message, handleClose, type }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
