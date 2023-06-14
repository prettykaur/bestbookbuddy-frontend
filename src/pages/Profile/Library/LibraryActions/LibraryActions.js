import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditLibraryDialog from "../LibraryDialog/EditLibraryDialog";
import { Add, Edit } from "@mui/icons-material";

function LibraryActions(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/search");
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        gap: "8px",
      }}
    >
      <Button variant="contained" onClick={handleAdd} startIcon={<Add />}>
        Add to library
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        startIcon={<Edit />}
      >
        Edit library
      </Button>

      <EditLibraryDialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        {...props}
      />
    </Stack>
  );
}

export default LibraryActions;
