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
  const [currentPage, setCurrentPage] = useState(1);

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
      `https://openlibrary.org/search.json?q=${searchInput}&page=${currentPage}`
    );

    console.log(response.data.docs);

    setSearchResults((prevResult) => [...prevResult, ...response.data.docs]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);
    setSearchParams({ searchInput: searchInput });

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchInput}&page=1`
      );
      if (response.data.numFound === 0) {
        setSearchResults("no-results-found");
        return;
      }
      setSearchResults(response.data.docs);
    } catch (err) {
      console.error();
    }

    setIsLoading(false);
    setCurrentPage((prevPage) => prevPage + 1);
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
        {/* <pre>{JSON.stringify(currentPage, null, 2)}</pre> */}
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
          {searchResults.length !== 0 && (
            <>
              {
                // unique(
                //   searchResults,
                //   (a, b) =>
                //     a.title === b.title &&
                //     a.author_name?.join(", ") === b.author_name?.join(", ")
                // )git
                searchResults.map((result) => (
                  <SearchResultBubble key={result.key} {...result} />
                ))
              }
              <Button variant="contained" onClick={handleLoadMore}>
                Load more
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Search;
