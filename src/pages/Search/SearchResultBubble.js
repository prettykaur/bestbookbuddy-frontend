import { LocalLibraryTwoTone } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResultBubble(result) {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"row"}
      p={3}
      className="search-result-bubble"
      onClick={() => navigate("/book")}
    >
      {result.volumeInfo.imageLinks?.thumbnail ||
      result.volumeInfo.imageLinks?.smallThumbnail ? (
        <img
          alt="book cover"
          src={
            result.volumeInfo.imageLinks?.thumbnail ||
            result.volumeInfo.imageLinks?.smallThumbnail ||
            ""
          }
          style={{ width: "71px" }}
        />
      ) : (
        <Stack
          width={"71px"}
          height={"110px"}
          bgcolor={"#63167f"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <LocalLibraryTwoTone sx={{ color: "white" }} fontSize="large" />
        </Stack>
      )}

      <Stack ml={1}>
        <Typography variant="h5">{result.volumeInfo.title}</Typography>
        <Typography variant="subtitle2">
          {result.volumeInfo?.authors?.join(", ") ?? "Anonymous"}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default SearchResultBubble;
