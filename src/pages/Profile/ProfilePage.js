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

function ProfilePage() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [profileInfo, setProfileInfo] = useState();
  const [updateData, setUpdateData] = useState(false);

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
        userInfoContext.setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, updateData]);

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
              <Button startIcon={<Edit />}>Edit Profile</Button>
            ) : (
              <></>
            )}
          </Stack>
          <Stack>
            <Typography variant="h4">@{profileInfo.username}</Typography>
            <Typography>Profile URL: {profileInfo.id}</Typography>
            <Typography>{profileInfo.email}</Typography>
            <Typography>Points: {profileInfo.points}</Typography>
            <Typography>
              Member since{" "}
              {new Date(profileInfo.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
        <ProfilePageTabs />
      </Container>
    </Box>
  );
}

export default ProfilePage;
