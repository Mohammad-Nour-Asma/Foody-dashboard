import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, icon, url }) => {
  return (
    <NavLink
      to={url}
      style={{ textDecoration: "none" }}
      end
      activeclassname="active"
    >
      <ListItemButton
        className="linkBtn"
        sx={{
          "&:hover": { backgroundColor: "#f4f7fe" },
          paddingY: "8px",
          paddingX: "24px",
          background: "#e5edff",
        }}
      >
        <ListItemIcon sx={{ color: "#434851" }}>{icon}</ListItemIcon>

        <ListItemText primary={name} sx={{ ml: "-10px", color: "#434851" }} />
      </ListItemButton>
    </NavLink>
  );
};

export default SidebarItem;
