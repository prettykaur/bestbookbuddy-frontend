import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import axios from "axios";
import LibraryCard from "../../../common/ui/LibraryCard";
import DiscussionTitleCard from "../../../common/ui/DiscussionTitleCard";

export default function LikedDiscussion({
  bookId,
  userInfo,
  dateInfo,
  discussionInfo,
}) {
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
              <b>@{userInfo?.username}</b> liked a discussion thread.
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <LibraryCard bookInfo={bookData} />
        </Stack>
        <DiscussionTitleCard
          discussionInfo={discussionInfo}
          NONPARAM_bookId={bookId}
          userInfo={userInfo}
        />
      </Stack>
    </Paper>
  );
}
