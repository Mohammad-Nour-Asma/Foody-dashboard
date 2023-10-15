import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  setBranchId,
  setGolbalDay,
  setGolbalMonth,
  setGolbalYear,
} from "../../redux/SettingsSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTheme = theme.palette.mode;
  const { branch_id, restaurant_id } = useSelector((state) => state.settings);

  const getBranches = () => {
    return request({
      url: `/branch/restaurant/${restaurant_id}`,
      method: "GET",
    });
  };
  const {
    data = [],
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,

    onSuccess: (data) => {
      // Assuming data contains an id property

      localStorage.setItem("id", data[0].id);
      dispatch(setBranchId(data[0].id));
    },
  });

  if (isSuccess) {
    console.log(data?.data?.data);
    if (!localStorage.getItem("branch_id")) {
      localStorage.setItem("branch_id", data.data.data[0].id);
      dispatch(setBranchId(data.data.data[0].id));
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBranchChange = (event) => {
    localStorage.setItem("branch_id", event.target.value);
    dispatch(setBranchId(event.target.value));
  };

  useEffect(() => {
    refetch();
  }, [restaurant_id]);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${sideBarWidth}px)` },
          ml: { md: `${sideBarWidth}px` },
          boxShadow: "unset",
          backgroundColor: "#e5edff",
          color: "text.primary",
          borderBottomWidth: 1,
          borderBottomColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            background: "#e5edff",
            borderBottom: "0.5px solid #c580e4",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title="Menu" arrow>
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <FiMenu />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack
              backgroundColor={"#e5edff"}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 80, maxHeight: "150px" }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">Branch</InputLabel>

                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={branch_id}
                  label="Branch"
                  onChange={handleBranchChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {data?.data?.data?.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <Tooltip title="Logout" arrow>
                <IconButton
                  sx={{
                    fontSize: "2rem",
                    marginRight: "2rem",
                    fontWeight: "bold",
                    color: "#da31fa",
                  }}
                  onClick={handleLogout}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
};

export default Navbar;
