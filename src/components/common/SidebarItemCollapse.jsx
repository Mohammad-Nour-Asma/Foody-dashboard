import styled from "@emotion/styled";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { red } from "@mui/material/colors";

const SidebarItemCollapse = ({ name, icon, url, subLinks }) => {
  const [open, setOpen] = React.useState(false);
  const { warning } = useSelector((state) => state.warning);

  const currentPath = useLocation().pathname;

  useEffect(() => {
    subLinks.forEach((link) => {
      if (currentPath === link.url) {
        setOpen(true);
      }
    });
  }, [currentPath, subLinks]);

  const CustomListItemText = styled(ListItemText)({
    fontSize: "10px !important",
    position: "relative",
    color: "#434851",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      border: "2px solid #da31fa",
      top: "50%",
      left: "-20px",
      transform: "translateY(-50%)",
    },
  });

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&:hover": { backgroundColor: "#f4f7fe" },
          paddingY: "8px",
          paddingX: "24px",
          background: "#e5edff",
        }}
      >
        <ListItemIcon sx={{ color: "#434851" }}>{icon}</ListItemIcon>
        <ListItemText primary={name} sx={{ ml: "-10px", color: "#434851" }} />
        {open ? (
          <FiChevronUp sx={{ color: "#434851" }} />
        ) : (
          <FiChevronDown sx={{ color: "#434851" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {subLinks.map(({ name, url }, index) => {
            return name == "All Ingredients" && warning ? (
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <NavLink
                  to={url}
                  style={{ textDecoration: "none" }}
                  key={index}
                  end
                  activeclassname="active"
                >
                  <ListItemButton
                    className="linkBtn sub-link"
                    key={index}
                    sx={{
                      "&:hover": { backgroundColor: "#f4f7fe" },
                      paddingY: "8px",
                      paddingLeft: "70px",
                      background: "#e5edff",
                    }}
                  >
                    <CustomListItemText
                      primary={name}
                      sx={{
                        color: "#434851",
                      }}
                    />
                  </ListItemButton>
                </NavLink>
                <ErrorOutlineIcon
                  sx={{ color: red[400], fontSize: "1.4rem" }}
                />
              </Stack>
            ) : (
              <NavLink
                to={url}
                style={{ textDecoration: "none" }}
                key={index}
                end
                activeclassname="active"
              >
                <ListItemButton
                  className="linkBtn sub-link"
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f4f7fe" },
                    paddingY: "8px",
                    paddingLeft: "70px",
                    background: "#e5edff",
                    color: "#434851",
                  }}
                >
                  <CustomListItemText
                    primary={name}
                    sx={{
                      color: "#434851",
                      fontWeight: "600",
                    }}
                  />
                </ListItemButton>
              </NavLink>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default SidebarItemCollapse;
