import React from "react";
import Page from "../components/common/Page";
import Layout from "../components/common/Layout";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { BiImageAdd } from "react-icons/bi";
import { Box, TextField, Typography, Button } from "@mui/material";
import { request } from "../Request/request";
import { useMutation } from "@tanstack/react-query";
import MyLoadingButton from "../components/common/LoadingButton";
import Notify from "../components/common/Notify";
import { Formik } from "formik";
import { categoryValidation } from "../validations/categoryValidation";
import CategoryForm from "./Forms/CategoryForm";

const AddCategory = () => {
  //Image Upload Stuff

  return (
    <Page title={"Add Category"}>
      <Layout>
        <CategoryForm />
      </Layout>
    </Page>
  );
};

export default AddCategory;
