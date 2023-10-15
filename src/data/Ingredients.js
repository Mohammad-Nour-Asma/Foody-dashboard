import Typography from "@mui/material/Typography/Typography";
import { red } from "@mui/material/colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Stack } from "@mui/material";
import { formatNumber } from "../components/HelperFunction";

export const ingredientColumns = [
  {
    accessorKey: "ingredient.name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "ingredient.name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "quantity", //access nested data with dot notation
    header: "Quantity",
  },
];
export const mealIngredientColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "total_quantity", //access nested data with dot notation
    header: "Quantity",
    Cell: ({ cell }) => {
      const number = formatNumber(cell.getValue());
      console.log(number);
      if (cell.row.original.threshold > cell.getValue()) {
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ fontWeight: "bold", color: red[400] }}
          >
            <Typography>{number}</Typography>
            <ErrorOutlineIcon sx={{ color: red[400], fontSize: "1.4rem" }} />
          </Stack>
        );
      } else {
        return <Typography>{number}</Typography>;
      }
    },
  },
  {
    accessorKey: "threshold", //access nested data with dot notation
    header: "Threshold",
    Cell: ({ cell }) => {
      const number = formatNumber(cell.getValue());

      return <Typography>{number}</Typography>;
    },
  },
];

export const extraIngredientsColumns = [
  {
    accessorKey: "ingredient.name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "ingredient.name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "price_per_kilo", //access nested data with dot notation
    header: "Price Per Kilo",
    Cell: ({ cell }) => {
      const number = formatNumber(cell.getValue());

      return <Typography>{number}</Typography>;
    },
  },
];
