import { useRef, useState } from "react";
import Layout from "../components/common/Layout";
import { Box, TextField, Typography, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Page from "../components/common/Page";
import Price from "../components/common/Price";
import styled from "@emotion/styled";
import { BiImageAdd } from "react-icons/bi";
import { Formik } from "formik";
import { ingredientValidation } from "../validations/ingredientsValidation";
import { request } from "../Request/request";
import { useNavigate } from "react-router-dom";
import Notify from "../components/common/Notify";
import IngredientsForm from "./Forms/IngredientsForm";

const AddIngredients = () => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <Page title="Add Ingredients">
        <Layout>
          <IngredientsForm />
        </Layout>
      </Page>
    </>
  );
};

export default AddIngredients;
