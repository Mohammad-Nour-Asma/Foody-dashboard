import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
const MyLoadingButton = ({ title, ...option }) => {
  return (
    <LoadingButton {...option} type="submit">
      <span>{title}</span>
    </LoadingButton>
  );
};

export default MyLoadingButton;
