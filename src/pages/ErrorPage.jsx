import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Stars from "../images/error.jpg";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  let errorMessage;
  if (error?.message === "Network Error")
    errorMessage = "Network Error - Check Your Internet Connection";
  else if (error?.message === "timeout of 6000ms exceeded")
    errorMessage = "Weak Internet Connection - Check Your Internet Connection";
  else if (error?.response?.status === 404)
    errorMessage = "404 - Page Not Found";
  else if (error?.response?.status === 422)
    errorMessage = "You Entered Wrong Information";
  else if (error?.response?.status === 401)
    errorMessage = "Unauthorized - Please Login Again";
  else if (error?.response?.status === 429)
    errorMessage = "Too Many Request - Wait A Little";
  else errorMessage = "Something went wrong";
  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Stars})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "8rem",
              fontWeight: "900",
              fontFamily: "Verdana, Arial, Helvetica, sans-serif !important",
              padding: "10px",
            }}
          >
            Oops !{" "}
          </Typography>
          <Typography variant="h5" mb={2}>
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              background:
                "linear-gradient(to bottom, #dd78ef, #779bc2) !important",
            }}
            onClick={() => {
              if (error?.response?.status === 401) {
                document.location.href = "/";
                return;
              }
              resetErrorBoundary();
            }}
          >
            {error?.response?.status == 401
              ? "Return To Home Page"
              : "Refresh Page"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
