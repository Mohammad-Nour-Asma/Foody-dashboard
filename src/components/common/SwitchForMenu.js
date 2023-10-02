import { Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { request } from "../../Request/request";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";
import Notify from "./Notify";

const SwitchForMenu = ({ productId, switchType, ...options }) => {
  const [value, setValue] = useState(options.defaultChecked);

  const onChangehandler = (e) => {
    statusMutate.mutate(productId);
  };

  const switchState = (id) => {
    return request({
      url: `${
        switchType === "categories" ? "category" : "product"
      }/status/${id}`,
      method: "POST",
    });
  };

  const statusMutate = useMutation({
    mutationFn: switchState,
    onSuccess: () => {
      setOpen(true);
    },
    onError: (err) => {
      setValue(!value);
      setOpen(true);
    },
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Notify
        open={open}
        handleClose={handleClose}
        message={
          statusMutate.isError ? "An Error Hapen" : "Action Done Successfully"
        }
        type={statusMutate.isError ? "error" : "success"}
      />

      <>
        <CircularProgress
          sx={{ display: ` ${statusMutate.isPending ? "block" : "none"} ` }}
        />
        <Box
          onChange={(e) => {
            onChangehandler(e);
          }}
          sx={{
            display: ` ${statusMutate.isPending ? "none" : "block"} `,
            cursor: "pointer",
          }}
        >
          {" "}
          <Switch
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            {...options}
          ></Switch>
        </Box>
      </>
    </div>
  );
};

export default SwitchForMenu;
