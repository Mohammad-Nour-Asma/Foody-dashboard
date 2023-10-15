/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Button, IconButton, Switch, Tooltip } from "@mui/material";
import { FiEye, FiTrash } from "react-icons/fi";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import SwitchForMenu from "./common/SwitchForMenu";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";

export const Table = ({
  data,
  fields,
  numberOfRows,
  enableTopToolBar,
  enableBottomToolBar,
  enablePagination,
  enableRowSelection,
  enableColumnFilters,
  enableEditing,
  enableColumnDragging,
  showPreview,
  edit,
  deleteElement,
  routeLink,
  hideFromMenu,
  UpdatingForm,
  refetch,
  AddAmountsForm,
}) => {
  const columns = useMemo(() => fields, []);

  const [tableData, setTableData] = useState(() => data);

  const handleDeleteRow = (row) => {
    const newData = data.filter((item) => item.id !== row.id);
    setTableData([...newData]);
  };

  // HANDLE SWITCH
  // const [check, setCheck] = useState();

  const [open, setOpen] = useState({ open: false, type: "", row: {} });

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const handleOpen = (type, row) => {
    setOpen({ type, open: true, row: row });
  };
  const headers = columns.map((item) => item.accessorKey);

  const exportedDataTable = tableData.map((item) => {
    let data = {};

    headers.forEach((element) => {
      // console.log(element, "ee");
      data[element] = item[element];
    });

    return data;
  });

  console.log(exportedDataTable, "exported");

  return (
    <>
      {" "}
      <Dialog
        open={open.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {open.type == "delete" ? (
          <>
            <DialogTitle id="alert-dialog-title">{"delete note"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the element ?
              </DialogContentText>
            </DialogContent>
          </>
        ) : open.type == "amounts" ? (
          <>
            <DialogTitle id="alert-dialog-title">{"Add Amounts"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {AddAmountsForm && (
                  <AddAmountsForm refetch={refetch} row={open.row} />
                )}
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">{"Editing"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {UpdatingForm && (
                  <UpdatingForm refetch={refetch} row={open.row} />
                )}
              </DialogContentText>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Box
            sx={{
              padding: "0rem 1rem 1rem",
            }}
          >
            <Button
              size="sm"
              sx={{ marginRight: "1rem" }}
              onClick={handleClose}
            >
              Disagree
            </Button>
            {open.type == "delete" && (
              <Button
                variant={"contained"}
                onClick={() => {
                  handleClose();
                  deleteElement.mutate(open.row.original.id);
                  handleDeleteRow(open.row);
                }}
                autoFocus
              >
                Agree
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      <MaterialReactTable
        columns={columns}
        data={tableData.slice(0, numberOfRows)}
        getRowId={(row) => row.id}
        enableEditing={enableEditing}
        enableColumnDragging={enableColumnDragging}
        enableColumnOrdering
        enableColumnFilters={enableColumnFilters}
        enablePagination={enablePagination}
        enableBottomToolbar={enableBottomToolBar}
        enableTopToolbar={enableTopToolBar}
        muiBottomToolbarProps={{
          //simple styling with the `sx` prop, works just like a style prop in this example
          sx: {
            backgroundColor: "#f4f7fe",
          },
        }}
        muiTopToolbarProps={{
          //simple styling with the `sx` prop, works just like a style prop in this example
          sx: {
            backgroundColor: "#f4f7fe",
          },
        }}
        // muiTableHeadCellProps={{
        //   //simple styling with the `sx` prop, works just like a style prop in this example
        //   sx: {
        //     fontWeight: "normal",
        //     fontSize: "14px",
        //     background: "red",
        //   },
        // }}

        renderTopToolbarCustomActions={({ table }) => (
          <></>
          // <Box
          //   sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          // >
          //   <CSVLink
          //     className="downloadbtn"
          //     filename="my-file.csv"
          //     data={exportedDataTable}
          //     headers={columns.map((item) => item.header)}
          //   >
          //     Export to CSV
          //   </CSVLink>
          // </Box>
        )}
        renderRowActions={({ row }) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    handleOpen("delete", row);
                  }}
                >
                  <FiTrash />
                </IconButton>
              </Tooltip>
              {showPreview && routeLink && (
                <Tooltip arrow placement="right" title="View">
                  <Link to={`/${routeLink}/${row.original.id}`}>
                    <IconButton>
                      <FiEye />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              {routeLink === "ingredients" && (
                <Tooltip arrow placement="right" title="Add Amounts">
                  <Link>
                    <IconButton
                      onClick={() => {
                        handleOpen("amounts", row);
                      }}
                    >
                      <ControlPointIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              {enableEditing && routeLink !== "productExtra" && (
                <Tooltip arrow placement="right" title="Edit">
                  <IconButton
                    onClick={() => {
                      handleOpen("edit", row);
                    }}
                  >
                    <AiOutlineEdit />
                  </IconButton>
                </Tooltip>
              )}
              {hideFromMenu &&
                (routeLink === "products" || routeLink === "categories") && (
                  <SwitchForMenu
                    defaultChecked={row.original.status}
                    productId={row.original.id}
                    switchType={routeLink}
                  />
                )}
            </Box>
          );
        }}
        muiTableBodyRowProps={{ hover: false }}
        muiTablePaperProps={{
          sx: {
            padding: "20px",

            background: "f4f7fe",
          },
        }}
        muiTableContainerProps={{
          sx: { borderRadius: "15px" },
        }}
        muiTableHeadCellProps={{
          sx: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        }}
        muiTableHeadProps={{
          sx: {
            "& tr th": {
              borderWidth: "1px",
              borderColor: "divider",
              borderStyle: "solid",
            },
          },
        }}
        muiTableBodyProps={{
          sx: {
            "& tr td": {
              borderWidth: "1px",
              borderColor: "divider",
              borderStyle: "solid",
            },
          },
        }}
      />
    </>
  );
};

export default Table;
