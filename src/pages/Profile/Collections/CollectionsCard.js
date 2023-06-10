import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import LibraryCard from "../../../common/ui/LibraryCard";

function CollectionsCard({ name, description, booksArr }) {
  return (
    <Stack spacing={2}>
      <Stack px={2}>
        <Typography variant="h5">{name}</Typography>
        <Typography>{description}</Typography>
        <Typography variant="caption">
          {booksArr.length === 0 ? "" : booksArr.length}{" "}
          {booksArr.length !== 0
            ? booksArr.length === 1
              ? "book"
              : "books"
            : "No books yet :-("}
        </Typography>
      </Stack>
      <Paper>
        <Stack direction={"row"} sx={{ overflowX: "scroll" }} spacing={1} p={1}>
          {booksArr.length === 0 && (
            <Typography p={2}>Search and add some books! 📚</Typography>
          )}
          {booksArr.map((book) => (
            <LibraryCard key={book.id} bookInfo={book} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CollectionsCard;
