import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BookInfoContext } from "../../../contexts/BookInfoProvider";
import axios from "axios";
import { capitalizeFirst } from "../../../utils/utils";

function BookInfo() {
  const bookInfoContext = useContext(BookInfoContext);

  const [GOOGLE_bookInfo, setGOOGLE_bookInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const googleResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=+isbn:${
          bookInfoContext.CONTEXT_bookInfo.isbn10 ||
          bookInfoContext.CONTEXT_bookInfo.isbn13
        }&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      setGOOGLE_bookInfo(googleResponse.data.items[0]);
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={7}>
      {/* <pre>{JSON.stringify(bookInfoContext.CONTEXT_bookInfo, null, 2)}</pre>
      <pre>{JSON.stringify(GOOGLE_bookInfo, null, 2)}</pre>
      <pre>{JSON.stringify(bookInfoContext.OL_bookInfo, null, 2)}</pre>
      <pre>{JSON.stringify(bookInfoContext.authorInfo, null, 2)}</pre> */}
      <Box>
        <Typography variant="h5">Latest edition:</Typography>
        <Paper>
          <Stack px={2} py={5} spacing={3} alignItems={"center"}>
            <img
              alt="latest edition book cover"
              src={`https://covers.openlibrary.org/b/id/${bookInfoContext.OL_bookInfo.covers[0]}-L.jpg`}
              style={{ width: "min(100%,300px)" }}
            />

            <Stack>
              <Typography variant="h5">
                {GOOGLE_bookInfo.volumeInfo.title}
              </Typography>
              <Typography variant="subtitle2">
                {GOOGLE_bookInfo.volumeInfo.subtitle}
              </Typography>
              <Typography variant="caption">
                Published by {GOOGLE_bookInfo?.volumeInfo.publisher} on{" "}
                {GOOGLE_bookInfo.volumeInfo.publishedDate}
              </Typography>
              <Typography variant="caption">
                {bookInfoContext.OL_bookInfo.number_of_pages} pages
              </Typography>
              <Typography variant="caption">
                ISBN 10 - {bookInfoContext.CONTEXT_bookInfo.isbn10 ?? "N/A"}
              </Typography>
              <Typography variant="caption">
                ISBN 13 - {bookInfoContext.CONTEXT_bookInfo.isbn13 ?? "N/A"}
              </Typography>
              <Typography variant="caption">
                {capitalizeFirst(bookInfoContext.OL_bookInfo.physical_format)}
              </Typography>
            </Stack>
            <Typography>{GOOGLE_bookInfo.volumeInfo.description}</Typography>
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h5">About the author:</Typography>
        <Paper>
          <Stack alignItems={"center"} px={2} py={5} spacing={2}>
            <img
              alt="latest edition book cover"
              src={`https://covers.openlibrary.org/a/olid/${bookInfoContext.CONTEXT_bookInfo.olAuthorKey}-L.jpg`}
              style={{ width: "min(100%, 300px)" }}
            />
            <Box>
              <Typography variant="h5">
                {bookInfoContext.authorInfo.name}
              </Typography>
              <Typography>
                ( {bookInfoContext.authorInfo.birth_date} -{" "}
                {bookInfoContext.authorInfo.death_date}
              </Typography>
            </Box>
            <Typography>{bookInfoContext.authorInfo.bio}</Typography>

            <Typography>Other works:</Typography>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

export default BookInfo;
