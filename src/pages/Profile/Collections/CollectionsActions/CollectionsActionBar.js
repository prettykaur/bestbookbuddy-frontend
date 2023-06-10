import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import AddCollectionsDialog from "../CollectionsDialog.js/AddCollectionsDialog";
import EditCollectionsDialog from "../CollectionsDialog.js/EditCollectionsDialog";

function CollectionsActionBar() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <Stack spacing={1} mb={5}>
      <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
        Make A New Collection
      </Button>
      <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
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
