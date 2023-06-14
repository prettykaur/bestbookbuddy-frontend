import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FriendCard from "../../common/ui/FriendCard";
import { getUniqueObjects } from "../../utils/utils";

function FriendsPage() {
  const [friendsList, setFriendsList] = useState([]);
  const [requestsList, setRequestsList] = useState([]);

  const [displayRequestList, setDisplayRequestList] = useState([]);

  const [updateData, setUpdateData] = useState(false);

  const { userId } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
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
      console.log(response.data);

      setFriendsList(response.data);
    };

    const fetchRequestsData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      try {
        const response = await axios.get(
          `${BACKEND_URL}/friends/${userId}/received-requests`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const filtered = response.data.filter(
          (request) => +request.statusId !== 2 && +request.statusId !== 3
        );

        setRequestsList(filtered);
      } catch (err) {
        console.log(err?.response?.data?.msg === "No friend requests found");
        setRequestsList([]);
      }
    };

    fetchFriendsData();
    fetchRequestsData();
  }, [updateData]);

  // useEffect(() => {
  //   const newArr = getUniqueObjects(friendsList, requestsList);
  //   setDisplayRequestList(newArr);
  // }, [requestsList, friendsList]);

  const forceUpdate = () => setUpdateData((prevState) => !prevState);

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5} spacing={2}>
          <Typography variant="h5">
            Friend Requests ({requestsList.length})
          </Typography>
          {requestsList.length === 0 && "No friend requests yet. :-("}

          <Stack spacing={1}>
            {requestsList.map((request) => (
              <Paper key={request.id}>
                <FriendCard
                  userInfo={request?.sender}
                  view="accepting"
                  requestId={request.id}
                  updateData={forceUpdate}
                />
              </Paper>
            ))}
          </Stack>

          <Typography variant="h5">Friends ({friendsList.length})</Typography>
          {friendsList.length === 0 && "No friends yet. :-("}
          <Stack spacing={1}>
            {friendsList.length !== 0 &&
              friendsList.map((user) => (
                <Paper key={user.id}>
                  <FriendCard
                    userInfo={user}
                    updateData={forceUpdate}
                    view="acceptedFriends"
                  />
                </Paper>
              ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default FriendsPage;
