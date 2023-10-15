import Layout from "../components/common/Layout";
import { Paper } from "@mui/material";

import Page from "../components/common/Page";

import { useNavigate } from "react-router-dom";

import IngredientsForm from "./Forms/IngredientsForm";

const AddIngredients = () => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <Page title="Add Ingredients">
        <Paper
          sx={{
            border: "3px solid",
            borderRadius: "10px",
            width: "70%",
            margin: "0 auto",
          }}
        >
          <IngredientsForm />
        </Paper>
      </Page>
    </>
  );
};

export default AddIngredients;
