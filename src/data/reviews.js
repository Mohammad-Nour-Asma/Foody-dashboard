import { Rating } from "@mui/material";

export const reviewsClumns = [
  {
    accessorKey: "product", //access nested data with dot notation
    header: "Product",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "rating", //normal accessorKey
    header: "Rating",
    Cell: ({ cell, row }) => (
      <Rating
        name="half-rating"
        defaultValue={cell.getValue()}
        precision={0.5}
        readOnly
      />
    ),
  },
  {
    accessorKey: "date", //normal accessorKey
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    //or in the component override callbacks like this
    Cell: ({ cell, row }) => (
      <div>
        {row.original.status === "Pending" && (
          <span
            className="status"
            style={{ color: "#c49c1a", backgroundColor: "#c49c1a33" }}
          >
            {cell.getValue()}
          </span>
        )}
        {row.original.status === "Published" && (
          <span
            className="status"
            style={{ color: "#388b84", backgroundColor: "#388b8433" }}
          >
            {cell.getValue()}
          </span>
        )}
      </div>
    ),
  },
];

export const reviews = [
  {
    product: "Eel - Smoked",
    username: "Tuesday Byard",
    rating: 4.3,
    date: "10/05/2022",
    status: "Pending",
  },
  {
    product: "Tomato - Green",
    username: "Rhea Kynforth",
    rating: 1.4,
    date: "10/15/2022",
    status: "Pending",
  },
  {
    product: "Pastry - Apple Large",
    username: "Rodie Garland",
    rating: 4.6,
    date: "04/29/2022",
    status: "Pending",
  },
  {
    product: "Lamb - Leg, Bone In",
    username: "Layton MacShirie",
    rating: 1.9,
    date: "07/23/2022",
    status: "Published",
  },
];
