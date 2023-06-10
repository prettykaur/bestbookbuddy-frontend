import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BookPlaceholder from "../../common/ui/BookPlaceholder";
import BasicTabs from "./Tabs/BasicTabs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../data/constants";
import { BookInfoContext } from "../../contexts/BookInfoProvider";
import AddToLibraryBtn from "./AddToLibrary/AddToLibraryBtn";
import AddToCollectionBtn from "./AddToCollection/AddToCollectionBtn";

function BookPage() {
  const [DB_bookInfo, setDB_bookInfo] = useState(null);
  const bookInfoContext = useContext(BookInfoContext);

  const { bookId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/books/${bookId}`);

      setDB_bookInfo(response.data);
      bookInfoContext.setCONTEXT_bookInfo(response.data);

      const olResponse = await axios.get(
        `https://openlibrary.org/books/${response.data.olEditionKey}.json`
      );
      bookInfoContext.setOL_bookInfo(olResponse.data);

      // const googleResponse = await axios.get(
      //   `https://www.googleapis.com/books/v1/volumes?q=+isbn:${
      //     response.data.isbn10 || response.data.isbn13
      //   }&key=${process.env.REACT_APP_BOOKS_API_KEY}`
      // );

      // const query = googleResponse.data.items[0].volumeInfo;
      // bookInfoContext.setGOOGLE_bookInfo(query);

      const authorResponse = await axios.get(
        `https://openlibrary.org/authors/${
          response.data.olAuthorKey.split(", ")[0]
        }.json`
      );
      bookInfoContext.setAuthorInfo(authorResponse.data);
    };

    fetchData();
  }, []);

  if (DB_bookInfo == null)
    return (
      <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5}>
          <Paper>
            <Stack direction={"row"} spacing={1} p={2}>
              {DB_bookInfo.olCoverId ? (
                <img
                  alt="book cover"
                  src={`https://covers.openlibrary.org/b/id/${DB_bookInfo.olCoverId}-L.jpg`}
                  style={{ minWidth: "71px", height: "110px" }}
                />
              ) : (
                <BookPlaceholder width={"71px"} height={"110px"} />
              )}

              <Stack>
                <Typography variant="h5">{DB_bookInfo.title}</Typography>
                <Typography variant="body1">
                  {DB_bookInfo.authorName}
                </Typography>
                <Typography variant="caption">
                  {DB_bookInfo.olEditionCount}{" "}
                  {DB_bookInfo.olEditionCount === 0
                    ? ""
                    : DB_bookInfo.olEditionCount === 1
                    ? "edition"
                    : "editions"}
                </Typography>
                <Stack direction={"row"} spacing={1}>
                  <AddToLibraryBtn bookId={DB_bookInfo.id} />
                  <AddToCollectionBtn bookId={DB_bookInfo.id} />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <BasicTabs />
        </Stack>
      </Container>
    </Box>
  );
}

export default BookPage;
