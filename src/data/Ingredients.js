export const ingredientColumns = [
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
  },
];
export const productIngredientColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "pivot.quantity", //access nested data with dot notation
    header: "Quantity",
  },
];

export const extraIngredientsColumns = [
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "name_ar", //access nested data with dot notation
    header: "Arabic Name",
  },
  {
    accessorKey: "price_per_kilo", //access nested data with dot notation
    header: "Price",
  },
];
