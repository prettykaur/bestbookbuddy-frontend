import { Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import FriendCard from "../../../common/ui/FriendCard";
import axios from "axios";
import { BACKEND_URL } from "../../../data/constants";
import { useParams } from "react-router-dom";

function ProfileInfo() {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
      setUserInfo(response.data);
    };

    fetchUserData();
  }, []);

  return (
    <Stack spacing={5}>
      <Stack>
        <Typography variant="h5" px={2}>
          User Bio
        </Typography>
        <Paper>
          <Stack p={2}>
            <Typography>{userInfo.bio ?? "No bio yet."}</Typography>
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
