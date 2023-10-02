import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, icon, url }) => {
  console.log(name);
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
          "&:hover": { backgroundColor: "#e5edff" },
          paddingY: "8px",
          paddingX: "24px",
        }}
      >
        <ListItemIcon sx={{ color: "sidebar.textColor" }}>{icon}</ListItemIcon>

        <ListItemText
          primary={name}
          sx={{ ml: "-10px", color: "sidebar.textColor" }}
        />
      </ListItemButton>
    </NavLink>
  );
};

export default SidebarItem;
