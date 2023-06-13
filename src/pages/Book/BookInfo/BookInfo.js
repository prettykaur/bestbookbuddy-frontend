import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { BookInfoContext } from "../../../contexts/BookInfoProvider";
import axios from "axios";
import { capitalizeFirst } from "../../../utils/utils";
import BookPlaceholder from "../../../common/ui/BookPlaceholder";

function BookInfo() {
  const bookInfoContext = useContext(BookInfoContext);

  const [GOOGLE_bookInfo, setGOOGLE_bookInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const googleResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=+isbn:${
          bookInfoContext.CONTEXT_bookInfo.isbn13 ||
          bookInfoContext.CONTEXT_bookInfo.isbn10
        }&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );

      if (googleResponse.data.totalItems === 0) {
        setGOOGLE_bookInfo(null);
        return;
      }

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
            {bookInfoContext?.OL_bookInfo?.covers ? (
              <img
                alt="latest edition book cover"
                src={`https://covers.openlibrary.org/b/id/${bookInfoContext?.OL_bookInfo?.covers[0]}-L.jpg`}
                style={{ width: "min(100%,300px)" }}
              />
            ) : (
              <BookPlaceholder width={"min(100%, 300px)"} height={"300px"} />
            )}

            <Stack>
              <Typography variant="h5">
                {bookInfoContext?.OL_bookInfo?.title ?? "Title Not Available"}
              </Typography>
              <Typography variant="subtitle2">
                {bookInfoContext?.OL_bookInfo?.subtitle ?? ""}
              </Typography>
              <Typography variant="caption">
                Published by{" "}
                {bookInfoContext?.OL_bookInfo?.publishers
                  ? bookInfoContext?.OL_bookInfo?.publishers[0]
                  : "Publisher Not Available"}{" "}
                on{" "}
                {bookInfoContext?.OL_bookInfo?.publish_date ??
                  "Publish Date Not Available"}
              </Typography>
              <Typography variant="caption">
                {bookInfoContext?.OL_bookInfo?.number_of_pages ??
                  "Unknown no. of"}{" "}
                pages
              </Typography>
              <Typography variant="caption">
                ISBN 10 - {bookInfoContext?.CONTEXT_bookInfo?.isbn10 ?? "N/A"}
              </Typography>
              <Typography variant="caption">
                ISBN 13 - {bookInfoContext?.CONTEXT_bookInfo?.isbn13 ?? "N/A"}
              </Typography>
              <Typography variant="caption">
                {capitalizeFirst(
                  bookInfoContext?.OL_bookInfo?.physical_format ?? " "
                )}
              </Typography>
            </Stack>
            <Typography>
              {GOOGLE_bookInfo?.volumeInfo?.description ??
                "No description for this book."}
            </Typography>
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h5">About the author:</Typography>
        <Paper>
          <Stack alignItems={"center"} px={2} py={5} spacing={2}>
            <img
              alt="latest edition book cover"
              src={`https://covers.openlibrary.org/a/olid/${
                bookInfoContext?.CONTEXT_bookInfo?.olAuthorKey?.split(", ")[0]
              }-L.jpg`}
              style={{ width: "min(100%, 300px)" }}
            />
            <Box textAlign={"center"}>
              <Typography variant="h5">
                {bookInfoContext?.authorInfo?.name ??
                  "Author Name Not Available"}
              </Typography>
              <Typography>
                {bookInfoContext?.authorInfo?.birth_date ?? "Birth Date N/A"} -{" "}
                {bookInfoContext?.authorInfo?.death_date ?? "Death Date N/A"}
              </Typography>
            </Box>

            <Typography>
              {bookInfoContext?.authorInfo?.bio
                ? typeof bookInfoContext?.authorInfo?.bio === "string"
                  ? bookInfoContext?.authorInfo?.bio
                  : bookInfoContext?.authorInfo?.bio.value
                : "Bio Not Available."}
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

export default BookInfo;
