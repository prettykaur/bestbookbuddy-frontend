import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import LibraryCard from "../../../common/ui/LibraryCard";

function CollectionsCard() {
  return (
    <Stack spacing={2}>
      <Stack px={2}>
        <Typography variant="h5">Horror for the Weekends</Typography>
        <Typography>Scary but not so scary.</Typography>
        <Typography variant="caption">11 books</Typography>
      </Stack>
      <Paper>
        <Stack direction={"row"} sx={{ overflowX: "scroll" }} spacing={1} p={1}>
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
          <LibraryCard />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CollectionsCard;
