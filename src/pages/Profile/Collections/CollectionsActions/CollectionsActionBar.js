import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import AddCollectionsDialog from "../CollectionsDialog.js/AddCollectionsDialog";
import EditCollectionsDialog from "../CollectionsDialog.js/EditCollectionsDialog";
import { Add, Edit } from "@mui/icons-material";

function CollectionsActionBar() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <Stack
      mb={5}
      sx={{
        flexDirection: { xs: "column", md: "row" },
        gap: "8px",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setOpenAddDialog(true)}
        startIcon={<Add />}
      >
        New Collection
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpenEditDialog(true)}
        startIcon={<Edit />}
      >
        Edit Collections
      </Button>

      <AddCollectionsDialog
        open={openAddDialog}
        setOpenDialog={setOpenAddDialog}
      />

      <EditCollectionsDialog
        open={openEditDialog}
        setOpenDialog={setOpenEditDialog}
      />
    </Stack>
  );
}

export default CollectionsActionBar;
