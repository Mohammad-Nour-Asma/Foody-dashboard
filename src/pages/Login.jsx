import { Box, TextField, Stack, createTheme, Button } from  "@mui/material";
import React, { useState } from "react";
import GridBox from "../components/common/GridBox";
import GridItem from "../components/common/GridItem";
import LoadingButton from "@mui/lab/LoadingButton"; 
import logo from "../images/background.jpg";
import { userSchema } from "../validations/UserValidation";
import { Formik, setIn } from "formik"; 
import { request } from "../Request/request";
import { useNavigate } from "react-router-dom";
import Resto from "../images/3.png";
import { useDispatch } from "react-redux";
import { setRestaurantId } from "../redux/SettingsSlice";

const Login = () => {
  const [info, setInfo] = useState({ loading: false, error: false });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const submitHandler = (values) => {
    setInfo({ loading: true, error: false });

    request({ url: "/login", method: "POST", data: values })
      .then((resp) => {
        setInfo({ ...info, loading: false });
        // resp.data.data.token;
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem(
          "restaurant_id",
          resp.data.user.branch.restaurant_id
        );
        dispatch(setRestaurantId(resp.data.user.branch.restaurant_id));
        navigate("/dashboard");
      })
      .catch((err) => {
        setInfo({ error: true, loading: false });
      });
  };

  return (
    <Box>
      <GridBox spacing={3}>
        <GridItem md={6} xs={12}>
          <Box padding={"1rem"} width={"200px"}>
            <img
              src={Resto}
              style={{
                maxWidth: "100%",
              }}
            />
          </Box>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={userSchema}
            onSubmit={submitHandler}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form
                style={{
                  padding: "1rem",
                }}
                onSubmit={handleSubmit}
              >
                <Stack mt={"4rem"} spacing={3}>
                  <Box>
                    <TextField
                      label="Email"
                      type="string"
                      variant="outlined"
                      onBlur={handleBlur}
                      name="email"
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      fullWidth
                    />
                  </Box>
                </Stack>
                <Box mt="3rem">
                  <LoadingButton
                    type={"submit"}
                    size="small"
                    loading={info.loading}
                    variant="contained"
                    fullWidth
                    sx={{
                      padding: "1rem",
                      borderRadius: "5px",
                      background:
                        "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
                    }}
                  >
                    <span
                      style={{
                        // color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Log IN
                    </span>
                  </LoadingButton>
                </Box>
                {info.error && (
                  <Box
                    sx={{ color: "red", fontWeight: "bold", margin: "1rem 0" }}
                  >
                    Wrong Credential
                  </Box>
                )}
              </form>
            )}
          </Formik>
        </GridItem>
        <GridItem md={6} xs={12}>
          <Box
            sx={{
              position: "relative",
              backgroundImage: `url("${logo}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgoundPosition: "center",
              minHeight: "100vh",
              display: {
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "40%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <img
                src={Resto}
                style={{
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Box>
        </GridItem>
      </GridBox>
    </Box>
  );
};

export default Login;
