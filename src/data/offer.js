export const offerColumns = [
  {
    accessorKey: "image", //access nested data with dot notation
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <img src={cell.getValue()} alt="" width={100} />
      </div>
    ),
  },
];

export const offerData = [
  {
    id: 15,
    image: "/images/products/gsmarena_009.jpg",
  },
  {
    id: 16,

    image: "/images/products/Panasonic-S1H.jpg",
  },
  {
    id: 17,

    image: "/images/products/onePlus.webp",
  },
];
