import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../images/3.png";
import { useMutation } from "@tanstack/react-query";
import { request } from "../Request/request";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate, useParams } from "react-router-dom";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useDispatch } from "react-redux";
import { setBranchId, setRestaurantId } from "../redux/SettingsSlice";

const CheckUuid = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(false);
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();

  const { uuid } = useParams();
  const chekcUuid = useMutation({
    mutationKey: [`uuid-${uuid}`],
    mutationFn: (data) => {
      console.log(data);
      return request({
        url: "/get-token-by-uuid",
        data,
        method: "POST",
      });
    },
    onSuccess: (resp) => {
      console.log(resp);

      localStorage.setItem("token", resp.data.token);
      localStorage.setItem(
        "restaurant_id",
        resp.data.user.branch.restaurant_id
      );
      dispatch(setRestaurantId(resp.data.user.branch.restaurant_id));
      dispatch(setBranchId(resp.data.user.branch.id));
      console.log(
        resp.data.user.branch.id,
        resp.data.user.branch.restaurant_id
      );
      setOpacity(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    },
    onError: (err) => {
      console.log(err);
      setOpacity(true);
      seterror(true);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    chekcUuid.mutate({ uuid });
  }, []);

  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "40%",
        }}
      >
        <img className="logo" style={{ maxWidth: "100%" }} src={Logo} />
        <span
          style={{
            textAlign: "center",
            margin: "1rem",
            width: "100%",
            opacity: opacity ? "1" : "0",
            transition: ".7s",
            display: "block",
            fontWeight: "bold",
          }}
        >
          {error ? (
            <>
              Unauthorized{" "}
              <DoNotDisturbOnIcon
                sx={{
                  color: "#de0808",
                  display: "inline-block",
                  fontSize: "1.7rem",
                  bottom: "-7px",
                  position: "relative",
                }}
              />
            </>
          ) : (
            <>
              Welcome to Admin Dashboard{" "}
              <AdminPanelSettingsIcon
                sx={{
                  color: "#59f442",
                  display: "inline-block",
                  fontSize: "1.7rem",
                  bottom: "-7px",
                  position: "relative",
                }}
              />
            </>
          )}
        </span>
      </Box>
    </Box>
  );
};

export default CheckUuid;
