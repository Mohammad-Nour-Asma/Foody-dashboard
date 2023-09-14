import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useColorTheme } from "../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../Request/request";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Loader from "./loader/loader";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const colorMode = useColorTheme();
  const theme = useTheme();
  const [branche, setbranche] = useState(
    localStorage.getItem("branch_id") ? localStorage.getItem("branch_id") : 1
  );
  const currentTheme = theme.palette.mode;

  const getBranches = () => {
    return request({
      url: `/branch/restaurant/${localStorage.getItem("restaurant_id")}`,
      method: "GET",
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
    onSuccess: (data) => {
      // Assuming data contains an id property
      console.log(data);
      localStorage.setItem("id", data[0].id);
    },
  });

  const handleChange = (event) => {
    setbranche(event.target.value);
    localStorage.setItem("branch_id", event.target.value);
  };

  if (isLoading) {
    if (!localStorage.getItem("branch_id")) {
      localStorage.setItem("branch_id", data.data.data[0].id);
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>
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

            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Branch</InputLabel>
              {isLoading ? (
                <Box sx={{ transform: "scale(0.5)" }}>
                  <Loader />
                </Box>
              ) : (
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={branche}
                  label="Branch"
                  onChange={handleChange}
                >
                  {data.data.data.map((item) => {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })}
                </Select>
              )}
            </FormControl>
            <ProfileMenu />
            <Tooltip title="Toggle Theme" arrow>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ fontSize: "20px", color: "text.primary" }}
              >
                {currentTheme === "light" ? <FiMoon /> : <FiSun />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
