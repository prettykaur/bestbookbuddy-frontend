import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchComposer({
  handleSubmit,
  handleMemberSearch,
  searchType,
  handleSearchTypeChange,
  optionsArray,
  searchInput,
  handleChange,
  isLoading,
}) {
  return (
    <form
      onSubmit={searchType === "Member" ? handleMemberSearch : handleSubmit}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={5}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Search Type</InputLabel>
          <Select
            autoWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchType}
            label="Search Type"
            onChange={handleSearchTypeChange}
          >
            <ListSubheader sx={{ fontStyle: "italic", fontFamily: "Inter" }}>
              Book Search
            </ListSubheader>
            {optionsArray.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
            <ListSubheader sx={{ fontStyle: "italic", fontFamily: "Inter" }}>
              Member Search
            </ListSubheader>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          autoComplete="off"
          value={searchInput}
          onChange={handleChange}
          sx={{ width: "80%" }}
          placeholder="Search for a book, author, etc"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ m: 1 }}
          disabled={isLoading ? true : false}
        >
          Search
        </Button>
      </Box>
    </form>
  );
}

export default SearchComposer;
