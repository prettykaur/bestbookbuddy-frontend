import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { UserInfoContext } from "../../contexts/UserInfoProvider";
import ProfilePageTabs from "./Tabs/ProfilePageTabs";
import SpeedDialTooltipOpen from "../../common/ui/SpeedDial";
import EditProfileDialog from "./EditProfileDialog";
import AddFriendBtn from "../../common/ui/AddFriendBtn";

function ProfilePage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [profileInfo, setProfileInfo] = useState();
  const [updateData, setUpdateData] = useState(false);

  const [friendsList, setFriendsList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const userInfoContext = useContext(UserInfoContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      try {
        const response = await axios.get(`${BACKEND_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Get request went through");

        setProfileInfo(response.data);
      } catch (err) {
        console.log(err);
      }
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

    if (isAuthenticated) {
      fetchUserData();
      fetchFriendsData();
    }
  }, [isAuthenticated, updateData, userId]);

  if (profileInfo == null)
    return (
      <Box>
        <Container maxWidth="xl">
          <Stack my={5} alignItems={"center"} justifyContent={"center"}>
            <CircularProgress />
            <Typography>Retrieving user info...</Typography>
          </Stack>
        </Container>
      </Box>
    );

  let AreFriends;
  const friend = friendsList.find(
    (user) => userInfoContext?.userInfo?.id === +user.id
  );
  console.log(friend);
  if (friend) AreFriends = true;

  return (
    <Box flex={1}>
      <Container maxWidth="xl">
        <Stack my={5} direction={"row"} spacing={2} alignItems={"center"}>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Avatar
              alt={profileInfo.username}
              src={profileInfo.photoUrl}
              sx={{ width: 100, height: 100 }}
            />
            {isAuthenticated && user.email === profileInfo.email ? (
              <>
                <Button
                  startIcon={<Edit />}
                  onClick={() => setOpenDialog(true)}
                >
                  Edit Profile
                </Button>
                <EditProfileDialog
                  open={openDialog}
                  setOpenDialog={setOpenDialog}
                  setUpdateData={setUpdateData}
                  updateData={updateData}
                />
              </>
            ) : (
              <></>
            )}
            {isAuthenticated &&
              user.email !== profileInfo.email &&
              !AreFriends && <AddFriendBtn userId={userId} />}
          </Stack>
          <Stack>
            <Typography variant="h4">@{profileInfo.username}</Typography>
            <Typography>Profile URL: {profileInfo.id}</Typography>
            <Typography>{profileInfo.email}</Typography>
            <Typography>Points: {profileInfo.points}</Typography>
            <Typography>
              Member since{" "}
              {new Date(profileInfo.createdAt).toLocaleDateString("en-SG")}
            </Typography>
          </Stack>
        </Stack>
        <ProfilePageTabs />
      </Container>
    </Box>
  );
}

export default ProfilePage;
