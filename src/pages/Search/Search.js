import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchComposer from "./SearchComposer";
import SearchResultBubble from "./SearchResultBubble";

const optionsArray = [
  "None",
  "Title",
  "Author",
  "ISBN",
  "Category",
  "Publisher",
];

function Search() {
  const [searchInput, setSearchInput] = useState("");

  const [searchType, setSearchType] = useState("None");
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({});

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleLoadMore = async (e) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=${searchResults.length}&printType=books&key=${process.env.REACT_APP_BOOKS_API_KEY}`
    );

    console.log(response.data.items);

    setSearchResults((prevResult) => [...prevResult, ...response.data.items]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchParams({ searchInput: searchInput });

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&printType=books&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      if (response.data.totalItems === 0) {
        setSearchResults("no-results-found");
        return;
      }
      setSearchResults(response.data.items);
    } catch (err) {
      console.error();
    }

    setIsLoading(false);
  };

  function unique(a, fn) {
    if (a.length === 0 || a.length === 1) {
      return a;
    }
    if (!fn) {
      return a;
    }

    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) {
        if (fn(a[i], a[j])) {
          a.splice(i, 1);
        }
      }
    }
    return a;
  }

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <SearchComposer
          handleSubmit={handleSubmit}
          searchType={searchType}
          handleSearchTypeChange={handleSearchTypeChange}
          optionsArray={optionsArray}
          searchInput={searchInput}
          handleChange={handleChange}
        />
        <Stack my={5}>
          {searchResults.length !== 0 && (
            <Typography>
              Showing results for: {searchParams.get("searchInput")}
            </Typography>
          )}
          {isLoading && <CircularProgress />}
          {searchResults &&
            unique(
              searchResults,
              (a, b) =>
                a.volumeInfo.title === b.volumeInfo.title &&
                a.volumeInfo.authors?.join(", ") ===
                  b.volumeInfo.authors?.join(", ")
            ).map((result) => (
              <SearchResultBubble key={result.id + result.etag} {...result} />
            ))}
          <Button variant="contained" onClick={handleLoadMore}>
            Load 10 more
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Search;
