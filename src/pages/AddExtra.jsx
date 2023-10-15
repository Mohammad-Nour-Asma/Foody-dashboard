import { Paper } from "@mui/material";
import Page from "../components/common/Page";
import ExtraForm from "./Forms/ExtraForm";

const AddExtra = () => {
  return (
    <>
      {" "}
      <Page title="Add Extra Ingredients">
        <Paper
          sx={{
            border: "3px solid",
            borderRadius: "10px",
            width: "70%",
            margin: "0 auto",
          }}
        >
          <ExtraForm />
        </Paper>
      </Page>
    </>
  );
};

export default AddExtra;
