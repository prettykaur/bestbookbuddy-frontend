import { KeyboardArrowRight } from "@mui/icons-material";
import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatedFriend({ userInfo, otherUserInfo, dateInfo }) {
  const navigate = useNavigate();

  return (
    <Paper>
      <Stack p={2} spacing={2} alignItems={"flex-start"}>
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

        <Button
          endIcon={<KeyboardArrowRight />}
          onClick={() => navigate(`/user/${userInfo?.id}`)}
        >
          View their profile
        </Button>
      </Stack>
    </Paper>
  );
}
