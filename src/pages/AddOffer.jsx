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
import axios from "axios";
import { useSelector } from "react-redux";

const AddOffer = () => {
  //Image Upload Stuff
  const UploadBox = styled(Box)({
    marginTop: 30,
    height: 200,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "divider",
  });
  const imageInput = useRef(null);
  const [image, setImage] = useState("");
  const [imageValidation, setImageValidation] = useState(true);
  const { branch_id } = useSelector((state) => state.settings);
  const [progress, setProgress] = useState({ loading: false, open: false });

  const submitHandle = () => {
    if (image == "") {
      setImageValidation(false);
      return;
    } else {
      const offer = {
        image: image,
        branch_id,
      };
      mutate(offer);
    }
  };

  const storeOffer = (offer) => {
    return request({
      url: "/offer/add",
      method: "POST",
      data: offer,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const handleClose = () => {
    setProgress({ loading: false, open: false });
  };

  const { mutate } = useMutation({
    mutationFn: storeOffer,
    onMutate: () => {
      setProgress({ loading: true, open: false });
    },
    onError: (err) => {
      setProgress({ loading: false, open: false });
    },
    onSuccess: () => {
      setProgress({ loading: false, open: true });
    },
  });

  return (
    <Page title={"Add Offer"}>
      <Notify
        message={"Offer added successfully"}
        open={progress.open}
        handleClose={handleClose}
      />
      <Layout>
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            hidden
            ref={imageInput}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <UploadBox onClick={() => imageInput.current.click()}>
            {image ? (
              <img
                loading={"lazy"}
                src={image && URL.createObjectURL(image)}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <BiImageAdd style={{ fontSize: "50px", color: "#027edd" }} />
                <Typography>
                  Drop your image here or{" "}
                  <span style={{ color: "#027edd", cursor: "pointer" }}>
                    browse
                  </span>
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  JPG, PNG and GIF images are allowed
                </Typography>
              </Box>
            )}
          </UploadBox>
          {!imageValidation && (
            <Box sx={{ color: "#f44336", margin: "1rem 0" }}>
              image field is required
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "30px",
          }}
        >
          <MyLoadingButton
            title={"Add Offer"}
            loading={progress.loading}
            variant={"contained"}
            onClick={submitHandle}
          ></MyLoadingButton>
        </Box>
      </Layout>
    </Page>
  );
};

export default AddOffer;
