import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditLibraryDialog from "../LibraryDialog/EditLibraryDialog";

function LibraryActions(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/search");
  };

  return (
    <Stack spacing={1}>
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Edit
      </Button>

      {openDialog && (
        <EditLibraryDialog
          open={openDialog}
          setOpenDialog={setOpenDialog}
          {...props}
        />
      )}
    </Stack>
  );
}

export default LibraryActions;
