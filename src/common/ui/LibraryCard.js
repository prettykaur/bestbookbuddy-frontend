import { Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";

function LibraryCard() {
  return (
    <Stack
      p={2}
      spacing={1}
      textAlign={"center"}
      className="light-grey-hover"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        alt="book cover"
        src="https://covers.openlibrary.org/b/id/12560417-M.jpg"
        style={{ width: 80 }}
      />
      <Stack>
        <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
          Tuesdays With Morrie
        </Typography>
        <Typography variant="caption">Mitch Albom</Typography>
      </Stack>
    </Stack>
  );
}

export default LibraryCard;
