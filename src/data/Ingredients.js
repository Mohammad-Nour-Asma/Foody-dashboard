import Typography from "@mui/material/Typography/Typography";
import { red } from "@mui/material/colors";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Stack } from "@mui/material";

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
      if (cell.row.original.threshold > cell.getValue()) {
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ fontWeight: "bold", color: red[400] }}
          >
            <Typography>{cell.getValue()}</Typography>
            <ErrorOutlineIcon sx={{ color: red[400], fontSize: "1.4rem" }} />
          </Stack>
        );
      }
    },
  },
  {
    accessorKey: "threshold", //access nested data with dot notation
    header: "Threshold",
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
  },
];
