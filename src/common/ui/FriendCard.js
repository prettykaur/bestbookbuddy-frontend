import {
  CloseRounded,
  DoneRounded,
  PersonAddTwoTone,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../data/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";

function FriendCard({
  userInfo,
  view = "default",
  requestId = null,
  updateData,
}) {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);

  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      const response = await axios.get(
        `${BACKEND_URL}/friends/${userInfoContext?.userInfo?.id}/sent-requests`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setRequestsList(response.data);
    };

    fetchStatus();
  }, []);

  const handleAddFriend = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.post(
      `${BACKEND_URL}/friends/${userInfoContext?.userInfo?.id}/send-friend-request`,
      {
        recipientId: userInfo?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const handleAddRejFriend = async (statusId) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      scope: "read:current_user openid profile email phone",
    });

    const response = await axios.put(
      `${BACKEND_URL}/friends/${userInfoContext?.userInfo?.id}/friend-requests/${requestId}`,
      {
        statusId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    updateData();
  };

  let alreadySent = true;
  const status = requestsList.find(
    (request) => +request.recipientId === +userInfo?.id
  );
  if (!status) alreadySent = false;

  return (
    <Box p={1} className="light-grey-hover">
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          width={"100%"}
          onClick={() => navigate(`/user/${userInfo?.id}`)}
        >
          <Avatar alt={userInfo?.username} src={userInfo?.photoUrl} />
          <Stack>
            <Typography variant="h6">{userInfo?.username}</Typography>
            <Typography variant="caption">
              Last logged in on{" "}
              {new Date(userInfo?.lastLogin).toLocaleDateString("en-SG")}
            </Typography>
          </Stack>
        </Stack>

        {view === "default" && (
          <IconButton
            color="primary"
            onClick={handleAddFriend}
            disabled={alreadySent ? true : false}
          >
            <PersonAddTwoTone />
          </IconButton>
        )}

        {view === "accepting" && (
          <Stack direction={"row"}>
            <IconButton
              color="primary"
              onClick={() => handleAddRejFriend(2)}
              disabled={alreadySent ? true : false}
            >
              <DoneRounded />
            </IconButton>

            <IconButton
              color="primary"
              onClick={() => handleAddRejFriend(3)}
              disabled={alreadySent ? true : false}
            >
              <CloseRounded />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default FriendCard;
