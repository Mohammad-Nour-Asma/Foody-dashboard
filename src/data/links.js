import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";

import {
  FiHome,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/Dashboard",
  },
  {
    name: "Ingredients in wearhouse",
    icon: <FiShoppingBag />,
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
    icon: <FiShoppingBag />,
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
    icon: <FiShoppingBag />,
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
    icon: <FiShoppingBag />,
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
    name: "Sales",
    icon: <BsCurrencyDollar />,
    subLinks: [
      {
        name: "Sales Analytics",
        url: "/sales/analysis",
      },
      // {
      //   name: "Product Sales",
      //   url: "/sales",
      // },
    ],
  },
  {
    name: "Offers",
    icon: <MdOutlineLocalOffer />,
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
  // {
  //   name: "Orders",
  //   icon: <FiShoppingCart />,
  //   subLinks: [
  //     {
  //       name: "All Orders",
  //       url: "/orders",
  //     },
  //   ],
  // },

  {
    name: "Reviews",
    icon: <FiMessageCircle />,
    url: "/reviews",
  },

  {
    name: "Service Timing",
    icon: <FiSettings />,
    url: "/service-timing",
  },
];
