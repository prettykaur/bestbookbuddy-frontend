import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../data/constants";
import axios from "axios";
import LibraryCard from "../../../common/ui/LibraryCard";

export default function CreatedComment({
  bookId,
  userInfo,
  commentInfo,
  dateInfo,
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
              <b>@{userInfo?.username}</b> commented on a discussion thread.
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <LibraryCard bookInfo={bookData} />
        </Stack>
        <Paper elevation={3}>
          <Stack p={2} spacing={2}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Avatar
                alt={userInfo?.username}
                src={userInfo?.photoUrl}
                sx={{ width: 30, height: 30 }}
              />
              <Stack>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  @{userInfo?.username}
                </Typography>
                <Typography variant="caption">
                  Posted on{" "}
                  {new Date(commentInfo?.createdAt).toLocaleString("en-SG")}
                </Typography>
              </Stack>
            </Stack>

            <Typography>{commentInfo?.body}</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
}
