import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

function FriendCard() {
  return (
    <Box p={1} className="light-grey-hover">
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar alt="Syafiq" src="" />
        <Typography variant="h6">Syafiq</Typography>
      </Stack>
    </Box>
  );
}

export default FriendCard;
