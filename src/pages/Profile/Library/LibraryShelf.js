import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

function LibraryShelf({ children, libraryLabel, count }) {
  return (
    <Stack spacing={1}>
      <Stack px={2}>
        <Typography variant="h5">{libraryLabel}</Typography>
        <Typography variant="caption">
          {count}{" "}
          {count !== 0 ? (count === 1 ? "book" : "books") : "No books yet"}
        </Typography>
      </Stack>
      <Paper>
        <Stack direction={"row"} sx={{ overflowX: "scroll" }} spacing={1} p={1}>
          {children}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default LibraryShelf;
