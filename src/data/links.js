import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import { GiCoolSpices } from "react-icons/gi";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

export const links = [
  {
    name: "Dashboard",
    icon: <SpaceDashboardIcon />,
    url: "/Dashboard",
  },
  {
    name: "Ingredients in wearhouse",
    icon: <SoupKitchenIcon />,
    subLinks: [
      {
        name: "All Ingredients",
        url: "/Ingredients",
      },
      {
        name: "Add Ingredients",
        url: "/ingredient/add",
      },
    ],
  },
  {
    name: "Extra ingredients",
    icon: <GiCoolSpices />,
    subLinks: [
      {
        name: "All extra ",
        url: "/extra",
      },
      {
        name: "Add extra",
        url: "/extra/add",
      },
    ],
  },
  {
    name: "Categories",
    icon: <FastfoodIcon />,
    subLinks: [
      {
        name: "All Categories",
        url: "/categories",
      },
      {
        name: "Add Category",
        url: "/category/add",
      },
    ],
  },
  {
    name: "Products",
    icon: <RestaurantIcon />,
    subLinks: [
      {
        name: "All Products",
        url: "/products",
      },
      {
        name: "Add Product",
        url: "/products/add",
      },
    ],
  },

  {
    name: "Offers",
    icon: <MenuBookIcon />,
    subLinks: [
      {
        name: "All Offers",
        url: "/offers",
      },
      {
        name: "Add Offer",
        url: "/offer/add",
      },
    ],
  },

  {
    name: "Reviews",
    icon: <RateReviewIcon />,
    url: "/reviews",
  },
];
