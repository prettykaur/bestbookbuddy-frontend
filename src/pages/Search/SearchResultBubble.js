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
      {result.cover_i ? (
        <img
          alt="book cover"
          src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
          style={{ minWidth: "71px", height: "110px" }}
        />
      ) : (
        <Stack
          minWidth={"71px"}
          height={"110px"}
          bgcolor={"#63167f"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <LocalLibraryTwoTone sx={{ color: "white" }} fontSize="large" />
        </Stack>
      )}

      <Stack ml={1}>
        <Typography variant="h5">{result.title}</Typography>
        <Typography variant="subtitle2">
          {result.author_name?.join(", ") ?? "Anonymous"}
        </Typography>
        <Typography variant="caption">
          First Published: {result.first_publish_year ?? ""}
        </Typography>
        <Typography variant="caption">
          {result.edition_count ?? ""}{" "}
          {result.edition_count
            ? result.edition_count === 1
              ? "edition"
              : "editions"
            : ""}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default SearchResultBubble;
