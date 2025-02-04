import { LocalLibraryTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";

function BookPlaceholder({
  width,
  height,
  rounded = false,
  iconSize = "large",
  gradient = false,
}) {
  return (
    <Stack
      width={width}
      height={height}
      bgcolor={"#63167f"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={rounded ? "50%" : "none"}
      className={gradient ? "purple-gradient" : ""}
    >
      <LocalLibraryTwoTone
        className={gradient ? "purple-gradient-child" : ""}
        sx={{ color: "white" }}
        fontSize="large"
      />
    </Stack>
  );
}

export default BookPlaceholder;
