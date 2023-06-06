import { LocalLibraryTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";

function BookPlaceholder({ width, height }) {
  return (
    <Stack
      width={width}
      height={height}
      bgcolor={"#63167f"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <LocalLibraryTwoTone sx={{ color: "white" }} fontSize="large" />
    </Stack>
  );
}

export default BookPlaceholder;
