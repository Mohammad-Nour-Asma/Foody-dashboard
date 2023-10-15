import React from "react";
import Page from "../components/common/Page";
import CategoryForm from "./Forms/CategoryForm";
import { Paper } from "@mui/material";

const AddCategory = () => {
  //Image Upload Stuff

  return (
    <Page title={"Add Category"}>
      <Paper
        sx={{
          border: "3px solid",
          borderRadius: "10px",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <CategoryForm />
      </Paper>
    </Page>
  );
};

export default AddCategory;
