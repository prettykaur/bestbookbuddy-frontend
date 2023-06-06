import { LocalLibraryTwoTone } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import Image from "mui-image";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../data/constants";

function SearchResultBubble(result) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsRedirecting(true);
    const olResponse = await axios.get(
      `https://openlibrary.org/books/${
        result.edition_key[result.edition_key.length - 1]
      }.json`
    );

    let isbn10 = olResponse.data.isbn_10[0] ?? null;
    let isbn13 = olResponse.data.isbn_13[0] ?? null;

    const response = await axios.post(`${BACKEND_URL}/books`, {
      title: result.title ?? null,
      olEditionKey: result.edition_key[result.edition_key.length - 1] ?? null,
      olEditionCount: result.edition_count ?? null,
      isbn10,
      isbn13,
      olCoverId: result.cover_i ?? null,
      olRatingsCount: result.ratings_count ?? null,
      olRatingsAverage: result.ratings_average ?? null,
      olAuthorKey: result.author_key?.join(", ") ?? null,
      authorName: result.author_name?.join(", ") ?? null,
    });

    navigate(`/book/${response.data.id}`);
  };

  return (
    <Stack
      direction={"row"}
      p={3}
      className="search-result-bubble"
      onClick={isRedirecting ? () => {} : handleClick}
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
      {isRedirecting ? (
        <Stack alignItems={"center"} justifyContent={"center"}>
          <CircularProgress />
          <Typography>Redirecting...</Typography>
        </Stack>
      ) : (
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
      )}
    </Stack>
  );
}

export default SearchResultBubble;
