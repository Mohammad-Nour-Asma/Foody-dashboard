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
}) => {
  const columns = useMemo(() => fields, []);

  const [tableData, setTableData] = useState(() => data);

  const handleDeleteRow = useCallback(
    (row) => {
      data.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  // HANDLE SWITCH
  // const [check, setCheck] = useState();

  const [open, setOpen] = useState({ open: false, type: "", row: {} });

  const handleClose = () => {
    setOpen({ ...open, open: false });
  };

  const handleOpen = (type, row) => {
    setOpen({ type, open: true, row: row });
  };

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
              {enableEditing && (
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
            borderRadius: "15px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
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
