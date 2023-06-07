import { Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import FriendCard from "../../../common/ui/FriendCard";

function ProfileInfo() {
  const userInfoContext = useContext(UserInfoContext);

  return (
    <Stack spacing={5}>
      <Stack>
        <Typography variant="h5" px={2}>
          User Bio
        </Typography>
        <Paper>
          <Stack p={2}>
            <Typography>
              {userInfoContext.userInfo.bio ?? "No bio yet."}
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Stack>
        <Typography variant="h5" px={2}>
          Friends
        </Typography>
        <Paper>
          <Stack p={2}>
            <FriendCard />
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default ProfileInfo;
