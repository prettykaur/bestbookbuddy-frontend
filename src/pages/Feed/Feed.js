import { Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../data/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfoContext } from "../../contexts/UserInfoProvider";

function Feed() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const userInfoContext = useContext(UserInfoContext);
  console.log(userInfoContext);

  useEffect(() => {
    const checkOrCreateUser = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        scope: "read:current_user openid profile email phone",
      });

      console.log(user.nickname);
      console.log(user.email);
      console.log(user.picture);

      try {
        const response = await axios.post(
          `${BACKEND_URL}/users`,
          {
            username: user.nickname,
            email: user.email,
            photoUrl: user.picture,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("user request went through");
        console.log(userInfoContext);

        userInfoContext.setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      checkOrCreateUser();
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Typography>This is the feed page</Typography>
      <Typography>AKA redirect page</Typography>
      <Typography>
        Will check if user exists in the db when they reach this page
      </Typography>
      <pre>{JSON.stringify(userInfoContext?.userInfo?.id ?? "Not ready")}</pre>
    </Stack>
  );
}

export default Feed;
