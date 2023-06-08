import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LibraryCard from "../../../common/ui/LibraryCard";
import LibraryShelf from "./LibraryShelf";
import LibraryActions from "./LibraryActions/LibraryActions";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../../../data/constants";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";

function ProfileLibrary() {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const [isFetchingData, setIsFetchingData] = useState(true);

  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readingBooks, setReadingBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [dnfBooks, setDnfBooks] = useState([]);

  useEffect(() => {
    const fetchLibraryData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      try {
        axios
          .get(
            `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/to-read`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => setWantToReadBooks(res.data));

        axios
          .get(
            `${BACKEND_URL}/library/${userInfoContext.userInfo.id}/reading`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => setReadingBooks(res.data));

        axios
          .get(`${BACKEND_URL}/library/${userInfoContext.userInfo.id}/read`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => setReadBooks(res.data));

        axios
          .get(`${BACKEND_URL}/library/${userInfoContext.userInfo.id}/dnf`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => setDnfBooks(res.data));
      } catch (err) {
        console.log(err);
      }
      setIsFetchingData(false);
    };

    setIsFetchingData(true);
    if (isAuthenticated) {
      fetchLibraryData();
    }
  }, [isAuthenticated]);

  if (isFetchingData)
    return (
      <>
        <CircularProgress />
        <Typography>Fetching Data...</Typography>
      </>
    );

  return (
    <Stack spacing={4}>
      <LibraryActions
        wtrB={wantToReadBooks}
        readingB={readingBooks}
        readB={readBooks}
        dnfB={dnfBooks}
      />
      <LibraryShelf
        libraryLabel={"Want To Read"}
        count={wantToReadBooks.length}
      >
        {wantToReadBooks.map((book) => (
          <LibraryCard key={book?.bookId} bookInfo={book?.book} />
        ))}
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Reading"} count={readingBooks.length}>
        {readingBooks.map((book) => (
          <LibraryCard key={book.bookId} bookInfo={book?.book} />
        ))}
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Read"} count={readBooks.length}>
        {readBooks.map((book) => (
          <LibraryCard key={book.bookId} bookInfo={book?.book} />
        ))}
      </LibraryShelf>

      <LibraryShelf libraryLabel={"Did Not Finish"} count={dnfBooks.length}>
        {dnfBooks.map((book) => (
          <LibraryCard key={book.bookId} bookInfo={book?.book} />
        ))}
      </LibraryShelf>
    </Stack>
  );
}

export default ProfileLibrary;
