import { Stack } from "@mui/material";
import React from "react";
import LibraryCard from "../../../common/ui/LibraryCard";
import LibraryShelf from "./LibraryShelf";

function ProfileLibrary() {
  return (
    <Stack spacing={4}>
      <LibraryShelf libraryLabel={"Want To Read"} count={1}>
        <LibraryCard />
        <LibraryCard />
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Reading"} count={2}>
        <LibraryCard />
        <LibraryCard />
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Read"} count={4}>
        <LibraryCard />
        <LibraryCard />
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Did Not Finish"} count={11}>
        <LibraryCard />
        <LibraryCard />
      </LibraryShelf>
    </Stack>
  );
}

export default ProfileLibrary;
