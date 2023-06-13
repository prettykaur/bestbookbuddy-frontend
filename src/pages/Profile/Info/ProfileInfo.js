import { Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../../contexts/UserInfoProvider";
import FriendCard from "../../../common/ui/FriendCard";
import axios from "axios";
import { BACKEND_URL } from "../../../data/constants";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProfileInfo() {
  const { userId } = useParams();

  const userInfoContext = useContext(UserInfoContext);
  const [userInfo, setUserInfo] = useState({});
  const [friendsList, setFriendsList] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
      setUserInfo(response.data);
    };

    const fetchFriendsData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      const response = await axios.get(`${BACKEND_URL}/friends/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setFriendsList(response.data);
    };

    fetchUserData();
    fetchFriendsData();
  }, [userId]);

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
          Friends ({friendsList.length})
        </Typography>
        <Paper>
          <Stack p={2}>
            {friendsList.map((user) => (
              <FriendCard
                key={user.id}
                userInfo={user}
                view="alreadyAccepted"
              />
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default ProfileInfo;
