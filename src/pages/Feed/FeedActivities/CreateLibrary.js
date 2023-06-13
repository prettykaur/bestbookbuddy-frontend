import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import axios from "axios";
import LibraryCard from "../../../common/ui/LibraryCard";

const statusMap = new Map([
  [1, "Want To Read"],
  [2, "Reading"],
  [3, "Read"],
  [4, "Did Not Finish"],
]);

function CreateLibrary({ bookId, userInfo, statusId, dateInfo }) {
  const [bookData, setBookData] = useState();

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await axios.get(`${BACKEND_URL}/books/${bookId}`);
      setBookData(response.data);
    };

    fetchBookData();
  }, []);

  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Avatar alt={userInfo?.username} src={userInfo?.photoUrl} />
          <Stack>
            <Typography>
              <b>@{userInfo?.username}</b> has added a book to their{" "}
              {statusMap.get(statusId)} shelf.
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <LibraryCard bookInfo={bookData} />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CreateLibrary;
