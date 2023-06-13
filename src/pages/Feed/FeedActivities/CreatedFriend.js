import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CreatedFriend({ userInfo, otherUserInfo, dateInfo }) {
  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Avatar alt={userInfo?.username} src={userInfo?.photoUrl} />
          <Stack>
            <Typography>
              <b>@{userInfo?.username}</b> has made a new friend!
            </Typography>
            <Typography variant="caption">
              {new Date(dateInfo).toLocaleString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
        >
          <Typography>
            {otherUserInfo == null
              ? "This is returning null"
              : "There is an object"}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
