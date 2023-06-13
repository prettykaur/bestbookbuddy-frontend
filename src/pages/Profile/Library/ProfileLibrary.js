import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import LibraryCard from "../../../common/ui/LibraryCard";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import { BACKEND_URL } from "../../../data/constants";
import LibraryActions from "./LibraryActions/LibraryActions";
import LibraryShelf from "./LibraryShelf";
import { useParams } from "react-router-dom";

export const LibraryContext = createContext();

function ProfileLibrary() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const [isFetchingData, setIsFetchingData] = useState(true);

  const [booksInfo, setBooksInfo] = useState([]);
  const [updateData, setUpdateData] = useState(false);

  const { userId } = useParams();

  const updateLibraryData = () => setUpdateData((prevState) => !prevState);

  useEffect(() => {
    const fetchLibraryData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      try {
        const response = await axios.get(`${BACKEND_URL}/library/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setBooksInfo(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsFetchingData(false);
    };

    setIsFetchingData(true);
    if (isAuthenticated) {
      fetchLibraryData();
    }
  }, [isAuthenticated, updateData]);

  if (isFetchingData)
    return (
      <>
        <CircularProgress />
        <Typography>Fetching Data...</Typography>
      </>
    );

  const wantToReadBooks = booksInfo.filter((book) => book.status === "to-read");
  const readingBooks = booksInfo.filter((book) => book.status === "reading");
  const readBooks = booksInfo.filter((book) => book.status === "read");
  const dnfBooks = booksInfo.filter((book) => book.status === "dnf");

  return (
    <LibraryContext.Provider value={updateLibraryData}>
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
            <LibraryCard key={book?.id} bookInfo={book} />
          ))}
        </LibraryShelf>

        <LibraryShelf libraryLabel={"Reading"} count={readingBooks.length}>
          {readingBooks.map((book) => (
            <LibraryCard key={book?.id} bookInfo={book} />
          ))}
        </LibraryShelf>

        <LibraryShelf libraryLabel={"Read"} count={readBooks.length}>
          {readBooks.map((book) => (
            <LibraryCard key={book?.id} bookInfo={book} />
          ))}
        </LibraryShelf>

        <LibraryShelf libraryLabel={"Did Not Finish"} count={dnfBooks.length}>
          {dnfBooks.map((book) => (
            <LibraryCard key={book?.id} bookInfo={book} />
          ))}
        </LibraryShelf>
      </Stack>
    </LibraryContext.Provider>
  );
}

export default ProfileLibrary;
